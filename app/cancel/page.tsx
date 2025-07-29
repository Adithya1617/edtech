'use client';
import { useRouter } from 'next/navigation';

export default function CancelPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white/90 shadow-2xl border-0 animate-fade-in-up flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-yellow-600 mb-4">Payment Cancelled</h1>
        <p className="text-lg text-gray-700 mb-2">Your payment was cancelled. No charges were made.</p>
        <button
          className="mt-4 px-6 py-2 bg-accent text-white rounded-lg shadow hover:scale-105 transition-transform duration-200"
          onClick={() => router.push('/selection')}
        >
          Return to Selection
        </button>
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