import React, { Suspense } from 'react';
import RouterProvider from './routes';
import AnimationProgress from './shared/components/AnimationProgress';
import './app.css';

const App = () => {
  return (
    <Suspense fallback={<AnimationProgress />}>
      <RouterProvider />
    </Suspense>
  );
};
export default App;
