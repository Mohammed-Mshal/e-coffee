import React from 'react'
import HeaderSection from '../HeaderSection'
import { useTranslations } from 'next-intl'
import ProductsWrapper from '../ProductsWrapper'

export default function Products() {
    const t = useTranslations()
    return (
        <div className='relative '>
            <div className="container flex flex-col items-center justify-center mx-auto px-5 overflow-hidden">
                <HeaderSection title={t('products')} />
                <ProductsWrapper />
            </div>
        </div>
    )
}
