'use server'

export async function POST(req) {
    const formData = await req.formData()
    const data = 'email=' + encodeURIComponent(formData.get('email')) + 
        '&token=' + encodeURIComponent(formData.get('token')) +
        '&password=' + encodeURIComponent(formData.get('password')) +
        '&password_confirmation=' + encodeURIComponent(formData.get('password_confirmation'))
        
    const request = await fetch(`${process.env.NEXT_PUBLIC_SINGLEPASS_URL}/api/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
        cache: 'no-cache',
    })
    
    const response = await request.json()

    if( request.status != 200 ){
        return new Response(response, {
            status: 401,
        })
    }
    
    return Response.json(response)
}
