import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const ADMIN_COOKIE = 'swatika_admin_session';

const required = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const getSecret = () => required('ADMIN_SESSION_SECRET');

const sign = (payload: string) =>
  crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');

export const createAdminToken = (username: string) => {
  const payload = Buffer.from(
    JSON.stringify({
      username,
      exp: Date.now() + 1000 * 60 * 60 * 12, // 12 hours
    })
  ).toString('base64url');
  const signature = sign(payload);
  return `${payload}.${signature}`;
};

export const verifyAdminToken = (token: string | undefined | null) => {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = sign(payload);
  if (expected !== signature) return false;
  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (typeof decoded?.exp !== 'number') return false;
    return decoded.exp > Date.now();
  } catch {
    return false;
  }
};

export const isAuthenticatedRequest = (request: NextRequest) =>
  verifyAdminToken(request.cookies.get(ADMIN_COOKIE)?.value);

export const isAuthenticatedServer = async () => {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value);
};

export const getAdminCredentials = () => ({
  username: required('ADMIN_USERNAME'),
  password: required('ADMIN_PASSWORD'),
});

export const setAdminAuthCookie = (response: NextResponse, token: string) => {
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
};

export const clearAdminAuthCookie = (response: NextResponse) => {
  response.cookies.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
};
