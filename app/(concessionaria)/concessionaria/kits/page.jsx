"use client"

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Container, Divider, Grid, Paper, Typography, styled } from '@mui/material';
import UserContext from '@/src/contexts/UserContext';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import DownloadButton from '@/app/components/downloadButton';
import Layout from '../components/Layout';
import Image from 'next/image';
import KitCard from '../components/KitCard';

export default function Trainings(){
    const { userData } = React.useContext(UserContext);
    const [training, setTraining] = React.useState([])
    const router = useRouter()

    function Title({ children }){
        return(
          <Box className="flex items-center justify-center mb-3">
            <Typography variant="h5" className="relative font-bold inline-block" sx={{
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

    React.useEffect(() => {
        if(userData){
            const getTrainings = async () => {
                const request = await fetch(`/api/getActiveTraining`, {
                    method: 'GET',
                })
    
                const response = await request.json()
    
                if (request.ok) {
                    setTraining(response)
                }
            }

            getTrainings()
        }
    }, [userData])

    const handleInfos = (id) => {
        router.push(`/concessionaria/training/${id}`)
    }

    return(
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box className="mb-10">
                    <Title>Kits de Divulgação</Title>
                    <Typography variant='subtitle'>Faça a divulgação dos treinamentos VW em sua concessionária</Typography>
                </Box>

                <Box>
                    <Grid container gap={{ xs: 2 }}>
                        <Grid item xs>
                            <KitCard kitId={training.id} title="Post e Story" archive="post" extension="zip" editableExtension="zip" />
                        </Grid>
                        <Grid item xs>
                            <KitCard kitId={training.id} title="Banner" archive="banner" extension="png" editableExtension="ai" />
                        </Grid>
                        <Grid item xs>
                            <KitCard kitId={training.id} title="Flyer" archive="flyer" extension="png" editableExtension="psd" />
                        </Grid>
                        <Grid item xs>
                            <KitCard kitId={training.id} title="Cartaz" archive="cartaz" extension="png" editableExtension="ai" />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Layout>
    )
}