import React from 'react';
import { useRoutes } from 'react-router-dom';

const Main = React.lazy(() => import('src/shared/layouts/main-layout'));

const Authorization = React.lazy(() => import('src/pages/AuthorizationPage'));
const SignIn = React.lazy(() => import('src/shared/components/SignInComponent'));
const SignUp = React.lazy(() => import('src/shared/components/SignUpComponent'));
const Logout = React.lazy(() => import('src/shared/components/LogoutModal'));

export const ROUTES = [
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/logout',
        element: <Logout />,
      },
    ],
  },
  {
    path: '/authorization',
    element: <Authorization />,
    children: [
      {
        path: '/authorization/sign-in',
        element: <SignIn />,
      },
      {
        path: '/authorization/sign-up',
        element: <SignUp />,
      },
    ],
  },
];

const BrowerRouterProvider = () => {
  const routeElements = useRoutes(ROUTES);
  return routeElements;
};

export default BrowerRouterProvider;
