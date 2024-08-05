import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CarRentalIcon from '@mui/icons-material/CarRental';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import Link from 'next/link';
import { Button } from '@mui/material';

export const mainListItems = (
    <React.Fragment>
        <Link href="/concessionaria/trainings">
            <ListItemButton sx={{ padding: "5px 16px", border: "2px solid transparent", transition: "0.3s", ":hover": { backgroundColor: "transparent", border: "2px solid #00B1FF", borderRadius: "5px" } }}>
                <ListItemIcon>
                    <ModelTrainingIcon />
                </ListItemIcon>
                <ListItemText primary="Treinamentos" />
            </ListItemButton>
        </Link>
        <Link href="/concessionaria/kits">
            <ListItemButton sx={{ padding: "5px 16px", border: "2px solid transparent", transition: "0.3s", ":hover": { backgroundColor: "transparent", border: "2px solid #00B1FF", borderRadius: "5px" } }}>
                <ListItemIcon>
                    <ModelTrainingIcon />
                </ListItemIcon>
                <ListItemText primary="Kit Divulgação" />
            </ListItemButton>
        </Link>
    </React.Fragment>
);