import { NextResponse } from 'next/server';
import singlePassValidate from '../validate/singlePassValidate';

export default async function generalIsLogged(token, url){
    const request = await singlePassValidate(token)
    
    const response = await request.json()

    if ( request.status == 200 && response.role == 'common' || request.status == 200 && response.role == 'manager' ){
        return NextResponse.next()
    }
    url.pathname = '/'

    return NextResponse.redirect(url)
}