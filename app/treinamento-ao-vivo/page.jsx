"use client";

import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import "./Chat.css";
import { useContext } from "react";
import UserContext from "@/src/contexts/UserContext";
import useContextCustom from "../hooks/useContextCustom";
import { Button, Grid, Typography } from "@mui/material";
import banner from "@/images/bannerVW.jpg";
import Image from "next/image";
import Link from "next/link";
function TreinamentoAoVivo() {
  const [training, setTraining] = useState(null);
  const [trainings, setTrainings] = useState();
  const [commonUserId, setCommonUserId] = useState();

  useEffect(() => {
    // common_user_id = localStorage.getItem("user_id");
    setCommonUserId(localStorage.getItem("user_id"));
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

  const handleBannerClick = async (id, common_user_id) => {
    const request = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/createBannerData",
      {
        method: "POST",
        headers: {
          "Content-Type": "applicattion/json",
        },
        body: JSON.stringify({
          training_id: id,
          common_user_id: common_user_id,
        }),
      }
    );
  };

  return (
    <div className="container mx-auto my-5">
      <div className="flex flex-row xl:justify-center justify-evenly mt-4 px-5">
        {commonUserId && training && (
          <Link
            href={"https://pecas.vw.com.br/"}
            target="_blank"
            onClick={() =>
              handleBannerClick(training.id, localStorage.getItem("user_id"))
            }
          >
            <Image
              className="shadow-xl"
              src={banner.src}
              width={500}
              height={100}
            />
          </Link>
        )}
      </div>
      <div className="my-3 mt-10">
        <h2
          // variant="h2"
          className="text-center text-volks-blue-800 font-semibold uppercase xl:text-2xl text-md"
        >
          Treinamento ao vivo
        </h2>

        <h1 className="font-normal text-center uppercase  xl:text-2xl text-md">
          {training && training.name}
        </h1>
        <Grid container className="flex flex-row justify-between mt-4 px-5">
          {/* <Grid item xs={12} lg={6}>
            <div className="flex flex-row xl:justify-start justify-evenly mt-4">
              {commonUserId && training && (
                <Link
                  href={"https://pecas.vw.com.br/"}
                  target="_blank"
                  onClick={() =>
                    handleBannerClick(
                      training.id,
                      localStorage.getItem("user_id")
                    )
                  }
                >
                  <Image
                    className="shadow-xl"
                    src={banner.src}
                    width={500}
                    height={100}
                  />
                </Link>
              )}
            </div>
          </Grid> */}
          <Grid item xs={12} lg={12}>
            <div className="flex flex-row xl:justify-end justify-evenly mt-4">
              <Button
                className="bg-volks-blue-800 rounded-lg hover:bg-volks-blue-800 hover:opacity-50 h-fit "
                href="/documents/A importância do Óleo Certo para o motor - Maxi Performance 1.pdf"
                download="A importância do Óleo Certo para o motor - Maxi Performance 1.pdf"
              >
                <h1 className="font-normal text-center uppercase text-lg text-white w-fit h-fit rounded-xl border-volks-blue-800">
                  MATERIAL TÉCNICO
                </h1>
              </Button>
              <div className="w-2"></div>
              {training && (
                <Button
                  className="bg-volks-blue-800 rounded-lg hover:bg-volks-blue-800 hover:opacity-50 h-fit "
                  href={`/users/ficha/${training.id}`}
                  target="_blank"
                >
                  <h1 className="font-normal text-center uppercase text-lg w-fit text-white h-fit  rounded-xl border-volks-blue-800">
                    Certificado
                  </h1>
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        columnSpacing={4}
        className="flex flex-row justify-between mt-4 px-5"
      >
        <Grid item xs={12} lg={8}>
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
        </Grid>

        <Grid item xs={12} lg={4}>
          <Chat />
        </Grid>
      </Grid>
    </div>
  );
}

export default TreinamentoAoVivo;
