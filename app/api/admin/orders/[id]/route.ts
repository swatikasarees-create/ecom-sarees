import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/app/lib/adminAuth';
import { ensureOrdersTables, getDbPool } from '@/app/lib/db';
import { corsAllowOrigin, jsonWithCors } from '@/app/lib/cors';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const dynamic = 'force-dynamic';

const VALID_STATUSES = new Set([
  'PLACED',
  'PAID',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
]);

export async function OPTIONS(request: NextRequest) {
  const allow = corsAllowOrigin(request);
  if (!allow) return new NextResponse(null, { status: 204 });
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allow,
      'Access-Control-Allow-Methods': 'PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Cookie, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    },
  });
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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

  const { id } = await context.params;
  const orderId = Number(id);
  if (!Number.isFinite(orderId) || orderId <= 0) {
    return jsonWithCors(request, { message: 'Invalid order ID.' }, { status: 400 });
  }

  try {
    const body = await request.json().catch(() => null);
    const status = body?.status?.toString()?.trim()?.toUpperCase();

    if (!status || !VALID_STATUSES.has(status)) {
      return jsonWithCors(
        request,
        { message: `Invalid status. Must be one of: ${Array.from(VALID_STATUSES).join(', ')}` },
        { status: 400 }
      );
    }

    await ensureOrdersTables();
    const db = getDbPool();

    const [existingRows] = await db.query<RowDataPacket[]>(
      `SELECT status FROM orders WHERE id = ? LIMIT 1`,
      [orderId]
    );

    if (existingRows.length === 0) {
      return jsonWithCors(request, { message: 'Order not found.' }, { status: 404 });
    }

    const previousStatus = existingRows[0].status;

    // Restore inventory if order is cancelled
    if (previousStatus !== 'CANCELLED' && status === 'CANCELLED') {
      const [items] = await db.query<RowDataPacket[]>(
        `SELECT product_id, quantity FROM order_items WHERE order_id = ?`,
        [orderId]
      );
      for (const item of items) {
        const numId = Number(item.product_id);
        if (Number.isFinite(numId) && numId > 0) {
          await db.query(
            `UPDATE products SET inventory = inventory + ? WHERE id = ?`,
            [Number(item.quantity), numId]
          );
        }
      }
    } else if (previousStatus === 'CANCELLED' && status !== 'CANCELLED') {
      // Re-deduct if order is moved back from cancelled
      const [items] = await db.query<RowDataPacket[]>(
        `SELECT product_id, quantity FROM order_items WHERE order_id = ?`,
        [orderId]
      );
      for (const item of items) {
        const numId = Number(item.product_id);
        if (Number.isFinite(numId) && numId > 0) {
          await db.query(
            `UPDATE products SET inventory = GREATEST(0, inventory - ?) WHERE id = ?`,
            [Number(item.quantity), numId]
          );
        }
      }
    }

    await db.execute<ResultSetHeader>(
      `UPDATE orders SET status = ? WHERE id = ?`,
      [status, orderId]
    );

    return jsonWithCors(request, { success: true, id: orderId, status });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update order status.';
    return jsonWithCors(request, { message }, { status: 500 });
  }
}
