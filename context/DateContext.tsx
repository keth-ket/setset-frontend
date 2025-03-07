"use client";

import { DateRange } from "react-day-picker";
import React, { createContext, useState } from "react";
import { DateContextType } from "@/lib/types";

// Create a context to store the date range
export const DateContext = createContext<DateContextType | undefined>(
  undefined,
);

// This provider is used to provide the date range to the components that need it
export function DateProvider({ children }: { children: React.ReactNode }) {
  const today = new Date();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: today,
  });

  return (
    <DateContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateContext.Provider>
  );
}
