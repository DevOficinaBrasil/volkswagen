"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { deleteTokens } from "../handler";
import useRedirectPage from "@/app/hooks/useRedirect";
import UserContext from "@/src/contexts/UserContext";
import VolksButton from "@/app/components/defaultButton";
import logo from "@/images/VW.png"
import Image from "next/image";

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
      
      if (!request.ok) {
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
      <Container>
        <Grid container spacing={{ xs: 2, sm: 5 }} columns={{ xs: 4, sm: 8, md: 12 }} className="py-28 flex justify-center items-center">
          <Grid item xs={5}>
            <Typography variant="h4" className="uppercase font-bold relative inline-block"
              sx={{
                '::before': {
                  content: '""',
                  zIndex: -1,
                  bottom: -2,
                  right: -2,
                  width: '55%',
                  height: '25px',
                  borderRadius: 1,
                  position: 'absolute',
                  backgroundColor: '#01B9FE',
                }
              }}
              gutterBottom
            >
              Faça o login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate >
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

              {alert && <Alert severity="error">{alert}</Alert>}

              <Button type="submit" fullWidth className="text-black shadow-md mt-4 p-5 text-xs">
                Acessar
              </Button>

              <Box container className="mt-5">
                <Link href="/reset-password" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={7}>
            <Box className="bg-gray-50 pl-10 pr-5 py-16 rounded-2xl relative">
              <Typography className="uppercase" variant="body2" gutterBottom>Não possui cadastro ainda?</Typography>
              <Typography className="uppercase font-bold" variant="h4">Cadastre no treinamento Volkswagen</Typography>
              <Typography className="uppercase mt-8">Venha aprender com especialistas de uma das maiores montadoras do país</Typography>

              <VolksButton variant="contained" className="p-4 mt-8 font-bold" fullWidth>
                Cadastre-se
              </VolksButton>

              <Box className="absolute p-5 rounded-2xl" sx={{ backgroundColor: '#02346B', right: -20, top: -20, }}>
                <Image src={logo} width={70} height={70} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
