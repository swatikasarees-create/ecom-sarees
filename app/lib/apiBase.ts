/**
 * Prefer NEXT_PUBLIC_API_BASE_URL (bake at build for static Hostinger → Vercel).
 * If unset, on swatikasarees.com the client uses NEXT_PUBLIC_VERCEL_API_FALLBACK from next.config
 * so /api is not requested on Apache (avoids redirect loops).
 */
export function getApiBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    const host = window.location.hostname.toLowerCase();
    if (
      host === 'www.swatikasarees.com' ||
      host === 'swatikasarees.com' ||
      host.includes('hostingersite.com') ||
      host.includes('hostinger')
    ) {
      const fb = process.env.NEXT_PUBLIC_VERCEL_API_FALLBACK?.trim() || 'https://ecom-sarees.vercel.app';
      if (fb) return fb.replace(/\/$/, '');
    }
  }

  return '';
}

/** Absolute URL for client-side API calls. */
export function apiUrl(path: string): string {
  const base = getApiBaseUrl();
  const p = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${p}` : p;
}

/** Use on cross-origin API calls so session cookies (admin) are sent to the Vercel host. */
export function apiFetchCredentials(): RequestCredentials {
  return getApiBaseUrl() ? 'include' : 'same-origin';
}
