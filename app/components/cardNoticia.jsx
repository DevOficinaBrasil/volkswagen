import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import Image from "next/image";

export default function CardNoticia({ news }){
    return(
        <Box className="flex flex-col h-full">
            <Box className="relative rounded-2xl" sx={{ height: 250, overflow: 'hidden' }}>
                <Image src={`https://oficinabrasil.com.br/api/noticiaImages?img=${news.Imagem}`} layout="fill" style={{ objectFit: 'cover' }} />
            </Box>
            <Box className="relative flex flex-col grow -mt-10 ml-10">
                <Paper className="flex flex-col grow justify-between rounded-2xl">
                    <Box className="flex flex-col pt-5 mb-5">
                        <Box>
                            <Typography variant="subtitle1" className="uppercase font-bold pl-8 pr-5" sx={{
                                position: 'relative',
                                '::before': {
                                    content: '""',
                                    position: 'absolute',
                                    width: 4,
                                    height: '100%',
                                    backgroundColor: '#084ABB',
                                    borderRadius: 1,
                                    left: 15,
                                }
                            }}>
                                {news.Titulo}
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="flex justify-between pb-5">
                        <Box className="pl-5">
                            <Typography variant="body1">{moment(news.DataPostagem).format("DD/MM/YYYY")}</Typography>
                        </Box>
                        <Typography variant="caption" className="uppercase inline-block px-6 py-1 text-white" sx={{ background: 'linear-gradient(45deg, rgba(1,185,254,1) 0%, rgba(8,74,187,1) 100%)' }}>Veja mais</Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}
/**
 * 
            <Box className="bg-black rounded-2xl shadow-md">
                <Box>
                    <Typography variant="subtitle1" className="uppercase font-bold">{news.Titulo}</Typography>
                </Box>
                <Box>
                    <Typography variant="body1">{moment(news.DataPostagem).format("DD/MM/YYYY")}</Typography>
                </Box>
                <Box className="flex justify-end pb-5">
                    <Typography variant="caption" className="uppercase inline-block px-6 py-1 text-white" sx={{ background: 'linear-gradient(45deg, rgba(1,185,254,1) 0%, rgba(8,74,187,1) 100%)' }}>Veja mais</Typography>
                </Box>
            </Box>
 */