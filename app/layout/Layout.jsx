"use client"

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const Layout = ({ children }, props) => {
    return(
        <ThemeProvider theme={defaultTheme}>
            <main className='flex flex-col gap-5 my-10 p-28'>
                {children}
            </main>
        </ThemeProvider>
    )
}

export default Layout;