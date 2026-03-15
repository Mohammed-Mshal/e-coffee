'use client'
import LoadingPage from '@/components/LoadingPage'
import { useRouter } from '@/i18n/routing'
import { useUser } from '@/store/useUser'
import React, { useEffect } from 'react'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { user, setUser } = useUser()
    const router = useRouter()
    useEffect(() => {
        const getMe = async () => {
            try {
                setUser(null) // Set user to null while fetching to show loading state
                const res = await fetch('/api/auth/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // include cookies
                })
                if (!res.ok) {
                    setUser(undefined) // Set user to undefined if not authenticated
                    return
                }
                const data = await res.json()
                setUser(data)
            } catch (error) {
                console.log(error);
                setUser(undefined) // Set user to undefined if not authenticated

            }
        }
        getMe()
    }, [setUser])

    if (user === null) return <LoadingPage />
    return (
        <>
            {children}
        </>
    )
}
