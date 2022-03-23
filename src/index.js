/* eslint-disable no-undef */
import { loadIcon } from 'src/configs/icon-loaders';
import getStore from 'src/configs/store';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './app';

// Get store
const store = getStore();

// Load the icons
loadIcon();

// Render UI
render(
  <Provider store={store}>
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
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
