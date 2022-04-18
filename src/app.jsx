import React, { Suspense, useEffect } from 'react';
import RouterProvider from './routes';
import AnimationProgress from './shared/components/AnimationProgress';
import './app.css';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Suspense fallback={<AnimationProgress />}>
      <RouterProvider />
    </Suspense>
  );
};
export default App;
