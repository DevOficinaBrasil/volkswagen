'use server'

import { cookies } from "next/headers"

export async function POST(req) {
    const formData = await req.formData()
    
    const data = 
        'cep='                 + encodeURIComponent(formData.get('cep')) + 
        '&city='               + encodeURIComponent(formData.get('city')) + 
        '&cnpj='               + encodeURIComponent(formData.get('cnpj')) + 
        '&role='               + encodeURIComponent(formData.get('role')) + 
        '&name='               + encodeURIComponent(formData.get('name')) + 
        '&exist='              + encodeURIComponent(formData.get('exist')) + 
        '&email='              + encodeURIComponent(formData.get('email').toLowerCase()) + 
        '&state='              + encodeURIComponent(formData.get('state')) + 
        '&check='              + encodeURIComponent(formData.get('check')) +
        '&phone='              + encodeURIComponent(formData.get('phone')) +
        '&gender='             + encodeURIComponent(formData.get('gender')) + 
        '&street='             + encodeURIComponent(formData.get('street')) +
        '&number='             + encodeURIComponent(formData.get('number')) + 
        '&complement='         + encodeURIComponent(formData.get('complement')) + 
        '&born_at='            + encodeURIComponent(formData.get('born_at')) +
        '&password='           + encodeURIComponent(formData.get('password')) +
        '&document='           + encodeURIComponent(formData.get('document')) +  
        '&fantasy_name='       + encodeURIComponent(formData.get('fantasy_name')) + 
        '&auto_repair_id='     + encodeURIComponent(formData.get('auto_repair_id')) + 
        '&branch_activity='    + encodeURIComponent(formData.get('branch_activity')) + 
        '&auto_repair_cep='    + encodeURIComponent(formData.get('auto_repair_cep')) + 
        '&auto_repair_city='   + encodeURIComponent(formData.get('auto_repair_city')) + 
        '&auto_repair_phone='  + encodeURIComponent(formData.get('auto_repair_phone')) + 
        '&auto_repair_state='  + encodeURIComponent(formData.get('auto_repair_state')) + 
        '&auto_repair_number=' + encodeURIComponent(formData.get('auto_repair_number')) +
        '&auto_repair_street=' + encodeURIComponent(formData.get('auto_repair_street'))
        
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        cache: 'no-store',
        body: data,
    })
    
    const response = await request.json()
    
    if( request.status != 201 ){
        return new Response(response, {
            status: 400,
        })
    }

    /*
    cookies().set({
        name: 'context',
        value: response.user_id,
        path: '/',
        sameSite: 'lax',
        httpOnly: false, // Temporariamente para visualização em ferramentas de desenvolvimento
        secure: false // true em ambientes de produção que usam HTTPS
    })

    cookies().set({
        name: 'token',
        value: response.token,
        path: '/',
        sameSite: 'lax',
        httpOnly: false, // Temporariamente para visualização em ferramentas de desenvolvimento
        secure: false // true em ambientes de produção que usam HTTPS
    })
    */
    
    return Response.json(response)
}
