import { Suspense, ReactNode } from 'react';
import { Spin } from '../../src/components/Spin';

interface CategoryLoaderProps {
  children: ReactNode;
}

export function CategoryLoader({ children }: CategoryLoaderProps) {
  return (
    <Suspense
      fallback={
        <div className="demo-loading">
          <Spin size="lg" />
          <p>Loading components...</p>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
