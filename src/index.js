/* eslint-disable no-undef */
import { loadIcon } from 'src/configs/icon-loaders';
import getStore from 'src/configs/store';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';

// Get store
const store = getStore();

// Load the icons
loadIcon();

// Render UI
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
