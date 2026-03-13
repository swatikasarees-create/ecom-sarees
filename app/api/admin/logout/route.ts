import { clearAdminAuthCookie } from '@/app/lib/adminAuth';
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  clearAdminAuthCookie(response);
  return response;
}
