"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import Image from 'next/image';
import VolksButton from '@/app/components/defaultButton';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function SignIn(){
  const [alert, setAlert] = React.useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const request = await fetch('/api/getResetLink',{
      method: 'POST',
      body: formData,
    })

    const response = await request.text()

    if( ! request.ok ){
      setAlert(response)
    }else{
      toast.success("Email de redefinição enviado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <ToastContainer />
        <CssBaseline />

        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Image src='https://w7.pngwing.com/pngs/528/129/png-transparent-volkswagen-2019-hd-logo.png' width={150} height={150} alt='' />
          </Avatar>

          <Typography component="h1" variant="h5">
            Recuperar Senha
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{'& .MuiOutlinedInput-root': {backgroundColor: '#F8F8F8', '& fieldset': {border: 'none'},},}}
            />

            { alert && <Alert severity="error">{alert}</Alert> }

            <VolksButton type="submit" fullWidth>
              Enviar link
            </VolksButton>

            <Grid container>
              <Grid item>
                <Link href="/cadastro" variant="body2">
                  {"Ainda não tem uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Container>
    </ThemeProvider>
  )
}