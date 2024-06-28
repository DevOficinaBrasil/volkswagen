import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CarRentalIcon from '@mui/icons-material/CarRental';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import Link from 'next/link';

export const mainListItems = (
    <React.Fragment>
        <Link href="/admin">
            <ListItemButton>
                <ListItemIcon>
                    <ModelTrainingIcon />
                </ListItemIcon>
                <ListItemText primary="Treinamentos" />
            </ListItemButton>
        </Link>

        <Link href="/admin/concessionarias">
            <ListItemButton>
                <ListItemIcon>
                    <CarRentalIcon />
                </ListItemIcon>
                <ListItemText primary="Concessionárias" />
            </ListItemButton>
        </Link>
    </React.Fragment>
);