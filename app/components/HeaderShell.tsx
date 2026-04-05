import { Suspense } from 'react';
import Header from './Header';

export default function HeaderShell() {
  return (
    <Suspense fallback={<header className="border-bottom bg-white" style={{ minHeight: 72 }} aria-hidden />}>
      <Header />
    </Suspense>
  );
}
