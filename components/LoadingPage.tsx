import React from 'react'

export default function LoadingPage() {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-99999'>
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-(--primary) border-dashed rounded-full animate-spin">
                </div>
            </div>
        </div>
    )
}
