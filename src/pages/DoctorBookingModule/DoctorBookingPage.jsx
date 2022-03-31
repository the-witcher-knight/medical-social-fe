import React from 'react';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';

const DoctorBookingPage = () => {
  return (
    <Box component="div" mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Outlet />
    </Box>
  );
};
export default DoctorBookingPage;
