"use client"

import * as React from 'react';
import locations from '@/src/locations.json'
import { Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material"
import Title from './title';
import { format } from 'date-fns';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubscribeModal from './subscribe';

export default function TrainingCard(props) {
    return (
        <Card className="flex flex-col justify-between" sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 194 }}
                component="img"
                image={props.content.cover}
            />
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    {props.content.name}
                </Typography>
                <Typography variant="body" color="text.secondary">
                    {props.content.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className="flex justify-between px-5 pb-5">
                <Typography variant="button" color="text.secondary">
                    Gratis
                </Typography>

                {props.content.active == 1 ?
                    props.justSubscribed ?
                        <Typography variant="subtitle2" color="text.secondary" className="text-right">
                            Inscrição já realizada
                        </Typography>
                        :
                        <SubscribeModal content={props.content} type="insert">Fazer Inscrição</SubscribeModal>
                    :
                    <Typography variant="subtitle2" color="text.secondary" className="text-right">
                        Treinamento encerrado
                    </Typography>
                }
            </CardActions>
        </Card>
    )
}