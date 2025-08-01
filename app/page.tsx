'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Use backend endpoint from environment variable
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Handle redirect after OAuth login (the backend redirects directly to /admin or /selection)
  // No need to handle token/role in query params, as backend manages session and redirects

  // Google OAuth login handler
  const handleGoogleOAuth = () => {
    window.location.href = `${BACKEND_URL}/login/google`;
  };

  // Microsoft OAuth login handler
  const handleMicrosoftOAuth = () => {
    window.location.href = `${BACKEND_URL}/login/microsoft`;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-beige opacity-40"></div>
      <Card className="w-full max-w-md relative z-10 shadow-2xl border border-border backdrop-blur-sm bg-white/90 transition-all duration-200 hover:shadow-2xl hover:border-gold">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-md">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-serif font-bold text-primary">
            EduTech Platform
          </CardTitle>
          <CardDescription className="text-muted-foreground font-sans">
            Welcome! Sign in with Google to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleOAuth}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2"
              onClick={handleMicrosoftOAuth}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <rect fill="#F25022" x="2" y="2" width="9" height="9"/>
                <rect fill="#7FBA00" x="13" y="2" width="9" height="9"/>
                <rect fill="#00A4EF" x="2" y="13" width="9" height="9"/>
                <rect fill="#FFB900" x="13" y="13" width="9" height="9"/>
              </svg>
              Continue with Microsoft
            </Button>
          </div>
          {error && (
            <div className="mt-4 text-red-600 text-center font-semibold bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}