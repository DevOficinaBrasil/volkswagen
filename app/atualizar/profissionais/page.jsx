"use client";

import React, { useEffect } from "react";
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

export default function Page() {
  const router = useRouter();
  const [alert, setAlert] = React.useState(null);
  const [address, setAddress] = React.useState("");
  const [autoRepairAddress, setAutoRepairAddress] = React.useState("");
  const [formRender, setformRender] = React.useState(0);
  const [isChecked, setIsChecked] = React.useState(true);
  const [autoRepairInfo, setautoRepairInfo] = React.useState(null);
  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      role: "",
      cnpj: "",
      check: "",
      exist: "",
      fantasy_name: "",
      auto_repair_id: "",
      auto_repair_cep: "",
      branch_activity: "",
      auto_repair_city: "",
      auto_repair_phone: "",
      auto_repair_state: "",
      auto_repair_street: "",
      auto_repair_number: "",
    },
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const request = await fetch("/api/getUser", {
        method: "GET",
      });

      const response = await request.json();

      console.log("all user :" + response);
      if (response.autoRepair != null) {
        setValue("role", response.autoRepair.role);
        setValue("cnpj", response.autoRepair.cnpj);
        setValue("fantasy_name", response.autoRepair.fantasy_name);
        setValue("auto_repair_number", response.autoRepair.auto_repair_number);
        setValue("auto_repair_cep", response.autoRepair.auto_repair_cep);
        setValue("auto_repair_street", response.autoRepair.auto_repair_street);
        setValue("auto_repair_city", response.autoRepair.auto_repair_city);
        setValue("auto_repair_state", response.autoRepair.auto_repair_state);
        setValue("branch_activity", response.autoRepair.branch_activity);
      }
    };
    getUserInfo();
  }, []);

  const defaultTheme = createTheme();

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    const request = await fetch("/api/signup", {
      method: "POST",
      body: formData,
    });

    const response = await request.text();

    if (!request.ok) {
      setAlert(response);
    } else {
      setAlert(null);
      router.push("/redirect");
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
                Dados Profissionais
              </Typography>
            </Box>

            <Box noValidate sx={{ mt: 0 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="cnpj"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="cnpj"
                        id="cnpj"
                        label="CNPJ"
                        fullWidth
                        InputProps={{
                          inputComponent: MaskedInput,
                          inputProps: {
                            mask: "00.000.000/0000-00",
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
                    name="fantasy_name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="fantasy_name"
                        id="fantasy_name"
                        label="Nome fantasia"
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

                <Grid item xs={12}>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="role">Cargo</InputLabel>
                        <Select
                          labelId="role"
                          label="Cargo"
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
                          <MenuItem key="chefe" value="chefe">
                            Chefe de Oficina
                          </MenuItem>
                          <MenuItem key="comprador" value="comprador">
                            Comprador
                          </MenuItem>
                          <MenuItem key="eletricista" value="eletricista">
                            Eletricista
                          </MenuItem>
                          <MenuItem key="funileiro" value="funileiro">
                            Funileiro
                          </MenuItem>
                          <MenuItem key="garantista" value="garantista">
                            Garantista
                          </MenuItem>
                          <MenuItem key="gerente" value="gerente">
                            Gerente
                          </MenuItem>
                          <MenuItem key="instalador" value="instalador">
                            Instalador
                          </MenuItem>
                          <MenuItem key="mecanico" value="mecanico">
                            Mecânico
                          </MenuItem>
                          <MenuItem key="pintor" value="pintor">
                            Pintor
                          </MenuItem>
                          <MenuItem key="proprietario" value="proprietario">
                            Proprietário
                          </MenuItem>
                          <MenuItem key="retificador" value="retificador">
                            Retificador
                          </MenuItem>
                          <MenuItem key="soldador" value="soldador">
                            Soldador
                          </MenuItem>
                          <MenuItem key="supervisor" value="supervisor">
                            Supervisor
                          </MenuItem>
                          <MenuItem key="tecnico" value="tecnico">
                            Técnico
                          </MenuItem>
                          <MenuItem key="outros" value="outros">
                            Outros
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="branch_activity"
                    control={control}
                    render={({ field }) => (
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="branch_activity">
                          Ramo de atividade
                        </InputLabel>
                        <Select
                          labelId="branch_activity"
                          label="Cargo"
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
                          <MenuItem key="eletrica" value="eletrica">
                            Auto Elétrica
                          </MenuItem>
                          <MenuItem key="automotivo" value="automotivo">
                            Centro Automotivo
                          </MenuItem>
                          <MenuItem key="concessionaria" value="concessionaria">
                            Concessionária
                          </MenuItem>
                          <MenuItem key="distribuidor" value="distribuidor">
                            Distribuidor
                          </MenuItem>
                          <MenuItem key="frota" value="frota">
                            Frota
                          </MenuItem>
                          <MenuItem key="funilaria" value="funilaria">
                            Funilaria e Pintura
                          </MenuItem>
                          <MenuItem key="acessorios" value="acessorios">
                            Loja de Acessórios
                          </MenuItem>
                          <MenuItem key="autopecas" value="autopecas">
                            Loja de Autopeças
                          </MenuItem>
                          <MenuItem key="mecanica" value="mecanica">
                            Oficina Mecânica
                          </MenuItem>
                          <MenuItem key="escapamentos" value="escapamentos">
                            Posto de Escapamentos
                          </MenuItem>
                          <MenuItem key="retefica" value="retefica">
                            Retífica
                          </MenuItem>
                          <MenuItem key="Outros" value="outros">
                            Outros
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="auto_repair_phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="auto_repair_phone"
                        id="auto_repair_phone"
                        label="Telefone da oficina"
                        fullWidth
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

                <Grid item xs={12}>
                  <Controller
                    name="auto_repair_cep"
                    control={control}
                    {...register("auto_repair_cep", {
                      onChange: async (event) => {
                        setAutoRepairAddress(await handleSearchCep(event));
                      },
                    })}
                    render={({ field }) => (
                      <TextField
                        key="auto_repair_cep"
                        id="auto_repair_cep"
                        label="CEP"
                        fullWidth
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
                    name="auto_repair_state"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="auto_repair_state"
                        id="auto_repair_state"
                        label="Estado"
                        fullWidth
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
                    name="auto_repair_city"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="auto_repair_city"
                        id="auto_repair_city"
                        label="Cidade"
                        fullWidth
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

                <Grid item xs={12}>
                  <Controller
                    name="auto_repair_street"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="auto_repair_street"
                        id="auto_repair_street"
                        label="Rua"
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

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="auto_repair_number"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        key="auto_repair_number"
                        id="auto_repair_number"
                        label="Número"
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
              type="submit"
              className="h-12 w-full mt-10 flex justify-between bg-gradient-to-r  from-volks-blue-900 to-volks-blue-800 items-center rounded-lg shadow px-5 hover:scale-105"
            >
              <div className="text-white font-semibold">
                Atualizar dados profissionais
              </div>
              <EastIcon className="text-white" />
            </button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
