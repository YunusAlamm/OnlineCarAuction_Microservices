import { User } from 'next-auth'

export type PagedResult<T> = {
    results: T[];
    pageCount: number;
    totalCount: number;
}

export interface ExtendedUser extends User {
    username?: string
}

export type Auction = {
    reservePrice?: number
    seller: string
    winner?: string
    soldAmount?: number
    currentHighestBid?: number
    createdAt: string
    updatedAt: string
    auctionEndTime: string
    status: string
    make: string
    model: string
    year: number
    color: string
    mileage: number
    imageUrl: string
    id: string
}
