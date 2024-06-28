"use client"

import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material"

export default function Title(props) {
    return (
        <Box className={`flex items-center justify-center ${props.mt ? props.mt : 'mt-20'} ${props.mb ? props.mb : 'mb-10'}`}>
            <Box>
                <Typography variant={props.variant ? props.variant : 'h5'} className="uppercase font-bold text-volks-blue-800 mr-5">
                    {props.title}
                </Typography>
            </Box>
            <Box flexGrow={1}>
                <Divider sx={{ borderBottomWidth: 3, borderColor: "#07398f" }} />
            </Box>
        </Box>
    )
}