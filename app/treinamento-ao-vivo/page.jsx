"use client";

import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import "./Chat.css";
import { useContext } from "react";
import UserContext from "@/src/contexts/UserContext";
import useContextCustom from "../hooks/useContextCustom";
import { Box, Button, Grid, Typography } from "@mui/material";
import banner from "@/images/bannerVW.jpg";
import Image from "next/image";
import Link from "next/link";
import Layout from "../layout/Layout";
import { AddTask, CarRepair, CardMembership } from "@mui/icons-material";
function TreinamentoAoVivo() {
  const [training, setTraining] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [commonUserId, setCommonUserId] = useState();

  useEffect(() => {
    // common_user_id = localStorage.getItem("user_id");
    setCommonUserId(localStorage.getItem("user_id"));
    const getTrainings = async () => {
      const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trainings`,{
        method: "GET",
        cache: 'no-store',
      });

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
    <Layout>
      <Box>
        <Box className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Typography variant="h3" className="font-bold">Treinamento</Typography>
          <Box className="relative pl-10 pr-3 py-1 uppercase text-white rounded-2xl" sx={{
            backgroundColor: '#00C4FF',
            display: 'flex',
            alignItems: 'center',
            '::before': { 
              position: 'absolute',
              content: '""',
              left: 10,
              width: '12px',
              height: '12px',
              borderRadius: 5,
              backgroundColor: 'white',
            }
          }}>
            <Typography className="font-bold">Ao vivo</Typography>
          </Box>
        </Box>
        <Box className="my-20">
          <Grid container columns={{ xs: 2, sm: 8, md: 12 }} gap={{ xs: 5, sm: 0 }}>
            <Grid item xs={7}>
              <Box className="aspect-video rounded-2xl" sx={{
                position: 'relative',
                '::before': {
                  xs: {
                    position: 'absolute',
                    content: '""',
                  },
                  sm: {
                    position: 'absolute',
                    content: '""',
                    width: '80%',
                    height: '110%',
                    background: 'linear-gradient(45deg, rgba(0,42,94,1) 0%, rgba(0,86,182,1) 100%)',
                    left: -25,
                    top: -32,
                    zIndex: -1,
                    borderRadius: 15
                  }
                }
              }}>
                <Typography variant="h4" className="sm:text-white font-bold mb-5">Tema: {training.name}</Typography>
                <iframe src={training.live_url}
                  frameborder="0"
                  allow="autoplay;
                  fullscreen;
                  picture-in-picture;
                  clipboard-write"
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: 15 }}
                >
                </iframe>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box className="sm:px-10">
                <Typography className="text-center font-bold uppercase text-sm">
                  Mensagens sujeitas a aprovação do administrador
                </Typography>
                <Chat />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box className="flex flex-col sm:flex-row gap-10">
            <Box>
              <Link href="/documents/A importância do Óleo Certo para o motor - Maxi Performance 1.pdf" target="_blank">
                <Box className="flex items-center gap-5">
                  <Box className="p-5 bg-neutral-200 rounded-2xl">
                    <CarRepair sx={{ fontSize: 50 }}/>
                  </Box>
                  <Typography>Material Técnico</Typography>
                </Box>
              </Link>
            </Box>
            <Box className="flex items-center gap-5">
              <Box className="p-5 bg-neutral-200 rounded-2xl">
                <AddTask sx={{ fontSize: 50 }}/>
              </Box>
              <Typography>Treinamento 100% exclusivo</Typography>
            </Box>
            <Box className="flex items-center gap-5">
              <Box className="p-5 bg-neutral-200 rounded-2xl">
                <CardMembership sx={{ fontSize: 50 }}/>
              </Box>
              <Button href={`/users/ficha/${training.id}`} className="text-black shadow-md bg-gradient-to-r from-gray-200 to-bg-white font-light px-5">Retirar meu Certificiado</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default TreinamentoAoVivo;