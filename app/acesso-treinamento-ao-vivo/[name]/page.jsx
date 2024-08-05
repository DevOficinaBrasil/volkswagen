"use client";

import * as React from "react";
import Chat from "../../components/Chat";
import { useContext } from "react";
import UserContext from "@/src/contexts/UserContext";
import useContextCustom from "../../hooks/useContextCustom";
import { Button, Typography } from "@mui/material";
function TreinamentoAoVivo({ params }) {
  const [training, setTraining] = React.useState(null);
  
  React.useEffect(() => {
    const getTrainings = async () => {
      const request = await fetch("/api/getTrainings", {
        method: "GET",
      });

      const response = await request.json();

      if (request.ok) {
        response.map((training, index) => {
          if (training.active == 1) {
            setTraining(training);
          }
        });
      }
    };
    getTrainings();
  }, []);

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
          <Chat username={params.name} />
        </div>
      </div>
    </div>
  );
}

export default TreinamentoAoVivo;
