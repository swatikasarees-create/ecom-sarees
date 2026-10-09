import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { isAuthenticatedRequest } from '@/app/lib/adminAuth';
import { corsAllowOrigin, jsonWithCors } from '@/app/lib/cors';

export const dynamic = 'force-dynamic';

export async function OPTIONS(request: NextRequest) {
  const allow = corsAllowOrigin(request);
  if (!allow) return new NextResponse(null, { status: 204 });
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allow,
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Cookie, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    },
  });
}

/**
 * Returns signed upload parameters for direct client-to-Cloudinary upload.
 * The browser uploads directly to Cloudinary's API without routing binary bytes through our server.
 * Backend is used purely for session authentication & signature verification.
 */
export async function POST(request: NextRequest) {
  if (process.env.STATIC_EXPORT === 'true') {
    return jsonWithCors(
      request,
      { message: 'Admin API is disabled in static export mode.' },
      { status: 503 }
    );
  }

  // 1. Authenticate admin user
  if (!isAuthenticatedRequest(request)) {
    return jsonWithCors(request, { message: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
  const folder = 'swatika_products';

  if (!apiKey || !apiSecret || !cloudName) {
    return jsonWithCors(
      request,
      { message: 'Cloudinary credentials are missing from server environment.' },
      { status: 500 }
    );
  }

  // 2. Generate signed timestamp & signature
  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto.createHash('sha1').update(paramsToSign + apiSecret).digest('hex');

  // 3. Return signature & public credentials for direct browser upload
  return jsonWithCors(request, {
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder,
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  });
}
