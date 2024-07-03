"use client";

import UserContext from "@/src/contexts/UserContext";
import { useContext } from "react";

export default function useContextCustom() {
  const { userData } = useContext(UserContext);
  // // console.log(userData);
  return userData;
}
