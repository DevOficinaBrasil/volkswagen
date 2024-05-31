"use client"
// @refresh reset

import * as React from 'react';
import { Box, Typography  } from "@mui/material"
import Title from '../components/title';
import Videos from '../components/videos';
import Video from '../components/video';
import TrainingCard from '../components/trainingCard';

export default function Dashboard(){
    const [trainings, setTrainings] = React.useState([])
    const [verify, setVerify] = React.useState(null)
    
    React.useEffect(() => {
        const getTrainings = async () => {
            const request = await fetch('/api/trainings',{
                method: 'GET',
            })

            const response = await request.json()
            
            if(request.ok){
                setTrainings(response)
                setVerify(true)
            }else{
                setTrainings(response)
                setVerify(false)
            }
        }

        getTrainings()
    }, [verify])
    
    return(
        <main className="flex flex-col gap-5 my-20 px-20">
            <Videos>
                <Video url="https://placehold.co/1360x768" />
            </Videos>

            <Title title="Próximos treinamentos" />
            
            { verify ?
                trainings.map((training, index) => (
                    <TrainingCard key={index} content={training} />
                ))
            :
                <Typography variant='h6'>{trainings}</Typography>
            }
        </main>
    )
}