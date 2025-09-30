import EmptyState from '@/app/components/EmptyState'
import React from 'react'

export default function SignIn({searchParams}: {searchParams: {callbackUrl: string} }) {
  return (
    <EmptyState
    title='You need to Login'
    subtitle='Click to Login'
    showLogin
    callbackUrl={searchParams.callbackUrl}/>
  )
}
