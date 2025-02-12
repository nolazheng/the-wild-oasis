'use client';

import { useFilter } from '../hooks/useFilter';
import { CabinSearchParamsEnum } from '../types';

function Filter() {
  const { setParams, getActiveFilter } = useFilter();
  const activeFilter = getActiveFilter('capacity') || CabinSearchParamsEnum.ALL;
  const buttons = [
    { key: CabinSearchParamsEnum.ALL, label: 'All cabins' },
    { key: CabinSearchParamsEnum.SMALL, label: '1-3 quests' },
    { key: CabinSearchParamsEnum.MEDIUM, label: '4-7 quests' },
    { key: CabinSearchParamsEnum.LARGE, label: '8-12 quests' },
    // ... add more buttons for other capacities if needed
  ];
  return (
    <div className="border border-primary-800 flex">
      {buttons.map(({ key, label }) => (
        <button
          key={key}
          className={`px-5 py-2 hover:bg-primary-700 ${
            activeFilter === key ? 'bg-primary-700 text-primary-50' : ''
          }`}
          onClick={() => setParams(key, 'capacity')}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
