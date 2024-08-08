"use client"

import { Box, Button, Container, Grid, InputAdornment, Pagination, PaginationItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import * as React from 'react';
import Layout from '../components/Layout';
import { Controller, useForm } from "react-hook-form";
import { ArrowBack, ArrowForward, Search } from '@mui/icons-material';

export default function Page() {
    const [users, setUsers] = React.useState([])
    const [searchUser, setSearchUser] = React.useState([])
    const [find, setFind] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const {handleSubmit, control, formState: { errors }} = useForm({
        defaultValues: {
          search: "",
        },
    });

    React.useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            const request = await fetch(`/api/admin/getUsers?currentPage=${currentPage}`, {
                method: 'GET',
            })

            const response = await request.json()

            if (request.ok) {
                setUsers(response.data)
                setCurrentPage(response.current_page)
                setLastPage(response.last_page)

                setLoading(false);
            }
        }

        getUsers()
    }, [currentPage])

    const handleNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };
    
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };
    
    const onSubmit = async (data) => {
        const request = await fetch(`/api/admin/searchUser?document=${data.search}`, {
            method: 'GET',
        })

        const response = await request.json()

        if (request.ok) {
            setSearchUser(response)
        }
    };
    
    return(
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box>
                    <Paper className="flex flex-col gap-5 p-5">
                        <Box>
                            <Paper className="p-5">
                                <Typography variant="h5" className="font-bold uppercase mb-5">Buscar usuário</Typography>
                                <Box>
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex item-center">
                                        <Controller
                                            name="search"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    key="search"
                                                    fullWidth
                                                    id="search"
                                                    label="Buscar usuário (CPF)"
                                                    sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        backgroundColor: "#F8F8F8",
                                                        "& fieldset": { border: "none" },
                                                    },
                                                    }}
                                                    {...field}
                                                />
                                            )}
                                        />
                                        <Button type="submit">
                                            <Search className="text-sky-400" />
                                        </Button>
                                    </form>
                                </Box>
                                <Box>
                                {searchUser.length > 0 &&
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nome</TableCell>
                                                <TableCell>CPF</TableCell>
                                                <TableCell align="right">Email</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {searchUser.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.document}</TableCell>
                                                    <TableCell align="right">{item.email}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                }
                                </Box>
                            </Paper>
                        </Box> 
                        <Box>
                            <Paper className="p-5">
                                <Typography variant="h5" className="font-bold uppercase mb-5">Usuários cadastrados no sistema</Typography>
                                <Box>
                                    {loading ? (
                                        <Box className="flex justify-center">
                                            <svg aria-hidden="true" class="w-8 h-8 text-white animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                        </Box>
                                    ) : (
                                    <>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nome</TableCell>
                                                    <TableCell>CPF</TableCell>
                                                    <TableCell align="right">Email</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {users.map((user, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{user.name}</TableCell>
                                                        <TableCell>{user.document}</TableCell>
                                                        <TableCell align="right">{user.email}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table> 
                                        <Box className="flex justify-between mt-5">
                                            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                                <ArrowBack />
                                            </Button>

                                            <Button onClick={handleNextPage} disabled={currentPage === lastPage}>
                                                <ArrowForward />
                                            </Button>
                                        </Box>
                                    </>
                                    )}
                                </Box>
                            </Paper>
                        </Box>  
                    </Paper>
                </Box>
            </Container>
        </Layout>
    )
}