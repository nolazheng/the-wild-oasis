import React from 'react';

import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import { Cabin } from '../types';

import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, _bookDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        // bookedDates={bookDates}
        // cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
