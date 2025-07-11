'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { ArrowLeft, Calendar as CalendarIcon, Clock, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface MockTest {
  id: string;
  date: Date | undefined;
  timeSlot: string;
}

// THEME COLORS
const THEME_COLORS = {
  mock: 'from-[#F6D365] to-[#FDA085]', // soft gold to peach/cream
};

export default function MockPage() {
  const router = useRouter();
  const [numberOfTests, setNumberOfTests] = useState<number>(1);
  const [mockTests, setMockTests] = useState<MockTest[]>([
    { id: '1', date: undefined, timeSlot: '' }
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
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
    const isValid = mockTests.every(test => test.date && test.timeSlot);
    
    if (isValid) {
      setLoading(true);
      const requestBody = { mockTests };
      console.log('Submitting mock test data:', requestBody);
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Mocks</h2>
            <p className="text-gray-600">
              Select the number of mocks you want to take and schedule them according to your preference.
            </p>
          </div>
          <div className="mb-6">
            <span className="text-green-700 bg-green-100 px-4 py-2 rounded font-semibold">Success! Your mocks have been scheduled successfully. Redirecting to dashboard...</span>
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
              <div className={`w-10 h-10 bg-gradient-to-br ${THEME_COLORS.mock} rounded-xl flex items-center justify-center`}>
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mocks</h1>
                <p className="text-sm text-gray-500">Schedule your Mocks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Mocks</h2>
          <p className="text-gray-600">
            Select the number of mocks you want to take and schedule them according to your preference.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
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
                      <Label>Select Date</Label>
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
                      <Label>Select Time Slot</Label>
                      <Select 
                        value={test.timeSlot} 
                        onValueChange={(value) => updateMockTest(test.id, 'timeSlot', value)}
                      >
                        <SelectTrigger>
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
        </form>
      </div>
    </div>
  );
}