import React from 'react';
import { Navigate } from 'react-router-dom';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

function ProtectedRoute({ element: Component }) {
  const { isAuthenticated } = useKindeAuth();

  return isAuthenticated ? Component : <Navigate to="/" replace />;
}

export default ProtectedRoute;
