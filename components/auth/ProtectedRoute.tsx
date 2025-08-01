'use client';

import { useAuth } from '@/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return; // Wait until authentication status is resolved
    }
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      // If a role is required and the user doesn't have it, redirect to their default page
      if (user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/selection');
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render children if authenticated and the role check passes.
  if (isAuthenticated && (!requiredRole || user?.role === requiredRole)) {
    return <>{children}</>;
  }

  // Render nothing while redirecting.
  return null;
} 