import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function CardNoticia({ news }){
    return(
        <Box className="flex flex-col h-full">
            <Box className="rounded-2xl">
                <Image src={`https://oficinabrasil.com.br/api/noticiaImages?img=${news.Imagem}`} layout="fill" style={{ objectFit: 'cover' }}  />
            </Box>
            <Box className="relative flex flex-col justify-between bg-white rounded-2xl shadow-md h-full -mt-10 z-1">
                <Box className="px-5">
                    <Typography variant="subtitle1" className="uppercase font-bold">{news.Titulo}</Typography>
                </Box>
                <Box className="px-5">
                    <Typography variant="body1">{news.SubTitulo}</Typography>
                </Box>
                <Box className="flex justify-end pb-5">
                    <Typography variant="caption" className="uppercase inline-block px-6 py-1 text-white" sx={{ background: 'linear-gradient(45deg, rgba(1,185,254,1) 0%, rgba(8,74,187,1) 100%)' }}>Veja mais</Typography>
                </Box>
            </Box>
        </Box>
    )
}