"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import { deleteTokens } from "../handler";
import { Controller, useForm } from "react-hook-form";
import MaskedInput from "@/app/components/mask/inputMask";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import locations from "@/src/locations.json";
import {
  handleSearchDocument,
  handleSearchCep,
  handleCheckboxChange,
  handleCNPJVerify,
} from "./handlers";
import {
  Alert,
  Checkbox,
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
  Select,
  TextField,
} from "@mui/material";
import Title from "@/app/components/title";
import { escape } from "querystring";
import { verify } from "crypto";
import Link from "next/link";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

export default function HorizontalLinearStepper() {
  const router = useRouter();
  const [alert, setAlert] = React.useState(null);
  const [verifyIfExist, setVerifyIfExist] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [autoRepairAddress, setAutoRepairAddress] = React.useState("");
  const [formRender, setformRender] = React.useState(0);
  const [concessionaires, setConcessionaires] = React.useState([]);
  const [concessionaire, setConcessionaire] = React.useState(null);
  const [trainings, setTrainings] = React.useState(null);
  const [training, setTraining] = React.useState(null);
  const [cities, setCities] = React.useState([]);
  const [renderForm, setRenderForm] = React.useState(false);

  const [stateName, setstateName] = React.useState([]);
  const [cityState, setCityState] = React.useState([]);
  const [concessionaireAddress, setConcessionaireAddress] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(true);
  const [autoRepairInfo, setautoRepairInfo] = React.useState(null);
  const [cidades, setCidades] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  const estadosCidade = {};
  // const concessionaireAddress = props.concessionaire
  // ? props.concessionaire.concessionaires
  // : props.content.concessionaires;

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  React.useEffect(() => {
    if (concessionaireAddress) {
      concessionaireAddress.forEach((element) => {
        if (element.address) {
          const estado = element.address.city.state.value;
          const cidade = element.address.city.value;

          if (!estadosCidade[estado]) {
            estadosCidade[estado] = new Set();
          }

          estadosCidade[estado].add(cidade);

          setCityState(estadosCidade);
        }
      });
    }
  }, [concessionaireAddress]);

  React.useEffect(() => {
    const arraySearch = locations.estados.filter((object) =>
      Object.keys(cityState).includes(object.sigla)
    );

    const arrayFind = arraySearch.map((objeto) => ({
      sigla: objeto.sigla,
      nome: objeto.nome,
    }));

    setstateName(arrayFind);
  }, [cityState]);

  const handleStateChange = (event) => {
    handleInputChange(event);
    setValue("concessionaire_state", event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      concessionaire_city: "",
      concessionaire: "",
    }));

    // setInfosRender(0);
    // setMessageRender(0);

    const state = event.target.value;

    const stateData = cityState[state];

    setCities(stateData ? Array.from(stateData) : []);
  };

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
            setConcessionaireAddress(training.concessionaires);
          }
        });
      } else {
        setTrainings(response);
      }
    };

    getTrainings();
  }, []);

  const [formData, setFormData] = React.useState({
    format: "",
    concessionaire_state: "",
    concessionaire_city: "",
    concessionaireID: 0,
    concessionaire: "",
    userId: "",
    trainingID: "",
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mode: "online",
      name: "",
      email: "",
      phone: "",
      gender: "",
      born_at: "",
      document: "",
      password: "",
      concessionaire_state: "",
      concessionaire_city: "",
      // concessionaire: "",
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

  function convertDate(dateStr) {
    // Divide a string da data pelo caractere '/'
    const [year, month, day] = dateStr.split("-");

    // Retorna a data no formato 'YYYY-MM-DD'
    return `${day}/${month}/${year}`;
  }

  React.useEffect(() => {
    const deleteOldTokens = async () => {
      deleteTokens();
    };

    deleteOldTokens();
  }, []);

  React.useEffect(() => {
    const arraySearch = locations.estados.filter((object) =>
      Object.keys(cityState).includes(object.sigla)
    );

    const arrayFind = arraySearch.map((objeto) => ({
      sigla: objeto.sigla,
      nome: objeto.nome,
    }));

    setstateName(arrayFind);
  }, [cityState]);

  React.useEffect(() => {
    if (autoRepairAddress) {
      setValue("auto_repair_state", autoRepairAddress.uf);
      setValue("auto_repair_city", autoRepairAddress.localidade);
      setValue("auto_repair_street", autoRepairAddress.logradouro);
    } else {
      setValue("auto_repair_state", "");
      setValue("auto_repair_city", "");
      setValue("auto_repair_street", "");
    }
  }, [autoRepairInfo]);
  React.useEffect(() => {
    if (autoRepairAddress) {
      setValue("auto_repair_state", autoRepairAddress.uf);
      setValue("auto_repair_city", autoRepairAddress.localidade);
      setValue("auto_repair_street", autoRepairAddress.logradouro);
    } else {
      setValue("auto_repair_state", "");
      setValue("auto_repair_city", "");
      setValue("auto_repair_street", "");
    }
  }, [autoRepairAddress, setValue]);

  React.useEffect(() => {
    if (autoRepairInfo != null) {
      setformRender(2);

      setValue("exist", true);
      setValue("auto_repair_id", autoRepairInfo.id);
      setValue("fantasy_name", autoRepairInfo.fantasy_name);
      setValue("branch_activity", autoRepairInfo.branch_activity);
    }
  }, [autoRepairInfo]);

  function fixEncoding(text) {
    return decodeURIComponent(
      text
        .replace(/Ã¡/g, "á")
        .replace(/Ã©/g, "é")
        .replace(/Ã­/g, "í")
        .replace(/Ã³/g, "ó")
        .replace(/Ãº/g, "ú")
        .replace(/Ã£/g, "ã")
        .replace(/Ãµ/g, "õ")
        .replace(/Ã¢/g, "â")
        .replace(/Ãª/g, "ê")
        .replace(/Ã®/g, "î")
        .replace(/Ã´/g, "ô")
        .replace(/Ã»/g, "û")
        .replace(/Ã§/g, "ç")
        .replace(/Ã€/g, "à")
        .replace(/Ãƒ/g, "Ã")
        .replace(/Ã€/g, "À")
        .replace(/Ã‰/g, "É")
        .replace(/Ã“/g, "Ó")
        .replace(/Ãš/g, "Ú")
        .replace(/ÃÃ/g, "Ã")
        .replace(/Ã‰/g, "É")
        .replace(/Ãâ€¡/g, "Ç")
    );
  }

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const request = await fetch(
        "https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/saveVW",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const volt = await request.json();

      if (volt.status) {
        router.push("/realizado");
      } else {
        Swal.fire({
          title: "erro, tente novamente",
          icon: "error",
        });
      }
    } catch (e) {
      setIsLoading(false);
      console.log("erro", e);
    }
  };

  // const handleStateChange = (event) => {
  //   handleInputChange(event);

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     concessionaire_city: "",
  //     concessionaire: "",
  //   }));

  //   // setInfosRender(0);
  //   // setMessageRender(0);

  //   const state = event.target.value;

  //   const stateData = cityState[state];

  //   setCities(stateData ? Array.from(stateData) : []);
  // };

  const handleGetConcessionaire = async (event) => {
    handleInputChange(event);
    setValue("concessionaire_city", event.target.value);
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   concessionaire: "",
    // }));

    if (event.target.value != "") {
      const request = await fetch(
        `/api/getConcessionaires?state=${formData.concessionaire_state}&city=${event.target.value}&training=${training.id}`,
        {
          method: "GET",
        }
      );

      const response = await request.json();

      if (request.ok) {
        // console.log(response);
        setConcessionaires(response);
        // setMessageRender(1);
      } else {
        // setMessageRender(2);
        // setInfosRender(0);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormatChange = (event) => {
    handleInputChange(event);
    // if (event.target.value === "inperson") {
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         trainingID: props.content.id,
    //         concessionaire_state: "",
    //         concessionaire_city: "",
    //         concessionaire: "",
    //     }));
    // }
  };
  const handleConcessionaireChange = async (event) => {
    setAlert(null);
    // handleInputChange(event);
    setValue("concessionaire", event.target.value.fantasy_name);
    setConcessionaire(event.target.value);

    const data = {
      concessionaireID: event.target.value.id,
    };

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const request = await fetch(`/api/getTrainingByConcessionaireId`, {
      method: "POST",
      body: formData,
    });

    const response = await request.json();

    // console.log(response.data[0].training_vacancies);
    if (request.ok) {
      setTrainings(response.data[0].training_vacancies);
      // setMessageRender(1)
    } else {
      // setMessageRender(2)
      // setInfosRender(0)
    }
  };

  React.useEffect(() => {
    if (watch("mode") == "online") {
      setRenderForm(false);
    } else {
      setRenderForm(true);
    }
  }, [watch("mode")]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <ToastContainer />
        <CssBaseline />
        <Box sx={{ marginY: 20 }}>
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
                Faça seu cadastro
              </Typography>
            </Box>

            <Box noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="document"
                    control={control}
                    {...register("document", {
                      onChange: (event) =>
                        handleSearchDocument(event, setValue, setVerifyIfExist),
                    })}
                    render={({ field }) => (
                      <TextField
                        key="document"
                        id="document"
                        label="CPF"
                        fullWidth
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#F8F8F8",
                            "& fieldset": { border: "none" },
                          },
                        }}
                        InputProps={{
                          inputComponent: MaskedInput,
                          inputProps: {
                            mask: "000.000.000-00",
                          },
                        }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>

            {!verifyIfExist ? (
              <>
                <Box noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
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

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            key="password"
                            id="password"
                            label="Senha (mínimo 6 caracteres)"
                            type="password"
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    className="m-5 text-volks-blue-900 font-bold"
                    component="h1"
                    variant="h5"
                  >
                    Dados da oficina
                  </Typography>
                </Box>

                <Box noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2} className="mb-5">
                    <Grid item xs={12}>
                      <Controller
                        name="check"
                        control={control}
                        {...register("check", {
                          onChange: (event) =>
                            handleCheckboxChange(event, setIsChecked, setValue),
                        })}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Checkbox checked={isChecked} {...field} />
                            }
                            label="Possui ou trabalha em oficina?"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  {isChecked && (
                    <>
                      <Grid item xs={12}>
                        <Controller
                          name="cnpj"
                          control={control}
                          {...register("cnpj", {
                            onChange: (event) =>
                              handleCNPJVerify(
                                event,
                                setformRender,
                                setautoRepairInfo
                              ),
                          })}
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

                      {formAutoRepair(formRender)}
                    </>
                  )}
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
              </>
            ) : (
              <Box className="mt-5">
                <Box className="text-center">
                  <Typography
                    variant="h6"
                    className="text-volks-blue-900 font-bold"
                    gutterBottom
                  >
                    Encontramos seu cadastro na nossa base, como deseja
                    prosseguir?
                  </Typography>
                </Box>
                <Box className="flex justify-around">
                  <Link href="/login">Fazer login</Link>
                  <Link href="/reset-password">Recuperar senha</Link>
                </Box>
              </Box>
            )}
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );

  function formAutoRepair(form) {
    switch (form) {
      case 1:
        return (
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
                      setAutoRepairAddress(
                        await handleSearchCep(event, setAlert)
                      );
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
        );
      case 2:
        return (
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
                  name="branch_activity"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      key="branch_activity"
                      id="branch_activity"
                      label="Ramo de atividade"
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
            </Grid>
          </Box>
        );
    }
  }
}
