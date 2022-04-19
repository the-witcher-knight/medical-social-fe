import React from 'react';

const VideoCall = React.lazy(() => import('./VideoCall'));

export const router = {
  path: '/videochat',
  element: <VideoCall />,
};
