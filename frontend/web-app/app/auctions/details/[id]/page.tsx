import { getDetailedViewData } from "@/app/actions/AuctionActions";
import CountdownTimer from "../../CountdownTimer";
import CarImage from "../../CarImage";
import DetailedSpecs from "./DetailedSpecs";

export default async function Details({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getDetailedViewData(id);

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">{data.make}</h1>
          <h2 className="text-2xl">{data.model}</h2>
        </div>
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
        <div className="border-2 rounded-lg p-4 bg-gray-100">
          <h3 className="text-2xl font-semibold mb-4">Bids</h3>
          {/* Placeholder for future bid content */}
          <div className="flex justify-center items-center h-[80%] text-gray-500">
            No bids yet
          </div>
        </div>

      </div>
      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailedSpecs auction={data} />
      </div>


    </>
  )
}
