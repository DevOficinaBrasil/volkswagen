"use client";
// @refresh reset

import * as React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import SubscribeModal from "@/app/components/subscribe";
import moment from "moment";
import kombiHeader from "@/images/kombi.png";
import { ToastContainer } from "react-toastify";

export default function RedirectPage() {
  const [trainings, setTrainings] = React.useState([]);
  const [training, setTraining] = React.useState([]);

  React.useEffect(() => {
    const getTrainings = async () => {
      const request = await fetch("/api/trainings", {
        method: "GET",
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
    };

    getTrainings();
  }, []);

  function converterData(dataStr) {
    // Define um array com os nomes dos meses em português
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    // Dividir a string de data e criar um objeto Date utilizando UTC
    const partes = dataStr.split("-");
    const data = new Date(Date.UTC(partes[0], partes[1] - 1, partes[2]));

    // Extrair o dia, mês e ano
    const dia = data.getUTCDate();
    const mes = data.getUTCMonth();
    const ano = data.getUTCFullYear();

    // Retorna a data formatada
    return `Dia ${dia} de ${meses[mes]} de ${ano}`;
  }
  return (
    <main className="flex flex-col gap-5 px-5">
      <ToastContainer />
      <Box className="relative flex flex-col justify-center items-center lg:py-20">
        <Typography
          variant="h3"
          className="text-blue-900 font-bold"
          gutterBottom
        >
          Seu cadastro foi realizado com sucesso
        </Typography>
        {training && (
          <Typography
            variant="h5"
            className="text-blue-900 font-bold"
            gutterBottom
          >
            {training && training.name}
          </Typography>
        )}
        {training && (
          <Typography variant="h6" className="text-blue-900">
            {moment(training.date).format("DD/MM/YYYY")} - às 19h30
          </Typography>
        )}
        {training && (
          <Typography variant="h6" className="text-blue-900">
            Contamos com sua presença.
          </Typography>
        )}
      </Box>

      <Box className="lg:px-40">
        <Grid
          className="px-44"
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {/* <Grid item xs={6}>
            <Box className="flex flex-col items-center gap-5">
              <Box className="bg-volks-grey-100 rounded-md font-bold py-1 px-3 shadow-md">
                <Typography className="text-volks-blue-900 font-bold ">
                  Próximo treinamentos
                </Typography>
              </Box>
              <Box className=" hidden bg-slate-200 shadow shadow-slate-500 rounded-xl w-full font-bold text-blue-900 py-1 px-5 mx-10 max-h-32 overflow-y-auto">
                {trainings.map((training, key) => (
                  <Box key={key} className="my-3">
                    <span className="">
                      Data: {moment(training.date).format("DD/MM/YYYY")} -
                    </span>
                    <span className="font-normal"> {training.name}</span>
                  </Box>
                ))}
              </Box>

              <Box className="bg-blue-900 flex flex-col gap-y-5 w-full rounded-xl py-10 px-5 shadow shadow-slate-500">
                <Box className="text-white text-center font-bold text-2xl lg:text-4xl">
                  Treinamento
                </Box>
                <Box className="text-center text-white font-semibold lg:text-3xl">
                  <Typography variant="h5">{training.name}</Typography>
                </Box>
                <Box className="text-center text-white lg:text-3xl text-xl">
                  <Typography>
                    {moment(training.date).format("DD/MM/YYYY")} - às 19:30
                  </Typography>
                </Box>

                <Box className="w-full flex justify-center">
                  <SubscribeModal content={training} type={"insert"}>
                    Fazer Inscrição
                  </SubscribeModal>
                </Box>
              </Box>
            </Box>
          </Grid> */}
          <Grid item xs={12}>
            <Box className="flex flex-col items-center gap-5">
              <Box className="bg-volks-blue-900 rounded-md font-bold py-1 px-3 shadow-md">
                <Typography className="text-volks-grey-100 font-bold">
                  Cronograma
                </Typography>
              </Box>

              <Box className="bg-slate-200 shadow-lg rounded-tr-xl rounded-bl-xl flex flex-col gap-y-5 justify-center text-blue-900 w-full lg:px-10 px-4 py-12">
                <Box className="w-full flex items-center justify-between text-xl">
                  <Box className="font-bold ">19h30</Box>

                  <Box className="font-extralight flex flex-col items-center">
                    Início
                  </Box>

                  <Box className="font-bold">60 min</Box>
                </Box>

                <Divider className="border-blue-900" />

                <Box className="w-full flex items-center justify-between text-xl">
                  <Box className="font-bold ">20h30</Box>

                  <Box className="font-extralight flex flex-col items-center">
                    Intervalo
                  </Box>

                  <Box className="font-bold">20 min</Box>
                </Box>

                <Divider className="border-blue-900" />

                <Box className="w-full flex items-center justify-between text-xl">
                  <Box className="font-bold ">21h20</Box>

                  <Box className="font-extralight flex flex-col items-center text-center">
                    Emissão dos certificados
                  </Box>

                  <Box className="font-bold">30 min</Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
