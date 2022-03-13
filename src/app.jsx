import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import BrowerRouterProvider from './routes';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading ...</p>}>
        <BrowerRouterProvider />
      </Suspense>
    </Router>
  );
};
export default App;
