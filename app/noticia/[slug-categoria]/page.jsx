import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CardNoticia from "@/app/components/cardNoticia";
import Link from "next/link";

const Page = async (url) => {
  const apiUrl = "https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/noticia/getByCategorySlug" +
    (url.searchParams.page?.toString()
      ? `?page=${url.searchParams.page?.toString()}`
      : ""
    )

  const getNews = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({ "slug-categoria": "volkswagen" }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

  const result = await getNews.json()
  
  return (
    <Box>
      <Box className="w-full flex items-center justify-center text-center sm:text-left" sx={{
        backgroundImage: 'url(https://uploads.vw-mms.de/system/production/images/vwn/076/572/images/8fc64e1230b7fee77715ee3d23f88a8091bad920/DB2023AU00551_web_1600.jpg?1684311057)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'relative',
        height: 550,
      }}>
        <Box className="absolute sm:bottom-20 sm:left-40">
          <Typography variant="h1" className="uppercase font-bold text-white" sx={{ fontSize: {
              xs: '3rem',
              sm: '3.5rem',
              md: '4rem',
              lg: '4.5rem',
              xl: '5rem',
          }}}>
            Notícias
          </Typography>
          <Typography variant="h1" className="uppercase font-bold text-white"  sx={{ fontSize: {
              xs: '3rem',
              sm: '3.5rem',
              md: '4rem',
              lg: '4.5rem',
              xl: '5rem',
          }}}>
            Volkswagen
          </Typography>
        </Box>
      </Box>

      <Box className="relative -mt-20">
        <Grid container className="sm:px-28 px-5 pb-28 flex justify-center"  spacing={{ xs: 4, md: 4 }} columns={{ xs: 2, sm: 8, md: 12 }}>
          {result.data.map((infos, index) => (
            <Grid item xs={3} key={index} className="w-full">
              <Link href={`/noticia/${infos.SlugCategoria}/${infos.SlugNoticia}`}>
                <CardNoticia news={infos} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Page;

/**
 * 
{news[0]?.Nome}
      <div className="bg-slate-100 rounded shadow-md shadow-slate-400 lg:px-10 px-3 pt-5 pb-3">
        <NoticiasGrid noticias={noticias} />
      </div>
      <div className="py-2">
        <NoticiaCategoryPagination totalPages={result?.last_page} />
      </div>
 */