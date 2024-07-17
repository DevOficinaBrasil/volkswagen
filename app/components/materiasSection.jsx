import * as React from "react";
import Link from "next/link";
import { formatDate } from "./functions/formatDate";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { ArrowRightAltOutlined } from "@mui/icons-material";

export default function MateriasSection({ columns, limit }) {

  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    fetch("https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/noticia/getHomeVolkswagen")
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <Grid container spacing={{ xs: 3, md: 4 }} columns={columns}>
      {news.slice(0, limit).map((noticia, key) => (
        <Grid item xs={6} key={key}>
          <Link href={`/noticia/${noticia.SlugCategoria}/${noticia.SlugNoticia}`}>
            <Grid container spacing={1} className="items-center h-full">
              <Grid item xs={5}>
                <Box sx={{ height: 150, overflow: 'hidden', position: 'relative' }} className="rounded-2xl">
                  <Image src={`https://www.oficinabrasil.com.br/api/noticiaImages?img=${noticia.Imagem}`} layout="fill" style={{ objectFit: 'cover' }} />
                </Box>
              </Grid>
              <Grid item xs={7} className="h-full">
                <Box className="flex flex-col h-full justify-between">
                  <Box>
                    <Typography variant="overline" className="bg-volks-blue-800 px-4 text-white rounded">
                      {noticia.Nome}
                    </Typography>
                  </Box>
                  <Box className="flex flex-col">
                    <Typography variant="title" className="font-bold">
                      {noticia.Titulo}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {`${noticia.Autor} - ${formatDate(noticia.DataPostagem)}`}
                    </Typography>
                    <Box>
                      <Link href="">
                        <Typography variant="caption" className="text-volks-blue-800 flex items-center">
                          saiba mais<ArrowRightAltOutlined />
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>  
          </Link>

        </Grid>
      ))}
    </Grid>
  );
}


/**
 * 
 * <div className="mt-8">
      <div className="font-bold text-2xl mb-5">MATÉRIAS RELACIONADAS</div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2">
        {news.map((noticia, key) => (
          <div className="flex gap-5" key={key}>
            <Link
              href={
                "/noticia/" + noticia.SlugCategoria + "/" + noticia.SlugNoticia
              }
              className="flex flex-col gap-y-1 hover:underline hover:underline-offset-1 w-1/2"
            >
              <img
                // SSLERRO01
                src={`https://www.oficinabrasil.com.br/api/noticiaImages?img=${noticia.Imagem}`}
                className="rounded shadow-lg object-cover w-full h-40"
              />
            </Link>
            <div className="flex flex-col text-ellipsis overflow-hidden gap-y-1 w-1/2">
              <Link href={"/noticia/" + noticia.SlugCategoria}>
                <div className="bg-blue-950 w-fit px-2 text-white text-sm font-bold rounded-tl-lg rounded-br-lg hover:underline hover:underline-offset-1">
                  {noticia.Nome}
                </div>
              </Link>
              <Link
                href={
                  "/noticia/" +
                  noticia.SlugCategoria +
                  "/" +
                  noticia.SlugNoticia
                }
                className="flex flex-col gap-y-1 hover:underline hover:underline-offset-1"
              >
                <div className="leading-5 lg:text-xl text-lg font-semibold text-gray-600 text-ellipsis line-clamp-3">
                  {noticia.Titulo}
                </div>
                <div className="text-xs font-semibold text-gray-400">
                  {noticia.Autor} -{" "}
                  {noticia.DataPostagem ? (
                    formatDate(noticia.DataPostagem)
                  ) : (
                    <></>
                  )}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
 */