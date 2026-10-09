import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/app/lib/adminAuth';
import { ensureProductsTable, getDbPool } from '@/app/lib/db';
import { corsAllowOrigin, jsonWithCors } from '@/app/lib/cors';
import { products } from '@/app/lib/productData';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const dynamic = 'force-dynamic';

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

    // Check existing products in DB
    const [existingRows] = await db.query<RowDataPacket[]>(
      `SELECT name FROM products`
    );
    const existingNames = new Set(existingRows.map((r) => r.name.toLowerCase().trim()));

    let seededCount = 0;
    for (const p of products) {
      if (!p.name || existingNames.has(p.name.toLowerCase().trim())) {
        continue;
      }

      await db.execute<ResultSetHeader>(
        `INSERT INTO products (
          name, description, category, fabric, color, collection,
          inventory, price, original_price, image_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.name.trim(),
          p.description?.trim() ?? '',
          p.category?.trim() ?? 'Sarees',
          p.fabric?.trim() ?? null,
          p.color?.trim() ?? null,
          p.collection?.trim() ?? null,
          20, // default inventory
          Number(p.price) || 0,
          p.originalPrice ? Number(p.originalPrice) : null,
          p.image?.trim() ?? null,
        ]
      );
      existingNames.add(p.name.toLowerCase().trim());
      seededCount++;
    }

    const [totalRows] = await db.query<RowDataPacket[]>(
      `SELECT COUNT(*) as count FROM products`
    );

    return jsonWithCors(request, {
      success: true,
      seededCount,
      totalInDatabase: totalRows[0].count,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to seed products.';
    return jsonWithCors(request, { message }, { status: 500 });
  }
}
