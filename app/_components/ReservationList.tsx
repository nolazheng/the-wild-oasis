'use client';

import { useOptimistic } from 'react';

import { deleteBooking } from '../_lib/actions';
import { Booking } from '../types';

import ReservationCard from './ReservationCard';

function ReservationList({ bookings }: { bookings: Booking[] }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter(
        (booking) => booking.id.toString() !== bookingId
      );
    }
  );

  async function handleDelete(bookingId: string) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
