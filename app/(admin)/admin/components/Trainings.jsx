import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';

export default function Trainings() {
    const [trainings, setTrainings] = React.useState([])
    const router = useRouter()

    React.useEffect(() => {
        const getTrainings = async () => {
            const request = await fetch('/api/admin', {
                method: 'GET',
            })

            const response = await request.json()

            if (request.ok) {
                setTrainings(response)
            } else {
                setTrainings(response)
            }
        }

        getTrainings()
    }, [])

    const handleInfos = (id) => {
        router.push(`/admin/training/${id}`)
    }
    
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Treinamentos
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Lista de inscritos</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {[...trainings].reverse().map((row) => (
                    <TableRow key={row.id}>
                        <TableCell className='font-bold'>#{row.id}</TableCell>
                        <TableCell>{moment(row.date).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{Boolean(parseInt(row.active)) ? 'Ativo' : 'Encerrado'}</TableCell>
                        <TableCell align="right">
                            <Button variant="text" onClick={() => handleInfos(row.id)}>Ver</Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}