"use client";

import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import { useContext } from "react";
import UserContext from "@/src/contexts/UserContext";
import useContextCustom from "../hooks/useContextCustom";
import { Button, Typography } from "@mui/material";
function TreinamentoAoVivo() {
  const [training, setTraining] = useState(null);
  const [trainings, setTrainings] = useState();

  useEffect(() => {
    const getTrainings = async () => {
      const request = await fetch(
        "https://apivw.oficinabrasil.com.br/api/trainings",
        {
          method: "GET",
        }
      );

      const response = await request.json();
      setTrainings(response);

      if (request.ok) {
        response.map((training, index) => {
          if (training.active == 1) {
            setTraining(training);
          }
        });
      } else {
        setTrainings(response);
      }
      // // console.log(trainingActive);

      // const data = {
      //   training: trainingActive,
      //   trainings: trainingInactive,
      // };

      // return trainingActive;
    };
    getTrainings();
  }, []);

  useEffect(() => {
    // training && // console.log(training.id);
    const putPresence = async (trainingID) => {
      const request = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/putTrainingPresence",
        {
          method: "POST",
          headers: {
            "Content-Type": "applicattion/json",
          },
          body: JSON.stringify({
            userID: localStorage.getItem("user_id"),
            trainingID: training.id,
          }),
        }
      );

      const response = await request.json();
      // trainingInactive = response;

      // // console.log(trainingActive);
    };
    training && putPresence();
  }, [training]);

  return (
    <div className="container mx-auto my-5">
      <div className="my-3">
        <h2
          // variant="h2"
          className="text-center text-volks-blue-800 font-semibold uppercase text-3xl"
        >
          Treinamento ao vivo
        </h2>

        <h1 className="font-normal text-center uppercase text-2xl">
          {training && training.name}
        </h1>
        <div className="flex flex-row justify-end mt-4">
          <Button
            className="bg-volks-blue-800 rounded-lg hover:bg-volks-blue-800 hover:opacity-50"
            href="/documents/A importância do Óleo Certo para o motor - Maxi Performance 1.pdf"
            download="A importância do Óleo Certo para o motor - Maxi Performance 1.pdf"
          >
            <h1 className="font-normal text-center uppercase text-lg text-white w-fit rounded-xl border-volks-blue-800">
              MATERIAL TÉCNICO
            </h1>
          </Button>
          <div className="w-2"></div>
          {training && (
            <Button
              className="bg-volks-blue-800 rounded-lg hover:bg-volks-blue-800 hover:opacity-50"
              href={`/users/ficha/${training.id}`}
            >
              <h1 className="font-normal text-center uppercase text-lg w-fit text-white  rounded-xl border-volks-blue-800">
                Certificado
              </h1>
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8">
          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            {/* {training.live_url} */}
            {training && training.live_url ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: training.live_url,
                }}
              ></div>
            ) : (
              <iframe
                src={"https://vimeo.com/event/4386223/embed/interaction"}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              ></iframe>
            )}
          </div>
        </div>

        <div className="col-span-4">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default TreinamentoAoVivo;
