import React from 'react';
import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const DoctorBookingPage = () => {
  return (
    <Box component="div" mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ height: 600, width: '90%' }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Active Doctor List
        </Typography>
        {/* Show Doctor List or Booking Form here */}
        <Outlet />
      </div>
    </Box>
  );
};
export default DoctorBookingPage;
