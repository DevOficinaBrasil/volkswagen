import { Box, Button, Grid, Typography } from "@mui/material";
import EastIcon from '@mui/icons-material/East'
import Image from "next/image";

export default function SubBanner(props) {
    return(
        <Box className="mb-20 mt-36" id="economy">
            <Grid container spacing={10} className="flex justify-between items-center">
                <Grid item xs={7}>
                    <Box sx={{
                        width: '100%',
                        position: 'relative',
                        '::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: -60,
                            bottom: 0,
                            width: 50,
                            background: 'linear-gradient(to right, rgba(2,39,96,1) 75%, rgba(8,74,176,1) 75%)',
                            zIndex: 1,
                        },
                    }}>
                        <Image src={props.image} />
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Box sx={{ 
                        backgroundColor: 'rgb(250, 250, 250)',
                        width: '100%',
                        height: '100%',
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Box sx={{
                            textAlign: 'left',
                            padding: 5,
                        }}>
                            <Typography variant="subtitle1" className="font-bold text-blue-400" gutterBottom>
                                {props.subtitle}
                            </Typography>
                            <Typography variant="h5" className="font-bold" gutterBottom>
                                {props.title}
                            </Typography>
                            <Typography variant="body1" className="mb-5">
                                {props.children}
                            </Typography>
                            <a href="/documents/CATALOGO_ECONOMY.pdf" download="CATALOGO_ECONOMY.pdf">
                                <Button variant="text" endIcon={<EastIcon />}>Saiba Mais</Button>
                            </a>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}