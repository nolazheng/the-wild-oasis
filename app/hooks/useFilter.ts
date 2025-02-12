import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { CabinSearchParamsEnum } from '../types';

export const useFilter = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathName = usePathname();

  const getActiveFilter = (key: string) => searchParams.get(key);

  const setParams = (filter: CabinSearchParamsEnum, key: string) => {
    params.set(key, filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return {
    setParams,
    getActiveFilter,
  };
};
