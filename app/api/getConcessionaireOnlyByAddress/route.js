"use server";

import { cookies } from "next/headers";
import UserContext from "@/src/contexts/UserContext";

export async function POST(req) {
  const formData = await req.formData();

  const data =
    "city=" +
    encodeURIComponent(formData.get("city")) +
    "&state=" +
    encodeURIComponent(formData.get("state"));
  // console.log(process.env.);
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getConcessionaireOnlyByAddress`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    }
  );

  const response = await request.json();

  // console.log("user: " + JSON.stringify(response));

  if (request.status != 200) {
    return new Response(response, {
      status: 401,
    });
  }

  return Response.json(response);
}
