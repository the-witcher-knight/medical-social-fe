import React from 'react';
import { useRoutes } from 'react-router-dom';

export const ROUTES = [];

const BrowerRouterProvider = () => {
  const routeElements = useRoutes(ROUTES);
  return routeElements;
};

export default BrowerRouterProvider;
