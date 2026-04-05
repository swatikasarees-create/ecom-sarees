import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  getAdminSessionTokenFromCookieHeader,
  verifyAdminToken,
} from "../../../lib/adminAuth";

/** Loaded from route.ts only when not building for pure static export. */
export async function getAdminSession() {
  const h = await headers();
  const authenticated = verifyAdminToken(
    getAdminSessionTokenFromCookieHeader(h.get("cookie"))
  );
  return NextResponse.json({ authenticated });
}
