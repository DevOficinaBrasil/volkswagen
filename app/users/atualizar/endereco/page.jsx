"use client";

import React, { useContext, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EastIcon from "@mui/icons-material/East";
import {
  Alert,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import MaskedInput from "@/app/components/mask/inputMask";
import Swal from "sweetalert2";
import UserContext from "@/src/contexts/UserContext";

export default function Page() {
  const router = useRouter();
  const [alert, setAlert] = React.useState(null);
  const [address, setAddress] = React.useState("");
  const [autoRepairAddress, setAutoRepairAddress] = React.useState("");
  const [formRender, setformRender] = React.useState(0);
  const [isChecked, setIsChecked] = React.useState(true);
  const [autoRepairInfo, setautoRepairInfo] = React.useState(null);
  const { verify } = useContext(UserContext);
  const [disabled, setDisabled] = React.useState(true);
  const { register, handleSubmit, setValue, control, watch } = useForm({
    defaultValues: {
      id: "",
      state: "",
      street: "",
      number: "",
      complement: "",
      city: "",
      cep: "",
    },
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const request = await fetch("/api/getUser", {
        method: "GET",
      });

      const response = await request.json();

      // console.log("all user :" + response);
      // setValue("state", response.adressUser.state);
      // setValue("street", response.adressUser.street);
      // setValue("number", response.adressUser.number);
      // setValue("complement", response.adressUser.complement);
      // setValue("city", response.adressUser.city);
      setValue("cep", response.adressUser.cep);
      setValue("id", response.adressUser.id);
      setValue("complement", response.adressUser.complement);
      setValue("number", response.adressUser.number);

      setDisabled(false);
    };
    getUserInfo();
  }, []);

  const handleSearchCep = async (event) => {
    if (event.target.value.length == 9) {
      const cep = event.target.value.replace(/-/g, "");
      const request = await fetch(`https://viacep.com.br/ws/${cep}/json/ `, {
        cache: "no-store",
        method: "GET",
      });

      const response = await request.json();

      if (response.erro) {
        setAlert("CEP não encontrado");
        return null;
      } else {
        setAlert(null);
        return response;
      }
    } else {
      setAlert(null);
    }
  };
  const handleGetCep = async (cep) => {
    if (cep.length == 9) {
      const newCep = cep.replace(/-/g, "");
      const request = await fetch(`https://viacep.com.br/ws/${newCep}/json/ `, {
        cache: "no-store",
        method: "GET",
      });

      const response = await request.json();

      if (response.erro) {
        setAlert("CEP não encontrado");
        return null;
      } else {
        setAlert(null);
        setAddress(response);
      }
    } else {
      setAlert(null);
    }
  };

  React.useEffect(() => {
    handleGetCep(watch("cep"));
  }, [watch("cep")]);

  React.useEffect(() => {
    if (address) {
      setValue("state", address.uf);
      setValue("city", address.localidade);
      setValue("street", address.logradouro);
    } else {
      setValue("state", "");
      setValue("city", "");
      setValue("street", "");
    }
  }, [address, setValue]);

  const defaultTheme = createTheme();

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    const request = await fetch("/api/updateAddress", {
      method: "POST",
      body: formData,
    });

    const response = await request.text();

    if (!request.ok) {
      setAlert(response);
      Swal.fire({
        title: response,
        // text: "Aguarde...",
        didOpen: () => {
          Swal.update({ icon: "error" });
        },
        // didClose: () => router.push("/"),
        allowOutsideClick: true,
      });
    } else {
      Swal.fire({
        title: "Atualização realizada com sucesso!",
        // text: "Aguarde...",
        didOpen: () => {
          Swal.update({ icon: "success" });
        },
        didClose: () => {
          verify();
          router.push("/");
        },
        allowOutsideClick: true,
      });
      setAlert(null);
      // router.push("/redirect");
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box sx={{ marginTop: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography
                className="mb-5 text-volks-blue-900 font-thin"
                component="h1"
                variant="h5"
              >
                Endereço Pessoal
              </Typography>
            </Box>

            <Box noValidate sx={{ mt: 0 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="cep"
                    control={control}
                    {...register("cep", {
                      onChange: async (event) => {
                        setAddress(await handleSearchCep(event));
                      },
                    })}
                    render={({ field }) => (
                      <TextField
                        key="cep"
                        id="cep"
                        label="CEP"
                        fullWidth
                        required
                        InputProps={{
                          inputComponent: MaskedInput,
                          inputProps: {
                            mask: "00000-000",
                          },
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
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="state"
                        id="state"
                        label="Estado"
                        fullWidth
                        required
                        InputProps={{
                          readOnly: true,
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
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="city"
                        id="city"
                        label="Cidade"
                        fullWidth
                        required
                        InputProps={{
                          readOnly: true,
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
                </Grid>

                <Grid item xs={12} sm={8}>
                  <Controller
                    name="street"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="street"
                        id="street"
                        label="Rua"
                        fullWidth
                        required
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

                <Grid item xs={12} sm={4}>
                  <Controller
                    name="number"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="number"
                        id="number"
                        label="Número"
                        fullWidth
                        required
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

                <Grid item xs={12}>
                  <Controller
                    name="complement"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="complement"
                        id="complement"
                        label="Complemento"
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
            <button
              disabled={disabled}
              type="submit"
              className={
                disabled
                  ? "h-12 w-full mt-10 flex justify-between bg-slate-500 items-center rounded-lg shadow px-5 "
                  : "h-12 w-full mt-10 flex justify-between bg-gradient-to-r from-volks-blue-900 to-volks-blue-800 items-center rounded-lg shadow px-5 hover:scale-105"
              }
            >
              <div className="text-white font-semibold">Atualizar endereço</div>
              <EastIcon className="text-white" />
            </button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
