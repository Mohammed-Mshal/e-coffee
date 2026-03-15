'use client'
import { Link, usePathname } from '@/i18n/routing'

type Props = {
    href: string
    label: string
}

export default function HeaderLink({ href, label }: Props) {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            className={`font-semibold md:text-lg text-base hover:text-(--white-6) transition-all duration-300 
                ${pathname === href ? 'text-(--white-6)' : 'text-white'}`}
        >
            {label}
        </Link>
    )
}