import { usePathname, useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import React from 'react'
import { useTranslations } from 'use-intl';
import { Cairo, Poppins } from 'next/font/google'

const CairoFont = Cairo({
    subsets: ["latin"],
    variable: "--font-cairo",
    weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
})
const PoppinsFont = Poppins({
    subsets: ["latin"],
    variable: "--font-cairo",
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
})
export default function LanguageButton() {
    const locale = useLocale();
    const pathname = usePathname()
    const router = useRouter()
    const t = useTranslations();

    return (
        <button className={`font-semibold text-white cursor-pointer ${locale === 'ar' ? PoppinsFont.className : CairoFont.className}`} type='button' onClick={() => {
            console.log(locale);

            router.replace(pathname, { locale: locale === 'ar' ? 'en' : 'ar' });
        }}>
            {
                t('language')
            }
        </button>
    )
}
