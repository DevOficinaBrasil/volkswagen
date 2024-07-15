"use server";

import { cookies } from "next/headers";

export async function GET() {
  const user = cookies().get("context");
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getAllUserInfo/${user.value}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      cache: "no-store",
    }
  );

  const response = await request.json();

  return Response.json(response);
}
