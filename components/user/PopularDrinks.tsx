import React from 'react'
import HeaderSection from '../HeaderSection'
import { useTranslations } from 'next-intl'
import ProductsWrapper from '../ProductsWrapper'

export default function PopularDrinks() {
  const t = useTranslations()
  const products = [
    {
      _id: '1',
      name: 'Product 1',
      description: 'This is a sample product description.',
      price: 10.99,
      category: [{
        _id: '1',
        name: 'Category 1'
      }, {
        _id: '2',
        name: 'Category 2'
      }
      ],
      stock: 100,
      averageRating: 4.5,
      reviewCount: 120,
      images: ['https://loremflickr.com/400/400?lock=2813359439613700', 'https://loremflickr.com/400/400?lock=2813359439613700'],
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      _id: '2',
      name: 'Product 2',
      description: 'This is another sample product description.',
      price: 15.99,
      category: [{
        _id: '1',
        name: 'Category 1'
      }, {
        _id: '2',
        name: 'Category 2'
      }
      ],
      stock: 100,
      averageRating: 4.5,
      reviewCount: 120,
      images: ['https://loremflickr.com/400/400?lock=2813359439613700', 'https://loremflickr.com/400/400?lock=2813359439613700'],
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      _id: '3',
      name: 'Product 3',
      description: 'This is another sample product description.',
      price: 15.99,
      category: [{
        _id: '1',
        name: 'Category 1'
      }, {
        _id: '2',
        name: 'Category 2'
      }
      ],
      stock: 100,
      averageRating: 4.5,
      reviewCount: 120,
      images: ['https://loremflickr.com/400/400?lock=2813359439613700', 'https://loremflickr.com/400/400?lock=2813359439613700'],
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      _id: '4',
      name: 'Product 4',
      description: 'This is another sample product description.',
      price: 15.99,
      category: [{
        _id: '1',
        name: 'Category 1'
      }, {
        _id: '2',
        name: 'Category 2'
      }
      ],
      stock: 100,
      averageRating: 4.5,
      reviewCount: 120,
      images: ['https://loremflickr.com/400/400?lock=2813359439613700', 'https://loremflickr.com/400/400?lock=2813359439613700'],
      updatedAt: new Date(),
      createdAt: new Date()
    },
  ]
  return (
    <div className='relative '>
      <div className="container flex flex-col items-center justify-center text-center mx-auto px-5 overflow-hidden">
        <HeaderSection title={t('popular_drinks')} />
        <ProductsWrapper products={products} type='popular' />
      </div>
    </div>
  )
}
