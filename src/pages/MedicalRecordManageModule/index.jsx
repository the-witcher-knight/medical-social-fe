import React from 'react';

const MedicalRecordManager = React.lazy(() => import('./MedicalRecordManager'));

export const router = [
  {
    path: '/medical-record-manager',
    element: <MedicalRecordManager />,
  },
];

export const modalRouter = [];
