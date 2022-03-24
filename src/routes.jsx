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
const DoctorList = React.lazy(() => import('src/pages/DoctorBookingModule/DoctorList'));
const BookingForm = React.lazy(() => import('src/pages/DoctorBookingModule/BookingFormModal'));

// Demo page
const DemoText = React.lazy(() => import('src/pages/TextPage'));

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
        children: [
          {
            index: true,
            element: <DoctorList />,
          },
          {
            path: ':doctorId',
            element: <BookingForm />,
          },
        ],
      },
      {
        path: '/demo-text',
        element: <DemoText />,
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

const BrowerRouterProvider = ({ location }) => {
  const routeElements = useRoutes(ROUTES, location);
  return routeElements;
};

export default BrowerRouterProvider;
