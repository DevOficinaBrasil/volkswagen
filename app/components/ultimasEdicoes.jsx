import { Typography } from "@mui/material";
import React from "react";
import capturMotor from "@/images/files_migration_tb_fotos-2.png";
import renaultBanner from "@/images/vw_car.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";





export default function UltimasEdicoes() {
  const settings = {
    autoplay: true,
    dots: false,
    draggable: false,
    infinite: true,
    autoplaySpeed: 4000,
    swipeToSlide: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    beforeChange: function (currentSlide, nextSlide) {},
    afterChange: function (currentSlide) {},
  };
  const noticias = [
    { noticia: renaultBanner, Nome: "Temporada 2024", Titulo: "Motor Captur" },
    { noticia: renaultBanner, Nome: "Temporada 2024", Titulo: "Motor Captur" },
  ];


  return (
    <div className="bg-gray-100 rounded-sm w-full pb-10 pt-5 px-10 flex flex-col gap-4 shadow-xl shadow-slate-300">
      <div className="flex items-center pt-10 gap-3">
        <div className="text-xl font-bold">ÚLTIMOS EDIÇÕES</div>
      </div>
      <div className="p-10">
        <Slider arrows={true} {...settings} className="">
          {noticias?.map(({ noticia, key, Nome, Titulo }) => (
            <Image key={key} src={noticia.src} width={398} height={444} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
