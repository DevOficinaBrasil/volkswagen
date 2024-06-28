export default async function singlePassValidate(token){
  if(token){
    const request = await fetch(`${process.env.NEXT_PUBLIC_SINGLEPASS_URL}/api/verify`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token.value,
      },
      cache: 'no-store',
    })
    
    return request
  }

  return Response.json(null, {
    status: 400
  })
}