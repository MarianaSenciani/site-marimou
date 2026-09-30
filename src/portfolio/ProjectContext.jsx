import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { initialProjects } from './content.js';
const ProjectContext = createContext();
const KEY = 'marimou_projects_v1';
export const validProject = p => p && typeof p.id === 'string' && typeof p.title === 'string' && typeof p.category === 'string' && Array.isArray(p.tags);
const localProjects = () => {
  try { const saved = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(saved) && saved.every(validProject) ? saved : initialProjects; }
  catch { return initialProjects; }
};
export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(localProjects);
  const [hydrated, setHydrated] = useState(!import.meta.env.DEV);
  const [saveStatus, setSaveStatus] = useState('');
  const [saveError, setSaveError] = useState('');
  const queue = useRef(Promise.resolve());
  const revision = useRef(0);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    let alive = true;
    fetch('/api/projects').then(response => {
      if (!response.ok) throw new Error();
      return response.json();
    }).then(data => {
      if (!alive) return;
      if (Array.isArray(data.projects) && data.projects.every(validProject)) setProjects(data.projects);
      setHydrated(true);
    }).catch(() => { if (alive) { setHydrated(true); setSaveError('Servidor local indisponível. As edições ficarão apenas neste navegador.'); } });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY, JSON.stringify(projects)); }
    catch { if (!import.meta.env.DEV) setSaveError('Sem espaço para salvar os projetos neste navegador.'); }
    if (!import.meta.env.DEV) return;
    const current = ++revision.current;
    setSaveStatus('Salvando projetos…');
    const timer = setTimeout(() => {
      queue.current = queue.current.catch(() => {}).then(async () => {
        const response = await fetch('/api/projects', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ projects }) });
        if (!response.ok) throw new Error();
        if (current === revision.current) { setSaveStatus('Projetos salvos neste computador.'); setSaveError(''); }
      }).catch(() => {
        if (current === revision.current) { setSaveStatus(''); setSaveError('Não foi possível salvar no servidor local. Exporte um backup antes de sair.'); }
      });
    }, 350);
    return () => clearTimeout(timer);
  }, [projects, hydrated]);
  return <ProjectContext.Provider value={{ projects, setProjects, saveStatus, saveError, hydrated }}>{children}</ProjectContext.Provider>;
}
export const useProjects = () => useContext(ProjectContext);
