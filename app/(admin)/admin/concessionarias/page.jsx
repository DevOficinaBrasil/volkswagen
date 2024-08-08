"use client"

import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Controller, useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import * as React from 'react';
import MaskedInput from '@/app/components/mask/inputMask';

export default function Page() {
    const [concessionaires, setConcessionaires] = React.useState([])
    const [address, setAddress] = React.useState("")
    const [alert, setAlert] = React.useState(false)
    const router = useRouter()
    const { register, handleSubmit, setValue, control, formState: { errors }, } = useForm({
        defaultValues: {
            cnpj: "",
            fantasy: "",
            manager: "",
            certify: "",
            email: "",
            phone: "",
            dn: "",

            cep: "",
            state: "",
            city: "",
            street: "",
            neighborhood: "",
            number: "",
        },
    });

    React.useEffect(() => {
        const getConcessionaires = async () => {
            const request = await fetch(`/api/concessionaires/getAll`, {
                method: 'GET',
            })

            const response = await request.json()

            if (request.ok) {
                setConcessionaires(response)
            }
        }

        getConcessionaires()
    }, [])

    const handleInfos = (id) => {
        const updateConcessionaire = async () => {
            const request = await fetch(`/api/concessionaires/generatePassword?concessionaire=${id}`, {
                method: 'PATCH',
            })

            const response = await request.json()

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
                setTimeout(() => {
                    router.refresh()
                  }, 5000);
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

        updateConcessionaire()
    }

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

    React.useEffect(() => {
        console.log(address)
        if (address) {
            setValue("state", address.uf);
            setValue("city", address.localidade);
            setValue("street", address.logradouro);
            setValue("neighborhood", address.bairro);
        } else {
            setValue("state", "");
            setValue("city", "");
            setValue("street", "");
        }
    }, [address, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }

        const request = await fetch(`/api/admin/addNewConcessionaire`, {
            method: 'POST',
            body: formData,
        })

        const response = await request.json()

        if (request.ok) {
            console.log(response)
        }
    }
    
    return(
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box>
                    <Paper className="flex flex-col gap-5 p-5">
                        <Box>
                            <Paper className="p-5">
                                <Typography variant="h5" className="font-bold uppercase mb-5">Adicionar concessionária</Typography>
                                <Box>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Box noValidate sx={{ mt: 3 }}>
                                            <Typography className="font-bold mb-5">Informações gerais</Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Controller
                                                        name="cnpj"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                key="cnpj"
                                                                id="cnpj"
                                                                label="CPNJ"
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
                                                                        mask: "00.000.000/0000-00",
                                                                    },
                                                                }}
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="fantasy"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                key="fantasy"
                                                                id="fantasy"
                                                                label="Nome Fantasia"
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
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="manager"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                key="manager"
                                                                id="manager"
                                                                label="Nome do gerente (ou responsável)"
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
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="certify"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                key="certify"
                                                                id="certify"
                                                                label="Nome no certificado"
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
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="email"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                key="email"
                                                                id="email"
                                                                label="Email"
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
                                                <Grid item xs={6}>
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
                                                                sx={{
                                                                    "& .MuiOutlinedInput-root": {
                                                                        backgroundColor: "#F8F8F8",
                                                                        "& fieldset": { border: "none" },
                                                                    },
                                                                }}
                                                                InputProps={{
                                                                    inputComponent: MaskedInput,
                                                                    inputProps: {
                                                                        mask: "(00) 0 0000-0000",
                                                                    },
                                                                }}
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="dn"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                key="dn"
                                                                id="dn"
                                                                label="DN"
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
                                                                        mask: "000000",
                                                                    },
                                                                }}
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box noValidate sx={{ mt: 3 }}>
                                            <Typography className="font-bold mb-5">Endereço</Typography>
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
                                                                sx={{
                                                                    "& .MuiOutlinedInput-root": {
                                                                        backgroundColor: "#F8F8F8",
                                                                        "& fieldset": { border: "none" },
                                                                    },
                                                                }}
                                                                InputProps={{
                                                                  inputComponent: MaskedInput,
                                                                  inputProps: {
                                                                    mask: "00000-000",
                                                                  },
                                                                }}
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
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
                                                <Grid item xs={6}>
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
                                                <Grid item xs={6}>
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
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="neighborhood"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                key="neighborhood"
                                                                id="neighborhood"
                                                                label="Bairro"
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
                                                <Grid item xs={6}>
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
                                            </Grid>
                                        </Box>
                                        <Box>
                                            <Button type='submit' variant='contained'>Salvar</Button>
                                        </Box>
                                    </form>
                                </Box>
                            </Paper>
                        </Box>

                        <Box>
                            <Paper className="p-5">
                                <Typography variant="h5" className="font-bold uppercase mb-5">Concessionárias cadastradas </Typography>
                                <Box>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>Nome Fantasia</TableCell>
                                                <TableCell>CNPJ</TableCell>
                                                <TableCell>DN</TableCell>
                                                <TableCell>Email</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {concessionaires.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell className='font-bold'>#{row.id}</TableCell>
                                                <TableCell>{row.fantasy_name}</TableCell>
                                                <TableCell>{row.CNPJ}</TableCell>
                                                <TableCell>{row.DN}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table> 
                                </Box>
                            </Paper>
                        </Box>  
                    </Paper>
                </Box>
            </Container>
        </Layout>
    )
}