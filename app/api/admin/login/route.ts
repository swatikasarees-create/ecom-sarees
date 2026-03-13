import { NextResponse } from 'next/server';
import {
  createAdminToken,
  getAdminCredentials,
  setAdminAuthCookie,
} from '@/app/lib/adminAuth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = body?.username?.toString()?.trim();
  const password = body?.password?.toString();

  if (!username || !password) {
    return NextResponse.json(
      { message: 'Username and password are required.' },
      { status: 400 }
    );
  }

  const creds = getAdminCredentials();
  if (username !== creds.username || password !== creds.password) {
    return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
  }

  const token = createAdminToken(username);
  const response = NextResponse.json({ ok: true });
  setAdminAuthCookie(response, token);
  return response;
}
