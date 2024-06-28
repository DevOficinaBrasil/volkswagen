'use server'

import { cookies } from 'next/headers'

export async function POST(req) {
    cookies().delete('token')
    cookies().delete('context')

    return new Response(true,{
        status: 200,
    })
}
