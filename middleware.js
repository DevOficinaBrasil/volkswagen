import { cookies } from "next/headers";
import { userIsLoggedInMiddleware, adminIsLoggedInMiddleware, redirectIfLoggedMiddleware, managerIsLoggedInMiddleware } from '@/middlewares';
import { NextResponse } from 'next/server';

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
          source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
          missing: [
            { type: 'header', key: 'next-router-prefetch' },
            { type: 'header', key: 'purpose', value: 'prefetch' },
          ],
        },
     
        {
          source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
          has: [
            { type: 'header', key: 'next-router-prefetch' },
            { type: 'header', key: 'purpose', value: 'prefetch' },
          ],
        },
     
        {
          source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
          has: [{ type: 'header', key: 'x-present' }],
          missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
        },
    ],
}

export async function middleware(req) {
    const cookiesStore = cookies()

    let token = cookiesStore.get('token')
    let id = cookiesStore.get('context')

    if(!token){ token = '' }

    const url = req.nextUrl.clone()
    
    // Redirecionamento caso o usuário esteja logado
    if (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/cadastro')){
      return redirectIfLoggedMiddleware(token, url)
    }
    
    // Redireciona caso o usuário esteja logado
    if (req.nextUrl.pathname.startsWith('/users')){
      return userIsLoggedInMiddleware(token, id, url)
    }

    // Redireciona caso o usuário não seja uma concessionária
    if (req.nextUrl.pathname.startsWith('/concessionaria')){
      return managerIsLoggedInMiddleware(token, url)
    }

    // Redireciona caso o usuário não seja um administrador
    if (req.nextUrl.pathname.startsWith('/admin')){
      return adminIsLoggedInMiddleware(token, url)
    }
}
