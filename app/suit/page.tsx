import { Suspense } from 'react';
import SareesContent from '../sarees/SareesContent';

export default function SuitPage() {
  return (
    <Suspense
      fallback={
        <div className="container-fluid py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading suits...</p>
          </div>
        </div>
      }
    >
      <SareesContent section="suit" />
    </Suspense>
  );
}
