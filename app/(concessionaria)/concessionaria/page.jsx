"use client"

import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Layout from './components/Layout'

export default function Dashboard() {
    return (
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                Bem vindo
            </Container>
        </Layout>
    );
}