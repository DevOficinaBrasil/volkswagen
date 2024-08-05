"use client"

import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Layout from './components/Layout'
import { Box, Button, Divider, Typography } from '@mui/material';

export default function Dashboard() {
    function Title({ children }){
        return(
            <Box className="flex items-center justify-center mb-3">
                <Box className="grow">
                    <Divider sx={{ borderBottomWidth: 1, width: '95%' }} />
                </Box>
                <Typography variant="h3" className="relative font-bold inline-block" sx={{
                '::before': {
                    position: 'absolute',
                    content: '""',
                    right: -10,
                    zIndex: -1,
                    width: '72%',
                    height: '100%',
                    borderRadius: 1,
                    backgroundColor: '#01B9FE',
                }
                }}>
                {children}
                </Typography>
                <Box className="grow">
                    <Divider sx={{ borderBottomWidth: 1, width: '80%', ml: 5 }} />
                </Box>
            </Box>
        )
    }

    return (
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Title variant='h3' className='font-bold'>Bem Vindo</Title>
                <Box className="text-center px-28">
                    <Typography variant='h5' gutterBottom>ao seu painel de administrador</Typography>
                    <Typography variant='body'>
                        Aqui você pode ver e controlar os inscritos na sua unidade, baixar os kits de divulgação e várias outras funcionalidades que ainda serão disponibilizadas em breve.
                    </Typography>
                </Box>
                <Box className="flex flex-col gap-5 mt-10">
                    <Button sx={{ backgroundColor: "transparent", border: "2px solid #00B1FF", borderRadius: "5px" }} href='/concessionaria/trainings' fullWidth>Treinamentos</Button>
                    <Button sx={{ backgroundColor: "transparent", border: "2px solid #00B1FF", borderRadius: "5px" }} href='/concessionaria/kits' fullWidth>Kits de divulgação</Button>
                </Box>
            </Container>
        </Layout>
    );
}