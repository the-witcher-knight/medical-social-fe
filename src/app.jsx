import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BrowerRouterProvider from './routes';
import AnimationProgress from './shared/components/Animation';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<AnimationProgress />}>
        <BrowerRouterProvider />
      </Suspense>
    </Router>
  );
};
export default App;
