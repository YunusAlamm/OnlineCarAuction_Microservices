import { getDetailedViewData } from "@/app/actions/AuctionActions";
import EmptyState from "@/app/components/EmptyState";
import CountdownTimer from "../../CountdownTimer";
import CarImage from "../../CarImage";
import DetailedSpecs from "./DetailedSpecs";

export default async function Details({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getDetailedViewData(id);

  return (
    <>
      <div className="flex justify-between">
        <EmptyState title={`${data.make} ${data.model}`} />
        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold">Time Remaining</h3>
          <CountdownTimer auctionEnd={data.auctionEndTime} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-3">
        <div className="relative w-full bg-gray-200 aspect-[4/3]
         rounded-lg overflow-hidden shadow-md">
          <CarImage imageUrl={data.imageUrl} />
        </div>
        <div className="border-2 rounded-lg p-2 bg-gray-200">
          <EmptyState title="Bids " />
        </div>

      </div>
      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailedSpecs auction={data} />
      </div>


    </>
  )
}
