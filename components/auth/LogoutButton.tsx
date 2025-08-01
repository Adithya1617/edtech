'use client';

import { useAuth } from '@/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // This will redirect to the backend's /logout endpoint
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