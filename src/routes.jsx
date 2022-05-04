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

import { router as AuthorizationRouter } from 'src/pages/AuthorizationModule';

import { router as UserManagerRouter } from 'src/pages/UserManagerModule';

import { router as EditProfileRouter } from 'src/pages/EditProfileModule';

import { router as DegreeManagerRouter } from 'src/pages/EditDegreeModule';

const Main = React.lazy(() => import('src/shared/layouts/main-layout'));

const Logout = React.lazy(() => import('src/shared/components/LogoutModal'));

// Inner page
const Welcome = React.lazy(() => import('src/pages/WelcomePage'));

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
      ...UserManagerRouter,
      ...MessageRouter,
      ...MedicineManagerRouter,
      ...ScheduleManagerRouter,
      ...MakeAppointmentRouter,
      ...EditProfileRouter,
      ...DegreeManagerRouter,
      // Add more routes here
    ],
  },
  ...AuthorizationRouter,
];

export const modalRoutes = [
  ...MessageModalRouter,
  ...ScheduleManagerModalRouter,
  ...MakeAppointmentModalRouter,
  ...MedicineManagerModalRouter,
];

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
