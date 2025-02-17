export interface Cabin {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
}

export enum CabinSearchParamsEnum {
  ALL = 'all',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface Settings {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface CreateGuestType {
  fullName: string;
  email: string;
}

export interface GuestData extends CreateGuestType {
  id: string;
  countryFlag: string;
  nationalId: string;
  nationality: string;
}

export type BookingStatus = 'unconfirmed' | 'checked-in' | 'checked-out';

export interface Booking {
  id: string;
  createdAt: string;
  startDate: Date | string;
  endDate: Date | string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  cabinPrice: number;
  cabins: { name: string; image: string };
  observations: string;
  cabinId: string;
}

// export interface BookingDetail extends Booking {
//   cabinPrice: number;
//   extrasPrice: number;
//   hasBreakfast: boolean;
//   observations: string;
//   isPaid: boolean;
// }
