import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import TopBar from './top-bar';
import { Outlet, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from 'src/shared/reducers/authentication';
import { StorageAPI } from 'src/shared/util/storage-util';

const MainLayout = () => {
  const navigate = useNavigate();
  const isAuthorized =
    StorageAPI.local.get(AUTH_TOKEN_KEY) || StorageAPI.session.get(AUTH_TOKEN_KEY);

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/authorization/sign-in');
    }
  }, []);

  return (
    <Box>
      <TopBar />
      <Outlet />
    </Box>
  );
};
export default MainLayout;
