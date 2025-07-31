'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        router.push('/');
        return;
      }

      // You can decode the JWT token here to get user info and role
      // For now, we'll assume the role is stored separately or in the token
      const role = localStorage.getItem('userRole');
      setUserRole(role);
      setIsAuthenticated(true);

      // Add role-based protection
      if (requiredRole === 'admin' && role !== 'admin') {
        router.push('/selection');
        return;
      }
    };

    checkAuth();
  }, [router, requiredRole]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 