'use client';

import { SessionProvider } from 'next-auth/react';
import { SelectionProvider } from './SelectionContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SelectionProvider>{children}</SelectionProvider>
    </SessionProvider>
  );
} 