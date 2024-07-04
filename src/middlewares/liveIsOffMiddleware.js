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
  let live = false;
  // console.log(response);
  if (request.ok) {
    for (let i = 0; i < response.length; i++) {
      let training = response[i];
      if (training.on_live == "1") {
        // console.log(training.on_live);
        // Se você deseja retornar true e sair do loop ao encontrar um "1", use return true;
        return true;
      }
    }
  }

  return false;
}
