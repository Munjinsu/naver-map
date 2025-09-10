import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

const ProtectedRoutes = ({ authChecked }) => {
  if (!authChecked) return null;

  const isLogin = isAuthenticated();

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
