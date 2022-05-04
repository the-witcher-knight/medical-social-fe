import React from 'react';

const DegreeManager = React.lazy(() => import('./DegreeManager'));

export const router = [
  {
    path: '/degree-manager',
    element: <DegreeManager />,
  },
];

export const modalRouter = [];
