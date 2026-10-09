import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Origins allowed to call the Vercel API from the browser (CORS).
 * Set on Vercel: ALLOWED_ORIGINS, NEXT_PUBLIC_SITE_URL (see middleware + API routes).
 */
export function parseAllowedOrigins(): string[] {
  const extra = process.env.ALLOWED_ORIGINS?.split(',') ?? [];
  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const out = new Set<string>();

  for (const s of extra.map((x) => x.trim()).filter(Boolean)) {
    out.add(s.replace(/\/$/, ''));
  }
  if (site) out.add(site.replace(/\/$/, ''));
  if (process.env.VERCEL_URL) {
    out.add(`https://${process.env.VERCEL_URL}`);
  }

  // Ensure primary custom domains and local dev are always permitted
  out.add('https://swatikasarees.com');
  out.add('https://www.swatikasarees.com');
  out.add('http://localhost:3000');
  out.add('http://127.0.0.1:3000');

  

  const list = [...out];
  const expanded = new Set(list);
  for (const o of list) {
    try {
      const u = new URL(o);
      if (u.hostname.startsWith('www.')) {
        expanded.add(`${u.protocol}//${u.hostname.slice(4)}`);
      } else if (u.hostname) {
        expanded.add(`${u.protocol}//www.${u.hostname}`);
      }
    } catch {
      /* ignore */
    }
  }
  return [...expanded];
}

export function corsAllowOrigin(request: NextRequest): string | null {
  const origin = request.headers.get('origin');
  if (!origin) return null;
  const allowed = parseAllowedOrigins();
  return allowed.includes(origin) ? origin : null;
}

export function withCors(request: NextRequest, response: NextResponse): NextResponse {
  const allow = corsAllowOrigin(request);
  if (allow) {
    response.headers.set('Access-Control-Allow-Origin', allow);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Vary', 'Origin');
  }
  return response;
}

export function jsonWithCors(request: NextRequest, data: unknown, init?: ResponseInit): NextResponse {
  return withCors(request, NextResponse.json(data, init));
}
