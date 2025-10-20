'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import ToasterProvider from "./ToasterProvider"
import SignalRProvider from "./SignalRProvider"

interface Props {
    children: ReactNode
}

export default function ClientProviders({ children }: Props) {
    return (
        <SessionProvider>
            <ToasterProvider />
            <SignalRProvider>
                {children}
            </SignalRProvider>
        </SessionProvider>
    )
}