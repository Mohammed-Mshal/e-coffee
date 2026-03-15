'use client'
import { Link } from '@/i18n/routing'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Banner() {
  const [searchQuery, setSearchQuery] = useState('')

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.fromTo('.cup-image', {
      opacity: 0,
      scale: 0,
      x: 200,
      y: 100
    }, {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: 0.5,
      ease: 'elastic.out(.9, 0.8)'
    })
    tl.fromTo('.cup-image', {
      x: 0,
      y: 0,
      scale: 1,
      rotation: -45
    }, {
      y: 800,
      x: -window.innerWidth + 120,
      rotation: 60,
      scale: 1.2,
      ease: 'power2',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=800',
        scrub: 3,
      }
    })
    gsap.from('.banner .container', {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 1,
      ease: 'power3.out',
      stagger: 0.3
    })
  })
  return (
    <div className="banner relative">
      <div className="cup-image flex absolute -top-10 -right-10 -rotate-61 -z-10">
        <Image src={'/cup-coffee.svg'} alt='Cup-Image' className='w-auto h-auto object-contain' height={319.69} width={319.69} loading='lazy' />
      </div>
      <div className="spot-light w-[383.21px] h-[298.84px] absolute top-10 -right-40 -rotate-40 bg-(--primary-transparent) blur-[59.35px] rounded-full" />
      <div className="container flex flex-col gap-9 items-center justify-center lg:max-w-167.5! text-center mx-auto px-5">
        <form className='flex items-center gap-3 rounded-[99px] bg-white px-6 py-3 w-full max-w-[80%] shadow-[0px_2px_7.6px_rgba(0,0,0,0.3)]'>
          <Link href={`/products?search=${searchQuery}`} className="text-black cursor-pointer" title='search'>
            <Search size={24} />
          </Link>
          <input type="text" placeholder="What do you want to drink today ?" className="border-none outline-none w-full" onChange={(e) => setSearchQuery(e.target.value)} />
        </form>
        <div className="flex flex-col lg:gap-8 md:gap-6 gap-4 items-center justify-center">
          <h1 className='xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold text-(--dark)'>
            Coffee, Just a Tap Away
          </h1>
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className='lg:text-lg text-base font-medium m-0'>
              Browse nearby cafés, choose your drink, and we’ll deliver it fast.
            </p>
            <Link href={'/products'} className="custom-button3">
              Browse Cafés
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
