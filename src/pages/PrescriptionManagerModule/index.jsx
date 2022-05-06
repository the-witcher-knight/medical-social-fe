import React from 'react';

const PrescriptionManager = React.lazy(() => import('./PrescriptionManager'));
const PrescriptionDetailDialog = React.lazy(() => import('./PrescriptionDetailDialog'));

export const router = [
  {
    path: '/prescription-manager',
    element: <PrescriptionManager />,
  },
];

export const modalRouter = [
  {
    path: '/prescription-manager/:prescriptionId/detail',
    element: <PrescriptionDetailDialog />,
  },
];
