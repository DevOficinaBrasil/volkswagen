"use client";

import UserContext from "@/src/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function useRedirectPage() {
  const { verify } = useContext(UserContext);
  const router = useRouter();

  const redirectPage = () => {
    verify();

    router.push("/users/sucesso");
  };
  
  const generalRedirectPage = () => {
    verify();

    router.push("/concessionaria");
  };
  
  const redirectPresent = (id) => {
    verify();

    router.push(`/users/ficha/${id}?present=true`);
  };

  return { redirectPage, generalRedirectPage, redirectPresent };
}
