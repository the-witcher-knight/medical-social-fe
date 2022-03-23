import React, { Suspense } from 'react';
import BrowerRouterProvider from './routes';
import AnimationProgress from './shared/components/AnimationProgress';
import { useLocation } from 'react-router-dom';
import './app.css';

const App = () => {
  const location = useLocation();
  const state = location.state;
  return (
    <Suspense fallback={<AnimationProgress />}>
      <BrowerRouterProvider location={state?.backgroundLocation || location} />
    </Suspense>
  );
};
export default App;
