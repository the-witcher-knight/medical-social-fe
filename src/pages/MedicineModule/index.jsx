import React from 'react';

const MedicineManager = React.lazy(() => import('./MedicineManagerPage'));
const MedicineList = React.lazy(() => import('./MedicineList'));
const MedicineDetail = React.lazy(() => import('./MedicineDetail'));
const MedicineUpdateDialog = React.lazy(() => import('./MedicineUpdateDialog'));
const DeleteDialog = React.lazy(() => import('./DeleteDialog'));

export const router = [
  {
    path: '/medicine-manager',
    element: <MedicineManager />,
    children: [
      {
        index: true,
        element: <MedicineList />,
      },
      {
        path: ':pharmacyMedicineId/detail',
        element: <MedicineDetail />,
      },
    ],
  },
];

export const modalRouter = [
  {
    path: '/medicine-manager/new',
    element: <MedicineUpdateDialog />,
  },
  {
    path: '/medicine-manager/:pharmacyMedicineId/edit',
    element: <MedicineUpdateDialog />,
  },
  {
    path: '/medicine-manager/:pharmacyMedicineId/delete',
    element: <DeleteDialog />,
  },
];
