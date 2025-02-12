import React from 'react';

// import { unstable_noStore as noStoreCache } from 'next/cache';
import CabinCard from '../_components/CabinCard';
import { getCabins } from '../_lib/data-service';
import { Cabin, CabinSearchParamsEnum } from '../types';

const filterCapacityFilterMap: Record<
  CabinSearchParamsEnum,
  (cabin: Cabin) => boolean
> = {
  [CabinSearchParamsEnum.ALL]: () => true,
  [CabinSearchParamsEnum.SMALL]: (cabin) => cabin.maxCapacity <= 3,
  [CabinSearchParamsEnum.MEDIUM]: (cabin) =>
    cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
  [CabinSearchParamsEnum.LARGE]: (cabin) => cabin.maxCapacity >= 8,
};

async function CabinList({
  filter,
}: {
  filter?: CabinSearchParamsEnum | string;
}) {
  // noStoreCache();

  const cabins = await getCabins();

  const displayCabins = cabins.filter(
    filterCapacityFilterMap[
      (filter as CabinSearchParamsEnum) || CabinSearchParamsEnum.ALL
    ]
  );

  if (!cabins.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
