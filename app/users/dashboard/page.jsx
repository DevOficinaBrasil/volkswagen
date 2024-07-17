"use client";
// @refresh reset

import * as React from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Title from "../../components/title";
import TrainingCard from "../../components/trainingCard";
import SubscribedCard from "../../components/subscribed";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import Layout from "@/app/layout/Layout";
import Image from "next/image";
import { CardMembership } from "@mui/icons-material";
import moment from "moment";
import PdfTextEditor from "@/app/components/pdfCompnent";

export default function Dashboard() {
  const [trainings, setTrainings] = React.useState([]);
  const [alterButton, setAlterButton] = React.useState(false);
  const [subscribedTrainings, setSubscribedTrainingss] = React.useState([]);
  const [concessionaireTransfer, setConcessionaireTransfer] = React.useState([]);
  const [groupByYear, setGroupByYear] = React.useState({})

  const [verifySubscribed, setVerifySubscribed] = React.useState(null);
  const [verify, setVerify] = React.useState(null);

  React.useEffect(() => {
    const getTrainings = async () => {
      const request = await fetch("/api/trainings", {
        method: "GET",
      });

      const response = await request.json();

      if (request.ok) {
        setTrainings(response);
        setVerify(true);
      } else {
        setTrainings(response);
        setVerify(false);
      }
    };

    getTrainings();
  }, [verify]);

  React.useEffect(() => {
    const getTrainings = async () => {
      const request = await fetch("/api/getSubscribedTrainings", {
        method: "GET",
        cache: "no-cache",
      });

      const response = await request.json();

      if (request.ok) {
        setSubscribedTrainingss(response);
        setVerifySubscribed(true);

        const grouped = response.reduce((acc, item) => {
          const year = new Date(item.date).getFullYear();
          
          if (!acc[year]) {
            acc[year] = [];
          }

          acc[year].push(item);

          return acc;
        }, {});

        setGroupByYear(grouped)
      } else {
        setSubscribedTrainingss(response);
        setVerifySubscribed(false);
      }
    };

    getTrainings();
  }, [verifySubscribed]);

  React.useEffect(() => {
    trainings.map((training) => {
      if (Boolean(parseInt(training.active))) {
        setConcessionaireTransfer(training);

        if (verifySubscribed) {
          subscribedTrainings.map((subTraining) => {
            if (subTraining.id == training.id) {
              setAlterButton(true);
            }
          });
        }
      }
    });
  });

  function TitleTraining({ children }){
    return(
      <Box className="flex items-center justify-center mb-3">
        <Typography variant="h5" className="relative font-bold inline-block" sx={{
          '::before': {
            position: 'absolute',
            content: '""',
            right: -10,
            zIndex: -1,
            width: '72%',
            height: '100%',
            borderRadius: 1,
            backgroundColor: '#01B9FE',
          }
        }}>
          {children}
        </Typography>
        <Box className="grow">
            <Divider sx={{ borderBottomWidth: 1, width: '80%', ml: 5 }} />
        </Box>
      </Box>
    )
  }

  function CardTraining({title, date, infos}){
    return(
      <Box className="flex justify-between items-center gap-5">
        <Box>
          <Image src="https://uploads.vw-mms.de/system/production/images/vwn/038/119/images/5033f6c0e75acc3c07fb42c1aae6e6caeb698d69/DB2022AL00009_web_1160.jpg?1649158021" width={100} height={100} className="aspect-square rounded-2xl" />
        </Box>
        <Box className="grow">
          <Typography variant="h6" className="text-sky-400">1º Treinamento</Typography>
          <Typography className="font-bold text-neutral-600">{title}</Typography>
          <Typography variant="caption" className="text-volks-blue-900">{moment(date).format("DD/MM/YYYY")}</Typography>
        </Box>
        <Box>
          {infos.active == 1 && infos.certify == "0" ? (
              <SubscribeModal
                content={infos}
                type="update"
                id={infos.pivot_id}
                concessionaire={concessionaireTransfer}
              >
                Atualizar Inscrição
              </SubscribeModal>
          ) : (
            <PdfTextEditor training={infos} />
          )}
        </Box>
      </Box>
    )
  }
  
  return (
    <Layout>
      <ToastContainer />
      {verifySubscribed ? (
        Object.keys(groupByYear).map(year => (
          <Box className="my-5">
            <TitleTraining>Treinamento {year}</TitleTraining>
            {groupByYear[year].map(item => (
              <CardTraining key={item.id} title={item.name} date={item.date} infos={item}></CardTraining>
            ))}
          </Box>
        ))
      ) : (
        <Typography variant="h6">{subscribedTrainings}</Typography>
      )}
      
    </Layout>
  );
}
/**
 * 
 * <main className="flex flex-col gap-5 my-5 px-20">
      <ToastContainer />
      <Title title="Treinamentos" />

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {verify ? (
          trainings.map((training, index) => (
            <Grid
              item
              xs={1}
              sm={4}
              md={3}
              key={index}
              className="flex content-center justify-center"
            >
              <TrainingCard
                key={index}
                content={training}
                justSubscribed={alterButton}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">{trainings}</Typography>
        )}
      </Grid>
      <Title title="Seus treinamentos" />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {verifySubscribed ? (
          [...subscribedTrainings].reverse().map((training, index) => (
            <Grid
              item
              xs={1}
              sm={4}
              md={3}
              key={index}
              className="flex content-center justify-center"
            >
              <SubscribedCard
                key={index}
                content={training}
                concessionaire={concessionaireTransfer}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">{subscribedTrainings}</Typography>
        )}
      </Grid>
    </main>
 */