import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function POST() {
  return NextResponse.json(
    { message: 'Admin API is disabled in static export mode.' },
    { status: 503 }
  );
}
