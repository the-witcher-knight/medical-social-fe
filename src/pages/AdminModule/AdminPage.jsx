import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <Box component="div" mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Outlet />
    </Box>
  );
};
export default AdminPage;
