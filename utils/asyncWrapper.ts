import { NextRequest } from "next/server"
type RouteContext = {
    params: Promise<Record<string, string>>
}
export const asyncWrapper = <T extends NextRequest, R>(
    fn: (request: T, ctx?: RouteContext) => Promise<R>) => {
    return async (request: T, ctx?: RouteContext): Promise<R | Response> => {
        try {
            return await fn(request, ctx)
        } catch (error: unknown) {
            console.error('Error:', error)
            return new Response('Internal Server Error', { status: 500 })
        }
    }
}