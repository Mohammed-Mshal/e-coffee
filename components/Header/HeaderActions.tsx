'use client'
import { useAuth } from '@/hooks/useAuth'
import { Link, usePathname } from '@/i18n/routing'
import { useUser } from '@/store/useUser'
import React from 'react'
import CartIcon from './CartIcon'
import CustomDropdown from '../CustomDropdown'
import LanguageButton from './LanguageButton'
import { useHeaderStore } from '@/store/ui/useHeaderStore'
import { LogOut, Menu } from 'lucide-react'
import { FaRegUser } from 'react-icons/fa6'
import { useTranslations } from 'next-intl'

export default function HeaderActions() {
    const { logout } = useAuth()
    const { user } = useUser()
    const { toggle } = useHeaderStore()
    const t = useTranslations()
    return (
        <div className="actions flex items-center gap-3">
            {
                !user &&
                <>
                    <Link
                        href={'/auth/login'}
                        className='custom-button2'>
                        {t('header.login')}
                    </Link>
                    <Link
                        href={'/auth/signup'}
                        className='custom-button1'>
                        {t('header.signup')}
                    </Link>
                </>
            }
            {
                user &&
                <>
                    <CartIcon />
                    <CustomDropdown>
                        <CustomDropdown.Button>
                            <div className='p-1 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300'>
                                <FaRegUser size={18} />
                            </div>
                        </CustomDropdown.Button>
                        <CustomDropdown.Items>
                            <Link href={'/profile'} className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-all duration-300'>
                                <FaRegUser size={18} />
                                {t('header.profile')}
                            </Link>
                            <button onClick={logout} type='button' className='flex items-center gap-2 px-4 py-2 hover:bg-red-500 transition-all duration-300  cursor-pointer text-red-500 hover:text-white'>
                                <LogOut />
                                {t('header.logout')}
                            </button>
                        </CustomDropdown.Items>
                    </CustomDropdown>
                </>
            }
            <LanguageButton />
            <button
                type='button'
                onClick={() => toggle()}
                title='menu'
                className='flex md:hidden text-white cursor-pointer'>
                <Menu size={26} />
            </button>
        </div>
    )
}
