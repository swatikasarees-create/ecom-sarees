import { isAuthenticatedRequest } from '@/app/lib/adminAuth';
import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/jpg']);

export async function POST(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ message: 'File is required.' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { message: 'Only JPG, PNG and WEBP images are allowed.' },
      { status: 400 }
    );
  }

  const ext = path.extname(file.name || '').toLowerCase() || '.jpg';
  const safeExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg';
  const filename = `admin-${Date.now()}-${Math.random().toString(36).slice(2, 10)}${safeExt}`;
  const uploadDir = path.join(process.cwd(), 'public', 'product_images');
  await mkdir(uploadDir, { recursive: true });
  const arrayBuffer = await file.arrayBuffer();
  await writeFile(path.join(uploadDir, filename), Buffer.from(arrayBuffer));

  return NextResponse.json({ url: `/product_images/${filename}` });
}
