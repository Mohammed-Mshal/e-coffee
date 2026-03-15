import React from 'react'
import HeaderSection from '../HeaderSection'
import { getTranslations } from 'next-intl/server'
import CategoriesWrapper from '../CategoriesWrapper'
import type { Category } from '@/types/Category'



export default async function CategorySection() {
    const t = await getTranslations()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories?limit=10&page=1`, {
        next: { revalidate: 60 },
        method: 'GET',
        headers: {
            'x-api-key': 'web_client_456'
        }
    })
    let categories: Category[] = []
    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`)
    }
    categories = (await res.json()).data
    
    return (
        <div className='relative '>
            <div className="spot-light w-139.5 h-85 absolute -top-20 -left-60 -rotate-40 bg-(--primary-transparent) blur-[59.35px] rounded-full" />
            <div className="container flex flex-col items-center justify-center text-center mx-auto px-5">
                <HeaderSection title={t('category')} />
                <CategoriesWrapper categories={categories} />
            </div>
        </div>
    )
}
