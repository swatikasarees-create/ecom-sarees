/**
 * Produces the `out/` folder for Hostinger (static HTML). Run: npm run build:static
 * Plain `npm run build` does NOT create `out/` — it uses `.next/` for Node/Vercel.
 *
 * Hostinger-style static export cannot include dynamic route handlers (e.g. force-dynamic + headers()).
 * This script temporarily replaces admin GET routes with stubs, runs next build with STATIC_EXPORT=true,
 * then restores the real route files.
 *
 * Before building for Hostinger, set in .env.production:
 * - NEXT_PUBLIC_API_BASE_URL=https://<your-vercel-app>.vercel.app  (API backend)
 * - NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
 * Upload the `out/` folder to Hostinger public_html. APIs must stay deployed on Vercel with matching
 * ALLOWED_ORIGINS and server env (MYSQL_*, ADMIN_*, etc.).
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const ROUTES = [
  "app/api/admin/login/route.ts",
  "app/api/admin/logout/route.ts",
  "app/api/admin/orders/route.ts",
  "app/api/admin/orders/[id]/route.ts",
  "app/api/admin/products/route.ts",
  "app/api/admin/products/[id]/route.ts",
  "app/api/admin/seed/route.ts",
  "app/api/admin/session/route.ts",
  "app/api/admin/upload/route.ts",
  "app/api/orders/route.ts",
  "app/api/orders/track/route.ts",
  "app/api/products/route.ts",
  "app/api/razorpay/create-order/route.ts",
];

const STUB = `import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ id: "stub" }];
}

const disabled = () => NextResponse.json(
  { message: "This API is disabled in static export mode." },
  { status: 503 }
);

export async function GET() { return disabled(); }
export async function POST() { return disabled(); }
export async function PUT() { return disabled(); }
export async function PATCH() { return disabled(); }
export async function DELETE() { return disabled(); }
`;

const backups = new Map();
for (const rel of ROUTES) {
  const abs = path.join(root, rel);
  backups.set(rel, fs.readFileSync(abs, "utf8"));
}

try {
  for (const rel of ROUTES) {
    fs.writeFileSync(path.join(root, rel), STUB, "utf8");
  }
  execSync("npx next build", {
    stdio: "inherit",
    cwd: root,
    env: { ...process.env, STATIC_EXPORT: "true" },
  });

  // Ensure directory index.html files exist for Apache compatibility
  const copies = [
    { src: 'out/admin.html', dest: 'out/admin/index.html' },
    { src: 'out/admin/login.html', dest: 'out/admin/login/index.html' },
    { src: 'out/admin/products.html', dest: 'out/admin/products/index.html' },
    { src: 'out/admin/orders.html', dest: 'out/admin/orders/index.html' },
  ];

  for (const c of copies) {
    const srcPath = path.join(root, c.src);
    const destPath = path.join(root, c.dest);
    if (fs.existsSync(srcPath)) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }

  // Ensure .htaccess is in out
  const htaccessSrc = path.join(root, 'public/.htaccess');
  const htaccessDest = path.join(root, 'out/.htaccess');
  if (fs.existsSync(htaccessSrc)) {
    fs.copyFileSync(htaccessSrc, htaccessDest);
  }
} finally {
  for (const rel of ROUTES) {
    fs.writeFileSync(path.join(root, rel), backups.get(rel), "utf8");
  }
}
