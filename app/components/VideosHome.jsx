"use client";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Button from "@mui/material/Button";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Link from "next/link";
import "./style/arrowTreinamentos.css";

const VideosHome = () => {
  const [videosCarrosel, setVideosCarrosel] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

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

  const settings = {
    centerMode: true,
    autoplay: false,
    dots: false,
    draggable: false,
    infinite: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: function (currentSlide, nextSlide) {},
    afterChange: function (currentSlide) {},
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
    <div className="bg-gradient-to-r from-blue-900 to-blue-950 h-full w-full rounded-xl flex flex-col justify-between shadow-xl shadow-slate-300">
      <div className=" bg-blue-600 text-white w-fit p-3 ml-8 text-lg font-semibold">
        VÍDEOS VW
      </div>
      <div className="lg:px-0 py-4">
        <Slider
          {...settings}
          className="bg-transparent max-h-full px-0"
          arrows={true}
        >
          {videosCarrosel?.data?.map((video, key) => (
            <div key={key} className="flex flex-col hover:scale-105 px-2">
              {video.TipoVideo == "Y" && (
                <Link
                  className=""
                  href={"/video/" + video.SlugCategoria + "/" + video.Codigo}
                >
                  <div
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
                  </div>
                  <div className="text-white font-semibold line-clamp-2">
                    {video.Titulo}
                  </div>
                </Link>
              )}

              {video.TipoVideo == "V" && (
                <Link
                  className=""
                  href={"/video/" + video.SlugCategoria + "/" + video.Codigo}
                >
                  <div
                    className="bg-cover bg-center min-h-52 rounded-lg shadow-lg flex justify-center items-center "
                    style={{
                      backgroundImage: `url(' https://vumbnail.com/${video.Imagem}.jpg')`,
                    }}
                  >
                    {/* <PlayArrowRoundedIcon
                   className='text-white shadow-lg'
                   fontSize='large'
                 /> */}
                  </div>
                  <div className="text-white font-semibold line-clamp-2">
                    {video.Titulo}
                  </div>
                </Link>
              )}
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-full p-5 self-center ">
        <a href="https://www.youtube.com/watch?v=foo_BrEiBRE">
          <Button
            variant="contained"
            className="text-white font-bold w-full bg-from-blue-60 hover:scale-95"
          >
            SE INSCREVA
          </Button>
        </a>
      </div>
    </div>
  );
};
// href={"/video/" + video.SlugCategoria + "/" + video.VideoID}
export default VideosHome;
