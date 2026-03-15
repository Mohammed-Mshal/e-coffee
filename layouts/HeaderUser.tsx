import { Link } from '@/i18n/routing'
import Image from 'next/image'
import MobileMenu from '@/components/Header/MobileMenu'
import HeaderLinks from '@/components/Header/HeaderLinks'
import HeaderActions from '@/components/Header/HeaderActions'

export default function HeaderUser() {
  return (
    <header className='header'>
      <div className="container fixed top-0 left-1/2 -translate-x-1/2 z-999 px-5">
        <div className="header-container container mx-auto">
          <Link href={'/'} className="logo h-auto md:w-36 w-24">
            <Image src={'/Logo.svg'} alt='Logo' width={144} height={48} className='w-auto h-auto' loading='eager' />
          </Link>
          <HeaderLinks />
          <HeaderActions />
        </div>
      </div>
      <MobileMenu />
    </header >
  )
}
