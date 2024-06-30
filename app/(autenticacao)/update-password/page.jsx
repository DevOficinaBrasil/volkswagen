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
import { useRouter, useSearchParams } from 'next/navigation';
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

function SearchParams(){
  const params = useSearchParams()

  return <TextField type="hidden" name="token" value={params.get('token')} sx={{ display: 'none' }} />
}

export default function SignIn(){
  const [alert, setAlert] = React.useState(null)
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const request = await fetch('/api/reset',{
      method: 'POST',
      body: formData,
    })

    const response = await request.text()
    
    if( ! request.ok ){
      setAlert(response)
    }else{
      toast.success("Senha atualizada com sucesso!", {
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
      setTimeout(() => {
        router.push('/login')
      }, 6000)
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
            <React.Suspense>
              <SearchParams />
            </React.Suspense>

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

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Senha"
              name="password"
              autoComplete="password"
              autoFocus
              type="password"
              sx={{'& .MuiOutlinedInput-root': {backgroundColor: '#F8F8F8', '& fieldset': {border: 'none'},},}}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password_confirmation"
              label="Confirmar senha"
              name="password_confirmation"
              autoComplete="password_confirmation"
              autoFocus
              type="password"
              sx={{'& .MuiOutlinedInput-root': {backgroundColor: '#F8F8F8', '& fieldset': {border: 'none'},},}}
            />

            { alert && <Alert severity="error">{alert}</Alert> }

            <VolksButton type="submit" fullWidth>
              Recuperar senha
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