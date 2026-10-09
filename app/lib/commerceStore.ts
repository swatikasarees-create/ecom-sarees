export interface ProductSnapshot {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends ProductSnapshot {
  qty: number;
}

export interface AddToCartResult {
  success: boolean;
  reason?: 'out_of_stock' | 'max_reached';
  currentQty: number;
  maxStock?: number;
}

const CART_COOKIE = 'swatika_cart';
const COOKIE_DAYS = 30;
const STORE_EVENT = 'swatika-commerce-updated';

const parseCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const entry = document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${name}=`));
  if (!entry) return null;
  try {
    return JSON.parse(decodeURIComponent(entry.split('=').slice(1).join('=')));
  } catch {
    return null;
  }
};

const writeCookie = (name: string, value: unknown, days = COOKIE_DAYS) => {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    JSON.stringify(value)
  )}; expires=${expires}; path=/; SameSite=Lax`;
};

const emitUpdate = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
};

export const getStoreEventName = () => STORE_EVENT;
export const getCartEventName = () => STORE_EVENT;

export const getCart = (): CartItem[] => {
  const data = parseCookie(CART_COOKIE);
  if (!Array.isArray(data)) return [];
  return data.filter(
    (item) =>
      item &&
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      typeof item.price === 'number' &&
      typeof item.image === 'string' &&
      typeof item.qty === 'number'
  );
};

export const getCartItemQty = (id: string): number => {
  const cart = getCart();
  const found = cart.find((item) => String(item.id) === String(id));
  return found ? found.qty : 0;
};

export const addToCart = (
  product: ProductSnapshot,
  maxInventory?: number
): AddToCartResult => {
  const cart = getCart();
  const existing = cart.find((item) => String(item.id) === String(product.id));
  const max = typeof maxInventory === 'number' ? maxInventory : undefined;

  if (max !== undefined && max <= 0) {
    return { success: false, reason: 'out_of_stock', currentQty: existing?.qty ?? 0, maxStock: 0 };
  }

  if (existing) {
    if (max !== undefined && existing.qty >= max) {
      return { success: false, reason: 'max_reached', currentQty: existing.qty, maxStock: max };
    }
    existing.qty += 1;
    writeCookie(CART_COOKIE, cart);
    emitUpdate();
    return { success: true, currentQty: existing.qty, maxStock: max };
  } else {
    cart.push({ ...product, id: String(product.id), qty: 1 });
    writeCookie(CART_COOKIE, cart);
    emitUpdate();
    return { success: true, currentQty: 1, maxStock: max };
  }
};

export const updateCartQty = (
  id: string,
  qty: number,
  maxInventory?: number
): { success: boolean; clampedQty: number; maxStock?: number } => {
  const max = typeof maxInventory === 'number' ? maxInventory : undefined;
  let targetQty = Math.max(1, qty);
  let reachedMax = false;

  if (max !== undefined) {
    if (max <= 0) {
      removeFromCart(id);
      return { success: false, clampedQty: 0, maxStock: 0 };
    }
    if (targetQty > max) {
      targetQty = max;
      reachedMax = true;
    }
  }

  const cart = getCart()
    .map((item) => (String(item.id) === String(id) ? { ...item, qty: targetQty } : item))
    .filter((item) => item.qty > 0);
  writeCookie(CART_COOKIE, cart);
  emitUpdate();
  return { success: !reachedMax, clampedQty: targetQty, maxStock: max };
};

export const removeFromCart = (id: string) => {
  const cart = getCart().filter((item) => String(item.id) !== String(id));
  writeCookie(CART_COOKIE, cart);
  emitUpdate();
};

export const clearCart = () => {
  writeCookie(CART_COOKIE, []);
  emitUpdate();
};
