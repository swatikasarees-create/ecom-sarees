import { NextRequest, NextResponse } from 'next/server';
import { getDbPool, ensureOrdersTables } from '../../lib/db';

export const dynamic = 'force-static';

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
  amount: number;
  paymentMode: PaymentMode;
  status: OrderStatus;
  paymentId?: string;
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

export async function POST(request: NextRequest) {
  if (process.env.STATIC_EXPORT === 'true') {
    return NextResponse.json(
      { message: 'Order API is disabled in static export mode.' },
      { status: 503 }
    );
  }
  try {
    const body = (await request.json()) as CreateOrderPayload;
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ message: 'At least one order item is required.' }, { status: 400 });
    }
    if (!body.customer?.name || !body.customer?.phone) {
      return NextResponse.json({ message: 'Customer details are required.' }, { status: 400 });
    }
    if (!Number.isFinite(body.amount) || body.amount <= 0) {
      return NextResponse.json({ message: 'Invalid order amount.' }, { status: 400 });
    }
    if (!['COD', 'RAZORPAY'].includes(body.paymentMode)) {
      return NextResponse.json({ message: 'Invalid payment mode.' }, { status: 400 });
    }
    if (!['PLACED', 'PAID'].includes(body.status)) {
      return NextResponse.json({ message: 'Invalid order status.' }, { status: 400 });
    }

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
          body.paymentId?.trim() || null,
          Number(body.amount.toFixed(2)),
          body.status,
        ]
      );

      const insertedId = Number((orderInsert as { insertId: number }).insertId);
      for (const item of body.items) {
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
            Number(item.price.toFixed(2)),
            item.qty,
            Number((item.price * item.qty).toFixed(2)),
            item.image ?? null,
          ]
        );
      }

      await connection.commit();
      return NextResponse.json({
        success: true,
        orderId,
        paymentMode: body.paymentMode,
        status: body.status,
        amount: Number(body.amount.toFixed(2)),
        paymentId: body.paymentId?.trim() || null,
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create order.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
