import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import capturMotor from "@/images/files_migration_tb_fotos-2.png";
import renaultBanner from "@/images/vw_car.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

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
    <Box>
      <Box>
        <Typography variant="h5" className="font-bold">ÚLTIMAS EDIÇÕES</Typography>
      </Box>
      <Box className="mt-5">
        <Slider arrows={false} {...settings}>
          {edicoes?.map((edicao, key) => (
            <Link key={key} href={"/edicao/" + edicao.EdicaoID}>
              <Image
                key={key}
                src={`https://www.oficinabrasil.com.br/api/CapaEdicao?img=${edicao.img_capa}`}
                width={398}
                height={444}
                className="rounded w-full"
              />
            </Link>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
