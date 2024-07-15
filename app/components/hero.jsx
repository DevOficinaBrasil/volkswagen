"use client";

import * as React from "react";
import { Box, Button, Grid, MobileStepper, Paper, Typography, useTheme } from "@mui/material";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import MateriasSection from "./materiasSection";
import logo from "@/images/VW.png"
import Image from "next/image";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        training: '3º Treinamento',
        title: 'A importância do Óleo Certo para o motor - Maxi Performance',
        date: '04 de JUlho | às 19:30',
        imgPath: 'https://uploads.vw-mms.de/system/production/images/vwn/038/132/images/3b63173cda7e9f4b5f4be3498945af5eda94974c/DB2021AU00686_web_1600.jpg?1658139524',
    },
];

export default function Hero(props) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };

  return (
    <Box>
        <Box>
            <Grid container className="flex items-center">
                <Grid item xs={12} sm={7}>
                    <Box className="p-5 sm:p-14">
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                            className="rounded-2xl"
                        >
                            {images.map((step, index) => (
                            <Box key={step.label} className="relative overflow-hidden" sx={{ height: { xs: 350, sm: 650 } }}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    component="img"
                                    sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                                    src={step.imgPath}
                                    alt={step.title}
                                />
                                ) : null}
                                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}></Box>
                                <Box className="absolute bottom-5 left-5 sm:bottom-10 sm:left-10">
                                    <Typography variant="h4" sx={{ color: '#0090FF', fontSize: { xs: '1.5rem' } }} className="font-bold" gutterBottom>{step.training}</Typography>
                                    <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem' } }} className="text-white">{step.title}</Typography>
                                    <Typography variant="overline" className="text-white">{step.date}</Typography>
                                </Box>
                            </Box>
                            ))}
                        </AutoPlaySwipeableViews>
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                                ) : (
                                <KeyboardArrowRight />
                                )}
                            </Button>
                            }
                            backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                                ) : (
                                <KeyboardArrowLeft />
                                )}
                            </Button>
                            }
                        />
                    </Box>
                </Grid>
                {props.mobile ||
                <Grid item xs={5} className="pr-14">
                    <Paper className="p-10 rounded-2xl relative">
                        <Box className="absolute p-5 rounded-2xl" sx={{ backgroundColor: '#02346B', right: -20, top: -20, }}>
                            <Image src={logo} width={70} height={70} />
                        </Box>
                        <Typography variant="h4" className="uppercase font-bold pb-6">Matérias Técnicas</Typography>
                        <MateriasSection limit={3} columns={{ xs: 4, sm: 4, md: 4 }}/>
                    </Paper>
                </Grid>
                }
            </Grid>
        </Box>
    </Box>
  );
}
