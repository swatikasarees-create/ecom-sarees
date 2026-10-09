import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getDbPool, ensureOrdersTables, ensureProductsTable } from '@/app/lib/db';
import { corsAllowOrigin, jsonWithCors } from '@/app/lib/cors';
import { getCatalogProducts } from '@/app/lib/productData';
import { RowDataPacket } from 'mysql2';

export const dynamic = 'force-dynamic';

type PaymentMode = 'COD' | 'RAZORPAY';
type OrderStatus = 'PLACED' | 'PAID';

interface OrderPayloadItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

interface CreateOrderPayload {
  items: OrderPayloadItem[];
  amount?: number;
  paymentMode: PaymentMode;
  status?: OrderStatus;
  // Razorpay verification fields
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  razorpaySignature?: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    stateName: string;
    pincode: string;
    notes?: string;
  };
}

const generateOrderId = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SWA-${datePart}-${randomPart}`;
};

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

export async function POST(request: NextRequest) {
  if (process.env.STATIC_EXPORT === 'true') {
    return jsonWithCors(
      request,
      { message: 'Order API is disabled in static export mode.' },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json().catch(() => null)) as CreateOrderPayload | null;
    if (!body) {
      return jsonWithCors(request, { message: 'Invalid request body.' }, { status: 400 });
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return jsonWithCors(request, { message: 'At least one order item is required.' }, { status: 400 });
    }
    if (!body.customer?.name?.trim() || !body.customer?.phone?.trim() || !body.customer?.email?.trim()) {
      return jsonWithCors(request, { message: 'Customer name, phone number, and email address are required.' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.customer.email.trim())) {
      return jsonWithCors(request, { message: 'A valid email address is required.' }, { status: 400 });
    }
    if (!['COD', 'RAZORPAY'].includes(body.paymentMode)) {
      return jsonWithCors(request, { message: 'Invalid payment mode.' }, { status: 400 });
    }

    // Server-side price lookup and stock verification
    const priceMap = new Map<string, number>();
    try {
      await ensureProductsTable();
      const db = getDbPool();
      const numericIds = body.items
        .map((i) => Number(i.id))
        .filter((n) => Number.isFinite(n) && n > 0);

      if (numericIds.length > 0) {
        const placeholders = numericIds.map(() => '?').join(',');
        const [rows] = await db.query<RowDataPacket[]>(
          `SELECT id, name, price, inventory FROM products WHERE id IN (${placeholders})`,
          numericIds
        );
        for (const r of rows) {
          priceMap.set(String(r.id), Number(r.price));
          const inv = Number(r.inventory);
          if (inv <= 0) {
            return jsonWithCors(
              request,
              { message: `"${r.name}" is currently out of stock.` },
              { status: 400 }
            );
          }
          const itemInput = body.items.find((i) => String(i.id) === String(r.id));
          if (itemInput && Number(itemInput.qty) > inv) {
            return jsonWithCors(
              request,
              { message: `Only ${inv} piece(s) available for "${r.name}". You cannot order ${itemInput.qty}.` },
              { status: 400 }
            );
          }
        }
      }
    } catch {
      // ignore, fall back to catalog
    }

    const isLive = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith('rzp_live') || process.env.NODE_ENV === 'production';
    const catalog = getCatalogProducts(!isLive);
    for (const p of catalog) {
      if (!priceMap.has(p.id)) {
        priceMap.set(p.id, Number(p.price));
      }
    }

    // Verify all items and compute verified server total
    const verifiedItems: { id: string; name: string; unitPrice: number; qty: number; lineTotal: number; image: string | null }[] = [];
    let computedAmount = 0;

    for (const item of body.items) {
      const unitPrice = priceMap.get(item.id);
      if (unitPrice === undefined || unitPrice <= 0) {
        return jsonWithCors(
          request,
          { message: `Invalid price or unknown product: ${item.id}` },
          { status: 400 }
        );
      }
      const qty = Math.max(1, Math.floor(Number(item.qty) || 1));
      const lineTotal = Number((unitPrice * qty).toFixed(2));
      computedAmount += lineTotal;

      verifiedItems.push({
        id: String(item.id),
        name: item.name.trim(),
        unitPrice,
        qty,
        lineTotal,
        image: item.image ?? null,
      });
    }

    // Handle payment verification
    let orderStatus: OrderStatus = 'PLACED';
    let paymentIdToStore: string | null = null;

    if (body.paymentMode === 'RAZORPAY') {
      const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = body;

      if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
        return jsonWithCors(
          request,
          { message: 'Missing Razorpay payment verification details.' },
          { status: 400 }
        );
      }

      const secret = process.env.RAZORPAY_KEY_SECRET?.trim();
      if (!secret) {
        return jsonWithCors(
          request,
          { message: 'Payment gateway configuration error.' },
          { status: 500 }
        );
      }

      // Verify HMAC-SHA256 signature
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

      if (expectedSignature !== razorpaySignature) {
        return jsonWithCors(
          request,
          { message: 'Payment verification failed: invalid signature.' },
          { status: 400 }
        );
      }

      orderStatus = 'PAID';
      paymentIdToStore = razorpayPaymentId;
    }

    // Save order in MySQL
    await ensureOrdersTables();
    const db = getDbPool();
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();
      const orderId = generateOrderId();
      const [orderInsert] = await connection.query(
        `
          INSERT INTO orders (
            order_id, customer_name, customer_phone, customer_email,
            address_line1, address_line2, city, state_name, pincode, notes,
            payment_mode, payment_id, amount, status
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          orderId,
          body.customer.name.trim(),
          body.customer.phone.trim(),
          body.customer.email?.trim() || null,
          body.customer.addressLine1.trim(),
          body.customer.addressLine2?.trim() || null,
          body.customer.city.trim(),
          body.customer.stateName.trim(),
          body.customer.pincode.trim(),
          body.customer.notes?.trim() || null,
          body.paymentMode,
          paymentIdToStore,
          Number(computedAmount.toFixed(2)),
          orderStatus,
        ]
      );

      const insertedId = Number((orderInsert as { insertId: number }).insertId);
      for (const item of verifiedItems) {
        await connection.query(
          `
            INSERT INTO order_items (
              order_id, product_id, product_name, unit_price, quantity, line_total, image_url
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `,
          [
            insertedId,
            item.id,
            item.name,
            item.unitPrice,
            item.qty,
            item.lineTotal,
            item.image,
          ]
        );

        // Decrement available stock in products inventory
        const numericId = Number(item.id);
        if (Number.isFinite(numericId) && numericId > 0) {
          await connection.query(
            `UPDATE products SET inventory = GREATEST(0, inventory - ?) WHERE id = ?`,
            [item.qty, numericId]
          );
        }
      }

      await connection.commit();
      return jsonWithCors(request, {
        success: true,
        orderId,
        paymentMode: body.paymentMode,
        status: orderStatus,
        amount: Number(computedAmount.toFixed(2)),
        paymentId: paymentIdToStore,
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create order.';
    return jsonWithCors(request, { message }, { status: 500 });
  }
}
