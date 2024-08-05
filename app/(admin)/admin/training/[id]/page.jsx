"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import Layout from "../../components/Layout";
import LiveContext from "@/src/contexts/LiveContext";
import { Controller, useForm } from "react-hook-form";
import MaskedInput from "@/app/components/mask/inputMask";
import { Send } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Page({ params }) {
  const [trainingInfo, setTrainingInfo] = React.useState([]);
  const [concessionaireVacancies, setConcessionaireVacancies] = React.useState([]);
  const { onLive, setOnLive, certify, setCertify, status, setStatus } = React.useContext(LiveContext);

  React.useEffect(() => {
    const getTrainings = async () => {
      const request = await fetch(`/api/getAdminTraining?training=${params.id}`,{
        method: "GET",
      });

      const response = await request.json();

      if (request.ok) {
        setTrainingInfo(response);
        setCertify(Boolean(parseInt(response.certify)));
        setStatus(Boolean(parseInt(response.active)));
        setOnLive(Boolean(parseInt(response.on_live)));
      }
    };

    getTrainings();
  }, [status]);

  React.useEffect(() => {
    const getConcessionaires = async () => {
      const request = await fetch(`/api/getConcessionairesWithVacancies?training=${params.id}`,{
        method: "GET",
      });

      const response = await request.json();

      if (request.ok) {
        setConcessionaireVacancies(response);
      }
    };

    getConcessionaires();
  }, []);
  
  const handleTrainingStatus = async (id) => {
    const formData = new FormData();

    formData.set("active", !status)
    formData.set("trainingId", id)
    
    setStatus((prevData) => {
      return !prevData;
    });

    const request = await fetch("/api/updateTrainingStatus",{
      method: "PATCH",
      body: formData,
    });

    const response = await request.json();

    if (request.ok) {
      toast.success(response, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }else{
      toast.error(response, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleActiveLive = async (id) => {
    const formData = new FormData();

    formData.set("onLive", !onLive)
    formData.set("trainingId", id)

    setOnLive((prevData) => {
      return !prevData;
    });

    await fetch("/api/updateTrainingLive",{
      method: "PATCH",
      body: formData,
    });
  };

  const handleReleaseSheets = async (id) => {
    const formData = new FormData();

    formData.set("certify", !certify)
    formData.set("trainingId", id)

    setCertify((prevData) => {
      return !prevData;
    });

    await fetch("/api/updateReleaseSheet",{
      method: "PATCH",
      body: formData,
    });
  };

  const {
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (id, value) => {
    const formData = new FormData();

    formData.set("id", id)
    formData.set("value", value)

    const request = await fetch("/api/updateVacancies",{
      method: "PATCH",
      body: formData,
    });

    const response = await request.json();

    if (request.ok) {
      toast.success(response, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  const handleSubmit = (data) => {
    const value = getValues(`vacancies.${data}`)

    onSubmit(data, value)
  }

  return (
    <Layout>
      <ToastContainer />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box>
          <Paper className="flex flex-col gap-5 p-5">
            <Box>
              <Paper className="p-5">
                <Typography variant="h5" className="font-bold uppercase mb-5">Configurações do treinamento</Typography>
                <Box className="flex items-center justify-between mb-3">
                  <Typography>Ativar/Encerrar treinamento:</Typography>
                  <Box>
                    <Button
                      className="bg-[#022663] w-24 text-white"
                      onClick={() => handleTrainingStatus(trainingInfo.id)}
                      sx={{ ":hover": { backgroundColor: "#184a9b" } }}
                    >
                      {status == 0 ? "Ativar" : "Encerrar"}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Box>
            
            <Box>
              <Paper className="p-5">
                <Typography variant="h5" className="font-bold uppercase mb-5">Configurações da live</Typography>
                <Box className="flex items-center justify-between mb-3">
                  <Typography>Ativar/Desativar avisos da live:</Typography>
                  <Box>
                  {status == 1 ? (
                    <Button
                      className="bg-[#022663] w-24 text-white"
                      onClick={() => handleActiveLive(trainingInfo.id)}
                      sx={{ ":hover": { backgroundColor: "#184a9b" } }}
                    >
                      {onLive == 0 ? "Ativar" : "Desativar"}
                    </Button>
                  ) : (
                    <Button
                      disabled={true}
                      className="bg-[#022663] disabled:text-white disabled:opacity-30 w-24"
                    >
                      Offline
                    </Button>
                  )}
                  </Box>
                </Box>
                <Box className="flex items-center justify-between">
                  <Typography>Liberar/Bloquear acesso a ficha de avaliação:</Typography>
                  <Box>
                  {status == 1 ? (
                    <Button
                      className="bg-[#022663] w-24 text-white"
                      onClick={() => handleReleaseSheets(trainingInfo.id)}
                      sx={{ ":hover": { backgroundColor: "#184a9b" } }}
                    >
                      {certify == "0" ? "Liberar" : "Bloquear"}
                    </Button>
                  ) : (
                    <Button
                      disabled={true}
                      className="bg-[#022663] disabled:text-white disabled:opacity-30 w-24"
                    >
                      Offline
                    </Button>
                  )}
                  </Box>
                </Box>
              </Paper>
            </Box>

            <Box>
              <Paper className="p-5">
                <Typography variant="h5" className="font-bold uppercase mb-5">Alterar informações do treinamento</Typography>
                Em breve
              </Paper>
            </Box>

            <Box>
              <Paper className="p-5">
                <Typography variant="h5" className="font-bold uppercase mb-5">Vagas disponíveis</Typography>
                <Box className="flex flex-col gap-5">
                {concessionaireVacancies.map((row, index) => (
                  <Box className="flex justify-between items-center" key={index}>
                    <Box className="font-bold">#{row.concessionaire.DN}</Box>
                    <Box>{row.concessionaire.fantasy_name}</Box>
                    <Box>
                      <Controller
                        name={`vacancies.${row.id}`}
                        control={control}
                        defaultValue={`${row.vacancies}`}
                        render={({ field }) => (
                          <TextField
                            id="vacancies"
                            fullWidth
                            required
                            InputProps={{
                              inputComponent: MaskedInput,
                              inputProps: {
                                mask: "0000",
                              },
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={() => {handleSubmit(row.id)}}>
                                    <Send />
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F8F8F8",
                                "& fieldset": { border: "none" },
                              },
                            }}
                            {...field}
                          />
                        )}
                      />
                    </Box>
                  </Box>
                ))}
                </Box>
              </Paper>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
}
