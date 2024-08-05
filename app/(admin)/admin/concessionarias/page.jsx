"use client"

import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Concessionaires from './Concessionarias'
import Layout from '../components/Layout';

export default function Dashboard() {
    return (
        <Layout>
            <Concessionaires />
        </Layout>
    );
}