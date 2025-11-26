'use client'
import Image from 'next/image'
import React from 'react'

type Props = {
  imageUrl?: string | null;
}


export default function CarImage({ imageUrl }: Props) {
  const [loading, setLoading] = React.useState(true);
  if (!imageUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 7l-9 6-5-4-6 5" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt="Image of Car"
      fill
      className={`object-cover duration-700 ease-in-out ${loading ? 'opacity-0 scale-80' : 'opacity-100 scale-100'}`}
      priority
      sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw, 25vw"
      onLoad={() => setLoading(false)}
    />
  )
}
