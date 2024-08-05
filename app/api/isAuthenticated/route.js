'use server'

import singlePassValidate from '@/src/validate/singlePassValidate'
import { cookies } from 'next/headers'

export async function GET(req) {
    const jwt = cookies().get('token')
    const user = cookies().get('context')

    const request = await singlePassValidate(jwt)
    
    const role = await request.json()
    
    if(request.ok){
        let request

        if(role.role == 'common' || role.role == 'admin'){
            request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.value}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jwt.value
                },
                cache: 'no-store',
            })
        }

        if(role.role == 'manager'){
            request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/managers/${user.value}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jwt.value
                },
                cache: 'no-store',
            })
        }
    
        const response = await request.json()
        
        if(request.ok){
            response.role = role.role
            
            return Response.json(response)
        }
    }

    return Response.json('Usuário não encontrado', {
        status: 404
    })
}
