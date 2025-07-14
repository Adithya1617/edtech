'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelection } from '../SelectionContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { selection, clearSelection } = useSelection();

  useEffect(() => {
    if (!selection) {
      router.replace('/selection');
    }
  }, [selection, router]);

  if (!selection) {
    return null;
  }

  // Calculate total cost
  let total = 0;
  let summary: JSX.Element | null = null;

  if (selection.type === 'course') {
    total = selection.price;
    summary = (
      <div className="space-y-2">
        <div><b>Type:</b> Full Course</div>
        <div><b>Start Date:</b> {new Date(selection.startDate).toLocaleDateString()}</div>
        <div><b>Time Slot:</b> {selection.timeSlot}</div>
        <div><b>Price:</b> €{selection.price}</div>
      </div>
    );
  } else if (selection.type === 'mock') {
    total = selection.mockTests.reduce((sum, t) => sum + t.price, 0);
    summary = (
      <div className="space-y-2">
        <div><b>Type:</b> Mock Tests</div>
        {selection.mockTests.map((test, idx) => (
          <div key={test.id} className="pl-2 border-l-2 border-accent mb-2">
            <div><b>Mock #{idx + 1}</b></div>
            <div>Date: {new Date(test.date).toLocaleDateString()}</div>
            <div>Time Slot: {test.timeSlot}</div>
            <div>Price: €{test.price}</div>
          </div>
        ))}
      </div>
    );
  } else if (selection.type === 'combined') {
    const courseTotal = selection.course.price;
    const mocksTotal = selection.mockTests.reduce((sum, t) => sum + t.price, 0);
    total = courseTotal + mocksTotal;
    summary = (
      <div className="space-y-4">
        <div>
          <b>Type:</b> Combined (Course + Mocks)
        </div>
        <div className="pl-2 border-l-2 border-accent mb-2">
          <div><b>Course</b></div>
          <div>Start Date: {new Date(selection.course.startDate).toLocaleDateString()}</div>
          <div>Time Slot: {selection.course.timeSlot}</div>
          <div>Price: €{selection.course.price}</div>
        </div>
        <div>
          <b>Mock Tests</b>
          {selection.mockTests.map((test, idx) => (
            <div key={test.id} className="pl-2 border-l-2 border-accent mb-2">
              <div>Mock #{idx + 1}</div>
              <div>Date: {new Date(test.date).toLocaleDateString()}</div>
              <div>Time Slot: {test.timeSlot}</div>
              <div>Price: €{test.price}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleStripe = () => {
    // TODO: Integrate Stripe payment
    alert('Proceeding to Stripe payment portal...');
    // clearSelection(); // Uncomment if you want to clear after payment
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl bg-white/90 shadow-2xl border-0 animate-fade-in-up">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-primary">Checkout</CardTitle>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 text-base px-4 py-1 rounded-lg shadow-sm animate-pulse">Step 1 of 2</Badge>
          </div>
          <div className="mt-4">
            <Progress value={50} className="h-2 bg-accent/30" />
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-lg text-gray-700">Review your selections before proceeding to payment.</div>
          <Accordion type="single" defaultValue="summary" collapsible>
            <AccordionItem value="summary">
              <AccordionTrigger className="text-lg font-semibold text-primary">Order Summary</AccordionTrigger>
              <AccordionContent>
                <div className="rounded-lg bg-gradient-to-br from-yellow-50 to-purple-50 p-4 border border-accent/30 shadow-inner transition-all duration-300">
                  {summary}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-medium text-gray-700">Total</span>
            <span className="text-2xl font-bold text-accent">€{total}</span>
          </div>
          <div className="text-sm text-gray-500 text-right">Taxes and handling charges will be added in the next step.</div>
          <Button className="w-full mt-4 bg-gradient-to-r from-gold to-accent text-white text-lg py-3 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200" onClick={handleStripe}>
            Proceed to Stripe Payment
          </Button>
        </CardContent>
      </Card>
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