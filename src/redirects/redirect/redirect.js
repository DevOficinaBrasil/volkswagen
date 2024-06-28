"use client"

import UserContext from "@/src/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function redirectPage(){
    const { verify } = useContext(UserContext)
    const router = useRouter()

    verify()

    router.push('/users/sucesso')
}