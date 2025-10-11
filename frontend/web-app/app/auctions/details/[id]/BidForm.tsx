'use client'
import { placeBidForAuction } from "@/app/actions/AuctionActions";
import { useBidStore } from "@/hooks/useBidStore";
import { numberWithCommas } from "@/lib/numberWithComma";
import { FieldValues, useForm } from "react-hook-form";

type Props = {
    auctionId: string;
    highBid: number;
};

export default function BidForm({ auctionId, highBid }: Props) {
    const { register, handleSubmit, reset } = useForm();
    const addBid = useBidStore(state => state.addBid);

    function onSubmit(data: FieldValues) {
        placeBidForAuction(auctionId, +data.amount).then(bid => {
            addBid(bid);
            reset();
        })
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}
            className="flex items-center border-2 rounded-lg py-2">
            <input
            type="number"
            {...register('amount')}
                className="flex-grow pl-5 bg-transparent focus: outline-none border-transparent focus:border-transparent focus:ring-0 text-sm text-gray-600"
            placeholder={`Enter your bid(Minimum bid is $${numberWithCommas(highBid + 1)})`}/>
        </form>

    );
}
