'use server'

import { cookies } from 'next/headers'

export async function GET() {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/training/active`, {
            method: 'GET',
            cache: 'no-store',
        })
        
        const response = await request.json()

        if( request.status != 200 ){
            return new Response(response, {
                status: 401,
            })
        }
        
        return Response.json(response)
}
