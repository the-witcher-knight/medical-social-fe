import React from 'react';
import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <Box component="div">
      <Typography paragraph variant="h4">
        Admin Page
      </Typography>
      <Outlet />
    </Box>
  );
};
export default AdminPage;
