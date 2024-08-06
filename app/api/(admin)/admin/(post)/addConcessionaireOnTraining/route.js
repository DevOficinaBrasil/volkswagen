'use server'

import { cookies } from 'next/headers'

export async function POST(req) {
    const jwt = cookies().get('token')

    if(jwt){
        const infos =  await req.formData()
        return Response.json(infos.get('concessionaire_id'))
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/vacancies`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt.value,
            },
            body: JSON.stringify({
                concessionaire_id: infos.get('concessionaire_id'),
                training_id: infos.get('training_id'),
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
