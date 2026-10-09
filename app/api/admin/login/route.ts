import { NextRequest, NextResponse } from 'next/server';
import {
  createAdminToken,
  getAdminCredentials,
  setAdminAuthCookie,
} from '../../../lib/adminAuth';
import { corsAllowOrigin, jsonWithCors, withCors } from '../../../lib/cors';

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
  try {
    const body = await request.json().catch(() => null);
    const { username, password } = (body || {}) as { username?: string; password?: string };
    if (!username || !password) {
      return jsonWithCors(request, { message: 'Username and password are required.' }, { status: 400 });
    }

    const creds = getAdminCredentials();
    if (username.trim() !== creds.username || password !== creds.password) {
      return jsonWithCors(request, { message: 'Invalid credentials.' }, { status: 401 });
    }

    const token = createAdminToken(username.trim());
    const response = jsonWithCors(request, { authenticated: true, token });
    setAdminAuthCookie(response, token);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed.';
    return jsonWithCors(request, { message }, { status: 500 });
  }
}
