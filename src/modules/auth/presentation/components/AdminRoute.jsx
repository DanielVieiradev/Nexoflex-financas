import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../application/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  // Assuming role is stored in user_metadata for now
  const role = user?.user_metadata?.role || 'user';

  if (!user || role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
