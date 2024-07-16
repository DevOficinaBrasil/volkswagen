"use client"

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] })

const defaultTheme = createTheme({
    typography: {
        fontFamily: montserrat.style.fontFamily
    }
});

const Layout = ({ children }, props) => {
    return(
        <ThemeProvider theme={defaultTheme}>
            <div className='flex flex-col gap-5 my-10 p-5 sm:p-28'>
                {children}
            </div>
        </ThemeProvider>
    )
}

export default Layout;