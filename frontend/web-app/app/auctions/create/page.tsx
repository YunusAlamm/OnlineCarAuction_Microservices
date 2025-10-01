import EmptyState from '@/app/components/EmptyState'
import React from 'react'
import AuctionForm from '../AuctionForm'

export default function Create() {
  return (
    <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
      <EmptyState
        title="Sell Your Car!"
        subtitle="Enter the Details of your car"
      />
      <AuctionForm />


    </div>
  )
}
