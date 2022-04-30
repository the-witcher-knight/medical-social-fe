import React from 'react';

const MakeAppointmentPage = React.lazy(() => import('./MakeAppointmentPage'));
const DoctorList = React.lazy(() => import('./DoctorList'));
const DoctorSchedule = React.lazy(() => import('./DoctorSchedule'));
const ReviewDegreeDialog = React.lazy(() => import('./ReviewDegreeDialog'));
const MakeAppointmentForm = React.lazy(() => import('./MakeAppointmentForm'));

export const router = [
  {
    path: '/make-appointment',
    element: <MakeAppointmentPage />,
    children: [
      {
        index: true,
        element: <DoctorList />,
      },
      {
        path: 'schedule/:doctorLogin',
        element: <DoctorSchedule />,
      },
    ],
  },
];

export const modalRouter = [
  {
    path: '/make-appointment/degree/:doctorId',
    element: <ReviewDegreeDialog />,
  },
  {
    path: '/make-appointment/:doctorLogin/set-appointment',
    element: <MakeAppointmentForm />,
  },
];
