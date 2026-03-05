export interface ProductSnapshot {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends ProductSnapshot {
  qty: number;
}

const CART_COOKIE = 'swatika_cart';
const WISHLIST_COOKIE = 'swatika_wishlist';
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

export const getWishlist = (): ProductSnapshot[] => {
  const data = parseCookie(WISHLIST_COOKIE);
  if (!Array.isArray(data)) return [];
  return data.filter(
    (item) =>
      item &&
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      typeof item.price === 'number' &&
      typeof item.image === 'string'
  );
};

export const addToCart = (product: ProductSnapshot) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  writeCookie(CART_COOKIE, cart);
  emitUpdate();
};

export const updateCartQty = (id: string, qty: number) => {
  const cart = getCart()
    .map((item) => (item.id === id ? { ...item, qty: Math.max(1, qty) } : item))
    .filter((item) => item.qty > 0);
  writeCookie(CART_COOKIE, cart);
  emitUpdate();
};

export const removeFromCart = (id: string) => {
  const cart = getCart().filter((item) => item.id !== id);
  writeCookie(CART_COOKIE, cart);
  emitUpdate();
};

export const clearCart = () => {
  writeCookie(CART_COOKIE, []);
  emitUpdate();
};

export const addToWishlist = (product: ProductSnapshot) => {
  const wishlist = getWishlist();
  if (!wishlist.some((item) => item.id === product.id)) {
    wishlist.push(product);
    writeCookie(WISHLIST_COOKIE, wishlist);
    emitUpdate();
  }
};

export const removeFromWishlist = (id: string) => {
  const wishlist = getWishlist().filter((item) => item.id !== id);
  writeCookie(WISHLIST_COOKIE, wishlist);
  emitUpdate();
};
