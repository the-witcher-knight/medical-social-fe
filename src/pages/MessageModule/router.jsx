import React from 'react';

const Message = React.lazy(() => import('./MessagePage'));
const VideoCallModal = React.lazy(() => import('./VideoCallModal'));

export const router = [
  {
    path: '/message',
    element: <Message />,
  },
];

export const modalRouter = [
  {
    path: '/message/from/:from/to/:to',
    element: <VideoCallModal />,
  },
];
