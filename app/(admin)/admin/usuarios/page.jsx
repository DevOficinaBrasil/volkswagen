"use client"

import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';

export default function Page() {
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        const getUsers = async () => {
            const request = await fetch(`/api/admin/getUsers`, {
                method: 'GET',
            })

            const response = await request.json()

            if (request.ok) {
                setUsers(response)
            }
        }

        getUsers()
    }, [])
    console.log(users)
    return(
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box>
                    <Paper className="flex flex-col gap-5 p-5">
                        <Box>
                            <Paper className="p-5">
                                <Typography variant="h5" className="font-bold uppercase mb-5">Usuários cadastrados no sistema</Typography>
                                <Box>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nome</TableCell>
                                                <TableCell>CPF</TableCell>
                                                <TableCell align="right">Email</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.data.map((user, index) => (
                                                <TableRow>
                                                    <TableCell>{user.name}</TableCell>
                                                    <TableCell>{user.document}</TableCell>
                                                    <TableCell align="right">{user.email}</TableCell>
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