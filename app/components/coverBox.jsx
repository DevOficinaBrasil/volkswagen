import { Box, Grid } from "@mui/material";
import Image from "next/image";

export default function CoverBox(props) {
    return(
        <Grid item xs={3}>
            <Box>
                <Box className="overflow-hidden">
                    <Image src={props.image.src} width={500} height={500} alt="Cover Box"/>
                </Box>
            </Box>
        </Grid>
    )
}