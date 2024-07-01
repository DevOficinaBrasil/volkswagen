"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import VolksButton from "@/app/components/defaultButton";
import { deleteTokens } from "../handler";
import useRedirectPage from "@/app/hooks/useRedirect";
import UserContext from "@/src/contexts/UserContext";
const defaultTheme = createTheme();

export default function SignIn() {
  const [alert, setAlert] = React.useState(null);
  const router = useRouter();
  const { verify, userData } = React.useContext(UserContext);
  const { redirectPage, generalRedirectPage } = useRedirectPage();

  React.useEffect(() => {
    const deleteOldTokens = async () => {
      deleteTokens();
    };

    deleteOldTokens();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAlert(null);

    const formData = new FormData(event.currentTarget);

    try {
      const request = await fetch("/api/auth", {
        method: "POST",
        body: formData,
      });

      const response = request;
      console.log(response)
      if (!request.ok) {
        console.log('debug', request, request.ok)
        throw new Error(await response.text());
      }
      
      const validate = await response.json()
      if (validate.role == "common") {
        setAlert(null);
        redirectPage();
      } else if (validate.role == "manager") {
        setAlert(null);
        generalRedirectPage();
      } else {
        verify();
        router.push("/");
      }
    } catch (error) {
      setAlert(error.message)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <Image
              src="https://w7.pngwing.com/pngs/528/129/png-transparent-volkswagen-2019-hd-logo.png"
              width={150}
              height={150}
              alt=""
            />
          </Avatar>

          <Typography component="h1" variant="h5">
            Acessar
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F8F8F8",
                  "& fieldset": { border: "none" },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F8F8F8",
                  "& fieldset": { border: "none" },
                },
              }}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar senha"
            />

            {alert && <Alert severity="error">{alert}</Alert>}

            <VolksButton type="submit" fullWidth>
              Login
            </VolksButton>

            <Grid container>
              <Grid item xs>
                <Link href="/reset-password" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>

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
  );
}
