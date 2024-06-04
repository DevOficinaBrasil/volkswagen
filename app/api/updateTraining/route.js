'use server'

import { cookies } from 'next/headers'

export async function PUT(req) {
    const jwt = cookies().get('token')

    if(jwt){
        const training =  await req.formData()

        const request = await fetch(`https://apivw.oficinabrasil.com.br/api/training/${training.get('id')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + jwt.value
            },
            body: 'concessionaireId=' + encodeURIComponent(training.get('concessionaireID'))
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
