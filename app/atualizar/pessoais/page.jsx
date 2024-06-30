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
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import MaskedInput from "@/app/components/mask/inputMask";
import Swal from "sweetalert2";
import UserContext from "@/src/contexts/UserContext";

export default function Page() {
  const [alert, setAlert] = React.useState(null);
  const [address, setAddress] = React.useState("");
  const [autoRepairAddress, setAutoRepairAddress] = React.useState("");
  const [formRender, setformRender] = React.useState(0);
  const [disabled, setDisabled] = React.useState(true);
  const [isChecked, setIsChecked] = React.useState(true);
  const [autoRepairInfo, setautoRepairInfo] = React.useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = searchParams.get("user");
  const { verify } = useContext(UserContext);
  const { register, handleSubmit, setValue, control } = useForm({
    // defaultValues: user && user.data.user,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      born_at: "",
      document: "",
    },
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const request = await fetch("/api/getUser", {
        method: "GET",
      });

      const response = await request.json();

      await setValue("email", response.user.email);
      await setValue("phone", response.user.phone);
      await setValue("gender", response.user.gender);
      await setValue("document", response.user.document);
      await setValue("name", response.user.name);
      await setValue("born_at", response.user.born_at);

      setDisabled(false);
    };
    getUserInfo();
  }, []);

  const defaultTheme = createTheme();

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // console.log(data);

    const request = await fetch("/api/updateUser", {
      method: "POST",
      body: formData,
    });

    const response = await request.text();
    console.log(response);

    if (!request.ok) {
      setAlert(response);
      Swal.fire({
        title: response,
        // text: "Aguarde...",
        didOpen: () => {
          Swal.update({ icon: "error" });
        },
        didClose: () => router.push("/"),
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
                Dados Pessoais
              </Typography>
            </Box>

            <Box noValidate sx={{ mt: 0 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="document"
                    control={control}
                    // {...register("document", {
                    //   onChange: handleSearchDocument,
                    // })}
                    render={({ field }) => (
                      <TextField
                        key="document"
                        id="document"
                        label="CPF"
                        fullWidth
                        required
                        InputProps={{
                          inputComponent: MaskedInput,
                          inputProps: {
                            mask: "000.000.000-00",
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
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="name"
                        id="name"
                        label="Nome Completo"
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

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="phone"
                        id="phone"
                        label="Telefone"
                        fullWidth
                        required
                        InputProps={{
                          inputComponent: MaskedInput,
                          inputProps: {
                            mask: "(00) 0 0000-0000",
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
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="gender">Gênero</InputLabel>
                        <Select
                          labelId="gender"
                          label="Gênero"
                          fullWidth
                          required
                          sx={{
                            backgroundColor: "#F8F8F8",
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                          }}
                          {...field}
                        >
                          <MenuItem key="gender-female" value="Feminino">
                            Feminino
                          </MenuItem>
                          <MenuItem key="gender-male" value="Masculino">
                            Masculino
                          </MenuItem>
                          <MenuItem key="gender-other" value="Outros">
                            Outros
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="born_at"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="born_at"
                        id="born_at"
                        label="Data de Nascimento"
                        fullWidth
                        required
                        InputProps={{
                          inputComponent: MaskedInput,
                          inputProps: {
                            mask: "00/00/0000",
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

                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="email"
                        id="email"
                        label="E-Mail"
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
              </Grid>
            </Box>
            <button
              disabled={disabled}
              onClick={handleSubmit(onSubmit)}
              className={
                disabled
                  ? "h-12 w-full mt-10 flex justify-between bg-slate-500 items-center rounded-lg shadow px-5 "
                  : "h-12 w-full mt-10 flex justify-between bg-gradient-to-r from-volks-blue-900 to-volks-blue-800 items-center rounded-lg shadow px-5 hover:scale-105"
              }
            >
              <div className="text-white font-semibold">
                Atualizar dados pessoais
              </div>
              <EastIcon className="text-white" />
            </button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
