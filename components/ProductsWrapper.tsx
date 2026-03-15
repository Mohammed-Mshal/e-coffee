'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from './ProductCard'
import { useProductStore } from '@/store/product.store'
import { Autoplay } from 'swiper/modules'
import { Skeleton } from "@/components/ui/skeleton"
export default function ProductsWrapper({ type }: { type?: string }) {
    const { getProductsByCategory, isLoading } = useProductStore()
    const [products] = useState(() => getProductsByCategory(type ?? ''))
    return (
        <div className="wrapper-products w-full">
            {
                isLoading ?
                    <div className='w-full grid grid-cols-3 gap-8'>
                        <Skeleton className="h-105" />
                        <Skeleton className="h-105" />
                        <Skeleton className="h-105" />
                    </div>
                    :
                    products?.length === 0 ?
                        <p className='text-center text-xl py-6 font-medium'>No Products found.</p> :
                        <Swiper
                            className='w-full overflow-visible!'
                            wrapperClass='py-12'
                            centerInsufficientSlides={true}
                            speed={1500}
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 1500,
                            }}
                            breakpoints={{
                                1200: {
                                    slidesPerView: 3,
                                    spaceBetween: 32
                                },
                                0: {
                                    slidesPerView: 2,
                                    spaceBetween: 16
                                }
                            }}
                        >
                            {
                                products &&
                                products.length > 0 &&
                                products.map((product) => {
                                    return <SwiperSlide key={product._id} className='h-105!'>
                                        <ProductCard product={product} type={type} />
                                    </SwiperSlide>
                                })

                            }
                        </Swiper>
            }
        </div>
    )
}
