"use server";

import { cookies } from "next/headers";
import UserContext from "@/src/contexts/UserContext";

export async function POST(req) {
  // // console.log(process.env.);
  const formData = await req.formData();
  const data =
    "email=" +
    encodeURIComponent(formData.get("email")) +
    "&password=" +
    encodeURIComponent(formData.get("password"));

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_SINGLEPASS_URL}/api/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    }
  );

  const response = await request.json();

  if (request.status != 200) {
    return new Response(response, {
      status: 401,
    });
  }

  cookies().set({
    name: "context",
    value: response.user_id,
    path: "/",
    sameSite: "lax",
    httpOnly: false, // Temporariamente para visualização em ferramentas de desenvolvimento
    secure: false, // true em ambientes de produção que usam HTTPS
  });

  cookies().set({
    name: "token",
    value: response.token,
    path: "/",
    sameSite: "lax",
    httpOnly: false, // Temporariamente para visualização em ferramentas de desenvolvimento
    secure: false, // true em ambientes de produção que usam HTTPS
  });

  return Response.json(response);
}
