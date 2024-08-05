'use server'

import { cookies } from 'next/headers'

export async function PATCH(req) {
    const jwt = cookies().get('token')

    if(jwt){
        const infos =  await req.formData()
        
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/trainings/${infos.get('trainingId')}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt.value,
            },
            body: JSON.stringify({
                on_live: infos.get('onLive'),
            }),
        });
        
        const response = await request.json()
        
        if(request.ok){
            return Response.json(response)
        }

        return Response.json(response,{
            status: 400,
        })
    }
}
