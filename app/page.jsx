"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Cards from "./components/card";
import Hero from "./components/hero";
import Title from "./components/title";
import Pieces from "./components/pieces";
import Cover from "./components/cover";
import VideosHome from "./components/VideosHome";
import CoverBox from "./components/coverBox";
import SubBanner from "./components/subBanner";
import Videos from "./components/videos";
import Video from "./components/video";
import HeroCard from "./components/heroCard";
import useWindowSize from "@/app/hooks/useWindowsSize";
import { useEffect, useState } from "react";
import HeroMobile from "./components/heroMobile";
import SubBannerMobile from "./components/subBannerMobile";
import HeroCardMobile from "./components/heroCardMobile";
import CoverBoxMobile from "./components/coverBoxMobile";
import CoverMobile from "./components/coverMobile";
import PiecesMobile from "./components/piecesMobile";

import banner from "@/images/banner.png";
import economy from "@/images/economy.png";
import cardImage1 from "@/images/card-image-1.png";
import cardImage2 from "@/images/card-image-2.png";
import cardImage3 from "@/images/card-image-3.png";
import partsBanner1 from "@/images/parts-banner-1.png";
import partsCover1 from "@/images/parts-cover-1.png";
import partsCover2 from "@/images/parts-cover-2.png";
import partsCover3 from "@/images/parts-cover-3.png";
import partsCover4 from "@/images/parts-cover-4.png";
import PdfComponent from "./components/pdfCompnent";
import PdfTextEditor from "./components/pdfCompnent";
import Link from "next/link";
import Agenda from "./components/agenda";
import { East } from "@mui/icons-material";
import MateriasSection from "./components/materiasSection";
import UltimasEdicoes from "./components/ultimasEdicoes";

export default function Home() {
  const [mobile, setMobile] = useState(false);
  const windowSize = useWindowSize();

  // const pdfUrl = "/documents/CATALOGO_ECONOMY.pdf";

  useEffect(() => {
    if (windowSize.width <= 1080) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowSize]);
  const className = mobile
    ? "flex flex-col gap-5 my-10 px-5"
    : "flex flex-col gap-5 my-10 px-28";

  return (
    <div>
      {!mobile && (
        <Hero
          title="A importância do Óleo Certo para o motor - Maxi Performance"
          subtitle="3º Treinamento"
          dateTime="Dia 04 de Julho  | às 19:30"
          background={banner}
        ></Hero>
      )}

      {mobile && (
        <>
          <HeroMobile
            title="A importância do Óleo Certo para o motor - Maxi Performance"
            subtitle="3º Treinamento"
            dateTime="Dia 04 de Julho | às 19:30"
            background={banner}
          ></HeroMobile>
          <div
            style={{
              height: 30,
            }}
          ></div>
        </>
      )}

      <main className={className}>
        <Box>
          <Title title="Agenda 2024" />
        </Box>
        <Agenda></Agenda>
        {/* 
        <Videos>
          <Video url="https://placehold.co/1360x768" />
          <Video url="https://placehold.co/1360x768" />
          <Video url="https://placehold.co/1360x768" />
        </Videos>

        <Box>
          <Title title="Últimas edições" />
        </Box>
        {mobile ? (
          <CoverMobile>
            <CoverBoxMobile image={partsBanner1} />
            <CoverBoxMobile image={partsBanner1} />
            <CoverBoxMobile image={partsBanner1} />
            <CoverBoxMobile image={partsBanner1} />
          </CoverMobile>
        ) : (
          <Cover>
            <CoverBox image={partsBanner1} />
            <CoverBox image={partsBanner1} />
            <CoverBox image={partsBanner1} />
            <CoverBox image={partsBanner1} />
          </Cover>
        )} 
        */}

        <Box>
          <Title title="Videos Técnicos" />
        </Box>
        <VideosHome />

        <Box>
          <Title title="Notícias" />
        </Box>

        <div className="mt-0 xl:p-12 md:p-12 p-5">
          <div className=" grid grid-cols-12 gap-y-10 lg:gap-x-10 w-full mb-1">
            <div
              id="home-videos"
              className="lg:col-span-12 xl:col-span-8 3xl:col-span-8 col-span-12"
            >
              <MateriasSection />
            </div>

            <div className="lg:col-span-12 xl:col-span-4 2xl:col-span-4 col-span-12 flex flex-col gap-5 justify-between ">
              <UltimasEdicoes />
            </div>
          </div>
        </div>

        {mobile ? (
          <SubBannerMobile title="Economy" subtitle="Catálogo" image={economy}>
            A eficiência de manutenção da Volkswagen não se discute. Um serviço
            para veículos com mais de 3 anos que garante a mesma segurança das
            peças aplicadas em veículos zero quilômetro. Acesse o guia gratuito
            do Catálogo Economy e saiba mais.
          </SubBannerMobile>
        ) : (
          <SubBanner title="Economy" subtitle="Catálogo" image={economy}>
            A eficiência de manutenção da Volkswagen não se discute. Um serviço
            para veículos com mais de 3 anos que garante a mesma segurança das
            peças aplicadas em veículos zero quilômetro. Acesse o guia gratuito
            do Catálogo Economy e saiba mais.
          </SubBanner>
        )}

        <Box>
          <Title title="Peças VW" />
        </Box>

        {mobile ? (
          <PiecesMobile>
            <Cards
              title="Óleo de Direção Hidráulica Semissintético VW G004000M2"
              code="GASEADS"
              image={partsCover4}
              link={
                "https://pecas.vw.com.br/produto/oleo-de-direcao-hidraulica-g004000m2/808?utm_source=vwob&utm_medium=siteutm_campaign%3Dsiteob"
              }
            >
              Amarok, Bora, Fox, Fusca, Gol, Golf, Jetta, New Beetle, Passat,
              Polo, Santana, Saveiro, SpaceFox, Tourareg
            </Cards>

            <Cards
              title="Óleo Lubrificante de Motor SN 5W-40 Sintético VW GJZZ502M2BRA"
              code="GASEADS"
              image={partsCover3}
              link={
                "https://pecas.vw.com.br/produto/oleo-lubrificante-de-motor-gjzz502m2bra/61?utm_source=vwob&utm_medium=siteutm_campaign=siteob"
              }
            >
              Amarok, Bora, Fox, Fusca, Gol, Golf, Jetta, New Beetle, Passat,
              Polo, Santana, Saveiro, SpaceFox, Tourareg
            </Cards>

            <Cards
              title="Separador de Óleo Anti-chama de Motor VW 030103464A"
              code="GASEADS"
              image={partsCover3}
              link={
                "https://pecas.vw.com.br/produto/separador-de-oleo-anti-chama-de-motor-030103464a/789?utm_source=vwob&utm_medium=siteutm_campaign=siteob"
              }
            >
              Amarok, Bora, Fox, Fusca, Gol, Golf, Jetta, New Beetle, Passat,
              Polo, Santana, Saveiro, SpaceFox, Tourareg
            </Cards>

            <Cards
              title="Atuador Hidráulico de Embreagem VW 6QE721261D"
              code="GASEADS"
              image={partsCover3}
              link={
                "https://pecas.vw.com.br/produto/atuador-hidraulico-de-embreagem-6qe721261d/1192?utm_source=vwob&utm_medium=siteutm_campaign=siteob"
              }
            >
              Amarok, Bora, Fox, Fusca, Gol, Golf, Jetta, New Beetle, Passat,
              Polo, Santana, Saveiro, SpaceFox, Tourareg
            </Cards>
          </PiecesMobile>
        ) : (
          <Pieces>
            <Cards
              title="Óleo de Direção Hidráulica Semissintético VW G004000M2"
              code="GASEADS"
              image={partsCover4}
              link={
                "https://pecas.vw.com.br/produto/oleo-de-direcao-hidraulica-g004000m2/808?utm_source=vwob&utm_medium=siteutm_campaign%3Dsiteob"
              }
            >
              Amarok, Bora, Fox, Fusca, Gol, Golf, Jetta, New Beetle, Passat,
              Polo, Santana, Saveiro, SpaceFox, Tourareg
            </Cards>

            <Cards
              title="Óleo Lubrificante de Motor SN 5W-40 Sintético VW GJZZ502M2BRA"
              code="GASEADS"
              image={partsCover3}
              link={
                "https://pecas.vw.com.br/produto/oleo-lubrificante-de-motor-gjzz502m2bra/61?utm_source=vwob&utm_medium=siteutm_campaign=siteob"
              }
            >
              Amarok, Bora, Fox, Fusca, Gol, Golf, Jetta, New Beetle, Passat,
              Polo, Santana, Saveiro, SpaceFox, Tourareg
            </Cards>

            <Cards
              title="Separador de Óleo Anti-chama de Motor VW 030103464A"
              code="GASEADS"
              image={partsCover2}
              link={
                "https://pecas.vw.com.br/produto/separador-de-oleo-anti-chama-de-motor-030103464a/789?utm_source=vwob&utm_medium=siteutm_campaign=siteob"
              }
            >
              Amarok, Bora, Fox, Fusca, Gol, Golf, Jetta, New Beetle, Passat,
              Polo, Santana, Saveiro, SpaceFox, Tourareg
            </Cards>

            <Cards
              title="Atuador Hidráulico de Embreagem VW 6QE721261D"
              code="GASEADS"
              image={partsCover1}
              link={
                "https://pecas.vw.com.br/produto/atuador-hidraulico-de-embreagem-6qe721261d/1192?utm_source=vwob&utm_medium=siteutm_campaign=siteob"
              }
            >
              Amarok, Bora, Fox, Fusca, Gol, Golf, Jetta, New Beetle, Passat,
              Polo, Santana, Saveiro, SpaceFox, Tourareg
            </Cards>
          </Pieces>
        )}
      </main>
    </div>
  );
}
