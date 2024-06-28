'use server'

import { cookies } from 'next/headers'

export async function GET(req) {
    const jwt = cookies().get('token')

    if(jwt){
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/trainings`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + jwt.value
            },
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
}
