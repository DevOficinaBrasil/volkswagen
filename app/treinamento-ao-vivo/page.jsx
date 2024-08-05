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

  React.useEffect(() => {
    const postPresence = async (trainingId) => {
      console.log(training)
      const formData = new FormData();

      formData.set("userId", localStorage.getItem("user_id"))
      formData.set("trainingId", training.id)

      await fetch("/api/addPresence",{
        method: "POST",
        body: formData,
      });
    };

    training.id && postPresence();
  }, [training]);

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
                <Typography variant="h4" className="sm:text-white font-bold mb-5" sx={{ textShadow: '0px 4px 5px rgba(0,0,0,0.25)', paddingRight: '30%' }}>Tema: {training.name}</Typography>
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
                  Chat disponível apenas durante o treinamento ao vivo
                  {/*Mensagens sujeitas a aprovação do administrador*/}
                </Typography>
                {/*<Chat />*/}
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