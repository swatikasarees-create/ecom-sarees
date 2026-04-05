import { getAdminOrders } from "./getAdminOrders";

export const dynamic = "force-dynamic";

export async function GET() {
  return getAdminOrders();
}
