import React from 'react'

export default function HeaderSection({ title }: { title: string }) {
    return (
        <h3 className='xl:text-4xl lg:text-3xl md:text-2xl text-xl text-(--dark) font-semibold'>
            {
                title
            }
        </h3>
    )
}
