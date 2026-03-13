import { isAuthenticatedRequest } from '@/app/lib/adminAuth';
import { ensureProductsTable, getDbPool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader } from 'mysql2';

const getNumericId = (id: string) => {
  const value = Number(id);
  return Number.isInteger(value) && value > 0 ? value : null;
};

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const productId = getNumericId(id);
  if (!productId) {
    return NextResponse.json({ message: 'Invalid product id.' }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const name = body?.name?.toString()?.trim();
  const description = body?.description?.toString()?.trim() ?? '';
  const category = body?.category?.toString()?.trim();
  const inventory = Number(body?.inventory ?? 0);
  const price = Number(body?.price ?? 0);
  const imageUrl = body?.image_url?.toString()?.trim() ?? null;

  if (!name || !category || !Number.isFinite(inventory) || !Number.isFinite(price)) {
    return NextResponse.json(
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
    return NextResponse.json({ message: 'Product not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const productId = getNumericId(id);
  if (!productId) {
    return NextResponse.json({ message: 'Invalid product id.' }, { status: 400 });
  }

  await ensureProductsTable();
  const db = getDbPool();
  const [result] = await db.execute<ResultSetHeader>(
    `DELETE FROM products WHERE id = ?`,
    [productId]
  );

  if (result.affectedRows === 0) {
    return NextResponse.json({ message: 'Product not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
