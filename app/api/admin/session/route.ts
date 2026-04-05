import { getAdminSession } from "./getAdminSession";

export const dynamic = "force-dynamic";

export async function GET() {
  return getAdminSession();
}
