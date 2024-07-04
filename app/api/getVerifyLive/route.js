import React from "react";

export async function GET(req) {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/trainings`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const response = await request.json();

  if (request.ok) {
    response.map((training) => {
      if (training.on_live == "1") {
        return Response.json(true, 200);
      }
    });
  }

  return Response.json(false, 404);
}
