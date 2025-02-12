import { Suspense } from 'react';

import CabinList from '../_components/CabinList';
import Filter from '../_components/Filter';
import Spinner from '../_components/Spinner';
import { CabinSearchParamsEnum } from '../types';

// !For static page to clear cache
// export const revalidate = 3600;

export const metadata = {
  title: 'Cabins',
};

interface SearchParams {
  capacity?: CabinSearchParamsEnum | string;
}

const isValidParams = (value: CabinSearchParamsEnum | string) =>
  Object.values(CabinSearchParamsEnum).includes(value as CabinSearchParamsEnum);

export default async function Page(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const filter = isValidParams(searchParams?.capacity || '')
    ? searchParams.capacity
    : 'all';
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      {/* // !Add key to show loading indicator */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
