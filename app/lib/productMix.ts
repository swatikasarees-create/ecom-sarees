import type { Product } from './productData';

export type StockMap = Record<string, { inventory: number; availability: string }>;

/**
 * Checks whether a product has stock available (> 0) and is not marked out of stock.
 */
export function isProductInStock(p: Product, stockMap?: StockMap): boolean {
  if (stockMap && stockMap[String(p.id)]) {
    const s = stockMap[String(p.id)];
    if (s.availability === 'out_of_stock') return false;
    if (typeof s.inventory === 'number' && s.inventory <= 0) return false;
    return true;
  }
  if (p.availability === 'out_of_stock') return false;
  if (typeof p.inventory === 'number' && p.inventory <= 0) return false;
  return true;
}

/**
 * Sorts products with newest additions first.
 * Checks createdAt timestamp if available, then numeric ID descending.
 */
export function sortNewAdditionsFirst(items: Product[]): Product[] {
  return [...items].sort((a, b) => {
    if (a.id === '__test_1inr') return 1;
    if (b.id === '__test_1inr') return -1;

    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    if (timeA && timeB && timeA !== timeB) {
      return timeB - timeA;
    }

    const numA = Number(a.id);
    const numB = Number(b.id);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numB - numA;
    }

    return String(b.id).localeCompare(String(a.id));
  });
}

/**
 * Sorts products with oldest additions first.
 */
export function sortOldAdditionsFirst(items: Product[]): Product[] {
  return [...items].sort((a, b) => {
    if (a.id === '__test_1inr') return 1;
    if (b.id === '__test_1inr') return -1;

    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    if (timeA && timeB && timeA !== timeB) {
      return timeA - timeB;
    }

    const numA = Number(a.id);
    const numB = Number(b.id);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }

    return String(a.id).localeCompare(String(b.id));
  });
}

export interface ProductMixOptions {
  count?: number;
  newCount?: number;
  oldCount?: number;
  filter?: (p: Product) => boolean;
  preferredOldIds?: string[];
  stockMap?: StockMap;
  excludeOutOfStock?: boolean;
}

/**
 * Creates a dynamic mix of mainly newly added products with a few classic old ones,
 * excluding any products with 0 stock (by default).
 */
export function createProductMix(allProducts: Product[], options: ProductMixOptions = {}): Product[] {
  const shouldExcludeOutOfStock = options.excludeOutOfStock !== false;
  
  let eligible = options.filter ? allProducts.filter(options.filter) : allProducts;
  if (shouldExcludeOutOfStock) {
    eligible = eligible.filter((p) => isProductInStock(p, options.stockMap));
  }

  if (!eligible.length) return [];

  const count = options.count ?? 8;
  const newCount = options.newCount ?? Math.max(1, Math.round(count * 0.75));
  const oldCount = options.oldCount ?? Math.max(1, count - newCount);

  const sortedNewest = sortNewAdditionsFirst(eligible);
  const numericIds = sortedNewest
    .map((p) => Number(p.id))
    .filter((n) => !isNaN(n));
  const maxId = numericIds.length ? Math.max(...numericIds) : 0;
  const minId = numericIds.length ? Math.min(...numericIds) : 0;
  // Threshold: IDs > 41 are the newly added products in the catalog
  const threshold = maxId > 41 ? 41 : Math.round(minId + (maxId - minId) * 0.5);

  const newPool = sortedNewest.filter((p) => {
    const num = Number(p.id);
    return isNaN(num) ? true : num > threshold;
  });

  const oldPool = sortedNewest.filter((p) => {
    const num = Number(p.id);
    return !isNaN(num) && num <= threshold;
  });

  if (newPool.length === 0) return sortedNewest.slice(0, count);
  if (oldPool.length === 0) return sortedNewest.slice(0, count);

  const selectedNew = newPool.slice(0, newCount);
  const preferred = options.preferredOldIds ?? ['7', '5', '18', '31', '35', '6', '40'];
  const preferredItems = preferred
    .map((id) => oldPool.find((p) => String(p.id) === String(id)))
    .filter((p): p is Product => Boolean(p));

  const remainingOld = oldPool.filter((p) => !preferred.includes(String(p.id)));
  const selectedOld = [...preferredItems, ...remainingOld].slice(0, oldCount);

  // Interleave mainly new with a few old: e.g. [New, New, Old, New, New, Old, New...]
  const result: Product[] = [];
  let nIdx = 0;
  let oIdx = 0;

  while (result.length < count && (nIdx < selectedNew.length || oIdx < selectedOld.length)) {
    if (nIdx < selectedNew.length) result.push(selectedNew[nIdx++]);
    if (result.length < count && nIdx < selectedNew.length) result.push(selectedNew[nIdx++]);
    if (result.length < count && oIdx < selectedOld.length) result.push(selectedOld[oIdx++]);
  }

  return result;
}

/** Formatter helper for carousels */
export function formatCarouselItem(p: Product) {
  return {
    id: p.id,
    name: p.name,
    price: `₹${Number(p.price).toLocaleString('en-IN')}`,
    image: p.image,
  };
}
