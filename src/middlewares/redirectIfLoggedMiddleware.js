import { NextResponse } from 'next/server';
import singlePassValidate from '../validate/singlePassValidate';

export default async function redirectIfLoggedMiddleware(token, url){
    const request = await singlePassValidate(token)
    
    const response = await request.json()

    if ( request.status == 200 && response.role == 'common' ){
        url.pathname = '/users/dashboard'

        return NextResponse.redirect(url)
    }

    if ( request.status == 200 && response.role == 'admin' ){
        url.pathname = '/admin'

        return NextResponse.redirect(url)
    }

    if ( request.status == 200 && response.role == 'manager' ){
        url.pathname = '/concessionaria/dashboard'

        return NextResponse.redirect(url)
    }

    return NextResponse.next();
}