"use client"

import UserContext from "@/src/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function generalRedirectPage(){
    const { verify } = useContext(UserContext)
    const router = useRouter()

    verify()

    router.push('/concessionaria')
}