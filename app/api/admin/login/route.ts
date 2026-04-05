import { NextRequest, NextResponse } from 'next/server';
import {
  createAdminToken,
  getAdminCredentials,
  setAdminAuthCookie,
} from '../../../lib/adminAuth';

export const dynamic = 'force-static';

export async function POST(request: NextRequest) {
  if (process.env.STATIC_EXPORT === 'true') {
    return NextResponse.json(
      { message: 'Admin API is disabled in static export mode.' },
      { status: 503 }
    );
  }
  try {
    const body = await request.json();
    const { username, password } = body as { username?: string; password?: string };
    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required.' }, { status: 400 });
    }

    const creds = getAdminCredentials();
    if (username !== creds.username || password !== creds.password) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const response = NextResponse.json({ authenticated: true });
    setAdminAuthCookie(response, createAdminToken(username));
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
