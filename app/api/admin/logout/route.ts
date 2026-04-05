import { NextResponse } from 'next/server';
import { clearAdminAuthCookie } from '../../../lib/adminAuth';

export const dynamic = 'force-static';

export async function POST() {
  if (process.env.STATIC_EXPORT === 'true') {
    return NextResponse.json(
      { message: 'Admin API is disabled in static export mode.' },
      { status: 503 }
    );
  }
  const response = NextResponse.json({ success: true });
  clearAdminAuthCookie(response);
  return response;
}
