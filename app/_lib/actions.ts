'use server';
import decamelizeKeys from 'decamelize-keys';
import { revalidatePath } from 'next/cache';

import { auth, signIn, signOut } from './auth';
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
