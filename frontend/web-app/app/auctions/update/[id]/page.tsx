import { getDetailedViewData } from '@/app/actions/AuctionActions';
import React from 'react'
import AuctionForm from '../../AuctionForm';
import EmptyState from '@/app/components/EmptyState';

export default async function Update({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getDetailedViewData(id);
  return (
    <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg' >
      <EmptyState title='Update Your Auction' subtitle='please update the details of your car(only these auction properties are editable)'/>
      <AuctionForm auction={data} />
    </div>
  )
}
