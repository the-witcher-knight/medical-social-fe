import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import TopBar, { DrawerHeader } from './top-bar';
import SideBar from './side-bar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <Box>
      <CssBaseline />
      <TopBar open={openSideBar} toggleSideBar={toggleSideBar} />
      <SideBar open={openSideBar} handleClose={toggleSideBar} />
      <Box component="main" sx={{ maxWidth: '90vw', marginLeft: '5vw' }}>
        <DrawerHeader />
        <Outlet />
        <Footer
          title="Medical Social Application"
          description="This is an application that connects doctors and patients"
        />
      </Box>
    </Box>
  );
};
export default MainLayout;
