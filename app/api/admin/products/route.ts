import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/app/lib/adminAuth';
import { ensureProductsTable, getDbPool } from '@/app/lib/db';
import { corsAllowOrigin, jsonWithCors } from '@/app/lib/cors';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const dynamic = 'force-dynamic';

interface ProductRow extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  category: string;
  inventory: number;
  price: number;
  image_url: string | null;
}

export async function OPTIONS(request: NextRequest) {
  const allow = corsAllowOrigin(request);
  if (!allow) return new NextResponse(null, { status: 204 });
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allow,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
    await ensureProductsTable();
    const db = getDbPool();
    const [rows] = await db.query<ProductRow[]>(
      `SELECT id, name, description, category, inventory, price, image_url
       FROM products
       ORDER BY updated_at DESC`
    );
    return jsonWithCors(request, { products: rows });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch products.';
    return jsonWithCors(request, { message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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
      `INSERT INTO products (name, description, category, inventory, price, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description, category, inventory, price, imageUrl]
    );

    return jsonWithCors(request, { success: true, id: result.insertId }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create product.';
    return jsonWithCors(request, { message }, { status: 500 });
  }
}
