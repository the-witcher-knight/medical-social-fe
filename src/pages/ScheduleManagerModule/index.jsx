import React from 'react';

const ScheduleManager = React.lazy(() => import('./ScheduleManager'));
const ConfirmDialog = React.lazy(() => import('./ConfirmDialog'));
const DeleteDialog = React.lazy(() => import('./DeleteDialog'));
const ReviewMedicalRecordDialog = React.lazy(() => import('./ReviewMedicalRecordDialog'));
const WritePrescriptionDialog = React.lazy(() => import('./WritePrescriptionDialog'));

export const router = [
  {
    path: '/schedule-manager',
    element: <ScheduleManager />,
  },
];

export const modalRouter = [
  {
    path: '/schedule-manager/confirm/:scheduleId',
    element: <ConfirmDialog />,
  },
  {
    path: '/schedule-manager/delete/:scheduleId',
    element: <DeleteDialog />,
  },
  {
    path: '/schedule-manager/review-medical-record/:patientId',
    element: <ReviewMedicalRecordDialog />,
  },
  {
    path: '/schedule-manager/write-prescription/:scheduleId',
    element: <WritePrescriptionDialog />,
  },
];
