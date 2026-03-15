import React from 'react'
import Banner from '../../../components/user/Banner'
import Category from '@/components/user/Category'
import Products from '@/components/user/Products'
import PopularDrinks from '@/components/user/PopularDrinks'
import PopupAddProduct from '@/components/PopupAddProduct'

export default async function UserHomePage() {
    return (
        <div className='h-[600dvh] gap-24 flex flex-col '>
            <Banner />
            <PopularDrinks />
            <Products />
            <Category />
            <PopupAddProduct />
        </div>
    )
}
    