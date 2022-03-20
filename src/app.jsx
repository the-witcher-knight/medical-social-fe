import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BrowerRouterProvider from './routes';
import AnimationProgress from './shared/components/AnimationProgress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Suspense fallback={<AnimationProgress />}>
          <BrowerRouterProvider />
        </Suspense>
      </Router>
    </>
  );
};
export default App;
