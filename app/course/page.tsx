'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addDays, format } from 'date-fns';
import { ArrowLeft, BookOpen, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelection } from '../SelectionContext';

// THEME COLORS
const THEME_COLORS = {
  course: 'from-[#A8E063] to-[#F5F7FA]', // light teal to soft beige
};

export default function CoursePage() {
  const router = useRouter();
  const { setSelection } = useSelection();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM',
    '08:00 PM - 10:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && timeSlot) {
      setSelection({
        type: 'course',
        startDate: startDate.toISOString(),
        timeSlot,
        price: 250,
      });
      router.push('/checkout');
      return;
    }
  };

  if (submitted) {
    setTimeout(() => {
      router.push('/selection');
    }, 2000);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enroll in Full Course</h2>
            <p className="text-gray-600">
              Join our comprehensive 15-day course with daily classes and structured learning.
            </p>
          </div>
          <div className="mb-6">
            <span className="text-green-700 bg-green-100 px-4 py-2 rounded font-semibold">Success! Your 15-day course has been scheduled successfully. Redirecting to dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              onClick={() => router.push('/selection')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Selection
            </Button>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${THEME_COLORS.course} rounded-xl flex items-center justify-center`}>
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Full Course</h1>
                <p className="text-sm text-gray-500">15-day intensive program</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enroll in Full Course</h2>
          <p className="text-gray-600">
            Join our comprehensive 15-day course with daily classes and structured learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Information */}
          <div className="lg:col-span-1">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Course Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Duration</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">15 Days</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Format</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Live Classes</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Class Duration</span>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">2 Hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Price</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">€250</Badge>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">What you'll learn:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Core concepts and fundamentals</li>
                    <li>• Practical applications</li>
                    <li>• Interactive sessions</li>
                    <li>• Q&A and doubt clearing</li>
                    <li>• Progress assessments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enrollment Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Schedule Your Course</CardTitle>
                <CardDescription>
                  Select your preferred start date and daily time slot for the 15-day program
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Start Date Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Course Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-12"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, 'PPP') : 'Select start date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Slot Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Daily Time Slot</label>
                    <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Choose your preferred time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {slot}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Course Schedule Preview */}
                  {startDate && timeSlot && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Course Schedule Preview</h4>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p><strong>Start Date:</strong> {format(startDate, 'PPP')}</p>
                        <p><strong>End Date:</strong> {format(addDays(startDate, 14), 'PPP')}</p>
                        <p><strong>Daily Time:</strong> {timeSlot}</p>
                        <p><strong>Total Classes:</strong> 15 sessions</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button type="submit" className="w-full h-12" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit & Enroll'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}