'use server'

import { cookies } from 'next/headers'

export async function GET(req) {
    const jwt = cookies().get('token')
    const user = cookies().get('context')

    if(jwt){
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trainings/${user.value}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + jwt.value
            },
            cache: 'no-store',
        })
        
        const response = await request.json()

        if(request.ok){
            return Response.json(response)
        }

        return Response.json(response,{
            status: 404,
        })
    }
}
