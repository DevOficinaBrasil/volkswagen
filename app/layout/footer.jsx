"use client";

import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import grupo from "@/images/logo_grupo.png";
import { Box, Button, Divider, Grid, Link, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <Box>
      <Box>
        <Grid container sx={{ boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.1)' }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={7}>
            <Box className="sm:flex justify-between items-center px-5 sm:px-20 py-5 text-center">
              <Box className="flex justify-center">
                <Image src={grupo} width={200} height={200} alt="card" />
              </Box>

              <Divider orientation="vertical" variant="middle" flexItem />

              <Box>
                <Typography>Endereço: Alameda Santos, 1800 - Jardim Paulista, São Paulo - SP 01418-102</Typography>
                <Typography>Telefone: (11) 2764-2852</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Grid container className="h-full">
              <Grid item xs={3}>
                <Link href="https://www.facebook.com/JornalOficinaBrasilOficial">
                  <Box sx={{ backgroundColor: '#3A559F' }} className="h-full flex items-center justify-center p-5 sm:p-0">
                    <Facebook className="text-white" fontSize="large" />
                  </Box>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link href="https://www.linkedin.com/company/24995424/admin/feed/posts/">
                  <Box sx={{ backgroundColor: '#007AB9' }} className="h-full flex items-center justify-center">
                    <LinkedIn className="text-white" fontSize="large" />
                  </Box>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link href="https://www.youtube.com/@TVOficinaBrasil">
                  <Box sx={{ backgroundColor: '#FF0000' }} className="h-full flex items-center justify-center">
                    <YouTube className="text-white" fontSize="large" />
                  </Box>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link href="https://www.instagram.com/jornalob/">
                  <Box sx={{ background: 'linear-gradient(45deg, rgba(254,173,48,1) 0%, rgba(205,18,169,1) 100%)' }} className="h-full flex items-center justify-center">
                    <Instagram className="text-white" fontSize="large" />
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box className="drop-shadow-sm p-14 block sm:flex justify-between text-white" sx={{ backgroundColor: '#02346B' }}>
        <Box>
          <Typography variant="h6" className="mb-5 sm:mb-0" sx={{ 
            position: 'relative',
            '::after': {
                content: '""',
                width: '40%',
                height: '5px',
                position: 'absolute',
                borderRadius: 5,
                left: 0,
                bottom: -5,
                backgroundColor: '#2AB9CE',
            },
          }}>
            Treinamentos
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" className="mb-5 sm:mb-0" sx={{ 
            position: 'relative',
            '::after': {
                content: '""',
                width: '40%',
                height: '5px',
                position: 'absolute',
                borderRadius: 5,
                left: 0,
                bottom: -5,
                backgroundColor: '#EE7302',
            },
          }}>
            Catálogo
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ 
            position: 'relative',
            '::after': {
                content: '""',
                width: '40%',
                height: '5px',
                position: 'absolute',
                borderRadius: 5,
                left: 0,
                bottom: -5,
                backgroundColor: '#FFDD01',
            },
          }}>
            Notícias
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
