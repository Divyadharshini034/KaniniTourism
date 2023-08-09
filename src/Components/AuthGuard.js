import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ element: Component, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Component />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AuthGuard;
