'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

function VideosVimeo({ video }) {
    const [vimeoThumbnail, setVimeoThumbnail] = useState('');

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

    useEffect(() => {
        const fetchVimeoThumbnail = async () => {
            if (video.TipoVideo === 'V') {
                const thumbnail = await getVimeoThumbnail(video.Imagem);
                setVimeoThumbnail(thumbnail);
            }
        };

        fetchVimeoThumbnail();
    }, [video]);

    return (
        <Link
            href={"/video/" + video.SlugCategoria + "/" + video.Codigo}
            className="flex flex-col gap-2"
        >
            <div
                className="bg-cover bg-center w-full h-32 rounded-lg shadow-lg flex justify-center items-center"
                style={{
                    backgroundImage: `url('${vimeoThumbnail}')`,
                }}
            >
                <PlayArrowRoundedIcon
                    className="text-white shadow-lg"
                    fontSize="large"
                />
            </div>
            <div className="text-black font-semibold line-clamp-2">
                {video.Titulo}
            </div>
        </Link>
    );
}

export default VideosVimeo;
