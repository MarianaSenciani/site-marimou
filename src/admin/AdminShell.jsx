import { ArrowUpRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { href: '/admin', label: 'Visão geral' },
  { href: '/admin/projetos', label: 'Projetos' },
  { href: '/admin/cv', label: 'Currículo' },
];

export default function AdminShell({ currentPath, children }) {
  const { logout } = useAuth();
  return <div className="admin-shell">
    <header className="admin-site-header">
      <div className="admin-header-inner">
        <a href="/admin" className="admin-wordmark" aria-label="Mari Mou, painel">mari<span>mou</span><i>✳</i><small>STUDIO / ADMIN</small></a>
        <nav className="admin-primary-nav" aria-label="Navegação do painel">
          {links.map(link => <a key={link.href} href={link.href} aria-current={currentPath === link.href ? 'page' : undefined}>{link.label}</a>)}
        </nav>
        <div className="admin-header-actions"><a href="/" target="_blank" rel="noreferrer">Ver site <ArrowUpRight size={15} /></a><button onClick={logout} aria-label="Sair do painel"><LogOut size={17} /><span>Sair</span></button></div>
      </div>
    </header>
    {children}
    <footer className="admin-site-footer"><span>MARIMOU © {new Date().getFullYear()}</span><span>SEU ESPAÇO DE CRIAÇÃO ✳</span><span>ARQUIVOS SALVOS NESTE COMPUTADOR</span></footer>
  </div>;
}
