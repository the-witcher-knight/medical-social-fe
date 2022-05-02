import React from 'react';

const UserManager = React.lazy(() => import('./AdminPage'));

export const router = [
  {
    path: '/user-manager',
    element: <UserManager />,
  },
];

export const modalRouter = [];
