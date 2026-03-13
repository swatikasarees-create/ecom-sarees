import { isAuthenticatedServer } from '@/app/lib/adminAuth';
import { redirect } from 'next/navigation';
import ProductsAdminClient from './products-admin-client';

export default async function AdminProductsPage() {
  const isAuthenticated = await isAuthenticatedServer();
  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return <ProductsAdminClient />;
}
