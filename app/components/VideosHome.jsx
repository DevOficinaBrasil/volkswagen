"use client";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Button from "@mui/material/Button";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Link from "next/link";
import "./style/arrowTreinamentos.css";
import { Box, Typography } from "@mui/material";

const VideosHome = () => {
  const [videosCarrosel, setVideosCarrosel] = useState([]);
  const [vimeoThumbnails, setVimeoThumbnails] = useState({});

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    const fetchVimeoThumbnails = async () => {
      const thumbnails = {};
      for (const video of videosCarrosel?.data || []) {
        if (video.TipoVideo === 'V') {
          thumbnails[video.Imagem] = await getVimeoThumbnail(video.Imagem);
        }
      }
    
      setVimeoThumbnails(thumbnails);
    };

    fetchVimeoThumbnails();
  }, [videosCarrosel]);

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
    setVideosCarrosel(videos);
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
    slidesToShow: 3,
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
    <Box className="bg-gradient-to-r from-blue-900 to-blue-950 h-full w-full rounded-2xl flex flex-col justify-between shadow-xl shadow-slate-300">
      <Box className="text-white w-fit py-3 px-5 ml-8 text-lg font-semibold uppercase" sx={{ backgroundColor: '#0090FF' }}>
        Vídeos Técnicos
      </Box>
      <Box className="lg:px-0 py-8">
        <Slider
          {...settings}
          className="bg-transparent max-h-full px-0"
          arrows={true}
        >
          {videosCarrosel?.data?.map((video, key) => (
            <Box key={key} className="flex flex-col px-5 py-5">
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
                    className="bg-cover bg-center aspect-video hover:scale-105 duration-300 rounded-2xl shadow-lg flex justify-center items-center"
                    style={{
                      backgroundImage: `url('${vimeoThumbnails[video.Imagem] || ''}')`,
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
      <Box className="w-full p-5 text-center">
        <Link href="https://www.youtube.com/watch?v=foo_BrEiBRE">
          <Button variant="contained" className="text-white font-bold w-3/6" sx={{ backgroundColor: '#0090FF', ':hover': { backgroundColor: '#056ADA' } }}>
            Se inscreva
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
// href={"/video/" + video.SlugCategoria + "/" + video.VideoID}
export default VideosHome;
