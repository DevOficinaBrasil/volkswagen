"use client"

import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export default function Cards(props) {
  return (
    <Grid item xs={3}>
      <Box className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
        <Box className="flex items-center justify-center pt-5">
            <Image src={props.image} width={200} height={200} alt='card' />
        </Box>
        <Box sx={{ paddingX: 4, paddingY: 2, position: 'relative' }}>
          <Box sx={{
            position: 'relative',
            paddingX: 2,
            my: 2,
            '::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              width: 5,
              height: '100%',
              backgroundColor: 'rgb(30,26,103)',
              zIndex: 1,
            },
          }}>
            <Typography variant="subtitle1" className="uppercase font-bold">
              {props.title}
            </Typography>
            <Typography variant="overline" className="uppercase">
              {props.code}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 3 }}>
            {props.children}
          </Typography>

          <Box className="flex justify-center">
            <Button variant="contained" className="absolute px-8">Saiba Mais</Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}