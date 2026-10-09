import { NextRequest, NextResponse } from 'next/server';
import { ensureProductsTable, getDbPool } from '@/app/lib/db';
import { corsAllowOrigin, jsonWithCors } from '@/app/lib/cors';
import { getCatalogProducts, Product } from '@/app/lib/productData';
import { RowDataPacket } from 'mysql2';

export const dynamic = 'force-dynamic';

export async function OPTIONS(request: NextRequest) {
  const allow = corsAllowOrigin(request);
  if (!allow) return new NextResponse(null, { status: 204 });
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allow,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Cookie, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    },
  });
}

interface OrderItemInput {
  id: string;
  qty: number;
}

interface DbProductRow extends RowDataPacket {
  id: number;
  name: string;
  price: string | number;
  inventory: number;
}

export async function POST(request: NextRequest) {
  if (process.env.STATIC_EXPORT === 'true') {
    return jsonWithCors(
      request,
      { message: 'Payment API is disabled in static export mode.' },
      { status: 503 }
    );
  }

  let keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim();
  let keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

  // Handle common typo where 'rzp_live_' was accidentally pasted with an extra leading 'r' ('rrzp_live_')
  if (keyId?.startsWith('rrzp_')) {
    keyId = keyId.slice(1);
  }

  if (!keyId || !keySecret) {
    return jsonWithCors(
      request,
      { message: 'Razorpay keys are missing from server environment.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    const items = body?.items as OrderItemInput[] | undefined;

    if (!Array.isArray(items) || items.length === 0) {
      return jsonWithCors(request, { message: 'Cart items are required.' }, { status: 400 });
    }

    // Lookup prices server-side
    const priceMap = new Map<string, number>();

    // 1. Check MySQL
    try {
      await ensureProductsTable();
      const db = getDbPool();
      const numericIds = items
        .map((i) => Number(i.id))
        .filter((n) => Number.isFinite(n) && n > 0);

      if (numericIds.length > 0) {
        const placeholders = numericIds.map(() => '?').join(',');
        const [rows] = await db.query<DbProductRow[]>(
          `SELECT id, name, price, inventory FROM products WHERE id IN (${placeholders})`,
          numericIds
        );
        for (const r of rows) {
          priceMap.set(String(r.id), Number(r.price));
          const inv = Number(r.inventory);
          if (inv <= 0) {
            return jsonWithCors(
              request,
              { message: `"${r.name || r.id}" is currently out of stock.` },
              { status: 400 }
            );
          }
          const itemInput = items.find((i) => String(i.id) === String(r.id));
          if (itemInput && Number(itemInput.qty) > inv) {
            return jsonWithCors(
              request,
              { message: `Only ${inv} piece(s) available for "${r.name || r.id}". You cannot order ${itemInput.qty}.` },
              { status: 400 }
            );
          }
        }
      }
    } catch (e) {
      console.warn('Could not query DB for prices, using catalog fallback:', e);
    }

    // 2. Check static catalog for any unmapped IDs
    const isLiveKey = keyId.startsWith('rzp_live');
    const isProduction = process.env.NODE_ENV === 'production';
    const catalog = getCatalogProducts(!isLiveKey && !isProduction);
    for (const p of catalog) {
      if (!priceMap.has(p.id)) {
        priceMap.set(p.id, Number(p.price));
      }
    }

    // 3. Compute verified server total
    let totalAmount = 0;
    for (const item of items) {
      const unitPrice = priceMap.get(item.id);
      if (unitPrice === undefined || unitPrice <= 0) {
        return jsonWithCors(
          request,
          { message: `Invalid price or unknown product: ${item.id}` },
          { status: 400 }
        );
      }
      const qty = Math.max(1, Math.floor(Number(item.qty) || 1));
      totalAmount += unitPrice * qty;
    }

    // Optional test override check (strictly disabled in production and whenever live keys are used)
    const testOverride = process.env.NEXT_PUBLIC_RAZORPAY_CHARGE_INR;
    if (!isLiveKey && !isProduction && testOverride && Number.isFinite(Number(testOverride)) && Number(testOverride) > 0) {
      totalAmount = Number(testOverride);
    }

    // Minimum ₹1 (100 paise) for Razorpay
    const amountPaise = Math.max(100, Math.round(totalAmount * 100));

    // Call Razorpay API to create official order
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const razorpayRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      }),
    });

    const razorpayData = await razorpayRes.json();

    if (!razorpayRes.ok) {
      return jsonWithCors(
        request,
        { message: razorpayData?.error?.description || 'Failed to initialize payment with Razorpay.' },
        { status: razorpayRes.status }
      );
    }

    return jsonWithCors(request, {
      orderId: razorpayData.id,
      amount: razorpayData.amount,
      currency: razorpayData.currency,
      keyId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error creating Razorpay order.';
    return jsonWithCors(request, { message }, { status: 500 });
  }
}
