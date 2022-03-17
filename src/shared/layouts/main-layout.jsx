import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import TopBar, { DrawerHeader } from './top-bar';
import SideBar from './side-bar';
import Footer from './footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from 'src/shared/reducers/authentication';
import { StorageAPI } from 'src/shared/util/storage-util';

const MainLayout = () => {
  const navigate = useNavigate();

  const [openSideBar, setOpenSideBar] = useState(false);

  const isAuthenticated =
    StorageAPI.local.get(AUTH_TOKEN_KEY) || StorageAPI.session.get(AUTH_TOKEN_KEY);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/authorization/sign-in');
    }
  }, []);

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
          description="This is an application connect docter and user"
        />
      </Box>
    </Box>
  );
};
export default MainLayout;
