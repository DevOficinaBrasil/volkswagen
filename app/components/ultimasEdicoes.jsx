import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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

  const [edicoes, setEdicao] = useState([]);
  useEffect(() => {
    // Fetch data from the API
    fetch(
      "https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/edicao/getDefault"
    )
      .then((response) => response.json())
      .then((data) => {
        setEdicao(data);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <div className="bg-gray-100 rounded-sm w-full pb-10 pt-5 px-10 flex flex-col gap-4 shadow-xl shadow-slate-300">
      <div className="flex items-center pt-10 gap-3">
        <div className="text-xl font-bold">ÚLTIMAS EDIÇÕES</div>
      </div>
      <div className="lg:p-5 p-1">
        <Slider arrows={true} {...settings} className="">
          {edicoes?.map((edicao, key) => (
            <a key={key} href={"/edicao/" + edicao.EdicaoID}>
              <Image
                key={key}
                src={`https://oficinabrasil.com.br/api/CapaEdicao?img=${edicao.img_capa}`}
                width={398}
                height={444}
              />
            </a>
          ))}
        </Slider>
      </div>
    </div>
  );
}
