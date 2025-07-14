"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Types for selections
export type CourseSelection = {
  type: 'course';
  startDate: string; // ISO string
  timeSlot: string;
  price: number;
};

export type MockTest = {
  id: string;
  date: string; // ISO string
  timeSlot: string;
  price: number;
};

export type MockSelection = {
  type: 'mock';
  mockTests: MockTest[];
};

export type CombinedSelection = {
  type: 'combined';
  course: Omit<CourseSelection, 'type'>;
  mockTests: MockTest[];
};

export type Selection = CourseSelection | MockSelection | CombinedSelection | null;

interface SelectionContextType {
  selection: Selection;
  setSelection: (selection: Selection) => void;
  clearSelection: () => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

const STORAGE_KEY = 'edtech_selection';

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selection, setSelectionState] = useState<Selection>(null);

  // Load from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSelectionState(JSON.parse(stored));
    }
  }, []);

  // Save to sessionStorage on change
  useEffect(() => {
    if (selection) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [selection]);

  const setSelection = (sel: Selection) => setSelectionState(sel);
  const clearSelection = () => setSelectionState(null);

  return (
    <SelectionContext.Provider value={{ selection, setSelection, clearSelection }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
} 