'use server'

import { cookies } from 'next/headers'

export async function GET(req, { params }) {
    const jwt = cookies().get('token')

    if(jwt){
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/trainings/${params.id}`, {
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
