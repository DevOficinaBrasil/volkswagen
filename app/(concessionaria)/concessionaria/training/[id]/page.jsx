"use client"

import * as React from 'react';
import Layout from '../../components/Layout';
import "react-toastify/dist/ReactToastify.css";
import UserContext from '@/src/contexts/UserContext';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

export default function Page({ params }) {
    const [users, setUsers] = React.useState([])
    const { userData } = React.useContext(UserContext)

    React.useEffect(() => {
        const getTrainings = async () => {
            const request = await fetch(`/api/manager/users?training=${params.id}&concessionaire=${userData.id}`, {
                method: 'GET',
            })

            const response = await request.json()

            if (request.ok) {
                setUsers(response)
            } else {
                setUsers(response)
            }
        }

        getTrainings()
    }, [userData])

    const totalUsers = Object.keys(users).length
    
    const handleInfos = async (id) => {
        const request = await fetch(`/api/manager/updatePresence?user=${id}&training=${params.id}&concessionaire=${userData.id}`, {
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
        } else {
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
    console.log(params)
    return(
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <ToastContainer />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <React.Fragment>
                                <Box className="flex justify-between">
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Usuários presenciais nesse treinamento
                                    </Typography>
                                    <Box className="text-right">
                                        <Typography component="h2" variant="h6" color="secondary" gutterBottom>
                                            Total de inscritos: {totalUsers}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Nome</TableCell>
                                            <TableCell >CPF</TableCell>
                                            <TableCell >Telefone</TableCell>
                                            <TableCell >Email</TableCell>
                                            <TableCell align="right">CPF</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {users.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className='font-bold'>#{row.id}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.document}</TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell align="right">
                                            {Boolean(parseInt(row.trainings[0].pivot.presence)) ?
                                                <Typography>Usuário prensente</Typography>
                                                :
                                                <Button variant="text" onClick={() => handleInfos(row.id)}>Marcar presença</Button>
                                            }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </React.Fragment>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}