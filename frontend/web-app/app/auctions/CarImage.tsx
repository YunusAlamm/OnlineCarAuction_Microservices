'use client'
import Image from 'next/image'
import React from 'react'

type Props = {
  imageUrl: string;
}


export default function CarImage({ imageUrl }: Props) {
  const [loading, setLoading] = React.useState(true);
  return (
    <Image
      src={imageUrl}
      alt="Image of Car"
      fill
      className={

        `
            object-cover duration-700 ease-in-out
            ${loading ? 'opacity-0 scale-80' : 'opacity-100 scale-100'}
            `
      }
      priority
      sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw, 25vw"
      onLoad={() => setLoading(false)}

    />
  )
}
