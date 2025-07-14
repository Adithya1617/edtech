'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Calendar, Download, Settings, Shield, Target, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminPage() {
  const router = useRouter();

  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Courses',
      value: '45',
      icon: BookOpen,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Mock Tests',
      value: '189',
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Sessions Today',
      value: '23',
      icon: Calendar,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentActivity = [
    { student: 'John Doe', action: 'Enrolled in Full Course', time: '2 hours ago' },
    { student: 'Jane Smith', action: 'Completed Mock Test #1', time: '4 hours ago' },
    { student: 'Mike Johnson', action: 'Scheduled Combined Package', time: '6 hours ago' },
    { student: 'Sarah Wilson', action: 'Joined Course Session', time: '1 day ago' }
  ];

  // Static data for mocks and full course
  const mocksData = [
    { date: '2024-06-01', start: '09:00', end: '11:00', slots: 30, filled: 18 },
    { date: '2024-06-01', start: '12:00', end: '14:00', slots: 30, filled: 25 },
    { date: '2024-06-02', start: '10:00', end: '12:00', slots: 30, filled: 10 },
    { date: '2024-06-02', start: '15:00', end: '17:00', slots: 30, filled: 30 },
    { date: '2024-06-03', start: '09:00', end: '11:00', slots: 30, filled: 5 },
    { date: '2024-06-03', start: '12:00', end: '14:00', slots: 30, filled: 12 },
    { date: '2024-06-04', start: '10:00', end: '12:00', slots: 30, filled: 20 },
    { date: '2024-06-04', start: '15:00', end: '17:00', slots: 30, filled: 8 },
    { date: '2024-06-05', start: '09:00', end: '11:00', slots: 30, filled: 29 },
    { date: '2024-06-05', start: '12:00', end: '14:00', slots: 30, filled: 15 },
  ];
  const fullCourseData = [
    { date: '2024-06-01', start: '08:00', end: '10:00', slots: 20, filled: 10 },
    { date: '2024-06-01', start: '15:00', end: '17:00', slots: 20, filled: 18 },
    { date: '2024-06-02', start: '09:00', end: '11:00', slots: 20, filled: 5 },
    { date: '2024-06-02', start: '13:00', end: '15:00', slots: 20, filled: 20 },
    { date: '2024-06-03', start: '08:00', end: '10:00', slots: 20, filled: 2 },
    { date: '2024-06-03', start: '15:00', end: '17:00', slots: 20, filled: 12 },
    { date: '2024-06-04', start: '09:00', end: '11:00', slots: 20, filled: 19 },
    { date: '2024-06-04', start: '13:00', end: '15:00', slots: 20, filled: 7 },
    { date: '2024-06-05', start: '08:00', end: '10:00', slots: 20, filled: 20 },
    { date: '2024-06-05', start: '15:00', end: '17:00', slots: 20, filled: 11 },
  ];

  // Static data for order histories
  const mockOrders = [
    { email: 'alice@example.com', datetime: '2024-06-05 10:15', value: 499, status: 'Successful' },
    { email: 'bob@example.com', datetime: '2024-06-05 09:50', value: 499, status: 'Pending' },
    { email: 'carol@example.com', datetime: '2024-06-04 18:30', value: 499, status: 'Successful' },
    { email: 'dave@example.com', datetime: '2024-06-04 17:10', value: 499, status: 'Failed' },
    { email: 'eve@example.com', datetime: '2024-06-04 15:00', value: 499, status: 'Successful' },
    { email: 'frank@example.com', datetime: '2024-06-03 20:45', value: 499, status: 'Successful' },
    { email: 'grace@example.com', datetime: '2024-06-03 19:30', value: 499, status: 'Successful' },
    { email: 'heidi@example.com', datetime: '2024-06-03 17:00', value: 499, status: 'Pending' },
    { email: 'ivan@example.com', datetime: '2024-06-02 14:20', value: 499, status: 'Successful' },
    { email: 'judy@example.com', datetime: '2024-06-02 13:10', value: 499, status: 'Successful' },
  ];
  // Update static data for fullCourseOrders to include only 'Full Course' and 'Combo' order types
  const fullCourseOrders = [
    { email: 'alice@example.com', datetime: '2024-06-05 11:00', value: 2999, status: 'Successful', orderType: 'Full Course' },
    { email: 'bob@example.com', datetime: '2024-06-05 10:30', value: 2999, status: 'Successful', orderType: 'Full Course + Mock' },
    { email: 'carol@example.com', datetime: '2024-06-04 19:00', value: 2999, status: 'Pending', orderType: 'Full Course' },
    { email: 'dave@example.com', datetime: '2024-06-04 18:00', value: 2999, status: 'Successful', orderType: 'Full Course' },
    { email: 'eve@example.com', datetime: '2024-06-04 16:00', value: 2999, status: 'Failed', orderType: 'Full Course + Mock' },
    { email: 'frank@example.com', datetime: '2024-06-03 21:00', value: 2999, status: 'Successful', orderType: 'Full Course + Mock' },
    { email: 'grace@example.com', datetime: '2024-06-03 20:00', value: 2999, status: 'Successful', orderType: 'Full Course' },
    { email: 'heidi@example.com', datetime: '2024-06-03 18:00', value: 2999, status: 'Successful', orderType: 'Full Course + Mock' },
    { email: 'ivan@example.com', datetime: '2024-06-02 15:00', value: 2999, status: 'Pending', orderType: 'Full Course' },
    { email: 'judy@example.com', datetime: '2024-06-02 14:00', value: 2999, status: 'Successful', orderType: 'Full Course' },
  ];

  // Unique filter values
  const mockDates = Array.from(new Set(mocksData.map(m => m.date)));
  const mockTimeWindows = Array.from(new Set(mocksData.map(m => `${m.start} - ${m.end}`)));
  const fullCourseDates = Array.from(new Set(fullCourseData.map(c => c.date)));
  const fullCourseTimeWindows = Array.from(new Set(fullCourseData.map(c => `${c.start} - ${c.end}`)));

  // Helper to get min/max date for date picker
  const getMinMaxDate = (dates: string[]) => {
    if (!dates.length) return { min: '', max: '' };
    const sorted = [...dates].sort();
    return { min: sorted[0], max: sorted[sorted.length - 1] };
  };
  const mockDateRange = getMinMaxDate(mockDates);
  const fullCourseDateRange = getMinMaxDate(fullCourseDates);

  // Filter state for mocks
  const [mockDate, setMockDate] = useState('');
  const [mockTimeWindow, setMockTimeWindow] = useState('');
  const [mockAvailability, setMockAvailability] = useState('all');

  // Filter state for full course
  const [courseDate, setCourseDate] = useState('');
  const [courseTimeWindow, setCourseTimeWindow] = useState('');
  const [courseAvailability, setCourseAvailability] = useState('all');

  // Filter state for mock orders
  const [mockOrderDate, setMockOrderDate] = useState('');
  const [mockOrderStatus, setMockOrderStatus] = useState('all');
  const [mockOrderEmail, setMockOrderEmail] = useState('');

  // Filter state for full course orders
  const [fullOrderDate, setFullOrderDate] = useState('');
  const [fullOrderStatus, setFullOrderStatus] = useState('all');
  const [fullOrderEmail, setFullOrderEmail] = useState('');

  // Add order type filter state
  const [fullOrderType, setFullOrderType] = useState('all');

  // Unique values for filters
  const mockOrderDates = Array.from(new Set(mockOrders.map(o => o.datetime.split(' ')[0])));
  const fullOrderDates = Array.from(new Set(fullCourseOrders.map(o => o.datetime.split(' ')[0])));
  const paymentStatuses = ['Successful', 'Pending', 'Failed'];

  // Add state for date filter mode
  const [mockDateMode, setMockDateMode] = useState<'single' | 'range'>('single');
  const [fullDateMode, setFullDateMode] = useState<'single' | 'range'>('single');
  const [showMockExport, setShowMockExport] = useState(false);
  const [showFullExport, setShowFullExport] = useState(false);

  // Filtered data
  const filteredMocks = mocksData.filter(m => {
    const remaining = m.slots - m.filled;
    return (
      (!mockDate || m.date === mockDate) &&
      (!mockTimeWindow || `${m.start} - ${m.end}` === mockTimeWindow) &&
      (mockAvailability === 'all' || (mockAvailability === 'available' ? remaining > 0 : remaining === 0))
    );
  });
  const filteredFullCourse = fullCourseData.filter(c => {
    const remaining = c.slots - c.filled;
    return (
      (!courseDate || c.date === courseDate) &&
      (!courseTimeWindow || `${c.start} - ${c.end}` === courseTimeWindow) &&
      (courseAvailability === 'all' || (courseAvailability === 'available' ? remaining > 0 : remaining === 0))
    );
  });

  // Filtered mock orders
  const filteredMockOrders = mockOrders.filter(order => {
    const orderDate = order.datetime.split(' ')[0];
    return (
      (!mockOrderDate || orderDate === mockOrderDate) &&
      (mockOrderStatus === 'all' || order.status === mockOrderStatus) &&
      (!mockOrderEmail || order.email.toLowerCase().includes(mockOrderEmail.toLowerCase()))
    );
  });
  // Filtered full course orders
  const filteredFullOrders = fullCourseOrders.filter(order => {
    const orderDate = order.datetime.split(' ')[0];
    return (
      (!fullOrderDate || orderDate === fullOrderDate) &&
      (fullOrderStatus === 'all' || order.status === fullOrderStatus) &&
      (!fullOrderEmail || order.email.toLowerCase().includes(fullOrderEmail.toLowerCase())) &&
      (fullOrderType === 'all' || order.orderType === fullOrderType)
    );
  });

  // Export logic (stub for now)
  const exportMockOrders = (type: 'pdf' | 'excel', scope: 'filtered' | 'all') => {
    // TODO: Implement export logic using jsPDF/xlsx
    alert(`Exporting ${scope} mock orders as ${type.toUpperCase()}`);
  };
  const exportFullOrders = (type: 'pdf' | 'excel', scope: 'filtered' | 'all') => {
    // TODO: Implement export logic using jsPDF/xlsx
    alert(`Exporting ${scope} full course orders as ${type.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500">EduTech Platform Management</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
          <p className="text-gray-600">
            Monitor and manage your education platform from here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Collapsible Dashboard Sections */}
        <Accordion type="multiple" className="mb-8">
          {/* Mock Slot Availability */}
          <AccordionItem value="mocks-availability">
            <AccordionTrigger className="w-full justify-start border-2 border-gold bg-background text-primary rounded-lg px-5 py-2 text-base font-medium flex items-center gap-2 mb-2 transition-all duration-200 hover:bg-gold hover:text-white hover:shadow-lg">
              <Target className="w-5 h-5 mr-2" />
              Mock Slot Availability
            </AccordionTrigger>
            <AccordionContent className="will-change-transform transition-transform duration-500 data-[state=open]:scale-100 data-[state=closed]:scale-95 data-[state=open]:rotate-x-0 data-[state=closed]:rotate-x-6 data-[state=open]:shadow-2xl data-[state=closed]:shadow-md bg-card rounded-lg">
              {/* Mocks Availability Table Section */}
              <div className="p-2"> {/* moved content here */}
                {/* Filters and Table for Mocks Availability */}
                <div className="flex flex-col md:flex-row md:items-end gap-2 mb-3">
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1" htmlFor="mock-date">Date</label>
                    <input
                      id="mock-date"
                      type="date"
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={mockDate}
                      min={mockDateRange.min}
                      max={mockDateRange.max}
                      onChange={e => setMockDate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1" htmlFor="mock-timewindow">Time Window</label>
                    <select
                      id="mock-timewindow"
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={mockTimeWindow}
                      onChange={e => setMockTimeWindow(e.target.value)}
                    >
                      <option value="">All</option>
                      {mockTimeWindows.map(tw => (
                        <option key={tw} value={tw}>{tw}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1" htmlFor="mock-availability">Availability</label>
                    <select
                      id="mock-availability"
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={mockAvailability}
                      onChange={e => setMockAvailability(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="available">Available</option>
                      <option value="full">Full</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="mt-4 md:mt-0 md:ml-2 px-3 py-1.5 rounded bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-semibold border border-purple-200 transition"
                    onClick={() => {
                      setMockDate('');
                      setMockTimeWindow('');
                      setMockAvailability('all');
                    }}
                    aria-label="Reset Mocks Filters"
                  >
                    &#x21bb; Reset
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-border rounded-md overflow-hidden">
                    <thead>
                      <tr className="bg-secondary text-foreground border-b border-border">
                        <th className="px-2 py-1.5 text-left font-semibold">Date</th>
                        <th className="px-2 py-1.5 text-left font-semibold">Time Window</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Slots</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Filled</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Remaining</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMocks.length === 0 ? (
                        <tr><td colSpan={5} className="text-center py-4 text-muted-foreground">No results found.</td></tr>
                      ) : filteredMocks.map((mock, idx) => {
                        const remaining = mock.slots - mock.filled;
                        return (
                          <tr key={idx} className="border-b border-border last:border-0 hover:bg-muted/50 transition">
                            <td className="px-2 py-1.5 whitespace-nowrap">{mock.date}</td>
                            <td className="px-2 py-1.5 whitespace-nowrap">{mock.start} - {mock.end}</td>
                            <td className="px-2 py-1.5 text-center">{mock.slots}</td>
                            <td className="px-2 py-1.5 text-center">{mock.filled}</td>
                            <td className="px-2 py-1.5 text-center">
                              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${remaining === 0 ? 'bg-red-100 text-red-700' : remaining < 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{remaining}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* FullCourse Available */}
          <AccordionItem value="fullcourse-available">
            <AccordionTrigger className="w-full justify-start border-2 border-gold bg-background text-primary rounded-lg px-5 py-2 text-base font-medium flex items-center gap-2 mb-2 transition-all duration-200 hover:bg-gold hover:text-white hover:shadow-lg">
              <BookOpen className="w-5 h-5 mr-2" />
              Full Course Slots Availability
            </AccordionTrigger>
            <AccordionContent className="will-change-transform transition-transform duration-500 data-[state=open]:scale-100 data-[state=closed]:scale-95 data-[state=open]:rotate-x-0 data-[state=closed]:rotate-x-6 data-[state=open]:shadow-2xl data-[state=closed]:shadow-md bg-card rounded-lg">
              <div className="p-2"> {/* moved content here */}
                {/* Filters and Table for FullCourse Available */}
                <div className="flex flex-col md:flex-row md:items-end gap-2 mb-3">
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1" htmlFor="course-date">Date</label>
                    <input
                      id="course-date"
                      type="date"
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                      value={courseDate}
                      min={fullCourseDateRange.min}
                      max={fullCourseDateRange.max}
                      onChange={e => setCourseDate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1" htmlFor="course-timewindow">Time Window</label>
                    <select
                      id="course-timewindow"
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                      value={courseTimeWindow}
                      onChange={e => setCourseTimeWindow(e.target.value)}
                    >
                      <option value="">All</option>
                      {fullCourseTimeWindows.map(tw => (
                        <option key={tw} value={tw}>{tw}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1" htmlFor="course-availability">Availability</label>
                    <select
                      id="course-availability"
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                      value={courseAvailability}
                      onChange={e => setCourseAvailability(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="available">Available</option>
                      <option value="full">Full</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="mt-4 md:mt-0 md:ml-2 px-3 py-1.5 rounded bg-green-100 hover:bg-green-200 text-green-800 text-xs font-semibold border border-green-200 transition"
                    onClick={() => {
                      setCourseDate('');
                      setCourseTimeWindow('');
                      setCourseAvailability('all');
                    }}
                    aria-label="Reset FullCourse Filters"
                  >
                    &#x21bb; Reset
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-border rounded-md overflow-hidden">
                    <thead>
                      <tr className="bg-secondary text-foreground border-b border-border">
                        <th className="px-2 py-1.5 text-left font-semibold">Date</th>
                        <th className="px-2 py-1.5 text-left font-semibold">Time Window</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Slots</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Filled</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Remaining</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFullCourse.length === 0 ? (
                        <tr><td colSpan={5} className="text-center py-4 text-muted-foreground">No results found.</td></tr>
                      ) : filteredFullCourse.map((course, idx) => {
                        const remaining = course.slots - course.filled;
                        return (
                          <tr key={idx} className="border-b border-border last:border-0 hover:bg-muted/50 transition">
                            <td className="px-2 py-1.5 whitespace-nowrap">{course.date}</td>
                            <td className="px-2 py-1.5 whitespace-nowrap">{course.start} - {course.end}</td>
                            <td className="px-2 py-1.5 text-center">{course.slots}</td>
                            <td className="px-2 py-1.5 text-center">{course.filled}</td>
                            <td className="px-2 py-1.5 text-center">
                              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${remaining === 0 ? 'bg-red-100 text-red-700' : remaining < 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{remaining}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Mock Order History */}
          <AccordionItem value="mock-orders-history">
            <AccordionTrigger className="w-full justify-start border-2 border-gold bg-background text-primary rounded-lg px-5 py-2 text-base font-medium flex items-center gap-2 mb-2 transition-all duration-200 hover:bg-gold hover:text-white hover:shadow-lg">
              <Calendar className="w-5 h-5 mr-2" />
              Mock Order History
            </AccordionTrigger>
            <AccordionContent className="will-change-transform transition-transform duration-500 data-[state=open]:scale-100 data-[state=closed]:scale-95 data-[state=open]:rotate-x-0 data-[state=closed]:rotate-x-6 data-[state=open]:shadow-2xl data-[state=closed]:shadow-md bg-card rounded-lg">
              <div className="p-2">
                {/* Filters & Export */}
                <div className="flex flex-col md:flex-row md:items-end gap-2 mb-3">
                  {/* Date Mode Dropdown */}
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Date Filter</label>
                    <select
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={mockDateMode}
                      onChange={e => setMockDateMode(e.target.value as 'single' | 'range')}
                    >
                      <option value="single">Single Date</option>
                      <option value="range">Date Range</option>
                    </select>
                  </div>
                  {/* Date Inputs */}
                  {mockDateMode === 'single' ? (
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500 mb-1" htmlFor="mock-order-date">Date</label>
                      <input
                        id="mock-order-date"
                        type="date"
                        className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={mockOrderDate}
                        min={mockOrderDates.length ? mockOrderDates.sort()[0] : ''}
                        max={mockOrderDates.length ? mockOrderDates.sort()[mockOrderDates.length-1] : ''}
                        onChange={e => setMockOrderDate(e.target.value)}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1" htmlFor="mock-order-start-date">Start Date</label>
                        <input
                          id="mock-order-start-date"
                          type="date"
                          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          value={mockOrderDate}
                          min={mockOrderDates.length ? mockOrderDates.sort()[0] : ''}
                          max={mockOrderDates.length ? mockOrderDates.sort()[mockOrderDates.length-1] : ''}
                          onChange={e => setMockOrderDate(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1" htmlFor="mock-order-end-date">End Date</label>
                        <input
                          id="mock-order-end-date"
                          type="date"
                          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          value={mockOrderStatus}
                          min={mockOrderDates.length ? mockOrderDates.sort()[0] : ''}
                          max={mockOrderDates.length ? mockOrderDates.sort()[mockOrderDates.length-1] : ''}
                          onChange={e => setMockOrderStatus(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {/* Payment Status Filter */}
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1" htmlFor="mock-order-status">Payment Status</label>
                    <select
                      id="mock-order-status"
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={mockOrderStatus}
                      onChange={e => setMockOrderStatus(e.target.value)}
                    >
                      <option value="all">All</option>
                      {paymentStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  {/* Email Search */}
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1" htmlFor="mock-order-email">User Email</label>
                    <input
                      id="mock-order-email"
                      type="text"
                      placeholder="Search email..."
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={mockOrderEmail}
                      onChange={e => setMockOrderEmail(e.target.value)}
                    />
                  </div>
                  {/* Export Dropdown */}
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Export</label>
                    <div className="relative">
                      <button type="button" className="flex items-center gap-2 border-2 border-gold bg-background text-primary rounded-lg px-3 py-1.5 font-semibold hover:bg-gold hover:text-white transition" onClick={() => setShowMockExport(!showMockExport)}>
                        <Download className="w-4 h-4" /> Export
                      </button>
                      {showMockExport && (
                        <div className="absolute z-10 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg">
                          <button className="w-full text-left px-4 py-2 hover:bg-muted" onClick={() => { exportMockOrders('pdf', 'filtered'); setShowMockExport(false); }}>Export Filtered as PDF</button>
                          <button className="w-full text-left px-4 py-2 hover:bg-muted" onClick={() => { exportMockOrders('excel', 'filtered'); setShowMockExport(false); }}>Export Filtered as Excel</button>
                          <div className="border-t border-border my-1" />
                          <button className="w-full text-left px-4 py-2 hover:bg-muted" onClick={() => { exportMockOrders('pdf', 'all'); setShowMockExport(false); }}>Export All as PDF</button>
                          <button className="w-full text-left px-4 py-2 hover:bg-muted" onClick={() => { exportMockOrders('excel', 'all'); setShowMockExport(false); }}>Export All as Excel</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-border rounded-md overflow-hidden">
                    <thead>
                      <tr className="bg-secondary text-foreground border-b border-border">
                        <th className="px-2 py-1.5 text-left font-semibold">User Email</th>
                        <th className="px-2 py-1.5 text-left font-semibold">Order Date/Time</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Order Value</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMockOrders.length === 0 ? (
                        <tr><td colSpan={4} className="text-center py-4 text-muted-foreground">No results found.</td></tr>
                      ) : filteredMockOrders.map((order, idx) => (
                        <tr key={idx} className="border-b border-border last:border-0 hover:bg-muted/50 transition">
                          <td className="px-2 py-1.5 whitespace-nowrap">{order.email}</td>
                          <td className="px-2 py-1.5 whitespace-nowrap">{order.datetime}</td>
                          <td className="px-2 py-1.5 text-center">€{order.value}</td>
                          <td className="px-2 py-1.5 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium
                              ${order.status === 'Successful' ? 'bg-green-100 text-green-800' :
                                order.status === 'Failed' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-800'}`}>{order.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* FullCourse & Combo Orders History */}
          <AccordionItem value="fullcourse-orders-history">
            <AccordionTrigger className="w-full justify-start border-2 border-gold bg-background text-primary rounded-lg px-5 py-2 text-base font-medium flex items-center gap-2 mb-2 transition-all duration-200 hover:bg-gold hover:text-white hover:shadow-lg">
              <BookOpen className="w-5 h-5 mr-2" />
              Full Course and Mock Orders History
            </AccordionTrigger>
            <AccordionContent className="will-change-transform transition-transform duration-500 data-[state=open]:scale-100 data-[state=closed]:scale-95 data-[state=open]:rotate-x-0 data-[state=closed]:rotate-x-6 data-[state=open]:shadow-2xl data-[state=closed]:shadow-md bg-card rounded-lg">
              <div className="p-2">
                {/* Filters & Export */}
                <div className="flex flex-col md:flex-row md:items-end gap-2 mb-3">
                  {/* Date Mode Dropdown */}
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Date Filter</label>
                    <select
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      value={fullDateMode}
                      onChange={e => setFullDateMode(e.target.value as 'single' | 'range')}
                    >
                      <option value="single">Single Date</option>
                      <option value="range">Date Range</option>
                    </select>
                  </div>
                  {/* Date Inputs */}
                  {fullDateMode === 'single' ? (
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500 mb-1" htmlFor="full-order-date">Date</label>
                      <input
                        id="full-order-date"
                        type="date"
                        className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        value={fullOrderDate}
                        min={fullOrderDates.length ? fullOrderDates.sort()[0] : ''}
                        max={fullOrderDates.length ? fullOrderDates.sort()[fullOrderDates.length-1] : ''}
                        onChange={e => setFullOrderDate(e.target.value)}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1" htmlFor="full-order-start-date">Start Date</label>
                        <input
                          id="full-order-start-date"
                          type="date"
                          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                          value={fullOrderDate}
                          min={fullOrderDates.length ? fullOrderDates.sort()[0] : ''}
                          max={fullOrderDates.length ? fullOrderDates.sort()[fullOrderDates.length-1] : ''}
                          onChange={e => setFullOrderDate(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1" htmlFor="full-order-end-date">End Date</label>
                        <input
                          id="full-order-end-date"
                          type="date"
                          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                          value={fullOrderStatus}
                          min={fullOrderDates.length ? fullOrderDates.sort()[0] : ''}
                          max={fullOrderDates.length ? fullOrderDates.sort()[fullOrderDates.length-1] : ''}
                          onChange={e => setFullOrderStatus(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {/* Payment Status Filter */}
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1" htmlFor="full-order-status">Payment Status</label>
                    <select
                      id="full-order-status"
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      value={fullOrderStatus}
                      onChange={e => setFullOrderStatus(e.target.value)}
                    >
                      <option value="all">All</option>
                      {paymentStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  {/* Email Search */}
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1" htmlFor="full-order-email">User Email</label>
                    <input
                      id="full-order-email"
                      type="text"
                      placeholder="Search email..."
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      value={fullOrderEmail}
                      onChange={e => setFullOrderEmail(e.target.value)}
                    />
                  </div>
                  {/* Order Type Filter */}
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1" htmlFor="full-order-type">Order Type</label>
                    <select
                      id="full-order-type"
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      value={fullOrderType}
                      onChange={e => setFullOrderType(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="Full Course">Full Course</option>
                      <option value="Full Course + Mock">Full Course + Mock</option>
                    </select>
                  </div>
                  {/* Export Dropdown */}
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Export</label>
                    <div className="relative">
                      <button type="button" className="flex items-center gap-2 border-2 border-indigo-200 bg-background text-primary rounded-lg px-3 py-1.5 font-semibold hover:bg-indigo-100 transition" onClick={() => setShowFullExport(!showFullExport)}>
                        <Download className="w-4 h-4" /> Export
                      </button>
                      {showFullExport && (
                        <div className="absolute z-10 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg">
                          <button className="w-full text-left px-4 py-2 hover:bg-muted" onClick={() => { exportFullOrders('pdf', 'filtered'); setShowFullExport(false); }}>Export Filtered as PDF</button>
                          <button className="w-full text-left px-4 py-2 hover:bg-muted" onClick={() => { exportFullOrders('excel', 'filtered'); setShowFullExport(false); }}>Export Filtered as Excel</button>
                          <div className="border-t border-border my-1" />
                          <button className="w-full text-left px-4 py-2 hover:bg-muted" onClick={() => { exportFullOrders('pdf', 'all'); setShowFullExport(false); }}>Export All as PDF</button>
                          <button className="w-full text-left px-4 py-2 hover:bg-muted" onClick={() => { exportFullOrders('excel', 'all'); setShowFullExport(false); }}>Export All as Excel</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-border rounded-md overflow-hidden">
                    <thead>
                      <tr className="bg-secondary text-foreground border-b border-border">
                        <th className="px-2 py-1.5 text-left font-semibold">Order Type</th>
                        <th className="px-2 py-1.5 text-left font-semibold">User Email</th>
                        <th className="px-2 py-1.5 text-left font-semibold">Order Date/Time</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Order Value</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFullOrders.length === 0 ? (
                        <tr><td colSpan={5} className="text-center py-4 text-muted-foreground">No results found.</td></tr>
                      ) : filteredFullOrders.map((order, idx) => (
                        <tr key={idx} className="border-b border-border last:border-0 hover:bg-muted/50 transition">
                          <td className="px-2 py-1.5 whitespace-nowrap">{order.orderType}</td>
                          <td className="px-2 py-1.5 whitespace-nowrap">{order.email}</td>
                          <td className="px-2 py-1.5 whitespace-nowrap">{order.datetime}</td>
                          <td className="px-2 py-1.5 text-center">€{order.value}</td>
                          <td className="px-2 py-1.5 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium
                              ${order.status === 'Successful' ? 'bg-green-100 text-green-800' :
                                order.status === 'Failed' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-800'}`}>{order.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest student enrollments and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{activity.student}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Students
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Course Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Mock Test Setup
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Overview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notice */}
        <div className="mt-8">
          <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900">Admin Dashboard - Demo Version</h3>
                  <p className="text-blue-800">
                    This is a demonstration of the admin interface. Full administrative features would be implemented based on specific requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}