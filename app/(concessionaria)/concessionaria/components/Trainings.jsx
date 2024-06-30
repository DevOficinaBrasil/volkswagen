import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import UserContext from '@/src/contexts/UserContext';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import DownloadButton from '@/app/components/downloadButton';

export default function Trainings(){
    const { userData } = React.useContext(UserContext);
    const [trainings, setTrainings] = React.useState([])
    const router = useRouter()

    React.useEffect(() => {
        if(userData){
            const getTrainings = async () => {
                const request = await fetch(`/api/manager/trainings/${userData.id}`, {
                    method: 'GET',
                })
    
                const response = await request.json()
    
                if (request.ok) {
                    setTrainings(response)
                }
            }

            getTrainings()
        }
    }, [userData])

    const handleInfos = (id) => {
        router.push(`/concessionaria/training/${id}`)
    }
    
    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <React.Fragment>
                            <Box className="flex justify-between">
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Seus treinamentos
                                </Typography>
                            </Box>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Título</TableCell>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Material Técnico</TableCell>
                                        <TableCell align="right">Ver inscritos</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {trainings.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className='font-bold'>#{row.id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{moment(row.date).format("DD/MM/YYYY")}</TableCell>
                                        <TableCell>{row.active == 0 ? 'Inativo' : 'Ativo'}</TableCell>
                                        <TableCell>{row.material ? <DownloadButton url={row.material} filename={row.name}>Baixar material</DownloadButton> : 'Material indisponível'}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="text" onClick={() => handleInfos(row.id)}>Ver</Button>
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
    )
}