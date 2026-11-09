import { StandardProjectCase } from './StandardProjectCase';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useProjects } from './ProjectContext.jsx';
import { caseStudies, localizeCase } from './case-studies';
import { CaseCard } from './HomeSections';
import { useExperience } from './experience-context';
import { useMotionPaused } from '@/components/ui/motion-context';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { Reveal } from '@/components/ui/reveal';
import { SicrediCase } from './SicrediCase';
import { LivoCase } from './LivoCase';

export function ProjectVisual({ project, className = '' }: { project: { image?: string; title: string; tile?: number }; className?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [project.image]);
  const safe = typeof project.image === 'string' && /^(https?:\/\/|\/[^/]|data:image\/(png|jpeg|webp|gif);base64,)/i.test(project.image);
  return <div className={`project-visual tile-${Number(project.tile) || 0} ${className}`}>{safe && !failed && <img src={project.image} alt={project.title} onError={() => setFailed(true)} loading="lazy" />}</div>;
}

export function PublicProjects() {
  const { t } = useExperience(), paused = useMotionPaused(), { projects } = useProjects();
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Research', 'UX', 'Estratégia'];
  const visible = caseStudies.filter(project => filter === 'Todos' || project.tags.includes(filter) || (filter === 'Research' && project.id === 'lwsa'));
  const custom = projects.filter((project: { demo?: boolean; id: string }) => !project.demo && !caseStudies.some(item => item.id === project.id));
  return <main id="main-content" className="public-projects wrap"><header className="public-page-heading"><WordPullUp paused={paused} words={t('Projetos que mostram como eu penso e construo.', 'Projects that show how I think and build.', 'Proyectos que muestran cómo pienso y construyo.')} /><p>{t('Pesquisa, marca e UX. Cada projeto traz o contexto, o processo e o resultado, inclusive o que o número não prova.', 'Research, brand, and UX. Each project brings the context, the process, and the outcome, including what numbers alone cannot prove.', 'Investigación, marca y UX. Cada proyecto presenta el contexto, el proceso y el resultado, incluso lo que los números no prueban.')}</p></header><h2 className="project-index-title">{t("Explorar projetos","Explore projects","Explorar proyectos")}</h2><div className="public-project-filters" role="group" aria-label={t('Filtrar projetos', 'Filter projects', 'Filtrar proyectos')}>{categories.map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category === 'Todos' ? t('Todos', 'All', 'Todos') : category === 'Estratégia' ? t('Estratégia', 'Strategy', 'Estrategia') : category}</button>)}</div><div className="curated-case-grid">{visible.map(project => <Reveal key={project.id}><CaseCard project={project} compact /></Reveal>)}</div>{filter === 'Todos' && custom.length > 0 && <div className="project-grid additional-projects">{custom.map((project: { id: string; title: string; image?: string; tile?: number; category: string }) => <a className="project-card" href={`/projetos/${project.id}`} key={project.id}><ProjectVisual project={project} /><div className="project-card-caption"><h3>{project.title}</h3><ArrowUpRight /></div></a>)}</div>}<a className="text-link index-back-link" href="/#projetos"><ArrowLeft size={16}/>{t("Voltar aos destaques da home","Back to featured projects","Volver a los destacados")}</a></main>;
}

export function PublicCase({ id }: { id: string }) {
  const { t, lang } = useExperience(), paused = useMotionPaused(), { projects } = useProjects();
  const project = caseStudies.find(project => project.id === id);
  const custom = projects.find((project: { id: string }) => project.id === id);
  if (id === 'sicredi') return <SicrediCase />;
  if (id === 'livo') return <LivoCase />;
  if (!project && !custom) return <main id="main-content" className="public-page-heading wrap"><h1>{t('Projeto não encontrado.', 'Project not found.', 'Proyecto no encontrado.')}</h1><a href="/projetos" className="text-link">{t('Explorar projetos', 'Explore projects', 'Explorar proyectos')}<ArrowUpRight /></a></main>;
  return <StandardProjectCase project={project ? localizeCase(project, lang) : custom} />;
}
