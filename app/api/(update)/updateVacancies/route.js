'use server'

import { cookies } from 'next/headers'

export async function PATCH(req) {
    const jwt = cookies().get('token')

    if(jwt){
        const infos =  await req.formData()
        
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/vacancies/${infos.get('id')}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt.value,
            },
            body: JSON.stringify({
                vacancies: infos.get('value'),
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
