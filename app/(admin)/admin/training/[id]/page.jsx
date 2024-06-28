"use client"

import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import * as React from 'react';
import Layout from '../../components/Layout';

export default function Page({ params }) {
    const [users, setUsers] = React.useState([])
    const [trainingInfo, setTrainingInfo] = React.useState([])

    React.useEffect(() => {
        const getTrainings = async () => {
            const request = await fetch(`/api/usersOnTraining?training=${params.id}`, {
                method: 'GET',
            })

            const response = await request.json()

            if (request.ok) {
                setTrainingInfo(response)
                setUsers(response.users)
            } else {
                setUsers(response)
            }
        }

        getTrainings()
    }, [])

    let counter = 0
    users.map((user) => {
        if(user.pivot.concessionaire_id == 0){
            counter++
        }
    })

    const totalUsers = Object.keys(users).length
    const onlineUsers = counter
    const presencialUser = totalUsers - onlineUsers
    
    return(
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <React.Fragment>
                                <Box className="flex justify-between">
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Treinamento {trainingInfo.name}
                                    </Typography>
                                    <Box className="text-right">
                                        <Typography component="h2" variant="h6" color="secondary" gutterBottom>
                                            Total de inscritos: {totalUsers}
                                        </Typography>
                                        <Typography component="h4" variant="subtitle" color="secondary" gutterBottom>
                                            Online: {onlineUsers}
                                        </Typography>
                                        <Typography component="h4" variant="subtitle" color="secondary" gutterBottom>
                                            Presencial: {presencialUser}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Nome</TableCell>
                                            <TableCell>CPF</TableCell>
                                            <TableCell align="right">Formato</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {users.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className='font-bold'>#{row.id}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.document}</TableCell>
                                            <TableCell align="right">{row.pivot.concessionaire_id == 0 ? 'Online' : 'Presencial'}</TableCell>
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