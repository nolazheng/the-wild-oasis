'use client';

import { createContext, use, useState } from 'react';
import { DateRange } from 'react-day-picker';

const initialState: DateRange = {
  from: undefined,
  to: undefined,
};
const ReservationContext = createContext({
  range: initialState,
  setRange: (_range: DateRange) => {},
  resetRange: () => {},
});

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange>(initialState);
  const resetRange = () => setRange(initialState);
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = use(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
}

export { ReservationProvider, useReservation };
