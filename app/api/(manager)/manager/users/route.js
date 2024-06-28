'use server'

import { cookies } from 'next/headers'

export async function GET(req) {
    const jwt = cookies().get('token')

    if(jwt){
        const { searchParams } =  new URL(req.url)
        
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/users?trainingId=${searchParams.get('training')}&concessionaireId=${searchParams.get('concessionaire')}`, {
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
