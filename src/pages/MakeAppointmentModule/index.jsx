import React from 'react';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';

const MakeAppointmentPage = () => (
  // Show toast here

  <Box component="div" mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
    <Outlet />
  </Box>
);

const DoctorList = React.lazy(() => import('./DoctorList'));

const ReviewDegreeDialog = React.lazy(() => import('./ReviewDegreeDialog'));

export const router = [
  {
    path: '/make-appointment',
    element: <MakeAppointmentPage />,
    children: [
      {
        index: true,
        element: <DoctorList />,
      },
    ],
  },
];

export const modalRouter = [
  {
    path: '/make-appointment/degree/:doctorId',
    element: <ReviewDegreeDialog />,
  },
];
