import { NextResponse } from 'next/server';
import singlePassValidate from '../validate/singlePassValidate';

export default async function adminIsLoggedInMiddleware(token, url){
    url.pathname = '/users/dashboard'

    const request = await singlePassValidate(token)
    
    const response = await request.json()

    if ( request.status != 200 || response.role != 'admin' ){
        return NextResponse.redirect(url)
    }

    return NextResponse.next();
}