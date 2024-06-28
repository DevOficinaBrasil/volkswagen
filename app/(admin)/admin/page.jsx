"use client"

import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Trainings from './components/Trainings';
import Layout from './components/Layout'

export default function Dashboard() {
    return (
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Trainings />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}