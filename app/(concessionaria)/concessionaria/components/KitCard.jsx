import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export default function KitCard(props){
    return(
        <Box>
            <Box className="mb-3">
                <Image src="https://uploads.vw-mms.de/system/production/images/vwn/082/530/images/f1c29f93a8b35e4f98f57ee18f39a55b143e8f9e/DB2024AU01350_web_1600.jpg?1721204310" width={360} height={450} className="aspect-square rounded-xl" />
            </Box>
            <Typography gutterBottom>Faça o download do seu kit divulgação | {props.title}</Typography>
            <a href={`/documents/kits/${props.kitId}/${props.archive}.${props.extension}`} download={`${props.archive}.${props.extension}`}>
                <Button sx={{ backgroundColor: "transparent", border: "2px solid #00B1FF", borderRadius: "5px", mb: 2 }} fullWidth>Baixar Arquivo Final</Button>
            </a>

            <a href={`/documents/kits/${props.kitId}/${props.archive}-editable.${props.editableExtension}`} download={`${props.archive}-editable.${props.editableExtension}`}>
                <Button sx={{ backgroundColor: "transparent", border: "2px solid #00B1FF", borderRadius: "5px" }} fullWidth>Baixar Arquivo Editável</Button>
            </a>
        </Box>
    )
}