import { Link } from '@/i18n/routing'
import Image from 'next/image'
import React from 'react'

export default function CategoryCard({ title, image, link }: { title: string, image: string, link?: string }) {
    return (
        <Link href={link || ''} className='flex flex-col gap-2 py-3 px-4 items-center rounded-xl bg-white shadow-[0px_2px_6.6px_rgba(133,100,89,0.46)] hover:shadow-[0px_4px_13.2px_rgba(133,100,89,0.46)] transition-shadow duration-300'>
            <div className="category-image h-28 w-28 rounded-lg overflow-hidden">
                <Image src={image} alt={title} className='w-auto h-auto object-cover' width={112} height={112} />
            </div>
            <h4 className='text-lg font-medium text-black'>
                {title}
            </h4>
        </Link>
    )
}
