/**
 * Hostinger-style static export cannot include dynamic route handlers (e.g. force-dynamic + headers()).
 * This script temporarily replaces admin GET routes with stubs, runs next build with STATIC_EXPORT=true,
 * then restores the real route files.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const ROUTES = [
  "app/api/admin/orders/route.ts",
  "app/api/admin/session/route.ts",
  "app/api/orders/track/route.ts",
];

const STUB = `import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    { message: "This API is disabled in static export mode." },
    { status: 503 }
  );
}
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
} finally {
  for (const rel of ROUTES) {
    fs.writeFileSync(path.join(root, rel), backups.get(rel), "utf8");
  }
}
