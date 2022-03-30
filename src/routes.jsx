import React from 'react';
import { useRoutes } from 'react-router-dom';

const Main = React.lazy(() => import('src/shared/layouts/main-layout'));

const Authorization = React.lazy(() => import('src/pages/AuthorizationPage'));
const SignIn = React.lazy(() => import('src/shared/components/SignInComponent'));
const SignUp = React.lazy(() => import('src/shared/components/SignUpComponent'));
const Logout = React.lazy(() => import('src/shared/components/LogoutModal'));

// Inner page
const Welcome = React.lazy(() => import('src/pages/WelcomePage'));

const Admin = React.lazy(() => import('src/pages/AdminModule/AdminPage'));
const AdminDefault = React.lazy(() => import('src/pages/AdminModule/Default'));
const DoctorManager = React.lazy(() =>
  import('src/pages/AdminModule/DoctorManager/DoctorManagerPage')
);

const DoctorBooking = React.lazy(() => import('src/pages/DoctorBookingModule/DoctorBookingPage'));

const BookingManager = React.lazy(() => import('src/pages/BookingManagerModule/BookingManager'));

const Chat = React.lazy(() => import('src/pages/MessageModule/MessagePage'));

export const ROUTES = [
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/admin',
        element: <Admin />,
        children: [
          {
            path: '',
            element: <AdminDefault />,
            index: true,
          },
          {
            path: 'doctor-manager',
            element: <DoctorManager />,
          },
        ],
      },
      {
        path: '/doctor-booking',
        element: <DoctorBooking />,
      },
      {
        path: '/message',
        element: <Chat />,
      },
      {
        path: '/booking-manager',
        element: <BookingManager />,
      },
      // Add more routes here
    ],
  },
  {
    path: '/authorization',
    element: <Authorization />,
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

const BrowerRouterProvider = ({ location }) => {
  const routeElements = useRoutes(ROUTES, location);
  return routeElements;
};

export default BrowerRouterProvider;
