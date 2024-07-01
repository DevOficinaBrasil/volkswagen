"use client";
// @refresh reset

import UserContext from "@/src/contexts/UserContext";
import useWindowSize from "@/app/hooks/useWindowsSize";
import { Box, Button, Grid, Menu, MenuItem, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "@/images/oficinaLogo.jpeg";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { isAuthenticated, userData, logout } = useContext(UserContext);
  const [userState, setUserState] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const [mobile, setMobile] = useState(false);

  const open = Boolean(anchorEl);

  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width <= 1080) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowSize]);

  const handleLogout = () => {
    logout();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isAuthenticated && userData.role == "common") {
      setUserState(
        <Box className="flex justify-end items-center px-5">
          <a className="cursor-pointer flex items-center" onClick={handleClick}>
            {userData.name} <MenuIcon className="ml-1" />
          </a>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                router.push("/users/dashboard");
              }}
            >
              Meus treinamentos
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/atualizar");
              }}
            >
              Atualizar meus dados
            </MenuItem>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Box>
      );
    } else if (isAuthenticated && userData.role == "admin") {
      setUserState(
        <Box className="flex justify-end items-center px-5">
          <a className="cursor-pointer flex items-center" onClick={handleClick}>
            {userData.name} <MenuIcon className="ml-1" />
          </a>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                router.push("/admin");
              }}
            >
              Painel de administrador
            </MenuItem>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Box>
      );
    } else if (isAuthenticated && userData.role == "manager") {
      setUserState(
        <Box className="flex justify-end items-center px-5">
          <a className="cursor-pointer flex items-center" onClick={handleClick}>
            {userData.fantasy_name} <MenuIcon className="ml-1" />
          </a>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                router.push("/concessionaria");
              }}
            >
              Painel da concessionária
            </MenuItem>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Box>
      );
    } else {
      setUserState(
        <Box className="flex justify-end items-center gap-2">
          <Link
            href="/cadastro"
            className="hover:text-volks-blue-800 ease-in-out duration-200 uppercase text-black no-underline px-7 py-1 flex items-center"
          >
            Cadastre-se
          </Link>
          <Link
            href="/login"
            className="hover:text-volks-blue-800 ease-in-out duration-200 uppercase text-black no-underline px-7 py-1 flex items-center"
          >
            Acessar
            <PersonOutlineOutlinedIcon className="ml-1" />
          </Link>
        </Box>
      );
    }
  }, [isAuthenticated, userData, anchorEl, open, router]);

  return (
    <>
      <Box className="flex flex-row items-center justify-center p-5">
        <Box className="flex-1"></Box>

        <Box className="shrink-0">
          <Link href="/">
            <Image src={logo} width={250} height={200} alt="card" />
          </Link>
        </Box>

        <Box className="flex-1">{userState}</Box>
      </Box>
      <Box className="flex items-center justify-center bg-volks-blue-900">
        <Typography
          variant="overline"
          className="uppercase font-bold text-white"
        >
          TV Notícias da Oficina VW
        </Typography>
      </Box>
      <Box>
        <Grid
          container
          className="flex items-center justify-center py-3 border-b border-black"
          spacing={{ xs: 2, md: 8, lg: 20 }}
        >
          <Grid item>
            <Link
              href="/treinamento"
              className="hover:text-volks-blue-800 ease-in-out duration-200"
            >
              Treinamentos
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="/#economy"
              className="hover:text-volks-blue-800 ease-in-out duration-200"
            >
              Catálogo Economy
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="/"
              className="hover:text-volks-blue-800 ease-in-out duration-200"
            >
              Notícias
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
