import { Suspense } from 'react';
import SareesContentGate from './SareesContentGate';

export default function SareesPage() {
  return (
    <Suspense fallback={
      <div className="container-fluid py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading sarees...</p>
        </div>
      </div>
    }>
      <SareesContentGate section="sarees" />
    </Suspense>
  );
}
