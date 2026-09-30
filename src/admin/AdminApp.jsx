import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminLayout from './AdminLayout.jsx';
import AdminHome from './AdminHome.jsx';
import AdminProjetos from './AdminProjetos.jsx';
import AdminShell from './AdminShell.jsx';
import './admin.css';

export default function AdminApp({ currentPath }) {
  const { isAuthenticated } = useAuth();
  useEffect(() => { document.title = `${currentPath === '/admin/projetos' ? 'Projetos' : currentPath === '/admin/cv' ? 'Currículo' : 'Painel'} — Mari Mou`; }, [currentPath]);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminShell currentPath={currentPath}>
    {currentPath === '/admin/cv' ? <AdminLayout currentPath={currentPath} /> : currentPath === '/admin/projetos' ? <AdminProjetos /> : <AdminHome />}
  </AdminShell>;
}
