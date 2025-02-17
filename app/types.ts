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
  countryFlag: string;
  nationalId: string;
  nationality: string;
}
