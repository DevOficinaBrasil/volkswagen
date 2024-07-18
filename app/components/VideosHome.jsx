"use client";

import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Button from "@mui/material/Button";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Link from "next/link";
import "./style/arrowTreinamentos.css";
import { Box, Grid, Typography } from "@mui/material";
import coverVW from "@/images/capaVW.jpg"

const VideosHome = () => {
  const [videosTecnicos, setVideosTecnicos] = useState([]);
  const [videosTreinamentos, setVideosTreinamentos] = useState([]);
  const [prevVideos, setPrevVideos] = useState([]);
  const [vimeoThumbnailsTecnico, setVimeoThumbnailsTecnico] = useState({});
  const [vimeoThumbnailsTreinamento, setVimeoThumbnailsTreinamento] = useState({});

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    prevVideos?.data?.map((video, key) => {
      if(video.Tecnico == 1){
        const fetchVimeoThumbnails = async () => {
          const thumbnails = {};
    
          
          for (const video of prevVideos?.data || []) {
            if (video.TipoVideo === 'V') {
              thumbnails[video.Imagem] = await getVimeoThumbnail(video.Imagem);
            }
          }
        
          setVimeoThumbnailsTecnico(thumbnails);
        };
    
        fetchVimeoThumbnails();
      }else if(video.Treinamento == 1){
        const fetchVimeoThumbnails = async () => {
          const thumbnails = {};
    
          
          for (const video of prevVideos?.data || []) {
            if (video.TipoVideo === 'V') {
              thumbnails[video.Imagem] = await getVimeoThumbnail(video.Imagem);
            }
          }
        
          setVimeoThumbnailsTreinamento(thumbnails);
        };
    
        fetchVimeoThumbnails();
      }
    })
    
  }, [videosTecnicos, videosTreinamentos]);

  const getVideos = async () => {
    const responseVideos = await fetch(
      "https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/video/getByClientId?page=1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ClientId: 3 }),
        next: {
          revalidate: 3600,
        },
      }
    );

    const videos = await responseVideos.json();

    setPrevVideos(videos)

    videos?.data?.map((video, key) => {
      if(video.Tecnico == 1){
        setVideosTecnicos((prevVideos) => [...prevVideos, video])
        console.log(video)
      }else if(video.Treinamento == 1){
        setVideosTreinamentos((prevVideos) => [...prevVideos, video])
      }
    })
  };

  const getVimeoThumbnail = async (videoId) => {
    try {
      const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
      const data = await response.json();
      return data[0].thumbnail_large; // ou thumbnail_medium, thumbnail_small conforme a necessidade
    } catch (error) {
      console.error('Error fetching Vimeo thumbnail:', error);
      return '';
    }
  };

  const settings = {
    centerMode: true,
    autoplay: false,
    dots: false,
    draggable: false,
    infinite: true,
    autoplaySpeed: 4000,
    slidesToShow: 2,
    slidesToScroll: 1,
    beforeChange: function (currentSlide, nextSlide) { },
    afterChange: function (currentSlide) { },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  const settingsTraining = {
    centerMode: false,
    autoplay: false,
    dots: false,
    draggable: false,
    infinite: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: function (currentSlide, nextSlide) { },
    afterChange: function (currentSlide) { },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Grid container spacing={{ xs: 2 }} className="flex items-center">
      <Grid item xs={12} sm={7}>
        <Box className="bg-gradient-to-r from-blue-900 to-blue-950 h-full w-full rounded-lg flex flex-col justify-between shadow-xl shadow-slate-300">
          <Box className="text-white w-fit py-3 px-5 ml-8 text-lg font-semibold uppercase" sx={{ backgroundColor: '#0090FF' }}>
            <Typography>Dicas Técnicas</Typography>
          </Box>
          <Box className="lg:px-0 pt-2">
            <Slider
              {...settings}
              className="bg-transparent max-h-full px-0"
              arrows={true}
            >
              {videosTecnicos?.map((video, key) => (
                <Box key={key} className="flex flex-col px-5 pt-5">
                  {video.TipoVideo == "Y" && (
                    <Link
                      className=""
                      href={"/video/" + video.SlugCategoria + "/" + video.Codigo}
                    >
                      <Box
                        className="bg-cover bg-center min-h-52 rounded-lg shadow-lg flex justify-center items-center "
                        style={{
                          backgroundImage:
                            `url('https://img.youtube.com/vi/` +
                            video.Codigo +
                            `/sddefault.jpg')`,
                        }}
                      >
                        {/* <PlayArrowRoundedIcon
                      className='text-white shadow-lg'
                      fontSize='large'
                    /> */}
                      </Box>
                      <Box className="text-white font-semibold line-clamp-2">
                        {video.Titulo}
                      </Box>
                    </Link>
                  )}

                  {video.TipoVideo == "V" && (
                    <Link
                      href={"/video/" + video.SlugCategoria + "/" + video.Codigo}
                    >
                      <Box
                        className="bg-cover bg-center aspect-video hover:scale-105 duration-300 rounded-xl shadow-lg flex justify-center items-center"
                        style={{
                          backgroundImage: `url('${vimeoThumbnailsTecnico[video.Imagem] || coverVW.src}')`,
                        }}
                      >
                      </Box>
                      <Typography variant="subtitle2" className="text-white mt-5">{video.Titulo}</Typography>
                    </Link>
                  )}
                </Box>
              ))}
            </Slider>
          </Box>
          <Box className="w-full pb-5 text-center">
            <Link href="https://www.youtube.com/watch?v=foo_BrEiBRE">
              <Button variant="contained" className="text-white font-bold w-3/6" sx={{ backgroundColor: '#0090FF', ':hover': { backgroundColor: '#056ADA' } }}>
                Confira todos os vídeos
              </Button>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Box className="w-full flex flex-col justify-between">
          <Box className="px-5">
            <Typography className="font-bold uppercase">Últimos Treinamentos</Typography>
          </Box>
          <Box className="lg:px-0 pt-2">
            <Slider
              {...settingsTraining}
              arrows={true}
            >
              {videosTreinamentos?.map((video, key) => (
                <Box key={key} className="flex flex-col px-5 pt-5">
                  {video.TipoVideo == "Y" && (
                    <Link
                      className=""
                      href={"/video/" + video.SlugCategoria + "/" + video.Codigo}
                    >
                      <Box
                        className="bg-cover bg-center min-h-52 rounded-lg shadow-lg flex justify-center items-center "
                        style={{
                          backgroundImage:
                            `url('https://img.youtube.com/vi/` +
                            video.Codigo +
                            `/sddefault.jpg')`,
                        }}
                      >
                        {/* <PlayArrowRoundedIcon
                      className='text-white shadow-lg'
                      fontSize='large'
                    /> */}
                      </Box>
                    </Link>
                  )}

                  {video.TipoVideo == "V" && (
                    <Link
                      href={"/video/" + video.SlugCategoria + "/" + video.Codigo}
                    >
                      <Box
                        className="bg-cover bg-center aspect-video rounded-md shadow-lg flex justify-center items-center"
                        style={{
                          backgroundImage: `url('${vimeoThumbnailsTreinamento[video.Imagem] || coverVW.src}')`,
                        }}
                      >
                      </Box>
                    </Link>
                  )}
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
// href={"/video/" + video.SlugCategoria + "/" + video.VideoID}
export default VideosHome;
