import React, { useState, useEffect } from 'react';
import { East } from "@mui/icons-material";
import { Grid, div } from "@mui/material";
import Image from "next/image";



export default function MateriasSection() {
  const [mobile, setMobile] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/noticia/getHomeVolkswagen')
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  return (
    <div className="mt-8">
      <div className="font-bold text-2xl mb-5">MATÉRIAS RELACIONADAS</div>
      <Grid container gap={2} columnGap={8} rowGap={10} spacing={0} className="">
        {news.map((item, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={12}
            md={12}
            lg={5.4}
            className="flex justify-start overflow-ellipsis hover:underline hover:scale-105"
          >
            <a
              href={`/noticia/${(item.SlugCategoria)}/${(item.SlugNoticia)}`} // Supondo que o item.Link contenha o link da notícia
              rel="noopener noreferrer"
              className="flex"
            >
              <Image
                src={`https://oficinabrasil.com.br/api/noticiaImages?img=${encodeURIComponent(item.Imagem)}`}
                width={206}
                height={137}
                className="rounded-xl"
              />
              <div className="ml-4 flex flex-col justify-between">
                <div className="font-bold bg-blue-950 w-fit text-white bg-oficina-blue px-1 rounded-tl-md rounded-br-md">
                  TÉCNICA
                </div>
                <div className="font-bold  text-gray-600 px-1 w-full line-clamp-2 text-ellipsis overflow-hidden">
                  {item.Titulo}
                </div>
                <div className="flex flex-row justify-start items-center px-1">
                  <div className="text-base text-blue-950  font-semibold text-oficina-blue">SAIBA MAIS </div>
                  <East fontSize="5" className="text-oficina-blue lg:ml-1 text-blue-950" />
                </div>
              </div>
            </a>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}