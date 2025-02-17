import { Suspense } from 'react';

import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import { getCabin, getCabins } from '@/app/_lib/data-service';

export async function generateMetadata(props: {
  params: Promise<{ cabinId: string }>;
}) {
  const params = await props.params;
  const cabin = await getCabin(params.cabinId);
  return {
    title: `Cabin ${cabin.name}`,
    image: cabin.image,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({
    params: { cabinId: cabin.id },
  }));
}

export default async function Page(props: {
  params: Promise<{ cabinId: string }>;
}) {
  const params = await props.params;
  const cabin = await getCabin(params.cabinId);
  const { name } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
