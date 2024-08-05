"use server";

import { cookies } from "next/headers";

export async function POST(req) {
    const jwt = cookies().get("token");

    if (jwt) {
        const formData = await req.formData();

        const data =
            "userId=" +
            encodeURIComponent(formData.get("userId")) +
            "&trainingId=" +
            encodeURIComponent(formData.get("trainingId"))
            
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/putTrainingPresence`,{
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + jwt.value,
            },
            cache: "no-store",
            body: data,
        })

        const response = await request.json()

        if (!request.ok) {
            return new Response(response, {
                status: 400,
            });
        }

        return Response.json(response)
    }
}
