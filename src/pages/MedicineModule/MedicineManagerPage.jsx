import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MedicineManagerPage = () => {
  return (
    <Box component="div" display="flex" justifyContent="center" mt={3}>
      <Outlet />
    </Box>
  );
};
export default MedicineManagerPage;
