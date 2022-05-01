import React from 'react';
import { useRoutes, useLocation, Routes, Route } from 'react-router-dom';

import {
  router as MessageRouter,
  modalRouter as MessageModalRouter,
} from 'src/pages/MessageModule/router';

import {
  router as ScheduleManagerRouter,
  modalRouter as ScheduleManagerModalRouter,
} from 'src/pages/ScheduleManagerModule';

import {
  router as MakeAppointmentRouter,
  modalRouter as MakeAppointmentModalRouter,
} from 'src/pages/MakeAppointmentModule';

import {
  router as MedicineManagerRouter,
  modalRouter as MedicineManagerModalRouter,
} from 'src/pages/MedicineModule';

const Main = React.lazy(() => import('src/shared/layouts/main-layout'));

const Authorization = React.lazy(() => import('src/pages/AuthorizationPage'));
const SignIn = React.lazy(() => import('src/shared/components/SignInComponent'));
const SignUp = React.lazy(() => import('src/shared/components/SignUpComponent'));
const ProfileEdit = React.lazy(() => import('src/shared/components/ProfileEdit'));
const Logout = React.lazy(() => import('src/shared/components/LogoutModal'));

// Inner page
const Welcome = React.lazy(() => import('src/pages/WelcomePage'));

const Admin = React.lazy(() => import('src/pages/AdminModule/AdminPage'));
const AdminDefault = React.lazy(() => import('src/pages/AdminModule/Default'));
const DoctorManager = React.lazy(() =>
  import('src/pages/AdminModule/DoctorManager/DoctorManagerPage')
);

export const routes = [
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
      ...MessageRouter,
      ...MedicineManagerRouter,
      ...ScheduleManagerRouter,
      ...MakeAppointmentRouter,
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
      {
        path: 'profile-edit',
        element: <ProfileEdit />,
      },
    ],
  },
];

export const modalRoutes = [
  ...MessageModalRouter,
  ...ScheduleManagerModalRouter,
  ...MakeAppointmentModalRouter,
  ...MedicineManagerModalRouter,
];

// const BrowerRouterProvider = ({ location }) => {
//   const routeElements = useRoutes(ROUTES, location);
//   return routeElements;
// };

export default function RouterProvider() {
  const location = useLocation();

  const elm = useRoutes(routes, location.state?.backgroundLocation || location);

  return (
    <>
      {elm}

      {/* Show the modal when a `backgroundLocation` is set */}
      {location.state?.backgroundLocation && (
        <Routes>
          {modalRoutes &&
            modalRoutes.length > 0 &&
            modalRoutes.map(r => <Route key={r.path} path={r.path} element={r.element} />)}
        </Routes>
      )}
    </>
  );
}
