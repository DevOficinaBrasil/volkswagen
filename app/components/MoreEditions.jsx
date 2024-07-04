'use client'
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
import Title from "./title";
import React, { useState, useEffect } from 'react'
import Cover from "./cover";
import CoverBox from "./coverBox";
import CoverBoxMobile from "./coverBoxMobile";
import useWindowSize from "@/app/hooks/useWindowsSize";
import partsBanner1 from "@/images/parts-banner-1.png";
import CoverMobile from "./coverMobile";
import Image from "next/image";
function MoreEditions() {
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
        <div className="flex flex-col gap-y-5 bg-slate-200 rounded-xl">
            <div className="text-xl font-semibold text-volks-blue-800 bg-blue-900 px-4 py-2 rounded-t-xl">Mais Edições</div>
            <div className="grid lg:grid-cols-1 grid-cols-3 gap-4 px-4 py-2 max-h-[550px] overflow-y-auto">
                {edicoes.map((edicao, key) => (
                    <div key={key} className="">
                        <a href={`/edicao/${edicao.EdicaoID}`} className="col-span-1 flex flex-col items-center">
                            <Image
                                key={key}
                                src={`https://oficinabrasil.com.br/api/CapaEdicao?img=${edicao.img_capa}`}
                                width={160}
                                height={200}
                                className="rounded"
                                alt={`Capa da edição ${edicao.EdicaoID}`}
                            />
                            <span className="font-semibold text-slate-600 hover:underline mt-1">{edicao.Name}</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MoreEditions