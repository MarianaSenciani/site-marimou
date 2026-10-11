import { lazy, Suspense, useEffect, useState } from 'react';
import PortfolioSite from './portfolio/PortfolioSite.jsx';
import { CVProvider } from './context/CVContext.jsx';
import { ProjectProvider } from './portfolio/ProjectContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
const AdminApp = import.meta.env.DEV ? lazy(() => import('./admin/AdminApp.jsx')) : null;
const normalizePath = pathname => pathname === '/adm' ? '/admin' : pathname;
export default function App() {
  const [path, setPath] = useState(normalizePath(window.location.pathname));
  useEffect(() => {
    if (window.location.pathname === '/adm') window.history.replaceState({}, '', `/admin${window.location.hash}`);
    const onPop = () => setPath(normalizePath(window.location.pathname));
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest('a');
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !['/', '/sobre', '/projetos', '/admin', '/admin/cv', '/admin/projetos'].includes(url.pathname) && !url.pathname.startsWith('/projetos/')) return;
      event.preventDefault();
      window.history.pushState({}, '', url.pathname + url.hash);
      setPath(url.pathname);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (url.hash) document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'instant' });
      }));
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('popstate', onPop); document.removeEventListener('click', onClick); };
  }, []);
  return <CVProvider><ProjectProvider>{path.startsWith('/admin') && import.meta.env.DEV
    ? <AuthProvider><div className="admin-root"><Suspense fallback={<p className="p-8">Abrindo painel…</p>}><AdminApp currentPath={path} /></Suspense></div></AuthProvider>
    : <PortfolioSite path={path} />}</ProjectProvider></CVProvider>;
}
