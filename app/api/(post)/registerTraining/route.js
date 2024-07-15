"use server";

import singlePassValidate from "@/src/validate/singlePassValidate";
import { cookies } from "next/headers";

export async function POST(req) {
  const jwt = cookies().get("token");

  if (jwt) {
    const validate = await singlePassValidate(jwt);

    const validateResponse = await validate.json();

    if (validate.status == 200 && validateResponse.role != "common") {
      return Response.json(
        "Apenas usuários podem se cadastrar em um treinamento",
        {
          status: 401,
        }
      );
    }

    const training = await req.formData();

    const data =
      "concessionaireId=" +
      encodeURIComponent(training.get("concessionaireID")) +
      "&trainingId=" +
      encodeURIComponent(training.get("trainingID")) +
      "&userId=" +
      encodeURIComponent(training.get("userId"));

    const request = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/training`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + jwt.value,
        },
        cache: "no-store",
        body: data,
      }
    );

    const response = await request.json();

    if (request.ok) {
      return Response.json(response);
    }

    return Response.json(response, {
      status: 404,
    });
  }
}
