'use client'
import { getBidsForAuction } from "@/app/actions/AuctionActions";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, Bid } from "@/types";
import { User } from "next-auth"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BidItem from "./BidItem";

type Props = {
    user: User | null;
    auction: Auction
}
export default function BidList({ user, auction }: Props) {
    const [loading, setLoading] = useState(true);
    const bids = useBidStore(state => state.bids);
    const setBids = useBidStore(state => state.setBids);

    useEffect(() => {
        getBidsForAuction(auction.id)
            .then((res: any) => {
                if (res.error) {
                    throw res.error
                }
                setBids(res as Bid[])

            }).catch(error => {
                toast.error(error.message)
            }).finally(() => setLoading(false))

    }, [auction.id, setBids]);

    if (loading) return <span>Loading Bids...</span>
    return (
        <div className="border-2 rounded-lg p-4 bg-gray-200">
            <h3 className="text-2xl font-semibold mb-4">Bids</h3>
            {bids.map(bid => (
                <BidItem key={bid.id} bid={bid} />
            ))}

        </div>
    )
}
