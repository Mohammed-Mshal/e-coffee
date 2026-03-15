/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only"
import { JWTPayload, jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const key = new TextEncoder().encode(process.env.COOKIE_KEY || "default_cookie_key")

export const encrypt = async (payload: any) => {
    return await new SignJWT(payload)
        .setIssuedAt()
        .setExpirationTime('1day')
        .setProtectedHeader({ alg: 'HS256' })
        .sign(key)
}

export const decrypt = async (session: string | undefined): Promise<JWTPayload | null> => {
    try {
        if (!session || typeof session !== 'string' || session.trim() === '') return null

        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256']
        })
        return payload
    } catch (error) {
        console.log(error);
        return null
    }
}


export const createSession = async (userId: string, role: 'admin' | 'user') => {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, role });

    (await cookies()).set('session', session, {
        httpOnly: true,
        expires,
        sameSite: 'lax',
        path: '/'
    })
}

export const verifySession = async () => {
    const jwt = (await cookies()).get('session')?.value
    if (!jwt) return null
    const session = await decrypt(jwt)
    return session
}
export const updateCookies = async () => {
    const jwt = (await cookies()).get('session')?.value
    if (!jwt) return null
    const session = await decrypt(jwt) as JWTPayload
    if (!session) return null
    const newExpired = new Date(Date.now() + 24 * 60 * 60 * 1000)
    session.expires = newExpired;
    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        expires: newExpired as Date,
        httpOnly: true,
        value: await encrypt(session)
    })
    return res
}

export const deleteSession = async () => {
    (await cookies()).delete('session')
}