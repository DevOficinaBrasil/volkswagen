"use client"

import Layout from "@/app/layout/Layout";
import NoticiasRelacionadas from "../../components/NoticiasRelacionadas";
import "./noticia.css";
import { Box, Divider, List, ListItemButton, ListItemIcon, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import * as React from "react";
import { Bookmark, Link, Send } from "@mui/icons-material";

export const viewport = {
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1",
};

const Noticia = (url) => {
  const [noticia, setNoticia] = React.useState([])
  const formatDate = (inputDate) => {
    const months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const [datePart, timePart] = inputDate.split(" ");
    const [year, month, day] = datePart.split("-");
    const monthIndex = parseInt(month) - 1;
    const formattedDate = `${day} de ${months[monthIndex]} de ${year}`;

    return formattedDate;
  };

  const params = url.params;

  React.useEffect(() => {
    const getNews = async () => {
      const data = await fetch(
        "https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/noticia/getBySlugs",
        {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
      var result = await data.json();
    
      if (result.status == 404) {
        return (
          <div className="text-3xl text-center p-10">NOTICIA NÃO ENCONTRADA</div>
        );
      }
      
      setNoticia(result.Noticia);
    }

    getNews()
  }, [])
  const NewsHTML = styled.div`
    widht: 20px;

    img{
      width: 30%;
      border-radius: 20px
    }
  `;

  return (
    <Box>
      {noticia.FullBanner ? (
        <Box>
          <Box sx={{
            backgroundImage: `url('https://oficinabrasil.com.br/img/noticia/${noticia.FullBanner}')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            position: 'relative',
            height: {
              xs: 400,
              sm: 450,
              md: 500,
              lg: 550,
              xl: 600,
            },
          }}>
            <Layout>
              
            </Layout>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box className="w-full flex items-center justify-center" sx={{
            backgroundImage: 'url(https://uploads.vw-mms.de/system/production/images/vwn/082/513/images/73a06a9ab8b0628a888e04e7d9224b32f8588e83/DB2024AU01333_web_1600.jpg?1721204307)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            position: 'relative',
            height: {
              xs: 400,
              sm: 450,
              md: 500,
              lg: 550,
              xl: 600,
            },
          }}>
          </Box>
          <Box className="sm:px-28 px-5">
            <Box className="relative z-1 bg-white" sx={{ marginTop: '-200px' }}>
              <Box className="absolute sm:inline-block hidden p-5">
                <Paper>
                  <List className="p-3">
                    <Box className="mb-5 p-3 rounded hover:bg-sky-100 transition duration-300 text-sky-400">
                      <Send />
                    </Box>
                    <Box className="mb-5 p-3 rounded hover:bg-sky-100 transition duration-300 text-sky-400">
                      <Link />
                    </Box>
                    <Box className="mb-5 p-3 rounded hover:bg-sky-100 transition duration-300 text-sky-400">
                      <Bookmark />
                    </Box>
                  </List>
                </Paper>
              </Box>
              <Layout>
                <Box className="text-center">
                  <Box>
                    <Typography variant="h3" className="font-bold" sx={{ fontSize: {
                        xs: '2rem',
                        sm: '2.5rem',
                        md: '3rem',
                        lg: '3.5rem',
                        xl: '4rem',
                    }}}>
                      {noticia.Titulo}
                    </Typography>
                  </Box>
                  <Divider variant="middle" className="my-10 border-black" />
                  <Box>
                    <Typography variant="h5">{noticia.SubTitulo}</Typography>
                  </Box>
                  <Box className="mt-10">
                    <Typography className="text-neutral-400">Por: {noticia.Autor} -{" "} {noticia.DataPostagem ? formatDate(noticia.DataPostagem) : ""}</Typography>
                  </Box>
                </Box>
                <Box>
                  <NewsHTML dangerouslySetInnerHTML={{ __html: noticia.Descricao }} />
                </Box>
              </Layout>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Noticia;
