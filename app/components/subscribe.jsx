"use client";

import * as React from "react";
import UserContext from "@/src/contexts/UserContext";
import locations from "@/src/locations.json";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import Title from "./title";
import { format } from "date-fns";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import moment from "moment";

export default function SubscribeModal(props) {
    const { isAuthenticated, userData } = React.useContext(UserContext);
    const [concessionairesInfos, setConcessionairesInfos] = React.useState(null)
    const [concessionaires, setConcessionaires] = React.useState([])
    const [messageRender, setMessageRender] = React.useState(0)
    const [infosRender, setInfosRender] = React.useState(0)
    const [formRender, setFormRender] = React.useState(0)
    const [stateName, setstateName] = React.useState([])
    const [cities, setCities] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const [cityState, setCityState] = React.useState([])
    const router = useRouter()
    const [formData, setFormData] = React.useState({
        format: '',
        concessionaire_state: '',
        concessionaire_city: '',
        concessionaireID: 0,
        concessionaire: '',
        userId: '',
        trainingID: '',
    })
    
    const estadosCidade = {}
    const date = moment(props.content.date).format("DD/MM/YYYY")
    const concessionaireAddress = props.concessionaire ? props.concessionaire.concessionaires : props.content.concessionaires
    
    React.useEffect(() => {
        if(userData){
            setFormData((prevFormData) => ({
                ...prevFormData,
                userId: userData.id,
            }))
        }
    }, [userData])

    React.useEffect(() => {
        if(concessionaireAddress){
            concessionaireAddress.forEach(element => {
                if(element.address){
                    const estado = element.address.city.state.value
                    const cidade = element.address.city.value

                    if(!estadosCidade[estado]) {
                        estadosCidade[estado] = new Set()
                    }

                    estadosCidade[estado].add(cidade)

                    setCityState(estadosCidade)
                }
            })
        }
    }, [concessionaireAddress])

    React.useEffect(() => {
        const arraySearch = locations.estados.filter(object => Object.keys(cityState).includes(object.sigla))

        const arrayFind = arraySearch.map(objeto => ({ sigla: objeto.sigla, nome: objeto.nome }))

        setstateName(arrayFind)
    }, [cityState])

    const handleGetConcessionaire = async (event) => {
        handleInputChange(event)

        setFormData((prevFormData) => ({
            ...prevFormData,
            concessionaire: '',
        }))

        if (event.target.value != '') {
            const request = await fetch(`/api/getConcessionaires?state=${formData.concessionaire_state}&city=${event.target.value}&training=${props.content.id}`, {
                method: 'GET',
            })

            const response = await request.json()

            if (request.ok) {
                setConcessionaires(response)
                setMessageRender(1)
            } else {
                setMessageRender(2)
                setInfosRender(0)
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

        if (event.target.value === "inperson") {
            setFormRender(1);
        } else {
            setFormRender(2);
            setInfosRender(0);
            setMessageRender(0);

            setFormData((prevFormData) => ({
                ...prevFormData,
                trainingID: props.content.id,
                concessionaire_state: "",
                concessionaire_city: "",
                concessionaire: "",
            }));
        }
    };

    const handleStateChange = (event) => {
        handleInputChange(event);

        setFormData((prevFormData) => ({
            ...prevFormData,
            concessionaire_city: "",
            concessionaire: "",
        }));

        setInfosRender(0);
        setMessageRender(0);

        const state = event.target.value

        const stateData = cityState[state]

        setCities(stateData ? Array.from(stateData) : [])
    }
    
    const handleConcessionaireChange = (event) => {
        handleInputChange(event)

        if (event.target.value != null) {
            setConcessionairesInfos(concessionaires[event.target.value]);

            setFormData((prev) => ({
                ...prev,
                concessionaireID: concessionaires[event.target.value].id,
                trainingID: props.content.id,
            }));

            if (concessionaires[event.target.value].vacancies > 0) {
                setInfosRender(1);
            } else {
                setInfosRender(2);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let request;

        const sendFormData = new FormData();

        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                sendFormData.append(key, formData[key]);
            }
        }

        if (props.type == "insert") {
            request = await fetch("/api/registerTraining", {
                method: "POST",
                body: sendFormData,
            });
        } else {
            sendFormData.append("id", props.id);

            request = await fetch("/api/updateTraining", {
                method: "PUT",
                body: sendFormData,
            });
        }

        const response = await request.json();
        
        if (request.ok) {
            setOpen(false);
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
        } else {
            setOpen(false);
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

    const Subscribe = () => {
        return (
        <Box noValidate sx={{ mt: 3 }}>
            <Grid
                container
                spacing={2}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Grid item xs={6} className="text-center">
                    <Typography className="text-indigo-400 font-bold">
                        Data do evento:{" "}
                    </Typography>
                    <Typography className="">{date}</Typography>
                </Grid>
                <Grid item xs={6}>
                    {props.type == "insert" ? (
                    <Button variant="outlined" onClick={handleSubmit}>
                        Fazer Inscrição!
                    </Button>
                    ) : (
                    <Button variant="outlined" onClick={handleSubmit}>
                        Atualizar!
                    </Button>
                    )}
                </Grid>
            </Grid>
        </Box>
        );
    };

  return (
        <Box>
            <Button
                variant="contained"
                onClick={() => {
                isAuthenticated ? handleOpen() : router.push("/login");
                }}
            >
                {props.children}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 450,
                        bgcolor: "background.paper",
                        transform: "translate(-50%, -50%)",
                        borderRadius: 2,
                        p: 4,
                    }}
                >
                <Box noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                            <InputLabel id="format">Formato do treinamento</InputLabel>
                            <Select
                                required
                                fullWidth
                                labelId="format"
                                label="Formato do treinamento"
                                value={formData.format}
                                onChange={handleFormatChange}
                                name="format"
                            >
                                <MenuItem key="format-online" value="online">
                                    Online
                                </MenuItem>
                                <MenuItem key="format-inperson" value="inperson">
                                    Presencial
                                </MenuItem>
                            </Select>
                            </FormControl>

                            {formConcessionaireAddress(formRender)}

                            {FindConcessionaire(messageRender)}

                            {ConcessionaireInfos(infosRender)}
                        </Grid>
                    </Grid>
                </Box>
                </Box>
            </Modal>
        </Box>
    );

    function formConcessionaireAddress(form) {
        switch (form) {
        case 1:
            return (
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Title
                        title="Escolha uma concessionária"
                        mt="7"
                        mb="5"
                        variant="h6"
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="auto-repair-state-select-label">
                                Estado
                            </InputLabel>
                            <Select
                                required
                                fullWidth
                                labelId="auto-repair-state-select-label"
                                value={formData.concessionaire_state}
                                onChange={handleStateChange}
                                name="concessionaire_state"
                            >
                                {stateName.map((estado) => (
                                        <MenuItem key={estado.sigla} value={estado.sigla}>
                                            {estado.nome}
                                        </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="auto-repair-city-select-label">
                                Cidade
                            </InputLabel>
                            <Select
                                required
                                fullWidth
                                labelId="auto-repair-city-select-label"
                                value={formData.concessionaire_city}
                                onChange={handleGetConcessionaire}
                                name="concessionaire_city"
                            >
                                {cities.map((cidade, index) => (
                                    <MenuItem key={index} value={cidade}>
                                        {cidade}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                </Box>
            );
        case 2:
            return <Subscribe />;
        }
    }

    function FindConcessionaire(form) {
        switch (form) {
        case 1:
            return (
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputLabel id="concessionaire-select-label">
                                Concessionárias
                            </InputLabel>
                            <Select
                                required
                                fullWidth
                                labelId="concessionaire-select-label"
                                value={formData.concessionaire}
                                onChange={handleConcessionaireChange}
                                name="concessionaire"
                            >
                                {concessionaires.map((concessionaire, index) => (
                                    <MenuItem key={index} value={index}>
                                        {concessionaire.fantasy_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                </Box>
            );
        case 2:
            return (
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Typography>Nenhuma concessionária encontrada</Typography>
                </Box>
            );
        }
    }
    
    function ConcessionaireInfos(infosRender) {
        switch (infosRender) {
        case 1:
            return (
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className="text-center">
                        <Title
                            title={`Vagas disponiveis: ${concessionairesInfos.vacancies}`}
                            mt="7"
                            mb="5"
                            variant="h6"
                        />
                    </Grid>
                    <Grid item xs={12} className="text-center">
                        <Title title="Endereço" mt="7" mb="5" variant="h6" />

                        <Typography>
                            {concessionairesInfos.address.street +
                            ", " +
                            concessionairesInfos.address.number +
                            ". CEP: " +
                            concessionairesInfos.address.cep}
                        </Typography>
                    </Grid>
                </Grid>

                <Subscribe />
            </Box>
            );
        case 2:
            return (
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className="text-center">
                        <Typography>
                        Sem vagas disponíveis para essa concessionária
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            );
        }
    }
}
