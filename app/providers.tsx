'use client';

import { AuthProvider } from '@/AuthContext';
import { SelectionProvider } from './SelectionContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SelectionProvider>{children}</SelectionProvider>
    </AuthProvider>
  );
} 