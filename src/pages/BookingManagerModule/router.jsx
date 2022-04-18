import React from 'react';

const BookingManager = React.lazy(() => import('./BookingManager'));
const ConfirmModal = React.lazy(() => import('./Dialogs/ConfirmModal'));
const DeleteModal = React.lazy(() => import('./Dialogs/DeleteModal'));
const RecordReviewModal = React.lazy(() => import('./Dialogs/RecordReviewModal'));
const PrescriptionModal = React.lazy(() => import('./Dialogs/PrescriptionModal'));

export const router = {
  path: '/booking-manager',
  element: <BookingManager />,
};

export const modalRouter = [
  {
    path: '/booking-manager/:scheduleId/confirm',
    element: <ConfirmModal />,
  },
  {
    path: '/booking-manager/:scheduleId/delete',
    element: <DeleteModal />,
  },
  {
    path: '/booking-manager/patient/:patientId/medical-record-review',
    element: <RecordReviewModal />,
  },
  {
    path: '/booking-manager/patient/:patientId/prescription',
    element: <PrescriptionModal />,
  },
];
