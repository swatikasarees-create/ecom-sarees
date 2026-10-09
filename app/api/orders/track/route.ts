import { NextRequest, NextResponse } from 'next/server';
import { corsAllowOrigin, jsonWithCors } from '../../../lib/cors';
import { ensureOrdersTables, getDbPool } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function OPTIONS(request: NextRequest) {
  const allow = corsAllowOrigin(request);
  if (!allow) {
    return new NextResponse(null, { status: 204 });
  }
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allow,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    },
  });
}

type DbOrder = {
  id: number;
  order_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state_name: string;
  pincode: string;
  notes: string | null;
  payment_mode: 'COD' | 'RAZORPAY';
  payment_id: string | null;
  amount: string | number;
  status: string;
  created_at: string;
  updated_at: string;
};

type DbOrderItem = {
  id: number;
  order_id: number;
  product_id: string;
  product_name: string;
  unit_price: string | number;
  quantity: number;
  line_total: string | number;
  image_url: string | null;
};

function mapOrder(order: DbOrder, items: DbOrderItem[]) {
  return {
    orderId: order.order_id,
    customerName: order.customer_name,
    customerPhone: order.customer_phone,
    customerEmail: order.customer_email,
    addressLine1: order.address_line1,
    addressLine2: order.address_line2,
    city: order.city,
    stateName: order.state_name,
    pincode: order.pincode,
    notes: order.notes,
    paymentMode: order.payment_mode,
    paymentId: order.payment_id,
    amount: Number(order.amount),
    status: order.status,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    items: items.map((item) => ({
      productId: item.product_id,
      productName: item.product_name,
      unitPrice: Number(item.unit_price),
      quantity: item.quantity,
      lineTotal: Number(item.line_total),
      imageUrl: item.image_url,
    })),
  };
}

export async function GET(request: NextRequest) {
  if (process.env.STATIC_EXPORT === 'true') {
    return jsonWithCors(
      request,
      { message: 'Order tracking is disabled in static export mode.' },
      { status: 503 }
    );
  }

  const orderIdParam = request.nextUrl.searchParams.get('orderId')?.trim() ?? '';
  const phoneParam = request.nextUrl.searchParams.get('phone')?.trim() ?? '';
  const emailParam = request.nextUrl.searchParams.get('email')?.trim().toLowerCase() ?? '';

  if (!orderIdParam) {
    return jsonWithCors(
      request,
      { message: 'Please enter your Order ID.' },
      { status: 400 }
    );
  }

  const cleanPhone = phoneParam.replace(/\D/g, '').slice(-10);
  if (!cleanPhone && !emailParam) {
    return jsonWithCors(
      request,
      { message: 'Please provide either your contact number or email ID to verify this order.' },
      { status: 400 }
    );
  }

  try {
    await ensureOrdersTables();
    const db = getDbPool();

    const [rows] = await db.query(
      `SELECT * FROM orders WHERE order_id = ? LIMIT 1`,
      [orderIdParam]
    );

    const order = (rows as DbOrder[])[0];
    if (!order) {
      return jsonWithCors(
        request,
        { message: 'No order found with this Order ID.' },
        { status: 404 }
      );
    }

    // Security Verification: Match contact number OR email ID
    const dbCleanPhone = (order.customer_phone || '').replace(/\D/g, '').slice(-10);
    const dbEmail = (order.customer_email || '').trim().toLowerCase();

    let verified = false;
    if (cleanPhone && cleanPhone.length === 10 && dbCleanPhone === cleanPhone) {
      verified = true;
    } else if (emailParam && dbEmail && dbEmail === emailParam) {
      verified = true;
    }

    if (!verified) {
      const fieldDesc = cleanPhone && emailParam
        ? 'mobile number and email ID'
        : emailParam
        ? 'email address'
        : 'mobile number';
      return jsonWithCors(
        request,
        { message: `The ${fieldDesc} entered does not match our records for this order. Please try again.` },
        { status: 403 }
      );
    }

    const [itemRows] = await db.query(
      `SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC`,
      [order.id]
    );

    return jsonWithCors(request, {
      kind: 'single',
      order: mapOrder(order, itemRows as DbOrderItem[]),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to look up order.';
    return jsonWithCors(request, { message }, { status: 500 });
  }
}
