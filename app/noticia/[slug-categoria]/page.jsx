import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CardNoticia from "@/app/components/cardNoticia";

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
  console.log(result.data[0])
  return (
    <Box>
      <Box className="w-full" sx={{
        backgroundImage: 'url(https://uploads.vw-mms.de/system/production/images/vwn/076/572/images/8fc64e1230b7fee77715ee3d23f88a8091bad920/DB2023AU00551_web_1600.jpg?1684311057)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'relative',
        height: 650,
      }}>
        <Box className="absolute bottom-20 left-40">
          <Typography variant="h1" className="uppercase font-bold text-white">Notícias</Typography>
          <Typography variant="h1" className="uppercase font-bold text-white">Volkswagen</Typography>
        </Box>
      </Box>

      <Box>
        <Grid container className="px-28 pb-28" spacing={{ xs: 5, sm: 10 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {result.data.map((infos, index) => (
            <Grid item xs={3} sx={{ paddingTop: '20px !important', mb: 5 }}>
              <CardNoticia news={infos} />
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