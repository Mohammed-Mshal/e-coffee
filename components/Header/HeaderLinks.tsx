import React from 'react'
import { getTranslations } from 'next-intl/server'
import HeaderLink from './HeaderLink'
import { headerLinks } from '@/constants/header.constants'

export default async function HeaderLinks() {
    const t = await getTranslations()
    return (
        <div className="links lg:flex hidden items-center gap-6">
            {
                headerLinks.map((link) => (
                    <HeaderLink
                        key={link.label}
                        href={link.href}
                        label={t(`header.links.${link.label}`)}
                    />
                ))
            }
        </div>
    )
}
