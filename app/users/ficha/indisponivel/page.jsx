"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter, useSearchParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import MaskedInput from "@/app/components/mask/inputMask";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Rating,
  Select,
  TextField,
} from "@mui/material";

const defaultTheme = createTheme();

export default function NoSheet({ params }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <ToastContainer />
        <CssBaseline />
        <Box sx={{ marginTop: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              className="mb-5 text-volks-blue-900 font-bold uppercase"
              component="h1"
              variant="h4"
            >
              Ficha indisponível
            </Typography>
            <Typography
              className="mb-5 text-volks-blue-900 font-normal "
              component="h1"
              variant="h5"
            >
              Por favor esperar o treinamento terminar para poder preencher sua
              ficha e pegar o seu certificado.
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
