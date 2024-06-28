"use client";

import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import Image from "next/image";

import ibama from "@/images/Ibama-logo.png"

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="left" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.vw.com.br/pt.html/">
        Volkswagen
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      className="flex bg-volks-blue-800 text-white mb-6"
      sx={{
        justifyContent: "center",
        position: "relative",
        paddingX: 5,
        paddingY: 5,
        mt: 20,
        "::before": {
          content: '""',
          position: "absolute",
          top: -30,
          right: 0,
          bottom: 0,
          width: "100%",
          height: 30,
          backgroundColor: "rgb(8,74,176)",
          zIndex: 1,
        },
      }}
    >
      <Box
        container
        spacing={5}
        sx={{
          flexWrap: "wrap",
          display: "flex",
          gap: 4,
        }}
      >
        <Grid item xs={3} className="flex items-center justify-center">
          <Box>
            <Image
              src={ibama}
              width={150}
              height={200}
              alt="Footer Logo"
            />
          </Box>
        </Grid>
        <Grid item xs={3} className="flex items-center justify-center">
          <Box>
            <Typography
              variant="h6"
              className="uppercase underline underline-offset-8 decoration-2 decoration-blue-500 font-bold tracking-wide mb-3"
            >
              Institucional
            </Typography>
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{
                  ul: {
                    li: {
                      mb: 2,

                      "&:last-child": {
                        mb: 0,
                      },
                    },
                  },
                }}
              >
                <ul>
                  <li>Home Page</li>
                  <li>Site da Imprensa</li>
                  <li>VW Collection</li>
                  <li>Fundação Grupo Volkswagen</li>
                </ul>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  ul: {
                    li: {
                      mb: 2,

                      "&:last-child": {
                        mb: 0,
                      },
                    },
                  },
                }}
              >
                <ul>
                  <li>Loja da Fundação</li>
                  <li>Recursos Humanos</li>
                  <li>Fale Conosco</li>
                </ul>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={3} className="flex justify-center">
          <Box>
            <Typography
              variant="h6"
              className="uppercase underline underline-offset-8 decoration-2 decoration-blue-500 font-bold tracking-wide mb-3"
            >
              Inovação
            </Typography>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  ul: {
                    li: {
                      mb: 2,

                      "&:last-child": {
                        mb: 0,
                      },
                    },
                  },
                }}
              >
                <ul>
                  <li>Tecnologia</li>
                  <li>VW Play</li>
                  <li>Nova VW</li>
                </ul>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography
              variant="h6"
              className="uppercase underline underline-offset-8 decoration-2 decoration-blue-500 font-bold tracking-wide mb-3"
            >
              Redes Sociais
            </Typography>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  ul: {
                    li: {
                      mr: 2,

                      "&:last-child": {
                        maskRepeat: 0,
                      },
                    },
                  },
                }}
              >
                <ul className="flex flex-row">
                  <li>
                    <Facebook />
                  </li>
                  <li>
                    <Instagram />
                  </li>
                  <li>
                    <Twitter />
                  </li>
                  <li>
                    <LinkedIn />
                  </li>
                  <li>
                    <YouTube />
                  </li>
                </ul>
                <Copyright sx={{ mt: 8, mb: 4 }} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
