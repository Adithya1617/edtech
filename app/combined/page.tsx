'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addDays, format } from 'date-fns';
import { ArrowLeft, BookOpen, Calendar as CalendarIcon, Clock, Plus, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface MockTest {
  id: string;
  date: Date | undefined;
  timeSlot: string;
}

export default function CombinedPage() {
  const router = useRouter();
  const [courseStartDate, setCourseStartDate] = useState<Date | undefined>(undefined);
  const [courseTimeSlot, setCourseTimeSlot] = useState<string>('');
  const [numberOfTests, setNumberOfTests] = useState<number>(1);
  const [mockTests, setMockTests] = useState<MockTest[]>([
    { id: '1', date: undefined, timeSlot: '' }
  ]);
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

  const mockTimeSlots = [
    '09:00 AM - 12:00 PM',
    '01:00 PM - 04:00 PM',
    '05:00 PM - 08:00 PM',
    '07:00 PM - 10:00 PM'
  ];

  const handleNumberOfTestsChange = (value: string) => {
    const num = parseInt(value);
    setNumberOfTests(num);
    
    const newMockTests: MockTest[] = [];
    for (let i = 0; i < num; i++) {
      newMockTests.push({
        id: (i + 1).toString(),
        date: mockTests[i]?.date || undefined,
        timeSlot: mockTests[i]?.timeSlot || ''
      });
    }
    setMockTests(newMockTests);
  };

  const updateMockTest = (id: string, field: keyof MockTest, value: any) => {
    setMockTests(prev => prev.map(test => 
      test.id === id ? { ...test, [field]: value } : test
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isCourseValid = courseStartDate && courseTimeSlot;
    const areMocksValid = mockTests.every(test => test.date && test.timeSlot);
    
    if (isCourseValid && areMocksValid) {
      setLoading(true);
      const requestBody = {
        course: { courseStartDate, courseTimeSlot },
        mockTests
      };
      console.log('Submitting combined data:', requestBody);
      try {
        await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });
        setSubmitted(true);
        // Removed redirect to dashboard
      } catch (error) {
        alert('Failed to submit. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (submitted) {
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Learning Package</h2>
            <p className="text-gray-600">
              Get the best of both worlds with our comprehensive 15-day course plus practice mock tests.
            </p>
          </div>
          <div className="mb-6">
            <span className="text-green-700 bg-green-100 px-4 py-2 rounded font-semibold">Success! Your complete learning package has been scheduled successfully. Redirecting to dashboard...</span>
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
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Course + Mock Tests</h1>
                <p className="text-sm text-gray-500">Complete learning package</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Learning Package</h2>
          <p className="text-gray-600">
            Get the best of both worlds with our comprehensive 15-day course plus practice mock tests.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Tabs defaultValue="course" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="course" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Course Schedule
              </TabsTrigger>
              <TabsTrigger value="mock" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Mock Tests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="course" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Course Scheduling */}
                <div className="lg:col-span-2">
                  <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle>Schedule Your Course</CardTitle>
                      <CardDescription>
                        Select your preferred start date and daily time slot
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                {courseStartDate ? format(courseStartDate, 'PPP') : 'Select start date'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={courseStartDate}
                                onSelect={setCourseStartDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Time Slot Selection */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Daily Time Slot</label>
                          <Select value={courseTimeSlot} onValueChange={setCourseTimeSlot}>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Choose time slot" />
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
                      </div>

                      {/* Course Schedule Preview */}
                      {courseStartDate && courseTimeSlot && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">Course Schedule Preview</h4>
                          <div className="text-sm text-blue-800 space-y-1">
                            <p><strong>Start Date:</strong> {format(courseStartDate, 'PPP')}</p>
                            <p><strong>End Date:</strong> {format(addDays(courseStartDate, 14), 'PPP')}</p>
                            <p><strong>Daily Time:</strong> {courseTimeSlot}</p>
                            <p><strong>Total Classes:</strong> 15 sessions</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mock" className="space-y-6">
              {/* Number of Tests Selection */}
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Number of Mock Tests
                  </CardTitle>
                  <CardDescription>
                    Choose how many mock tests you want to schedule
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((num) => (
                      <Button
                        key={num}
                        type="button"
                        variant={numberOfTests === num ? "default" : "outline"}
                        onClick={() => handleNumberOfTestsChange(num.toString())}
                        className="h-16 text-lg font-medium"
                      >
                        {num} Test{num > 1 ? 's' : ''}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mock Tests Scheduling */}
              <div className="space-y-6">
                {mockTests.map((test, index) => (
                  <Card key={test.id} className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                            Test {index + 1}
                          </Badge>
                          Mock Test #{index + 1}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date Selection */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Select Date</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal h-12"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {test.date ? format(test.date, 'PPP') : 'Pick a date'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={test.date}
                                onSelect={(date) => updateMockTest(test.id, 'date', date)}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Time Slot Selection */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Select Time Slot</label>
                          <Select 
                            value={test.timeSlot} 
                            onValueChange={(value) => updateMockTest(test.id, 'timeSlot', value)}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Choose time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockTimeSlots.map((slot) => (
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium px-8 py-4 text-lg"
              disabled={!courseStartDate || !courseTimeSlot || !mockTests.every(test => test.date && test.timeSlot) || loading}
            >
              {loading ? 'Submitting...' : 'Schedule Complete Package'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}