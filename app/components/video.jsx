import { Box, Grid } from "@mui/material";
import Image from "next/image";

export default function Video(props) {
    return(
        <Grid item xs={3}>
            <Box className="flex aligm-center aspect-video overflow-hidden" sx={{ width: '100%', backgroundColor: 'white', borderRadius: 2 }}>
                <Image src={props.url} width={720} height={360} alt="Video Cover" />
            </Box>
        </Grid>
    )
}