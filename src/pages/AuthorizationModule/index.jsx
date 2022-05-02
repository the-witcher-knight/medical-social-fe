import React from 'react';

const AuthorizationPage = React.lazy(() => import('./AuthorizationPage'));
const SignIn = React.lazy(() => import('./SignIn'));
const SignUp = React.lazy(() => import('./SignUp'));

export const router = [
  {
    path: 'authorization',
    element: <AuthorizationPage />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
];

export const modalRoutes = [];
