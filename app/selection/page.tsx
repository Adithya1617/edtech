'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, LogOut, Plus, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SelectionPage() {
  const router = useRouter();

  // Redirect to login if not authenticated (check for token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  // THEME COLORS
  const THEME_COLORS = {
    mock: 'from-[#F6D365] to-[#FDA085]', // soft gold to peach/cream
    course: 'from-[#A8E063] to-[#F5F7FA]', // light teal to soft beige
    combined: 'from-[#FAD0C4] to-[#FFD1FF]', // blush to pale gold
  };

  const options = [
    {
      id: 'mock',
      title: 'Mocks',
      description: 'Practice with timed mock tests to assess your knowledge and improve performance',
      icon: Target,
      features: ['Multiple test sessions', 'Flexible scheduling', 'Performance tracking'],
      color: THEME_COLORS.mock,
      path: '/mock'
    },
    {
      id: 'course',
      title: 'Full Course',
      description: 'Complete 15-day intensive course with daily classes and structured learning',
      icon: BookOpen,
      features: ['15-day program', 'Daily classes', 'Structured curriculum'],
      color: THEME_COLORS.course,
      path: '/course'
    },
    {
      id: 'combined',
      title: 'Course + Mocks',
      description: 'Get the best of both worlds with comprehensive course plus practice tests',
      icon: Plus,
      features: ['Full course access', 'Mock test practice', 'Complete preparation'],
      color: THEME_COLORS.combined,
      path: '/combined'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduTech Platform</h1>
                <p className="text-sm text-gray-500">Catalogue</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the option that best fits your learning goals and schedule. Each path is designed to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <Card key={option.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => router.push(option.path)}
                    className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 text-gray-900 font-medium py-3 transition-all duration-200 group-hover:scale-105`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
} 