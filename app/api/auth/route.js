"use server";

import { cookies } from "next/headers";
import UserContext from "@/src/contexts/UserContext";

export async function POST(req) {
  const formData = await req.formData();

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_SINGLEPASS_URL}/api/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
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
