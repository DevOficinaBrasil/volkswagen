'use server'

import { cookies } from 'next/headers'

export async function GET(req) {
    const jwt = cookies().get('token')

    if(jwt){
        const { searchParams } =  new URL(req.url)

        const request = await fetch(`https://apivw.oficinabrasil.com.br/api/getConcessionaireByAddress?state=${searchParams.get('state')}&city=${searchParams.get('city')}&training=${searchParams.get('training')}`, {

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
