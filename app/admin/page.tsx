import { isAuthenticatedServer } from '@/app/lib/adminAuth';
import { redirect } from 'next/navigation';

export default async function AdminRootPage() {
  const isAuthenticated = await isAuthenticatedServer();
  if (isAuthenticated) {
    redirect('/admin/products');
  }
  redirect('/admin/login');
}
