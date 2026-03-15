'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import CategoryCard from './CategoryCard'
import { Category } from '@/types/Category'
import { Autoplay } from 'swiper/modules'


export default function CategoriesWrapper({ categories }: { categories: Category[] | null }) {
    return (
        <div className="wrapper-category w-full">
            {
                categories?.length === 0 ?
                    <p className='text-center text-xl py-6 font-medium'>No categories found.</p> :
                    <Swiper
                        wrapperClass='py-12'
                        centerInsufficientSlides={true}
                        speed={1500}
                        modules={[Autoplay]}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false
                        }}
                        breakpoints={{
                            1200: {
                                slidesPerView: 6,
                                spaceBetween: 32
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 32
                            },
                            992: {
                                slidesPerView: 4,
                                spaceBetween: 24
                            },
                            778: {
                                slidesPerView: 3,
                                spaceBetween: 24
                            },
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 16
                            }
                        }}
                    >
                        {
                            categories &&
                            categories.length > 0 &&
                            categories.map((category) => {
                                return <SwiperSlide key={category._id}>
                                    <CategoryCard image={category.image} title={category.name} link={`/categories/${category.name}`} />
                                </SwiperSlide>
                            })

                        }
                    </Swiper>
            }
        </div>
    )
}
