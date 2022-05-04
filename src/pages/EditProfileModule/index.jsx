import React from 'react';

const EditProfile = React.lazy(() => import('./EditProfilePage'));

export const router = [
  {
    path: '/edit-profile',
    element: <EditProfile />,
  },
];

export const modalRouter = [];
