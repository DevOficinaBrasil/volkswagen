"use client"

import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import * as React from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [concessionaires, setConcessionaires] = React.useState([])
    const router = useRouter()

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
    
    return(
        <React.Fragment>
        <ToastContainer />
            <Box className="flex justify-between">
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Concessionárias
                </Typography>
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome Fantasia</TableCell>
                        <TableCell>CNPJ</TableCell>
                        <TableCell>DN</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell align="right">Acesso</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {concessionaires.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell className='font-bold'>#{row.id}</TableCell>
                        <TableCell>{row.fantasy_name}</TableCell>
                        <TableCell>{row.CNPJ}</TableCell>
                        <TableCell>{row.DN}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell align="right">{row.concessionaire_login_id == 0 ? <Button variant="text" onClick={() => handleInfos(row.id)}>Gerar senha</Button> : <h1>Usuário já possui acesso</h1>}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}