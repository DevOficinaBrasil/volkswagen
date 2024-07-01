import React, { useState, useEffect } from "react";
import { East } from "@mui/icons-material";
import { Grid, div } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function MateriasSection() {
  const [mobile, setMobile] = useState(false);
  const [news, setNews] = useState([]);

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

  useEffect(() => {
    fetch(
      "https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/noticia/getHomeVolkswagen"
    )
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <div className="mt-8">
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
      {/* <Grid
        container
        gap={2}
        columnGap={8}
        rowGap={10}
        spacing={0}
        className=""
      >
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
              href={`/noticia/${item.SlugCategoria}/${item.SlugNoticia}`} // Supondo que o item.Link contenha o link da notícia
              target="_blank"
              rel="noopener noreferrer"
              className="flex"
            >
              <Image
                src={`https://oficinabrasil.com.br/api/noticiaImages?img=${encodeURIComponent(
                  item.Imagem
                )}`}
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
                  <div className="text-base text-blue-950  font-semibold text-oficina-blue">
                    SAIBA MAIS{" "}
                  </div>
                  <East
                    fontSize="5"
                    className="text-oficina-blue lg:ml-1 text-blue-950"
                  />
                </div>
              </div>
            </a>
          </Grid>
        ))}
      </Grid> */}
    </div>
  );
}
