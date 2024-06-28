"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function HeroMobile(props) {
  return (
    <Box sx={{ position: "relative", height: "40vh" }}>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          backgroundImage: `url(${props.background.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          backgroundSize: "cover",
          textAlign: "left",
          display: "flex",
          height: "100%",
          color: "white",
          border: "none",
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
                    <Typography variant="h6" className="uppercase text-amber-500 font-bold">
                        {props.subtitle}
                    </Typography>
                    <Typography variant="h6" className="uppercase font-bold" gutterBottom>
                        {props.title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {props.dateTime} {/* Formatar date time vindo do banco */}
                    </Typography>
                    <Link href="/treinamento">
                        <Button variant="outlined">
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
    </Box>
  );
}
