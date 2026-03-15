import { Link } from '@/i18n/routing'
import { useCartState } from '@/store/cart.store'
import { ShoppingBagIcon } from 'lucide-react'
import React from 'react'

export default function CartIcon() {
    const { getTotalItems } = useCartState()
    const total = getTotalItems()
    return (
        <Link
            href={'/profile/cart'}
            className='relative p-1 h-7 w-7 rounded-full flex items-center justify-center text-white transition-all duration-300'>
            <ShoppingBagIcon />
            {
                total > 0 &&
                <span className={`absolute -top-1 -right-1 text-xs w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center transition-all duration-300 ${total > 0 ? 'scale-100' : 'scale-0'} ${total > 9 ? 'text-[10px]' : ''}`}>
                    {total > 9 ? '9+' : total}
                </span>
            }
        </Link>
    )
}
