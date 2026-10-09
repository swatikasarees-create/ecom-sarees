import { ProductSnapshot } from './commerceStore';

const WISHLIST_COOKIE = 'swatika_wishlist';
const COOKIE_DAYS = 60;
const WISHLIST_EVENT = 'swatika-wishlist-updated';

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
  window.dispatchEvent(new CustomEvent(WISHLIST_EVENT));
};

export const getWishlistEventName = () => WISHLIST_EVENT;

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

export const isInWishlist = (id: string): boolean => {
  const list = getWishlist();
  return list.some((item) => item.id === id);
};

export const addToWishlist = (product: ProductSnapshot) => {
  const list = getWishlist();
  if (!list.some((item) => item.id === product.id)) {
    list.push({ ...product });
    writeCookie(WISHLIST_COOKIE, list);
    emitUpdate();
  }
};

export const removeFromWishlist = (id: string) => {
  const list = getWishlist().filter((item) => item.id !== id);
  writeCookie(WISHLIST_COOKIE, list);
  emitUpdate();
};

export const toggleWishlist = (product: ProductSnapshot): boolean => {
  const list = getWishlist();
  const exists = list.some((item) => item.id === product.id);
  if (exists) {
    removeFromWishlist(product.id);
    return false;
  } else {
    addToWishlist(product);
    return true;
  }
};

export const clearWishlist = () => {
  writeCookie(WISHLIST_COOKIE, []);
  emitUpdate();
};
