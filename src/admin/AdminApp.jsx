import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminLayout from './AdminLayout.jsx';
import AdminHome from './AdminHome.jsx';
import AdminProjetos from './AdminProjetos.jsx';

export default function AdminApp({ currentPath }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  if (currentPath === '/admin/cv') {
    return <AdminLayout currentPath={currentPath} />;
  }
  
  if (currentPath === '/admin/projetos') {
    return <AdminProjetos />;
  }

  return <AdminHome />;
}
