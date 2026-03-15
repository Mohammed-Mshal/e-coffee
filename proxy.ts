import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server"
import { routing } from "./i18n/routing";
import { ErrorResponse } from "./utils/apiResponse";
import { ratelimit } from "./lib/ratelimit";
import { verifySession } from "./lib/session";
const VALID_KEYS = ["app_mobile_123", "web_client_456"]

const intlMiddleware =  createMiddleware(routing);
export default async function proxy(request: NextRequest) {
   if (request.nextUrl.pathname.startsWith('/api/')) {
      const apiKey = request.headers.get('x-api-key')

      // TODO: Implement proper authentication and rate limiting  
      // Rate Limit and API Key Check (Placeholder) commented out for now, as it may interfere with development and testing. Implement as needed.
      // if (!apiKey || !VALID_KEYS.includes(apiKey)) {
      //    return NextResponse.json(
      //       ErrorResponse("Unauthorized", "Invalid API key"), {
      //       status: 401
      //    })
      // }
      // const { success } = await ratelimit.limit(apiKey)
      // if (!success) {
      //    return NextResponse.json(
      //       ErrorResponse("Rate limit exceeded", "Too many requests"), {
      //       status: 429
      //    })
      // }
   }
   if(request.nextUrl.pathname.includes('/auth/')) {
      const isLoggedIn=await verifySession()
      if(isLoggedIn){
         return NextResponse.redirect(new URL('/', request.url))
      }
   }
   return intlMiddleware(request)
}
export const config = {
   matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}