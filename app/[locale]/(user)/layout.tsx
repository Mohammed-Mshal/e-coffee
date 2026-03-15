import FooterUser from '@/layouts/FooterUser'
import HeaderUser from '@/layouts/HeaderUser'
import React from 'react'

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='main-page min-h-dvh flex flex-col pt-33 overflow-hidden'>
            <main className='flex-1'>
                {children}
            </main>
            <FooterUser />
        </div>
    )
}
