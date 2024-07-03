"use server";

import { cookies } from "next/headers";
import UserContext from "@/src/contexts/UserContext";

export async function POST(req) {
  const formData = await req.formData();

  const data =
    "name=" +
    encodeURIComponent(formData.get("name")) +
    "&email=" +
    encodeURIComponent(formData.get("email").toLowerCase()) +
    "&phone=" +
    encodeURIComponent(formData.get("phone")) +
    "&gender=" +
    encodeURIComponent(formData.get("gender")) +
    "&born_at=" +
    encodeURIComponent(formData.get("born_at")) +
    "&password=" +
    encodeURIComponent(formData.get("password")) +
    "&document=" +
    encodeURIComponent(formData.get("document"));
  // // console.log(process.env.);
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/updateUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    }
  );

  const response = await request.json();

  // // console.log("user: " + JSON.stringify(response));

  if (request.status != 200) {
    return new Response(response, {
      status: 401,
    });
  }

  return Response.json(response);
}
