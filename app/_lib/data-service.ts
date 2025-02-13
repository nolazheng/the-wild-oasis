import camelcaseKeys from 'camelcase-keys';
import { eachDayOfInterval } from 'date-fns';
import decamelizeKeys from 'decamelize-keys';
import { notFound } from 'next/navigation';

import { Cabin, CreateGuestType, GuestData, Settings } from '../types';

import { supabase } from './supabase';

/////////////
// GET

export async function getCabin(id: string): Promise<Cabin> {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    notFound();
  }

  return camelcaseKeys(data, { deep: true });
}

export async function getCabinPrice(id: string) {
  const { data, error } = await supabase
    .from('cabins')
    .select('regular_price, discount')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }

  return data ? camelcaseKeys(data, { deep: true }) : null;
}

export const getCabins = async function (): Promise<Cabin[]> {
  const { data, error } = await supabase
    .from('cabins')
    .select(
      'id, name, max_capacity, regular_price, discount, image, description'
    )
    .order('name');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return camelcaseKeys(data, { deep: true });
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<GuestData> {
  const { data } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return camelcaseKeys(data, { deep: true });
}

export async function getBooking(id: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return camelcaseKeys(data, { deep: true });
}

export async function getBookings(guestId: string) {
  const { data, error } = await supabase
    .from('bookings')
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      'id, created_at, start_date, end_date, num_nights, num_guests, total_price, guest_id, cabin_id, cabins(name, image)'
    )
    .eq('guest_id', guestId)
    .order('start_date');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return camelcaseKeys(data, { deep: true });
}

export async function getBookedDatesByCabinId(cabinId: string) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayStr = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabin_id', cabinId)
    .or(`start_date.gte.${todayStr},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = camelcaseKeys(data, { deep: true })
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return camelcaseKeys(data, { deep: true });
}

export async function getCountries(): Promise<
  { name: string; flag: string }[]
> {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: CreateGuestType) {
  const { data, error } = await supabase
    .from('guests')
    .insert([decamelizeKeys(newGuest)]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
}

// export async function createBooking(newBooking) {
//   const { data, error } = await supabase
//     .from('bookings')
//     .insert([newBooking])
//     // So that the newly created object gets returned!
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error('Booking could not be created');
//   }

//   return data;
// }

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
// export async function updateGuest(id, updatedFields) {
//   const { data, error } = await supabase
//     .from('guests')
//     .update(updatedFields)
//     .eq('id', id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error('Guest could not be updated');
//   }
//   return data;
// }

// export async function updateBooking(id, updatedFields) {
//   const { data, error } = await supabase
//     .from('bookings')
//     .update(updatedFields)
//     .eq('id', id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error('Booking could not be updated');
//   }
//   return data;
// }

/////////////
// DELETE

// export async function deleteBooking(id) {
//   const { data, error } = await supabase.from('bookings').delete().eq('id', id);

//   if (error) {
//     console.error(error);
//     throw new Error('Booking could not be deleted');
//   }
//   return data;
// }
