import { CircularProgress } from '@mui/material';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const PharmacyView = () => (
  <Suspense fallback={<CircularProgress />}>
    <Outlet />
  </Suspense>
);
const PharmacyList = React.lazy(() => import('./PharmacyList'));
const MedicineView = React.lazy(() => import('./MedicineView'));

export const router = [
  {
    path: '/pharmacy',
    element: <PharmacyView />,
    children: [
      {
        index: true,
        element: <PharmacyList />,
      },
      {
        path: ':pharmacyId/medicine',
        element: <MedicineView />,
      },
    ],
  },
];

export const modalRouter = [];
