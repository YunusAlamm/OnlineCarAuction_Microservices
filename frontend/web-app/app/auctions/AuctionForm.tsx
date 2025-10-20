'use client'
import { Button, Spinner } from 'flowbite-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import Input from '../components/Input';
import DateInput from '../components/DateInput';
import { createAuction, updateAuction } from '../actions/AuctionActions';
import toast from 'react-hot-toast';
import { Auction } from '@/types';

type Props = {
    auction?: Auction
}
export default function AuctionForm({ auction }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { control, handleSubmit, setFocus, reset,
        formState: { isSubmitting, isValid, isDirty } } = useForm({
            mode: 'onTouched'
        });

    useEffect(() => {
        if (auction) {
            const { make, model, color, year, mileage } = auction;
            reset({ make, model, color, year, mileage });
        }
        setFocus('make');
    }, [setFocus, auction, reset]);

    async function onSubmit(data: FieldValues) {
        try {
            let response;
            if (pathname === '/auctions/create') {
                response = await createAuction(data);
                if (response.error) throw response.error;
                router.push(`/auctions/details/${response.id}`);
            } else {
                if (!auction) throw new Error('Auction not found');
                response = await updateAuction(data, auction.id);
                if (response.error) throw response.error;
                router.push(`/auctions/details/${auction.id}`);
            }
        } catch (error) {
            const err = error as { status?: number; message?: string };
            toast.error(`${err.status ?? ''} ${err.message ?? 'Unknown error'}`);
        }
    }

    return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>

            <Input name='make' label='Make' control={control}
                rules={{ required: 'Make is required' }} />

            <Input name='model' label='Model' control={control}
                rules={{ required: 'Model is required' }} />

            <Input name='color' label='Color' control={control}
                rules={{ required: 'Color is required' }} />

            <div className='grid grid-cols-2 gap-3'>
                <Input name='year' label='Year' type='number' control={control}
                    rules={{ required: 'Year is required' }} />
                <Input name='mileage' label='Mileage' control={control}
                    rules={{ required: 'Mileage is required' }} />
            </div>

            {pathname === '/auctions/create' &&
            <>
                <Input name='imageUrl' label='Image URL' control={control}
                    rules={{ required: 'Image URL is required' }} />

                <div className='grid grid-cols-2 gap-3'>
                    <Input name='reservePrice' label='Reserve Price (Enter 0 if no reserve)' type='number' control={control}
                        rules={{ required: 'Reserve Price is required' }} />

                    <DateInput
                        name='auctionEndTime'
                        label='Auction End date/time'
                        control={control}
                        showTimeSelect
                        dateFormat="dd MM yyyy h:mm:ss a"
                        rules={{ required: 'Auction End date is required' }}
                        />

                </div>
            </>}



            <div className='flex justify-between'>
                <Button color="alternative" onClick={() => router.push('/')}>Cancel</Button>
                <Button
                    outline
                    color='green'
                    type='submit'
                    disabled={!isValid || !isDirty}
                >
                    {isSubmitting && <Spinner size='sm' />}
                    Submit

                </Button>

            </div>
        </form>
    )
}
