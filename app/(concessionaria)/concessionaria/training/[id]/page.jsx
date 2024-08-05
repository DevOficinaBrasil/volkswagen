"use client"

import * as React from 'react';
import Layout from '../../components/Layout';
import "react-toastify/dist/ReactToastify.css";
import UserContext from '@/src/contexts/UserContext';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import Title from '../../components/Title';

export default function Page({ params }) {
    const [users, setUsers] = React.useState([])
    const { userData } = React.useContext(UserContext)
    const [updateComponent, setUpdateComponent] = React.useState(false)

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
            setUpdateComponent(false)
        }

        getTrainings()
    }, [userData, updateComponent])

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
              setUpdateComponent(true)
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
    
    return(
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <ToastContainer />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Title>Usuários cadastrados</Title>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Box className="flex justify-between">
                                <Box className="text-right">
                                    <Typography variant="h6" className="font-bold" gutterBottom>
                                        Total de inscritos: {totalUsers}
                                    </Typography>
                                </Box>
                            </Box>
                            <Table size="small" sx={{ '& .MuiTableHead-root': { backgroundColor: 'rgb(229, 231, 235)', overflow: "hidden" } }}>
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
                                            <Button variant="text" onClick={() => handleInfos(row.id)} sx={{ backgroundColor: "rgb(239 68 68)", color: "white", borderRadius: "5px", ":hover": { backgroundColor: "rgb(220 38 38)" } }}>Retirar presença</Button>
                                            :
                                            <Button variant="text" onClick={() => handleInfos(row.id)} sx={{ backgroundColor: "rgb(96 165 250)", color: "white", borderRadius: "5px", ":hover": { backgroundColor: "rgb(59 130 246)" } }}>Marcar presença</Button>
                                        }
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}