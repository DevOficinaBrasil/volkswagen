"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter, useSearchParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import MaskedInput from "@/app/components/mask/inputMask";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Rating,
  Select,
  TextField,
} from "@mui/material";
import UserContext from "@/src/contexts/UserContext";

const defaultTheme = createTheme();

export default function GeneralSheet({ params }) {
  const [alert, setAlert] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [training, setTraining] = React.useState(null);
  const [trainings, setTrainings] = React.useState();
  const queryParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = React.useState(null);
  const { userData } = React.useContext(UserContext);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      rating: "",
      quest1: "",
      quest2: "",
      quest3: "",
      suggestion: "",
      user: "",
      training: params.id,
      present: Boolean(queryParams.get("present")) ?? false,
    },
  });

  React.useEffect(() => {
    const setUserData = async () => {
      setUser(userData);
    };

    setUserData();
  }, [userData]);

  React.useEffect(() => {
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

  const onSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    formData.set("user", user.id);

    try {
      const request = await fetch("/api/registerSheet", {
        method: "POST",
        body: formData,
      });

      const response = request;

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setAlert(null);

      const message = await response.json();

      toast.success(message, {
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

      setTimeout(() => {
        router.push("/users/dashboard");
      }, 5000);
    } catch (error) {
      setAlert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <ToastContainer />
        <CssBaseline />
        {training && training.certify == "1" ? (
          <Box sx={{ marginTop: 8 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  className="mb-5 text-volks-blue-900 font-bold"
                  component="h1"
                  variant="h5"
                >
                  Antes de baixar seu CERTIFICADO EXCLUSIVO VOLKSWAGEN, nos
                  ajude avaliando este treinamento
                </Typography>
              </Box>

              <Box noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Avalie o treinamento</Typography>
                    <Controller
                      name="rating"
                      control={control}
                      render={({ field }) => (
                        <Rating name="rating" value={null} {...field} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="quest1"
                      control={control}
                      render={({ field }) => (
                        <FormControl {...field}>
                          <FormLabel id="quest1">
                            Como foi a sua experiência com o retorno dos
                            treinamentos presenciais?
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="quest1"
                            name="quest1"
                          >
                            <FormControlLabel
                              value="otimo"
                              control={<Radio />}
                              label="Ótimo"
                            />
                            <FormControlLabel
                              value="bom"
                              control={<Radio />}
                              label="Bom"
                            />
                            <FormControlLabel
                              value="adaptando"
                              control={<Radio />}
                              label="Ainda estou me adaptando "
                            />
                          </RadioGroup>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="quest2"
                      control={control}
                      render={({ field }) => (
                        <FormControl {...field}>
                          <FormLabel id="quest2">
                            Tirou as suas dúvidas do treinamento no chat?
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="quest2"
                            name="quest2"
                          >
                            <FormControlLabel
                              value="S"
                              control={<Radio />}
                              label="Sim"
                            />
                            <FormControlLabel
                              value="N"
                              control={<Radio />}
                              label="Não"
                            />
                          </RadioGroup>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="quest3"
                      control={control}
                      render={({ field }) => (
                        <FormControl {...field}>
                          <FormLabel id="quest3">
                            Você prefere que o treinamento seja transmitido em
                            qual horário?
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="quest3"
                            name="quest3"
                          >
                            <FormControlLabel
                              value="19"
                              control={<Radio />}
                              label="19h"
                            />
                            <FormControlLabel
                              value="20"
                              control={<Radio />}
                              label="20h"
                            />
                          </RadioGroup>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="suggestion"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          key="suggestion"
                          id="suggestion"
                          label="Quais temas gostaria de ver nos próximos treinamentos Volkswagen?"
                          fullWidth
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
                  </Grid>
                </Grid>
              </Box>

              {alert && (
                <Box className="mt-5">
                  <Alert severity="error">{alert}</Alert>
                </Box>
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mr: 1,
                    backgroundColor: "#022663",
                    ":hover": { backgroundColor: "#184a9b" },
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Finalizar"}
                </Button>
              </Box>
            </form>
          </Box>
        ) : (
          <Box sx={{ marginTop: 8 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                className="mb-5 text-volks-blue-900 font-bold uppercase"
                component="h1"
                variant="h4"
              >
                Ficha indisponível
              </Typography>
              <Typography
                className="mb-5 text-volks-blue-900 font-normal "
                component="h1"
                variant="h5"
              >
                Por favor esperar o treinamento terminar para poder preencher
                sua ficha e pegar o seu certificado.
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
