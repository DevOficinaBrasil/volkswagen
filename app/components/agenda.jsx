import { Box, Button, Divider, Grid, Typography, colors } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import useWindowSize from "../hooks/useWindowsSize";
import * as React from 'react';
import Link from "next/link";

export default function Agenda(){
    const [mobile, setMobile] = React.useState(false);

    const windowSize = useWindowSize();

    React.useEffect(() => {
        if (windowSize.width <= 1080) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }, [windowSize]);

    return(
        <Box>
            <Box className="bg-blue-400 px-10 py-2 mb-10 text-white rounded">
                <Divider sx={{ '::before': { borderColor: 'white' }, '::after': { borderColor: 'white' } }}>
                    <Typography variant="h5" className="uppercase font-bold">Agenda 2024</Typography>
                </Divider>
            </Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="flex justify-center">
                <Grid item xs={12} sm className="flex flex-col justify-between">
                    <Box className="h-full flex flex-col justify-between bg-volks-grey-100 py-3 px-5 border-rounded">
                        <Typography className="flex items-center text-volks-blue-800 font-bold" gutterBottom>
                            <LockOutlinedIcon className="mr-2" /> Arrefecimento
                        </Typography>
                        <Typography variant="subtitle uppercase">
                            Golf GTI 2.0 EA888
                        </Typography>
                        <Typography className="text-volks-blue-800 font-bold mt-5" gutterBottom>
                            Dia 05 de Novembro
                        </Typography>
                        <Button variant="contained" disabled>Em breve</Button>
                    </Box>
                </Grid>
                <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                    <Divider orientation="vertical" sx={{ borderBottomWidth: 3 }} />
                </Grid>
                <Grid item xs={12} sm  className="grow">
                    <Box className="h-full flex flex-col justify-between bg-volks-grey-100 py-3 px-5 border-rounded">
                        <Typography className="flex items-center text-volks-blue-800 font-bold" gutterBottom>
                            <LockOpenOutlinedIcon className="mr-2" sx={{ color: "green" }} /> Motor
                        </Typography>
                        <Typography variant="subtitle uppercase">
                            Amarok V6
                        </Typography>
                        <Typography className="text-volks-blue-800 font-bold mt-5" gutterBottom>
                            Dia 03 de Setembro
                        </Typography>
                        <Button variant="contained" href="/treinamento">Se inscreva!</Button>
                    </Box>
                </Grid>
                <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                    <Divider orientation="vertical" sx={{ borderBottomWidth: 3 }} />
                </Grid>
                <Grid item xs={12} sm  className="flex flex-col justify-between ">
                    <Box className="h-full flex flex-col justify-between bg-volks-grey-100 py-3 px-5 border-rounded">
                        <Typography className="flex items-center text-volks-blue-800 font-bold" gutterBottom>
                            <LockOutlinedIcon className="mr-2" />Novas Tecnologias 
                        </Typography>
                        <Typography variant="subtitle uppercase">
                            Novas tecnologias em motores turbos T-Cross
                        </Typography>
                        <Typography className="text-volks-blue-800 font-bold mt-5" gutterBottom>
                            Dia 04 de Junho
                        </Typography>
                        <Button variant="contained" disabled>Encerrado</Button>
                    </Box>
                </Grid>
                <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Divider orientation="vertical" sx={{ borderBottomWidth: 3 }} />
                </Grid>
                <Grid item xs={12} sm className="flex flex-col justify-between ">
                    <Box className="h-full flex flex-col justify-between bg-volks-grey-100 py-3 px-5 border-rounded">
                        <Typography className="flex items-center text-volks-blue-800 font-bold" gutterBottom>
                            <LockOutlinedIcon className="mr-2" /> Injeção eletrônica
                        </Typography>
                        <Typography variant="subtitle uppercase">
                            Virtus 1.6 16V
                        </Typography>
                        <Typography className="text-volks-blue-800 font-bold mt-5" gutterBottom>
                            Dia 16 de Abril
                        </Typography>
                        <Button variant="contained" disabled>Encerrado</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}