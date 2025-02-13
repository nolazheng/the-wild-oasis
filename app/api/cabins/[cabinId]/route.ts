import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';
import { Cabin } from '@/app/types';

interface RequestParams {
  params: {
    cabinId: string;
  };
}

export async function GET(
  _request: Request,
  { params }: RequestParams
): Promise<Response> {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates]: [Cabin, Date[]] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: 'Cabin not found' });
  }
}

// export async function POST() {}
