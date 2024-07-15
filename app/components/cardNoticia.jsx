import { Box, Typography } from "@mui/material";

export default function CardNoticia({ news }){
    return(
        <Box className="relative">
            <Box className="w-full rounded-2xl" sx={{
                backgroundImage: `url(https://oficinabrasil.com.br/api/noticiaImages?img=${news.Imagem})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                position: 'relative',
                height: 300,
            }}></Box>
            <Box className="relative z-1 bg-white rounded-2xl shadow-md overflow-hidden py-5 -mt-10 ml-10 sm:-mr-10">
                <Box className="px-5">
                    <Typography variant="subtitle1" className="uppercase font-bold">{news.Titulo}</Typography>
                    <Typography variant="body1">{news.SubTitulo}</Typography>
                </Box>
                <Box className="flex items-right justify-end">
                    <Typography variant="caption" className="uppercase inline-block px-6 py-1 text-white" sx={{ background: 'linear-gradient(45deg, rgba(1,185,254,1) 0%, rgba(8,74,187,1) 100%)' }}>Veja mais</Typography>
                </Box>
            </Box>
        </Box>
    )
}