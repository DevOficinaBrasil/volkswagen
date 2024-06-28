import { Box, Button, Grid, Typography } from "@mui/material";
import EastIcon from '@mui/icons-material/East'
import useWindowSize from "@/app/hooks/useWindowsSize";
import { useEffect, useState } from "react";

export default function SubBannerMobile(props) {

    return(
        <Box className="my-20" id="economy">
            <Grid container spacing={7}>
                <Grid item xs={12}>
                    <Box sx={{
                        position: 'relative',
                        backgroundImage: `url(${props.image.src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right',
                        backgroundSize: 'contain',
                        height: 159,
                        width: '100%',
                        padding: 0,
                        '::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: 13,
                            background: 'linear-gradient(to right, rgba(30,26,103,1) 75%, rgba(51,51,237,1) 75%)',
                            zIndex: 1,
                        },
                    }}>
                        
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ 
                        backgroundColor: 'rgb(250, 250, 250)',
                        width: '100%',
                        height: '100%',
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
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
                            <Typography variant="body1" className="" gutterBottom>
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