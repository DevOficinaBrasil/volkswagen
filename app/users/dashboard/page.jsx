"use client"
// @refresh reset

import * as React from 'react';
import { Box, Grid, Typography } from "@mui/material"
import Title from '../../components/title';
import TrainingCard from '../../components/trainingCard';
import SubscribedCard from '../../components/subscribed';
import { ToastContainer } from 'react-toastify';

export default function Dashboard() {
    const [trainings, setTrainings] = React.useState([])
    const [alterButton, setAlterButton] = React.useState(false)
    const [subscribedTrainings, setSubscribedTrainingss] = React.useState([])
    const [concessionaireTransfer, setConcessionaireTransfer] = React.useState([])

    const [verifySubscribed, setVerifySubscribed] = React.useState(null)
    const [verify, setVerify] = React.useState(null)

    React.useEffect(() => {
        const getTrainings = async () => {
            const request = await fetch('/api/trainings', {
                method: 'GET',
            })

            const response = await request.json()

            if (request.ok) {
                setTrainings(response)
                setVerify(true)
            } else {
                setTrainings(response)
                setVerify(false)
            }
        }

        getTrainings()
    }, [verify])

    React.useEffect(() => {
        const getTrainings = async () => {
            const request = await fetch('/api/subscribedTrainings', {
                method: 'GET',
                cache: 'no-cache'
            })

            const response = await request.json()

            if (request.ok) {
                setSubscribedTrainingss(response)
                setVerifySubscribed(true)
            } else {
                setSubscribedTrainingss(response)
                setVerifySubscribed(false)
            }
        }

        getTrainings()
    }, [verifySubscribed])
    
    React.useEffect(() => {
        trainings.map((training) => {
            if(Boolean(parseInt(training.active))){
                setConcessionaireTransfer(training)

                if(verifySubscribed){
                    subscribedTrainings.map((subTraining) => {
                        if(subTraining.id == training.id){
                            setAlterButton(true)
                        }
                    })
                }
            }
        })
    })
    
    // Corrigir o card de atualização de inscrição (Estados e cidade não estão aparecendo)
    return (
        <main className="flex flex-col gap-5 my-5 px-20">
            <ToastContainer />
            <Title title="Treinamentos" />

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                {verify ?
                    trainings.map((training, index) => (
                        <Grid item xs={1} sm={4} md={3} key={index} className='flex content-center justify-center'>
                            <TrainingCard key={index} content={training} justSubscribed={alterButton} />
                        </Grid>
                    ))
                    :
                    <Typography variant='h6'>{trainings}</Typography>
                }
            </Grid>
            <Title title="Seus treinamentos" />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                {verifySubscribed ?
                    [...subscribedTrainings].reverse().map((training, index) => (
                        <Grid item xs={1} sm={4} md={3} key={index} className='flex content-center justify-center'>
                            <SubscribedCard key={index} content={training} concessionaire={concessionaireTransfer} />
                        </Grid>
                    ))
                    :
                    <Typography variant='h6'>{subscribedTrainings}</Typography>
                }
            </Grid>
        </main >
    )
}