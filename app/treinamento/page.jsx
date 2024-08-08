"use client";
// @refresh reset

import * as React from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, List, ListItem, Paper, Typography } from "@mui/material";
import SubscribeModal from "../components/subscribe";
import moment from "moment";
import kombiHeader from "@/images/kombi.png";
import { ToastContainer } from "react-toastify";
import Layout from "../layout/Layout";
import UserContext from "@/src/contexts/UserContext";

export default function Training() {
  const [trainings, setTrainings] = React.useState([]);
  const [training, setTraining] = React.useState([]);
  const [subscribed, setSubscribed] = React.useState(false);
  const [isNotUser, setIsNotUser] = React.useState(false);
  const { userData } = React.useContext(UserContext)

  React.useEffect(() => {
    const getTrainings = async () => {
      const request = await fetch("/api/getSubscribedTrainings", {
        method: "GET",
        cache: "no-cache",
      });

      const response = await request.json();

        if (request.ok) {
            response.forEach(element => {
                if(element.active = 1 && element.Inscrito == 1){
                    if(userData.role == 'common'){
                        setSubscribed(true)
                    }else{
                        setIsNotUser(true)
                    }
                }
            });
        }else{
            setSubscribed(false)
        }
    };

    getTrainings();
  }, []);

  React.useEffect(() => {
    const getTrainings = async () => {
      const request = await fetch("/api/getTrainings", {
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

  return (
    <Layout>
      <ToastContainer/>
      <Box className="text-center">
        <Typography variant="h3" className="font-bold text-volks-blue-900">Treinamento</Typography>
      </Box>
      <Box className="flex flex-row gap-5">
        <Box className="grow">
          <Card className="rounded-2xl">
            <CardMedia
              sx={{ height: 300 }}
              image={training.cover}
              title="green iguana"
            />
            <CardContent sx={{ backgroundColor: '#02346B' }} className="text-white">
              <Typography variant="h5" className="font-bold">
                Treinamento - Volkswagen
              </Typography>
              <Typography variant="h6">
                {training.name}
              </Typography>

              <Box className="mt-5">
                <Typography variant="subtitle2" gutterBottom>
                  {moment(training.date).format("DD/MM/YYYY")}
                </Typography>
                {subscribed ? 
                  <Button variant="contained" className="bg-green-500 hover:bg-green-600" endIcon={<Check />} href="/users/dashboard">Inscrito!</Button>
                : 
                  isNotUser ?
                    <Button variant="contained" href="/concessionaria/trainings" fullWidth>Acompanhe!</Button>
                  :
                    <SubscribeModal content={training} type="insert" fullWidth>Inscreva-se</SubscribeModal>
                }
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box className="grow">
          <Box className="p-5 h-full">
            <Box>
              <Typography variant="h5" className="font-bold uppercase">Cronograma</Typography>
            </Box>
            <Box className="h-full">
              <List className="h-full flex flex-col justify-between">
                <ListItem className="">
                  <Paper className="w-full flex justify-between p-5">
                    <Typography className="font-bold text-neutral-600">19:30</Typography>
                    <Typography>Introdução</Typography>
                    <Typography className="font-bold text-neutral-600">30 min</Typography>
                  </Paper>
                </ListItem>
                <ListItem className="flex justify-between">
                  <Paper className="w-full flex justify-between p-5">
                    <Typography className="font-bold text-neutral-600">20:30</Typography>
                    <Typography>Intervalo</Typography>
                    <Typography className="font-bold text-neutral-600">30 min</Typography>
                  </Paper>
                </ListItem>
                <ListItem className="flex justify-between">
                  <Paper className="w-full flex justify-between p-5">
                    <Typography className="font-bold text-neutral-600">21:00</Typography>
                    <Typography>Encerramento</Typography>
                    <Typography className="font-bold text-neutral-600">30 min</Typography>
                  </Paper>
                </ListItem>
                <ListItem className="flex justify-between">
                  <Paper className="w-full flex justify-between p-5">
                    <Typography className="font-bold text-neutral-600">21:30</Typography>
                    <Typography>Emissão dos certificados</Typography>
                    <Typography className="font-bold text-neutral-600">30 min</Typography>
                  </Paper>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
