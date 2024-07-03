"use server";

import { cookies } from "next/headers";
import UserContext from "@/src/contexts/UserContext";

export async function POST(req) {
  const formData = await req.formData();

  const data =
    "cep=" +
    encodeURIComponent(formData.get("cep")) +
    "&id=" +
    encodeURIComponent(formData.get("id")) +
    "&city=" +
    encodeURIComponent(formData.get("city").toLowerCase()) +
    "&state=" +
    encodeURIComponent(formData.get("state")) +
    "&street=" +
    encodeURIComponent(formData.get("street")) +
    "&number=" +
    encodeURIComponent(formData.get("number")) +
    "&complement=" +
    encodeURIComponent(formData.get("complement"));
  // // console.log(process.env.);
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/updateAddress`,
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
