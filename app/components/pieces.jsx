import { Box, Grid } from "@mui/material";

export default function Pieces(props) {
    return(
        <Box sx={{ 
            background: 'linear-gradient(180deg, rgba(2,39,96,1) 35%, rgba(8,74,176,1) 35%, rgba(8,74,176,1) 50%, rgba(255,255,255,1) 50%);',
            borderTopLeftRadius: 25,
            width: '100%',
            py: 6,
            px: 4,
        }}>
            <Grid container spacing={5} sx={{
                '& > *': {
                    '& > div': {
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: 2,
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 25,
                    }
                }
            }}>
                {props.children}
            </Grid>
        </Box>
    )
}