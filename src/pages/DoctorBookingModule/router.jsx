import React from 'react';

const DoctorBooking = React.lazy(() => import('./DoctorBookingPage'));
const DoctorList = React.lazy(() => import('./DoctorList'));
const UserBookedList = React.lazy(() => import('./UserBookedList'));
const DegreeViewerModal = React.lazy(() => import('./DegreeViewerModal'));
const BookingFormModal = React.lazy(() => import('./BookingFormModal'));

export const router = [
  {
    path: '/doctor-booking',
    element: <DoctorBooking />,
    children: [
      {
        index: true,
        element: <DoctorList />,
      },
      {
        path: 'booked-list',
        element: <UserBookedList />,
      },
    ],
  },
];

export const modalRouter = [
  {
    path: '/doctor-booking/book/:doctorId',
    element: <BookingFormModal />,
  },
  {
    path: '/doctor-booking/degree/:doctorId',
    element: <DegreeViewerModal />,
  },
];
