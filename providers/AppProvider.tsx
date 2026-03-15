'use client'
import { useCartState } from '@/store/cart.store'
import { useProductStore } from '@/store/product.store'
import { useUser } from '@/store/useUser'
import React, { useEffect } from 'react'
export default function AppProvider({ children }: { children: React.ReactNode }) {
    const { initialCarts } = useCartState()
    const { initialProducts } = useProductStore()
    const { user } = useUser()
    useEffect(() => {
        const init = async () => {
            await initialProducts()
            if (user) {
                initialCarts()
            }
        }
        init()
    }, [initialCarts, initialProducts, user])
    return (
        <>
            {children}
        </>
    )
}
