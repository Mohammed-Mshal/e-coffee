'use client'
import { useCartState } from '@/store/cart.store'
import { usePopupProduct } from '@/store/usePopupProduct'
import { toCartItem } from '@/utils/cart.utils'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function PopupAddProduct() {
    const { addToCart } = useCartState()
    const { isOpen, product, togglePopup } = usePopupProduct()
    const [quantity, setQuantity] = useState<number>(1)

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center p-5 overflow-y-auto z-9999 transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="overlay bg-black/30 absolute top-0 left-0 w-full h-full backdrop-blur-sm" onClick={() => togglePopup(false)}>
            </div>
            <div className={`body-modal bg-white px-4 py-6 z-10 rounded-2xl max-w-150 w-[80%] flex flex-col gap-6 transition-all duration-300 ${isOpen ? 'scale-100' : 'scale-0'}`}>
                {
                    !product ?
                        <div className="flex flex-col animate-pulse gap-4">
                            <div className="w-full h-50 flex rounded-lg bg-gray-200"></div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="h-5 rounded bg-gray-200"></div>
                                <div className="space-y-3">
                                    <div className="h-2 rounded bg-gray-200"></div>
                                    <div className="h-2 rounded bg-gray-200"></div>
                                    <div className="h-2 rounded bg-gray-200"></div>
                                </div>
                            </div>
                        </div> :
                        <>
                            <div className="image w-full h-50 flex rounded-lg overflow-hidden">
                                {
                                    product?.images.length > 0 &&

                                    <Image src={product?.images[0] as string} alt={product?.name as string} width={300} height={200} className='w-full h-full object-cover' />
                                }
                            </div>
                            <div className='flex flex-col items-center text-center gap-2'>
                                <h2 className='lg:text-2xl md:text-xl text-lg font-semibold text-(--dark)'>
                                    {product?.name}
                                </h2>
                                <div className='lg:text-lg text-base text-(--dark)/70'>
                                    <p>
                                        {product?.description}
                                    </p>
                                </div>
                                <form action="" className='flex flex-col w-full text-start gap-4' >
                                    <div className='flex justify-between md:items-center items-stretch flex-col md:flex-row gap-2'>
                                        <div className="form-group">
                                            <div className="wrapper-input flex items-center gap-2">
                                                <button className='rounded-full p-2 size-8 flex items-center justify-center bg-black  text-white hover:bg-black/80 cursor-pointer transition-all duration-300' title='Plus' type='button'
                                                    onClick={() => setQuantity(quantity + 1)}
                                                >
                                                    <Plus className='size-6' />
                                                </button>
                                                <input type="number" id='quantity' placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(+e.target.value)} min={1} max={product.stock} />
                                                <button className='rounded-full p-2 size-8 flex items-center justify-center bg-black  text-white hover:bg-black/80 cursor-pointer transition-all duration-300' title='Minus' type='button'
                                                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                                >
                                                    <Minus className='size-6' />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='text-lg'>
                                            Total : <span className='font-bold text-xl'>{quantity * product.price} SY</span>
                                        </div>
                                    </div>
                                    <button className='custom-button3' onClick={async (e) => {
                                        e.preventDefault()
                                        addToCart(toCartItem(product, quantity))
                                    }}>
                                        Add To Cart
                                    </button>
                                </form>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}
