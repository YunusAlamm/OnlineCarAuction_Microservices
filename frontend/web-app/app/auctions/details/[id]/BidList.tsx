'use client'
import { getBidsForAuction } from "@/app/actions/AuctionActions";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, Bid, ExtendedUser } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BidItem from "./BidItem";
import { numberWithCommas } from "@/lib/numberWithComma";
import EmptyState from "@/app/components/EmptyState";
import BidForm from "./BidForm";

type Props = {
    user: ExtendedUser | null;
    auction: Auction
}
export default function BidList({ user, auction }: Props) {
    const [loading, setLoading] = useState(true);
    const bids = useBidStore(state => state.bids);
    const setBids = useBidStore(state => state.setBids);
    const open = useBidStore(state => state.open);
    const setOpen = useBidStore(state => state.setOpen);
    const openForBids = new Date(auction.auctionEndTime) > new Date();

    const highBid = bids.reduce((prev, current) => prev > current.amount
        ? prev
        : current.bidStatus.includes('Accepted')
            ? current.amount : prev, 0)

    useEffect(() => {
        getBidsForAuction(auction.id)
            .then((res) => {
                if ("error" in res) {
                    throw res.error
                }
                setBids(res as Bid[])

            }).catch(error => {
                toast.error(error.message)
            }).finally(() => setLoading(false))

    }, [auction.id, setLoading, setBids]);

    useEffect(() => {
        setOpen(openForBids);

    }, [openForBids, setOpen])

    if (loading) return <span>Loading Bids...</span>
    return (
        <div className=" rounded-lg shadow-md">
            <div className="py-2 px-4 bg-white">
                <div className="sticky top-0 bg-white p-2">
                    <h3 className="text-2xl font-semibold mb-4">Current High Bid is: ${numberWithCommas(highBid)}</h3>
                </div>
            </div>
            <div className="overflow-auto h-[350px] flex flex-col-reverse px-2">
                {bids.length === 0 ? (
                    <EmptyState
                        title="No Bid for this item"
                        subtitle="please feel free to make a bid" />

                ) : (
                    <>
                        {bids.map(bid => (
                            <BidItem key={bid.id} bid={bid} />
                        ))}
                    </>

                )}
            </div>


            <div className=" px-2 pb-2 text-gray-500">
                {!open ? (
                    <div className="flex items-center justify-center p-2 text-lg font-semibold ">
                        This Auction Has Finished
                    </div>
                ) : !user ? (
                    <div className="flex items-center justify-center p-2 text-lg font-semibold ">
                        please login to make a bid

                    </div>
                ) : user && user.username === auction.seller ? (
                    <div className="flex items-center justify-center p-2 text-lg font-semibold ">
                        You cannot bid on you own auction

                    </div>
                ) : (

                    <BidForm auctionId={auction.id} highBid={highBid} />
                )}
            </div>



        </div>
    )
}
