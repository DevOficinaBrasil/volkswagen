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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <ToastContainer />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <React.Fragment>
                            <Box className="flex justify-between">
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Concessionárias
                                </Typography>
                            </Box>
                            <Table size="small">
                                
                            </Table>
                        </React.Fragment>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}