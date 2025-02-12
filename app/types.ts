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
