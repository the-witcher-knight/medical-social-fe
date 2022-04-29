import React, { Suspense, useEffect } from 'react';
import RouterProvider from './routes';
import AnimationProgress from 'src/shared/components/AnimationProgress';
import { useNavigate } from 'react-router-dom';
import StorageAPI from 'src/shared/util/storage-util';
import './app.css';

const App = () => {
  const navigate = useNavigate();
  const isAuthenticated = StorageAPI.local.get('authToken') || StorageAPI.session.get('authToken');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/authorization/sign-in');
    }
  }, []);
  return (
    <Suspense fallback={<AnimationProgress />}>
      <RouterProvider />
    </Suspense>
  );
};
export default App;
