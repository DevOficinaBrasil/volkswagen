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

const defaultTheme = createTheme();

export default function HorizontalLinearStepper() {
  const router = useRouter();
  const [alert, setAlert] = React.useState(null);
  const [verifyIfExist, setVerifyIfExist] = React.useState(false)
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
      const request = await fetch("/api/getTrainings", {
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

      state: "",
      street: "",
      number: "",
      complement: "",
      city: "",
      cep: "",
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

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (watch("mode") == "online") {
      try {
        const request = await fetch("/api/signup", {
          method: "POST",
          body: formData,
        });
        if (!request.ok) {
          throw new Error(fixEncoding(request.statusText));
        }

        // console.log(request);
        const response = await request.json();
        // console.log(response);

        if (watch("mode") != "online" && concessionaire.vacancies > 0) {
          registerTraining({
            concessionaireId: `${concessionaire.id}`,
            trainingId: `${training.id}`,
            userId: `${response.idUser}`,
            token: response.token,
          });
        } else {
          registerTraining({
            concessionaireId: "0",
            trainingId: `${training.id}`,
            userId: `${response.idUser}`,
            token: response.token,
          });
        }

        setAlert(null);

        toast.success(response.message, {
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
          setIsLoading(false);

          router.push("/cadastro/realizado");
        }, 5000);
      } catch (error) {
        setAlert(error.message);
        setIsLoading(false);
      }
    } else {
      if (concessionaire.vacancies > 0) {
        try {
          const request = await fetch("/api/signup", {
            method: "POST",
            body: formData,
          });

          if (!request.ok) {
            throw new Error(fixEncoding(request.statusText));
          }
          // console.log(request);
          const response = await request.json();
          // console.log(response);

          if (watch("mode") != "online" && concessionaire.vacancies > 0) {
            registerTraining({
              concessionaireId: `${concessionaire.id}`,
              trainingId: `${training.id}`,
              userId: `${response.idUser}`,
              token: response.token,
            });
          } else {
            registerTraining({
              concessionaireId: "0",
              trainingId: `${training.id}`,
              userId: `${response.idUser}`,
              token: response.token,
            });
          }

          setAlert(null);

          toast.success(response.message, {
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
            setIsLoading(false);

            router.push("/cadastro/realizado");
          }, 5000);
        } catch (error) {
          setAlert(error.message);
          setIsLoading(false);
        }
      } else {
        setAlert("Concessionária selecionada não possui vagas...");
        setIsLoading(false);
      }
    }
  };
  const registerTraining = async (data) => {
    setIsLoading(true);

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/training`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
        body: JSON.stringify(data),
      });

      const response = await request.text();

      if (!request.ok) {
        throw new Error(response);
      }

      setAlert(null);

      toast.success("Cadastro e inscrição realizados com sucesso!", {
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
        setIsLoading(false);

        router.push("/cadastro/realizado");
      }, 5000);
    } catch (error) {
      // setAlert(error.message);
      setIsLoading(false);
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
    setValue("concessionaire", event.target.value.fantasy_name);
    setConcessionaire(event.target.value);
  }

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

            {!verifyIfExist ? 
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
                Adicione seu endereço
              </Typography>
            </Box>

            <Box noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="cep"
                    control={control}
                    {...register("cep", {
                      onChange: async (event) => {
                        setAddress(await handleSearchCep(event, setAlert));
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

            {training &&
            <Box>
              <Grid item xs={12} sm={12}>
                <Typography
                  className="m-5 text-volks-blue-900 font-bold text-center"
                  component="h1"
                  variant="h5"
                >
                  Inscreva-se - {training.name}
                </Typography>
                <FormControl
                  onChange={(event) => {
                    // console.log(event);
                  }}
                  fullWidth
                >
                  {/* <InputLabel id="mode-select-label">
                        Escolha o modo
                      </InputLabel> */}
                  <FormLabel component="legend">Escolha o modo</FormLabel>
                  <Controller
                    name="mode"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="online"
                          control={<Radio />}
                          label="Online"
                        />
                        <FormControlLabel
                          className="mt-2"
                          value="presencial"
                          control={<Radio />}
                          label={`Presencial`}
                        />{" "}
                      </RadioGroup>
                    )}
                  />
                </FormControl>
                {errors.training && (
                  <div className="ml-2 text-red-600">
                    {errors.training.message}
                  </div>
                )}
              </Grid>
              {training && renderForm == false && (
                <div className="border-4 border-volks-blue-800 border-opacity-50 rounded-xl px-5 py-2">
                  <Typography className="font-extrabold text-volks-blue-800 mb-3 text-lg text-left">
                    Informações:
                  </Typography>
                  <Typography className=" text-slate-500 text-xl mt-2">
                    {training.name}
                  </Typography>
                  <Typography className=" text-slate-500 text-xl mt-2">
                    {convertDate(training.date)}
                  </Typography>
                </div>
              )}
              {renderForm && (
                <Grid container spacing={2} className="mt-2">
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="concessionaire_state"
                      rules={{ required: "Campo obrigatório" }}
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel id="Estado">Estado</InputLabel>
                          <Select
                            className="bg-[#F8F8F8]"
                            {...field}
                            label="Estado"
                            labelId="Estado"
                            id="Estado"
                            onChange={handleStateChange}
                            sx={{
                              backgroundColor: "#F8F8F8",
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                            }}
                            error={!!errors.concessionaire_state}
                            // onChange={(value) => {

                            //   // console.log(value.target.value);
                            // }}
                          >
                            {stateName.map((estado) => (
                              <MenuItem
                                key={estado.sigla}
                                value={estado.sigla}
                              >
                                {estado.nome}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    {errors.concessionaire_state && (
                      <div className="ml-2 text-red-600">
                        {errors.concessionaire_state.message}
                      </div>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="concessionaire_city"
                      rules={{ required: "Campo obrigatório" }}
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel id="city">Cidade</InputLabel>
                          <Select
                            className="bg-[#F8F8F8]"
                            {...field}
                            onChange={handleGetConcessionaire}
                            label="Estado"
                            labelId="Estado"
                            id="Estado"
                            error={!!errors.concessionaire_city}
                            sx={{
                              backgroundColor: "#F8F8F8",
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                            }}
                            // onChange={(value) => {

                            //   // console.log(value.target.value);
                            // }}
                          >
                            {cities.map((cidade) => (
                              <MenuItem key={cidade} value={cidade}>
                                {cidade}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    {errors.concessionaire_city && (
                      <div className="ml-2 text-red-600">
                        {errors.concessionaire_city.message}
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      name="concessionaire"
                      rules={{ required: "Campo obrigatório" }}
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel id="city">Concessionaria</InputLabel>
                          <Select
                            className="bg-[#F8F8F8]"
                            {...field}
                            onChange={handleConcessionaireChange}
                            label="Concessionaria"
                            labelId="Concessionaria"
                            id="Concessionaria"
                            error={!!errors.concessionaire}
                            sx={{
                              backgroundColor: "#F8F8F8",
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                            }}
                            // onChange={(value) => {

                            //   // console.log(value.target.value);
                            // }}
                          >
                            {concessionaires.map((concessionaire) => (
                              <MenuItem
                                key={concessionaire.fantasy_name}
                                value={concessionaire}
                              >
                                {concessionaire.fantasy_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />

                    {errors.concessionaire && (
                      <div className="ml-2 text-red-600">
                        {errors.concessionaire.message}
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    {concessionaires &&
                    concessionaire &&
                    concessionaire.vacancies > 0 ? (
                      <div className="border-4 border-volks-blue-800 border-opacity-50 rounded-xl px-5 py-2">
                        <Typography className="font-extrabold text-volks-blue-800 mb-3 text-lg text-left">
                          Endereço da concessionária -{" "}
                          <span className="text-slate-500">
                            VAGAS RESTANTES: {concessionaire.vacancies}
                          </span>
                        </Typography>
                        <Typography className=" text-slate-500 text-xl mt-2">
                          {concessionaire.fantasy_name}
                        </Typography>
                        <Typography className=" text-slate-500 text-xl mt-2">
                          <span className="font-bold">Cep:</span>{" "}
                          {concessionaire.address &&
                            concessionaire.address.cep}
                        </Typography>
                        <Typography className=" text-slate-500 text-xl mt-2">
                          <span className="font-bold">Rua:</span>{" "}
                          {concessionaire.address &&
                            concessionaire.address.street}
                          ,{" "}
                          {concessionaire.address &&
                            concessionaire.address.number}
                        </Typography>
                        {concessionaire.address &&
                        concessionaire.address.complement ? (
                          <Typography>
                            {concessionaire.address.complement}
                          </Typography>
                        ) : null}
                      </div>
                    ) : (
                      watch("concessionaire") && (
                        <div className="border-4 border-volks-blue-800 border-opacity-50 rounded-xl px-5 py-2">
                          <Typography className="font-extrabold text-volks-blue-800 mb-3 text-lg text-left">
                            SEM VAGAS
                          </Typography>
                        </div>
                      )
                    )}
                  </Grid>
                </Grid>
              )}
            </Box>
            }

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
                        control={<Checkbox checked={isChecked} {...field} />}
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
            </>:
              <Box className="mt-5">
                <Box className="text-center">
                  <Typography variant="h6" className="text-volks-blue-900 font-bold" gutterBottom>Encontramos seu cadastro na nossa base, como deseja prosseguir?</Typography>
                </Box>
                <Box className="flex justify-around">
                  <Link href="/login">Fazer login</Link>
                  <Link href="/reset-password">Recuperar senha</Link>
                </Box>
              </Box>
            }
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
