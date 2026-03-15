'use client'
import { Link, usePathname } from '@/i18n/routing'
import { useHeaderStore } from '@/store/ui/useHeaderStore'
import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { X } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { headerLinks } from '@/constants/header.constants'

export default function MobileMenu() {
    const { isOpen, toggle } = useHeaderStore()
    const locale = useLocale()
    const t = useTranslations()
    const pathname = usePathname()
    useGSAP(() => {
        gsap.set('.mobile-menu', {
            xPercent: locale === 'ar' ? 100 : -100,
            opacity: 0,
        })
    }, [locale])
    useGSAP(() => {
        const offScreenX = locale === 'ar' ? 100 : -100

        gsap.to('.mobile-menu', {
            xPercent: isOpen ? 0 : offScreenX,
            opacity: isOpen ? 1 : 0,
            duration: 1,
            ease: 'power4.out',
            overwrite: 'auto',
        })
    }, [isOpen, locale])

    return (
        <>
            <div className={`overlay fixed top-0 left-0 w-full h-full flex justify-center z-9998 lg:hidden transition-all duration-300 bg-black/30 ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => isOpen && toggle()} />
            <div className={`mobile-menu fixed top-0 ${locale === 'ar' ? 'right-0' : 'left-0'} opacity-0 flex justify-center lg:hidden bg-(--primary)/80 h-dvh z-9999 backdrop-blur-2xl w-60 max-w-[80%]`}>
                <button className='absolute top-6 right-6 text-white cursor-pointer hover:rotate-180 transition-all duration-300' title='close' type='button' onClick={() => toggle()}>
                    <X />
                </button>
                <div className="links flex flex-col items-center justify-center gap-6">
                    {
                        headerLinks.map((link) => {
                            return <Link href={link.href} key={link.label} className={`font-semibold md:text-lg text-base hover:text-(--white-6) transition-all duration-300 ${pathname === link.href ? 'text-(--white-6)' : 'text-white'}`}>
                                {t(`header.links.${link.label}`)}
                            </Link>
                        })
                    }
                </div>
            </div>
        </>
    )
}
