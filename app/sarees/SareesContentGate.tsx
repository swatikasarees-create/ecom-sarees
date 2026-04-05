'use client';

import { useSearchParams } from 'next/navigation';
import SareesContent from './SareesContent';

type CatalogSection = 'sarees' | 'suit';

/** Remounts catalog when `?type=` changes so URL-driven category state stays in sync without effects. */
export default function SareesContentGate({ section }: { section: CatalogSection }) {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const remountKey = section === 'suit' ? 'suit' : typeParam ?? '';

  return <SareesContent key={remountKey} section={section} typeQuery={typeParam} />;
}
