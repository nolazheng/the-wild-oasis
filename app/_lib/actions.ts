'use server';
import decamelizeKeys from 'decamelize-keys';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { Booking } from '../types';

import { auth, signIn, signOut } from './auth';
import { getBookings } from './data-service';
import { supabase } from './supabase';

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateProfile(formData: any) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const nationalId = formData.get('nationalId');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId))
    throw new Error('Please provide a valid national ID');

  const updateData = {
    nationalId,
    nationality,
    countryFlag,
  };

  const { error } = await supabase
    .from('guests')
    .update(decamelizeKeys(updateData))
    .eq('id', session.user.guestId);

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}

export async function deleteBooking(bookingId: string): Promise<void> {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const guestBookings = await getBookings(session.user.guestId);
  const booking = guestBookings.find((b) => b.id === bookingId);

  if (!booking) {
    throw new Error('Not allowed to delete the booking');
  }

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }

  revalidatePath('/account/reservations');
}

export async function updateBooking(formData: any) {
  const bookingId = formData.get('bookingId');

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id.toString());

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to update this booking');

  // 3) Building update data
  const updateData = {
    num_guests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) throw new Error('Booking could not be updated');

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath('/account/reservations');

  // 7) Redirecting
  redirect('/account/reservations');
}

export async function createBooking(
  bookingData: Partial<Booking>,
  formData: any
) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const newBooking = decamelizeKeys({
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  });

  const { error } = await supabase.from('bookings').insert([newBooking]);

  if (error) throw new Error('Booking could not be created');

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect('/cabins/thankyou');
}
