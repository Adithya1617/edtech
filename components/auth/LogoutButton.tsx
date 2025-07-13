'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="flex items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  );
} 