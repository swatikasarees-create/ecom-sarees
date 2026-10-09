import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/app/lib/adminAuth';
import { ensureOrdersTables, getDbPool } from '@/app/lib/db';
import { corsAllowOrigin, jsonWithCors } from '@/app/lib/cors';

export const dynamic = 'force-dynamic';

interface DbOrder {
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
}

interface DbOrderItem {
  id: number;
  order_id: number;
  product_id: string;
  product_name: string;
  unit_price: string | number;
  quantity: number;
  line_total: string | number;
  image_url: string | null;
}

export async function OPTIONS(request: NextRequest) {
  const allow = corsAllowOrigin(request);
  if (!allow) return new NextResponse(null, { status: 204 });
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allow,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Cookie, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    },
  });
}

export async function GET(request: NextRequest) {
  if (process.env.STATIC_EXPORT === 'true') {
    return jsonWithCors(
      request,
      { message: 'Admin API is disabled in static export mode.' },
      { status: 503 }
    );
  }

  if (!isAuthenticatedRequest(request)) {
    return jsonWithCors(request, { message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await ensureOrdersTables();
    const db = getDbPool();
    const [ordersRows] = await db.query(
      `SELECT * FROM orders ORDER BY created_at DESC LIMIT 500`
    );
    const orders = ordersRows as DbOrder[];
    if (orders.length === 0) {
      return jsonWithCors(request, { orders: [] });
    }

    const orderIds = orders.map((order) => order.id);
    const placeholders = orderIds.map(() => '?').join(',');
    const [itemsRows] = await db.query(
      `SELECT * FROM order_items WHERE order_id IN (${placeholders}) ORDER BY id ASC`,
      orderIds
    );
    const items = itemsRows as DbOrderItem[];

    const groupedItems = new Map<string, DbOrderItem[]>();
    for (const item of items) {
      const orderKey = String(item.order_id);
      const bucket = groupedItems.get(orderKey) ?? [];
      bucket.push(item);
      groupedItems.set(orderKey, bucket);
    }

    return jsonWithCors(request, {
      orders: orders.map((order) => ({
        id: order.id,
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
        items: (groupedItems.get(String(order.id)) ?? []).map((item) => ({
          id: item.id,
          productId: item.product_id,
          productName: item.product_name,
          unitPrice: Number(item.unit_price),
          quantity: item.quantity,
          lineTotal: Number(item.line_total),
          imageUrl: item.image_url,
        })),
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch orders.';
    return jsonWithCors(request, { message }, { status: 500 });
  }
}
