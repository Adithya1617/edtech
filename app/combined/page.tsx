'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
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
  // Update pre-fixed date options for course schedule (no time, batch format)
  const courseDateTimeOptions = [
    { label: 'Batch 1 July 1st to July 15th', value: '2024-07-01_to_2024-07-15' },
    { label: 'Batch 2 July 16th to July 30th', value: '2024-07-16_to_2024-07-30' },
    { label: 'Batch 3 August 1st to August 15th', value: '2024-08-01_to_2024-08-15' },
    { label: 'Batch 4 August 16th to August 30th', value: '2024-08-16_to_2024-08-30' },
    { label: 'Batch 5 September 1st to September 15th', value: '2024-09-01_to_2024-09-15' },
  ];
  // Replace courseDateTime with courseBatch and add courseTimeSlot
  const [courseBatch, setCourseBatch] = useState<string>('');
  const [courseTimeSlot, setCourseTimeSlot] = useState<string>('');
  const [numberOfTests, setNumberOfTests] = useState<number>(1);
  const [mockTests, setMockTests] = useState<MockTest[]>([
    { id: '1', date: undefined, timeSlot: '' }
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  // Add step and tabValue state
  const [step, setStep] = useState<'course' | 'mock'>('course');
  const [tabValue, setTabValue] = useState<'course' | 'mock'>('course');

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
    const isCourseValid = courseBatch && courseTimeSlot;
    const areMocksValid = mockTests.every(test => test.date && test.timeSlot);
    
    if (isCourseValid && areMocksValid) {
      setLoading(true);
      const requestBody = {
        course: { courseBatch, courseTimeSlot },
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
      router.push('/selection');
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

  // THEME COLORS
  const THEME_COLORS = {
    mock: 'from-[#F6D365] to-[#FDA085]', // soft gold to peach/cream
    course: 'from-[#A8E063] to-[#F5F7FA]', // light teal to soft beige
    combined: 'from-[#FAD0C4] to-[#FFD1FF]', // blush to pale gold
  };

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
              <div className={`w-10 h-10 bg-gradient-to-br ${THEME_COLORS.combined} rounded-xl flex items-center justify-center`}>
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Full Course + Mocks</h1>
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
          <Tabs value={tabValue} onValueChange={v => setTabValue(v as 'course' | 'mock')} defaultValue="course" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="course" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Full Course
              </TabsTrigger>
              <TabsTrigger value="mock" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Mocks
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
                          <label className="text-sm font-medium text-gray-700">Course Batch</label>
                          <Select value={courseBatch} onValueChange={setCourseBatch}>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Choose batch" />
                            </SelectTrigger>
                            <SelectContent>
                              {courseDateTimeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                      {courseBatch && courseTimeSlot && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">Course Schedule Preview</h4>
                          <div className="text-sm text-blue-800 space-y-1">
                            <p><strong>Batch:</strong> {courseDateTimeOptions.find(opt => opt.value === courseBatch)?.label}</p>
                            <p><strong>Time Slot:</strong> {courseTimeSlot}</p>
                            <p><strong>Total Classes:</strong> 15 sessions</p>
                          </div>
                        </div>
                      )}
                      {/* In the course schedule tab, after the preview, add a button to go to the mock tests tab */}
                      {courseBatch && courseTimeSlot && (
                        <div className="flex justify-center mt-6">
                          <Button
                            type="button"
                            className="bg-gradient-to-r from-[#F6D365] to-[#FDA085] hover:from-[#F6D365]/90 hover:to-[#FDA085]/90 text-gray-900 font-medium px-8 py-3 text-lg shadow-md"
                            onClick={() => {
                              setStep('mock');
                              setTabValue('mock');
                            }}
                          >
                            Now Proceed to Mocks
                          </Button>
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
                    Number of Mocks
                  </CardTitle>
                  <CardDescription>
                    Choose how many mocks you want to schedule
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((num) => {
                      const costs = { 1: '100£', 2: '170£', 3: '220£', 4: '300£' };
                      return (
                        <div key={num} className="flex flex-col items-center">
                          <Button
                            type="button"
                            variant={numberOfTests === num ? "default" : "outline"}
                            onClick={() => handleNumberOfTestsChange(num.toString())}
                            className="h-16 text-lg font-medium w-full"
                          >
                            {num} Mock{num > 1 ? 's' : ''}
                          </Button>
                          <span className="mt-2 text-green-700 font-semibold text-base">
                            {costs[num as 1 | 2 | 3 | 4]}
                          </span>
                        </div>
                      );
                    })}
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
                          Mock #{index + 1}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        Schedule your mock date and time
                      </CardDescription>
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
                                className="w-full justify-start text-left font-normal"
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
                            <SelectTrigger>
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

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#F8F6F2] to-[#EAE6DA] hover:from-[#F8F6F2]/90 hover:to-[#EAE6DA]/90 text-gray-900 font-medium px-8 py-3 text-lg shadow-md border border-[#e0dbce]"
                  disabled={!mockTests.every(test => test.date && test.timeSlot) || loading}
                >
                  {loading ? 'Taking you there...' : 'Checkout'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  );
}