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
      `SELECT id, name FROM products`
    );
    const existingIds = new Set(existingRows.map((r) => String(r.id)));

    let seededCount = 0;
    for (const p of products) {
      if (!p.id || existingIds.has(String(p.id))) {
        continue;
      }

      await db.execute<ResultSetHeader>(
        `INSERT INTO products (
          id, name, description, category, fabric, color, collection,
          inventory, price, original_price, image_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          description = VALUES(description),
          category = VALUES(category),
          fabric = VALUES(fabric),
          color = VALUES(color),
          collection = VALUES(collection),
          price = VALUES(price),
          original_price = VALUES(original_price),
          image_url = VALUES(image_url)`,
        [
          Number(p.id),
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
      existingIds.add(String(p.id));
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
