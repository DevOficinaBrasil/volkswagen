import { NextResponse } from "next/server";
import singlePassValidate from "../validate/singlePassValidate";

export default async function liveIsOffMiddleware() {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/trainings`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const response = await request.json();
  // console.log(response);
  if (request.ok) {
    response.map((training) => {
      if (training.on_live == 1) {
        return true;
      }
      return false;
    });
  }

  return false;
}
