import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, Link, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";

function DrawerUI() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
      <MenuIcon height={50}  />
      </Button>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box>

        <Image src="https://placehold.co/1360x768" width={200} height={700} alt="Video Cover" />
        </Box>
      <Link underline="none" color="inherit" className="hover:text-volks-blue-800 ease-in-out duration-200 cursor-pointer px-7 py-2">Treinamentos</Link>
                <Link underline="none" color="inherit" className="hover:text-volks-blue-800 ease-in-out duration-200 cursor-pointer px-7 py-2">Peças VW</Link>
                <Link underline="none" color="inherit" className="hover:text-volks-blue-800 ease-in-out duration-200 cursor-pointer px-7 py-2">Catálogo Economy</Link>
                <Link underline="none" color="inherit" className="hover:text-volks-blue-800 ease-in-out duration-200 cursor-pointer px-7 py-2">Notícias</Link>
      </Drawer>
    </div>
  );
}

export default DrawerUI;