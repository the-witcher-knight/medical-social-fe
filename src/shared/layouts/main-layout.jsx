import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TopBar from './top-bar';
import SideBar from './side-bar';
import { Outlet, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from 'src/shared/reducers/authentication';
import { StorageAPI } from 'src/shared/util/storage-util';

const MainLayout = () => {
  const navigate = useNavigate();

  const [openSideBar, setOpenSideBar] = useState(false);

  const isAuthenticated =
    StorageAPI.local.get(AUTH_TOKEN_KEY) || StorageAPI.session.get(AUTH_TOKEN_KEY);

  // useEffect(() => {
  //   if (!isAuthorized) {
  //     navigate('/authorization/sign-in');
  //   }
  // }, []);

  const toggleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <Box>
      <TopBar open={openSideBar} toggleSideBar={toggleSideBar} />
      <SideBar open={openSideBar} handleClose={toggleSideBar} />
      <Outlet />
    </Box>
  );
};
export default MainLayout;
