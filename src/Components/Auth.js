import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const Auth = ({ path, component: Component, adminName }) => {
    if (adminName) {
      return <Route path={path} element={<Component />} />;
    } else {
      return <Navigate to="/" />;
    }
  };

export default Auth;
