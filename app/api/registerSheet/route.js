"use server";

import { cookies } from "next/headers";

export async function POST(req) {
  const jwt = cookies().get("token");
  const user = cookies().get("context");

  if (jwt) {
    const formData = await req.formData();

    const data =
        "rating=" +
        encodeURIComponent(formData.get("rating")) +
        "&quest1=" +
        encodeURIComponent(formData.get("quest1")) +
        "&quest2=" +
        encodeURIComponent(formData.get("quest2")) +
        "&quest3=" +
        encodeURIComponent(formData.get("quest3")) +
        "&suggestion=" +
        encodeURIComponent(formData.get("suggestion")) +
        "&user=" +
        encodeURIComponent(user.value) +
        "&training=" +
        encodeURIComponent(formData.get("training")) +
        "&present=" +
        encodeURIComponent(formData.get("present"))
        
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registerSheet`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + jwt.value,
        },
        cache: "no-store",
        body: data,
    });

    const response = await request.json();

    if (!request.ok) {
        return new Response(response, {
            status: 400,
        });
    }

    return Response.json(response);
    }
}
