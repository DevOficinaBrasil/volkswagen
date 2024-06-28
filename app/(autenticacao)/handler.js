'use server'

import { cookies } from 'next/headers'

export async function deleteTokens(req) {
    cookies().delete('token')
    cookies().delete('context')

    return true
}
