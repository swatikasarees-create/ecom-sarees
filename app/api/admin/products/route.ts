import { isAuthenticatedRequest } from '@/app/lib/adminAuth';
import { ensureProductsTable, getDbPool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface ProductRow extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  category: string;
  inventory: number;
  price: number;
  image_url: string | null;
}

export async function GET(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await ensureProductsTable();
  const db = getDbPool();
  const [rows] = await db.query<ProductRow[]>(
    `SELECT id, name, description, category, inventory, price, image_url
     FROM products
     ORDER BY updated_at DESC`
  );
  return NextResponse.json({ products: rows });
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
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
    `INSERT INTO products (name, description, category, inventory, price, image_url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, category, inventory, price, imageUrl]
  );

  return NextResponse.json({ id: result.insertId }, { status: 201 });
}
