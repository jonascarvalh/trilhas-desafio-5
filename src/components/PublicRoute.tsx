import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isLoggedIn = isAuthenticated();

  // Se o usuário estiver logado, redireciona para o perfil
  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }

  // Se não estiver logado, mostra o conteúdo normalmente
  return <>{children}</>;
};

export default PublicRoute; 