import React, { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import SpinnerBar from './shared/components/Spinner';
import BrowerRouterProvider from './routes';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<SpinnerBar />}>
        <BrowerRouterProvider />
      </Suspense>
    </Router>
  );
};
export default App;
