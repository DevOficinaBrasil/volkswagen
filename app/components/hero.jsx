"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function Hero(props) {
  return (
    <Box sx={{ position: 'relative', height: '78vh' }}>
        <Box
        sx={{
            width: '100%',
            position: 'relative',
            backgroundImage: `url(${props.background.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
            backgroundSize: 'cover',
            display: 'flex',
            height: '100%',
            color: 'white',
            padding: 0,
            '::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                zIndex: 1,
            },
        }}
        >
        </Box>
        <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%',
            zIndex: 3, 
            height: '100%',
            overflow: 'hidden',
            color: 'white'
        }}>
            <Grid container sx={{ height: '100%' }}>
                <Grid item sx={{ width: '100%' ,height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '15%' }}>
                    <Typography variant="h4" className="uppercase text-amber-500 font-bold" gutterBottom>
                        {props.subtitle}
                    </Typography>
                    <Typography variant="h4" className="uppercase font-bold" gutterBottom>
                        {props.title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {props.dateTime} {/* Formatar date time vindo do banco */}
                    </Typography>
                    <Link href="/treinamento" className="mt-5">
                        <Button variant="outlined" size="large" sx={{ px: 5, py: 1, borderColor: "#F59E0B", color: "#F59E0B", ":hover": { borderColor: "#F59E0B", backgroundColor: "#FFB53F", color: "#FFFFFF" } }}>
                            Inscreva-se!
                        </Button>
                    </Link>

                </Grid>

                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'end' }}>
                    {props.children}
                </Grid>
            </Grid>
        </Box>
    </Box>
  );
}
