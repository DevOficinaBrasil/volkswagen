"use server";

import { cookies } from "next/headers";

export async function GET(req) {
  const user = cookies().get("context");
  const jwt = cookies().get("token");

  if (jwt) {
    const { searchParams } = new URL(req.url);

        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify/sheet?training=${searchParams.get("training")}&user=${user.value}`,{
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + jwt.value
            },
            cache: "no-store",
        });

    const response = await request.json();

    if (request.ok) {
        return Response.json(response);
    }

    return Response.json(response, {
        status: 404,
    });
  }
}
