import { NextRequest, NextResponse } from 'next/server';
import { ensureOrdersTables, getDbPool } from '../../../lib/db';

export const dynamic = 'force-dynamic';

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
    return NextResponse.json(
      { message: 'Order tracking is disabled in static export mode.' },
      { status: 503 }
    );
  }

  const orderIdParam = request.nextUrl.searchParams.get('orderId')?.trim() ?? '';
  const emailParam = request.nextUrl.searchParams.get('email')?.trim().toLowerCase() ?? '';

  if (!orderIdParam && !emailParam) {
    return NextResponse.json(
      { message: 'Enter your order ID or the email used at checkout.' },
      { status: 400 }
    );
  }

  try {
    await ensureOrdersTables();
    const db = getDbPool();

    if (orderIdParam && emailParam) {
      const [rows] = await db.query(
        `SELECT * FROM orders WHERE order_id = ? AND LOWER(TRIM(COALESCE(customer_email, ''))) = ? LIMIT 1`,
        [orderIdParam, emailParam]
      );
      const order = (rows as DbOrder[])[0];
      if (!order) {
        return NextResponse.json(
          { message: 'No order matches this order ID and email. Check the details and try again.' },
          { status: 404 }
        );
      }
      const [itemRows] = await db.query(
        `SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC`,
        [order.id]
      );
      return NextResponse.json({ kind: 'single', order: mapOrder(order, itemRows as DbOrderItem[]) });
    }

    if (orderIdParam) {
      const [rows] = await db.query(`SELECT * FROM orders WHERE order_id = ? LIMIT 1`, [orderIdParam]);
      const order = (rows as DbOrder[])[0];
      if (!order) {
        return NextResponse.json({ message: 'We could not find an order with that ID.' }, { status: 404 });
      }
      const [itemRows] = await db.query(
        `SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC`,
        [order.id]
      );
      return NextResponse.json({ kind: 'single', order: mapOrder(order, itemRows as DbOrderItem[]) });
    }

    const [listRows] = await db.query(
      `
      SELECT o.id, o.order_id, o.customer_name, o.amount, o.status, o.created_at,
        (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) AS item_count
      FROM orders o
      WHERE LOWER(TRIM(COALESCE(o.customer_email, ''))) = ?
      ORDER BY o.created_at DESC
      LIMIT 25
      `,
      [emailParam]
    );
    const list = listRows as {
      id: number;
      order_id: string;
      customer_name: string;
      amount: string | number;
      status: string;
      created_at: string;
      item_count: number;
    }[];
    if (list.length === 0) {
      return NextResponse.json({
        kind: 'list',
        orders: [],
        message: 'No orders found for this email.',
      });
    }
    return NextResponse.json({
      kind: 'list',
      orders: list.map((row) => ({
        orderId: row.order_id,
        customerName: row.customer_name,
        amount: Number(row.amount),
        status: row.status,
        createdAt: row.created_at,
        itemCount: Number(row.item_count),
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to look up order.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
