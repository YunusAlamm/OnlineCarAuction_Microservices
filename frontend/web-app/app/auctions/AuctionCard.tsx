import CountdownTimer from "./CountdownTimer"
import CarImage from "./CarImage"
import { Auction } from "@/types"
import Link from "next/link"
import CurrentBid from "./CurrentBid"

type Props ={
    auction : Auction
}
export default function AuctionCard({auction}: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`} className="block p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 transition">
        <div className="relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden">

            <CarImage imageUrl={auction.imageUrl} />
            <div className="absolute bottom-1 left-2">
              <CountdownTimer auctionEnd={auction.auctionEndTime} />
            </div>
            <div className="absolute top-1 right-2">
              <CurrentBid reservePrice={auction.reservePrice} amount={auction.currentHighestBid} />
            </div>
            
        </div>
        <div className="flex justify-between items-center mt-4">
            <h3 className="text-gray-700">{auction.make} {auction.model}</h3>
            <p className="font-semibold text-sm">{auction.year}</p>
        </div>
    </Link>
    
  )
}
