"use client";

import {
  Box,
  Grid,
} from "@mui/material";
import Cards from "./components/card";
import Hero from "./components/hero";
import Title from "./components/title";
import Pieces from "./components/pieces";

import VideosHome from "./components/VideosHome";

import SubBanner from "./components/subBanner";
import useWindowSize from "@/app/hooks/useWindowsSize";
import { useContext, useEffect, useState } from "react";
import HeroMobile from "./components/heroMobile";
import SubBannerMobile from "./components/subBannerMobile";
import PiecesMobile from "./components/piecesMobile";

import banner from "@/images/banner.png";
import economy from "@/images/economy.png";
import partsCover1 from "@/images/parts-cover-1.png";
import partsCover2 from "@/images/parts-cover-2.png";
import partsCover3 from "@/images/parts-cover-3.png";
import partsCover4 from "@/images/parts-cover-4.png";
import Agenda from "./components/agenda";
import MateriasSection from "./components/materiasSection";
import UltimasEdicoes from "./components/ultimasEdicoes";
import LiveContext from "@/src/contexts/LiveContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import UserContext from "@/src/contexts/UserContext";
import Layout from "./layout/Layout";

export default function Home() {
  const [mobile, setMobile] = useState(false);
  const windowSize = useWindowSize();
  const { onLive, didOpen, setDidOpen } = useContext(LiveContext);
  const { isAuthenticated } = useContext(UserContext);
  const router = useRouter();

  // const pdfUrl = "/documents/CATALOGO_ECONOMY.pdf";
  useEffect(() => {
    if (onLive == 1 && didOpen == 0) {
      Swal.fire({
        title: "TREINAMENTO AO VIVO",
        color: "red",
        // text: "Aguarde...",
        didOpen: () => {
          // Swal.update({ icon: "warning" });
        },
        confirmButtonText: "Ir para treinamento",

        // didClose: () => {
        //   router.push("/treinamento-ao-vivo");
        // },
        allowOutsideClick: true,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (isAuthenticated) {
            router.push("/treinamento-ao-vivo");
          } else {
            router.push("/login");
          }
        }
      });
      setDidOpen(1);
    }
  }, [onLive]);

  useEffect(() => {
    if (windowSize.width <= 1080) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowSize]);

  return (
    <div>
      <Hero mobile={mobile} />

      <Layout>
        <Box>
          <Title title="Agenda 2024" />
        </Box>
        <Agenda />

        <Box className="flex my-20">
          <VideosHome />
        </Box>

        <Box>
          <Title title="Notícias" />
        </Box>

        <Box>
          <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={9}>
              <MateriasSection limit={6} columns={{ xs: 4, sm: 8, md: 12 }} />
            </Grid>
            <Grid item xs={3}>
              <UltimasEdicoes />
            </Grid>
          </Grid>
        </Box>

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
      </Layout>
    </div>
  );
}
