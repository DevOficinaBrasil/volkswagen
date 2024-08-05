import { Box, Divider, Typography } from "@mui/material";

export default function Title({ children }){
    return(
        <Box className="flex items-center justify-center mb-3">
            <Typography variant="h5" className="relative font-bold inline-block" sx={{
            '::before': {
                position: 'absolute',
                content: '""',
                right: -10,
                zIndex: -1,
                width: '72%',
                height: '100%',
                borderRadius: 1,
                backgroundColor: '#01B9FE',
            }
            }}>
            {children}
            </Typography>
            <Box className="grow">
                <Divider sx={{ borderBottomWidth: 1, width: '80%', ml: 5 }} />
            </Box>
        </Box>
    )
}