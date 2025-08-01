'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/selection');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white/90 shadow-2xl border-0 animate-fade-in-up flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-2">Thank you for your purchase. Your payment was processed successfully.</p>
        <p className="text-gray-500">Redirecting you to the selection page...</p>
      </div>
      <style jsx global>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}