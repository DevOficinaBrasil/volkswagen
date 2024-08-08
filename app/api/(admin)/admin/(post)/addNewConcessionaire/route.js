'use server'

import { cookies } from 'next/headers'

export async function POST(req) {
    const jwt = cookies().get('token')

    if(jwt){
        const infos =  await req.formData()
        
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/concessionaire`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt.value,
            },
            body: JSON.stringify({
                cnpj: infos.get('cnpj'),
                fantasy: infos.get('fantasy'),
                manager: infos.get('manager'),
                certify: infos.get('certify'),
                email: infos.get('email'),
                phone: infos.get('phone'),
                dn: infos.get('dn'),

                cep: infos.get('cep'),
                state: infos.get('state'),
                city: infos.get('city'),
                street: infos.get('street'),
                complement: infos.get('neighborhood'),
                number: infos.get('number'),
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
