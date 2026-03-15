'use client'
import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FaStar } from "react-icons/fa6";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link } from '@/i18n/routing'
import { usePopupProduct } from '@/store/usePopupProduct'
import { IProduct } from '@/types'

export default function ProductCard({ product, type }: { product: IProduct, type?: string }) {
    const { togglePopup, setProduct } = usePopupProduct()

    return (
        <div className="product-card h-full shadow-[0px_7px_9.1px_1px_rgba(133,100,89,0.31)] rounded-xl p-4 flex flex-col gap-4 bg-white">
            <div className="image-wrapper w-full  rounded-lg overflow-hidden ">
                {
                    type === 'popular' ?
                        <Swiper
                            className='w-full  h-60'
                            speed={1200}
                            slidesPerView={1}
                            spaceBetween={24}
                            modules={[Pagination]}
                            pagination={{
                                el: '.swiper-pagination',
                                enabled: true,
                                clickable: true,
                                bulletClass: 'h-2 w-2 rounded-full bg-(--primary) opacity-50 transition-all duration-300 cursor-pointer hover:opacity-100',
                                bulletActiveClass: 'opacity-100 w-12'
                            }}
                        >
                            {
                                product.images &&
                                product.images.length > 0 &&
                                product.images.map((img, index) => {
                                    return <SwiperSlide key={index} className='flex w-full h-60'>
                                        <Image src={img} alt={product.name} className="product-image w-full h-full object-cover object-center rounded-lg" width={300} height={300} />
                                    </SwiperSlide>
                                })
                            }
                            <div className="swiper-pagination absolute z-10 bottom-3 flex items-center justify-center gap-1 left-1/2 transform -translate-x-1/2 w-full">
                            </div>
                        </Swiper>
                        :
                        <Swiper
                            className='w-full  h-43'
                            speed={1200}
                            slidesPerView={1}
                            spaceBetween={24}
                            modules={[Pagination]}
                            pagination={{
                                el: '.swiper-pagination',
                                enabled: true,
                                clickable: true,
                                bulletClass: 'h-2 w-2 rounded-full bg-(--primary) opacity-50 transition-all duration-300 cursor-pointer hover:opacity-100',
                                bulletActiveClass: 'opacity-100 w-12'
                            }}
                        >
                            {
                                product.images &&
                                product.images.length > 0 &&
                                product.images.map((img, index) => {
                                    return <SwiperSlide key={index} className='flex w-full h-43'>
                                        <Image src={img} alt={product.name} className="product-image w-full h-full object-cover object-center rounded-lg" width={300} height={300} />
                                    </SwiperSlide>
                                })
                            }
                            <div className="swiper-pagination absolute z-10 bottom-3 flex items-center justify-center gap-1 left-1/2 transform -translate-x-1/2 w-full">
                            </div>
                        </Swiper>
                }
            </div>
            <div className="body-card flex flex-col items-start gap-2 flex-1">
                {
                    type === 'popular' ?
                        <>
                            <h3 className='title xl:text-2xl text-xl font-bold text-black'>
                                {product.name}
                            </h3>
                            <p className='description text-(--black-transparent) font-medium'>{product.description}</p>
                            <div className="actions flex justify-between gap-3 w-full mt-auto">
                                <button onClick={() => {
                                    setProduct(product)
                                    togglePopup(true)
                                }} className="custom-button4 flex-1 text-center">
                                    Add To Cart
                                </button>
                            </div>
                        </>
                        :
                        <>
                            <div className="tags flex flex-wrap items-center gap-2">
                                {
                                    product.category &&
                                    product.category.length > 0 &&
                                    product.category.map((cat) => {
                                        return <span key={cat._id} className="tag text-xs text-(--dark) bg-(--white-2) px-3 py-2 rounded-full font-semibold">{cat.name}</span>
                                    })
                                }
                            </div>
                            <h3 className='title xl:text-2xl text-xl font-bold text-black'>
                                {product.name}
                            </h3>
                            <p className='description text-(--black-transparent) font-medium'>{product.description}</p>
                            <div className="flex items-center justify-between gap-2 w-full mt-auto">
                                <div className='price text-lg font-bold text-(--black)'>
                                    ${product.price.toFixed(2)}
                                </div>
                                <div className="rating flex items-center gap-1">
                                    {
                                        Math.floor(product?.averageRating)>0 &&
                                        Array.from({ length: Math.floor(product?.averageRating) }).map((_, index) => {
                                            return <FaStar key={index} className='text-(--yellow)' size={16} />
                                        })
                                    }

                                    {

                                        5 - Math.floor(product?.averageRating) &&
                                        Array.from({ length: 5 - Math.floor(product?.averageRating) }).map((_, index) => {
                                            return <Star key={index} className='text-(--yellow)' size={16} />
                                        })

                                    }
                                    <span className='text-sm font-semibold'>
                                        {product?.averageRating}
                                    </span>
                                </div>
                            </div>
                            <div className="actions flex justify-between gap-3 w-full">
                                <Link href={`/products/${product._id}`}
                                    className="custom-button4 flex-1 text-center">
                                    More Details
                                </Link>
                                <button
                                    title='Shopping'
                                    type='button'
                                    className="view-details-btn text-white font-semibold hover:underline bg-(--dark) p-2 rounded-md flex items-center justify-center aspect-square cursor-pointer hover:bg-(--dark-hover) transition-colors duration-300">
                                    <RiShoppingCartLine size={26} />
                                </button>
                            </div>
                        </>
                }

            </div>
        </div>
    )
}
