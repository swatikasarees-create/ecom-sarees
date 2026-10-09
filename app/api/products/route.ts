import { NextRequest, NextResponse } from 'next/server';
import { ensureProductsTable, getDbPool } from '@/app/lib/db';
import { corsAllowOrigin, jsonWithCors } from '@/app/lib/cors';
import { getCatalogProducts, Product } from '@/app/lib/productData';
import { resolveProductImageUrl } from '@/app/lib/productImage';
import { RowDataPacket } from 'mysql2';

export const dynamic = 'force-dynamic';

interface DbProductRow extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  category: string;
  fabric: string | null;
  color: string | null;
  collection: string | null;
  inventory: number;
  price: string | number;
  original_price: string | number | null;
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
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    },
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const includeTest = searchParams.has('test');
  const queryTerm = searchParams.get('q')?.trim().toLowerCase();
  const categoryFilter = searchParams.get('category')?.trim();

  // If in static export, immediately serve fallback catalog
  if (process.env.STATIC_EXPORT === 'true') {
    let list = getCatalogProducts(includeTest);
    if (categoryFilter) {
      list = list.filter((p) => p.category.toLowerCase() === categoryFilter.toLowerCase());
    }
    if (queryTerm) {
      list = list.filter((p) => p.name.toLowerCase().includes(queryTerm));
    }
    return jsonWithCors(request, { products: list, source: 'fallback' });
  }

  try {
    await ensureProductsTable();
    const db = getDbPool();
    const [rows] = await db.query<DbProductRow[]>(
      `SELECT id, name, description, category, fabric, color, collection,
              inventory, price, original_price, image_url
       FROM products
       ORDER BY id ASC`
    );

    if (rows && rows.length > 0) {
      const dbProducts: Product[] = rows.map((row) => ({
        id: String(row.id),
        name: row.name,
        description: row.description || '',
        category: row.category,
        fabric: row.fabric || '',
        color: row.color || '',
        collection: row.collection || undefined,
        availability: Number(row.inventory) > 0 ? 'in_stock' : 'out_of_stock',
        inventory: Number(row.inventory),
        price: Number(row.price),
        originalPrice: row.original_price ? Number(row.original_price) : undefined,
        image: resolveProductImageUrl(row.image_url),
      }));

      let filtered = includeTest ? [...dbProducts, ...getCatalogProducts(true).filter((p) => p.id === '__test_1inr')] : dbProducts;

      if (categoryFilter) {
        filtered = filtered.filter((p) => p.category.toLowerCase() === categoryFilter.toLowerCase());
      }
      if (queryTerm) {
        filtered = filtered.filter((p) => p.name.toLowerCase().includes(queryTerm));
      }

      return jsonWithCors(request, { products: filtered, source: 'database' });
    }
  } catch (error) {
    console.warn('Database error when fetching products, falling back to static catalog:', error);
  }

  // Graceful fallback to static product catalog
  let fallback = getCatalogProducts(includeTest);
  if (categoryFilter) {
    fallback = fallback.filter((p) => p.category.toLowerCase() === categoryFilter.toLowerCase());
  }
  if (queryTerm) {
    fallback = fallback.filter((p) => p.name.toLowerCase().includes(queryTerm));
  }
  return jsonWithCors(request, { products: fallback, source: 'fallback' });
}
