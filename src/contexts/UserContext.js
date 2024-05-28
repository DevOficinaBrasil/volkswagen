"use client"

import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userData, setuserData] = useState(null)

    useEffect(() => {
        const verify = async () => {
            const request = await fetch('/api/isAuthenticated',{
                method: 'GET',
            })

            const response = await request.json()

            if(request.ok){
                setIsAuthenticated(true)
                setuserData(response)
            }
        }
        verify()
    }, [isAuthenticated])
    
    const logout = async () => {
        const request = await fetch('/api/logout',{
            method: 'POST',
        })

        if(request.ok){
            setIsAuthenticated(false)
            router.push('/')
        }
    }
    
    return (
        <UserContext.Provider value={{ isAuthenticated, userData, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
