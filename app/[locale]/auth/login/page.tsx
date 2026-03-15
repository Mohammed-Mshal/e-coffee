'use client'
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginSchema } from '@/lib/validators';
import { useLocale } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
    const locale = useLocale()
    const { serverError, login } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    })
    return (
        <div className='grid grid-cols-2 h-dvh '>
            <div className={`left-side max-h-full overflow-hidden relative flex items-center`} >
                <div className={`h-full w-full max-w-200 flex absolute top-0 ${locale === 'ar' ? '-scale-100 right-0' : 'scale-100 left-0 '}`}>
                    <Image src={'/auth-bg.svg'} alt='AuthBG' width={0} height={0} className='w-full h-auto object-cover object-right' />
                </div>
                <div className="image-coffee z-10 max-w-full">
                    <Image src="/CoffeeImage.svg" alt="CoffeeImage" width={0} height={0} className='w-full h-auto object-contain' />
                </div>
            </div>
            <div className="right-side flex items-center justify-center">
                <div className="wrapper-form-login min-w-125 py-5">
                    <div className="header-form flex flex-col gap-6 items-center mb-6">
                        <div className="logo w-51 h-19.5 flex">
                            <Image src={'/buna-logo.svg'} alt='Logo' width={200} height={48} className='w-full h-full object-contain' />
                        </div>
                        <h2 className='title xl:text-[32px] lg:text-3xl text-2xl w-full'>
                            <span className='font-semibold'>
                                Welcome Back,
                            </span>
                            <br />
                            Please login to your account
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit(login)} className='flex flex-col gap-4'>
                        <div className="form-group">
                            <label className="base-label" htmlFor='email'>
                                Email
                            </label>
                            <div className="wrapper-input">
                                <input type="email" id='email' placeholder='Email' {...register("email")} />
                            </div>
                            {
                                errors.email &&
                                <div className="base-error">
                                    {errors.email.message}
                                </div>
                            }
                        </div>
                        <div className="form-group">
                            <label className="base-label" htmlFor='password'>
                                Password
                            </label>
                            <div className="wrapper-input">
                                <input type="password" id='password' placeholder='Password'{...register("password")} />
                            </div>
                            {
                                errors.password &&
                                <div className="base-error">
                                    {errors.password.message}
                                </div>
                            }
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <div className=''>
                                Don`t have Account? <Link href={'/auth/signup'} className='font-semibold hover:underline'>Create Account</Link>
                            </div>
                            <div className=''>
                                <Link href={'/auth/forgot-password'} className='font-semibold hover:underline'>Forgot Password?</Link>
                            </div>

                        </div>

                        {serverError && <p className="base-error text-center">{serverError}</p>}

                        <button type="submit" className='base-brown-btn'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
