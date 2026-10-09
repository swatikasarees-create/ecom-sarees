import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/app/lib/adminAuth';
import { ensureProductsTable, getDbPool } from '@/app/lib/db';
import { corsAllowOrigin, jsonWithCors } from '@/app/lib/cors';
import { ResultSetHeader } from 'mysql2';

export const dynamic = 'force-dynamic';

export async function OPTIONS(request: NextRequest) {
  const allow = corsAllowOrigin(request);
  if (!allow) return new NextResponse(null, { status: 204 });
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allow,
      'Access-Control-Allow-Methods': 'PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Cookie, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    },
  });
}

export async function PUT(
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
  const productId = Number(id);
  if (!Number.isFinite(productId) || productId <= 0) {
    return jsonWithCors(request, { message: 'Invalid product ID.' }, { status: 400 });
  }

  try {
    const body = await request.json().catch(() => null);
    const name = body?.name?.toString()?.trim();
    const description = body?.description?.toString()?.trim() ?? '';
    const category = body?.category?.toString()?.trim();
    const inventory = Number(body?.inventory ?? 0);
    const price = Number(body?.price ?? 0);
    const imageUrl = body?.image_url?.toString()?.trim() ?? null;

    if (!name || !category || !Number.isFinite(inventory) || !Number.isFinite(price)) {
      return jsonWithCors(
        request,
        { message: 'Name, category, inventory and price are required.' },
        { status: 400 }
      );
    }

    await ensureProductsTable();
    const db = getDbPool();
    const [result] = await db.execute<ResultSetHeader>(
      `UPDATE products 
       SET name = ?, description = ?, category = ?, inventory = ?, price = ?, image_url = ?
       WHERE id = ?`,
      [name, description, category, inventory, price, imageUrl, productId]
    );

    if (result.affectedRows === 0) {
      return jsonWithCors(request, { message: 'Product not found.' }, { status: 404 });
    }

    return jsonWithCors(request, { success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update product.';
    return jsonWithCors(request, { message }, { status: 500 });
  }
}

export async function DELETE(
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
  const productId = Number(id);
  if (!Number.isFinite(productId) || productId <= 0) {
    return jsonWithCors(request, { message: 'Invalid product ID.' }, { status: 400 });
  }

  try {
    await ensureProductsTable();
    const db = getDbPool();
    const [result] = await db.execute<ResultSetHeader>(
      `DELETE FROM products WHERE id = ?`,
      [productId]
    );

    if (result.affectedRows === 0) {
      return jsonWithCors(request, { message: 'Product not found.' }, { status: 404 });
    }

    return jsonWithCors(request, { success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete product.';
    return jsonWithCors(request, { message }, { status: 500 });
  }
}
