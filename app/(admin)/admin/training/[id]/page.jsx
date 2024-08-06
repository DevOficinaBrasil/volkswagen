"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
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
import { Search, Send } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { FormControl, MenuItem, Select } from "@mui/base";

export default function Page({ params }) {
  const [updatedData, setUpdatedData] = React.useState(0);
  const [trainingInfo, setTrainingInfo] = React.useState([]);
  const [trainingToAdd, setTrainingToAdd] = React.useState([]);
  const [listTrainingToAdd, setListTrainingToAdd] = React.useState([]);
  const [concessionaireVacancies, setConcessionaireVacancies] = React.useState([]);
  const { onLive, setOnLive, certify, setCertify, status, setStatus } = React.useContext(LiveContext);

  React.useEffect(() => {
    const getTraining = async () => {
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

    getTraining();
  }, [status]);

  React.useEffect(() => {
    console.log(updatedData)
    const getTrainings = async (trainingsWithVacancies) => {
      const request = await fetch(`/api/admin/getConcessionaires`,{
        method: "GET",
      });

      const response = await request.json();

      if (request.ok) {
        const onRight = new Set(trainingsWithVacancies.map(obj => obj.concessionaire_id))

        const diferent = response.filter(obj => !onRight.has(obj.id))

        setTrainingToAdd(diferent)
      }
    };

    const getConcessionaires = async () => {
      const request = await fetch(`/api/getConcessionairesWithVacancies?training=${params.id}`,{
        method: "GET",
      });

      const response = await request.json();

      if (request.ok) {
        setConcessionaireVacancies(response);
        getTrainings(response)
      }
    };

    getConcessionaires();
  }, [updatedData]);
  
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

  const handleChange = (event) => {
    if(event.target.value.length <= 0){
      setListTrainingToAdd([])
    }else{
      const result = trainingToAdd.filter(training => training.DN.startsWith(event.target.value))
  
      setListTrainingToAdd(result)
    }
  };
  
  const addConcessionaire = async (id) => {
    const formData = new FormData();

    formData.set("concessionaire_id", id)
    formData.set("training_id", params.id)

    const request = await fetch("/api/admin/addConcessionaireOnTraining",{
      method: "POST",
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

      setUpdatedData((prevData) => {
        return prevData + 1;
      })
      setListTrainingToAdd([])
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
                <Typography variant="h5" className="font-bold uppercase mb-5">Adicionar concessionária</Typography>
                <Box className="flex flex-col gap-5">
                  <TextField
                    margin="normal"
                    fullWidth
                    id="search"
                    label="Buscar concessionária (DN)"
                    name="search"
                    autoFocus
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Search className="text-sky-400" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#F8F8F8",
                        "& fieldset": { border: "none" },
                      },
                    }}
                  />
                </Box>
                <Box className="flex flex-col gap-5">
                  {listTrainingToAdd.length != 0 ? 
                    listTrainingToAdd.map((item, index) => (
                      <Box key={index} className="flex justify-between items-center">
                        <Box>DN: {item.DN}</Box>
                        <Box>Nome Fantasia: {item.fantasy_name}</Box>
                        <Box>
                          <Button onClick={() => addConcessionaire(item.id)}>Adicionar ao treinamento</Button>
                        </Box>
                      </Box>
                    ))
                  :
                    <Typography>Nenhuma concessionária encontrada</Typography>
                  }
                </Box>
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
                                      <Send className="text-sky-400" />
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
                        <Box>
                          
                        </Box>
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
