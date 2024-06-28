import { Box, Grid } from "@mui/material";

export default function Cover(props) {
    return(
        <Box>
            <Grid container spacing={10} sx={{
                paddingX: 5,
                '& > *': {
                    '& > div': {
                    position: 'relative',
                    '::before':{
                        content: '""',
                        position: 'absolute',
                        top: 20,
                        right: 0,
                        left: -20,
                        bottom: -20,
                        width: '100%',
                        borderRadius: 5,
                        border: 'solid 2px blue',
                        zIndex: -1,
                    },
                    '& > div': { borderRadius: 5 }
                    }
                }
            }}>
            {props.children}
            </Grid>
        </Box>
    )
}