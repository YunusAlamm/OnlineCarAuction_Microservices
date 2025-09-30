'use client'

import { signIn } from "next-auth/react";

type Props = {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    showLogin?: boolean,
    callbackUrl?: string,
    onReset?: () => void;
}

export default function EmptyState({
    title = 'No matches found',
    subtitle = 'Try adjusting your search or filters',
    showReset,
    showLogin,
    callbackUrl = '/',

    onReset
}: Props) {
    return (
        <div className='h-[40vh] flex flex-col gap-2 justify-center items-center'>
            <div className='text-center bg-white p-8 rounded-lg shadow-lg transform transition-all duration-200 hover:shadow-xl'>
                <div className='text-2xl font-bold text-gray-800'>
                    {title}
                </div>
                <div className='font-light text-gray-600 mt-3'>
                    {subtitle}
                </div>
                {showReset && (
                    <div className='mt-6'>
                        <button
                            onClick={onReset}
                            className='px-6 py-2.5 bg-blue-600 text-white rounded-full
                                     hover:bg-blue-700 transition duration-200 ease-in-out
                                     transform hover:scale-105 active:scale-95
                                     shadow-md hover:shadow-lg'
                        >
                            Reset filters
                        </button>
                    </div>
                )}

                {showLogin && (
                    <div className='mt-6'>
                        <button
                            onClick={() => signIn('id-server', { callbackUrl }, { prompt: 'login' })}
                            className='px-6 py-2.5 bg-blue-600 text-white rounded-full
                                     hover:bg-blue-700 transition duration-200 ease-in-out
                                     transform hover:scale-105 active:scale-95
                                     shadow-md hover:shadow-lg'
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}