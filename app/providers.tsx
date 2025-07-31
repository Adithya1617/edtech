'use client';

import { SelectionProvider } from './SelectionContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SelectionProvider>{children}</SelectionProvider>
  );
} 