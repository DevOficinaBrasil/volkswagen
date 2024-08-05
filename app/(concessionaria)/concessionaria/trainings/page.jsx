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

export default function Trainings(){
    const { userData } = React.useContext(UserContext);
    const [trainings, setTrainings] = React.useState([])
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
                const request = await fetch(`/api/manager/trainings/${userData.id}`, {
                    method: 'GET',
                })
    
                const response = await request.json()
    
                if (request.ok) {
                    setTrainings(response)
                    console.log(response)
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
                <Title>Seus Treinamentos</Title>
                <Table size="small" sx={{ '& .MuiTableHead-root': { backgroundColor: 'rgb(229, 231, 235)', overflow: "hidden" } }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Título</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Ver Inscritos</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trainings.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-sky-400 font-bold">#{row.trainings.id}</TableCell>
                                <TableCell>{row.trainings.name}</TableCell>
                                <TableCell>{moment(row.trainings.date).format("DD/MM/YYYY")}</TableCell>
                                <TableCell className="text-sky-400">{Boolean(parseInt(row.trainings.active)) ? 'Ativo' : 'Encerrado'}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" className="text-black shadow-md bg-gradient-to-r from-blue-700 to-blue-400 font-bold text-white px-5" onClick={() => { handleInfos(row.trainings.id) }}>
                                        Ver inscritos
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </Layout>
    )
}