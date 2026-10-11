import { ArrowUpRight, Search } from 'lucide-react';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { useEffect, useRef, useState } from 'react';

import { Reveal } from '@/components/ui/reveal';
import { useMotionPaused } from '@/components/ui/motion-context';
import { BadgeExperience } from './BadgeExperience';
import { useExperience } from './experience-context';
import { caseStudies, type CaseStudy } from './case-studies';

function ProcessIcon({ stage }: { stage: number }) {
  if (stage === 0) return <Search strokeWidth={1.7} size={27} />;
  if (stage === 1) return <svg className="wire-build" viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5"><rect className="wire-part wire-part-0" x="3" y="4" width="26" height="24" rx="2"/><path className="wire-part wire-part-1" d="M3 10H29"/><rect className="wire-part wire-part-2" x="6" y="13" width="6" height="12" rx="1"/><rect className="wire-part wire-part-3" x="16" y="13" width="10" height="6" rx="1"/><path className="wire-part wire-part-4" d="M16 22H26M16 25H22"/></svg>;
  return <svg className="chart-build" viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path className="chart-bar chart-bar-0" d="M5 28V24"/><path className="chart-bar chart-bar-1" d="M12 28V21"/><path className="chart-bar chart-bar-2" d="M19 28V17"/><path className="chart-bar chart-bar-3" d="M26 28V12"/><path className="chart-line" pathLength="1" d="M4 19L12 13L19 15L28 4M23 4H28V9"/></svg>;
}

export function CaseCard({ project }: { project: CaseStudy; compact?: boolean }) {
  const { t } = useExperience();
  return <a className={`curated-case case-${project.color}`} href={`/projetos/${project.id}`} aria-label={`${t('Conhecer o projeto', 'Explore the project', 'Explorar el proyecto')} ${project.brand}`}><div className="curated-case-art"><span className="case-art-star" aria-hidden="true">✳</span><strong>{project.brand}</strong><span className="case-art-category">{project.category}</span><span className="case-art-arrow"><ArrowUpRight size={24} /></span></div><div className="curated-case-copy"><p className="case-focus">{project.category}</p><h3>{project.title}</h3><div className="case-outcome"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div><span className="case-card-cta">{t('Conhecer o projeto', 'Explore the project', 'Explorar el proyecto')}<ArrowUpRight size={16} /></span></div></a>;
}

export function FeaturedProjects() {
  const { t } = useExperience(), paused = useMotionPaused();
  return <section id="projetos" className="experience-section wrap"><div className="experience-section-heading"><WordPullUp as="h2" paused={paused} words={t('Projetos de destaque', 'Featured projects', 'Proyectos destacados')} /><p>{t('Contextos diferentes. Pesquisa, decisões e construção em equipe.', 'Different contexts. Research, decisions, and building as a team.', 'Contextos distintos. Investigación, decisiones y construcción en equipo.')}</p></div><div className="curated-case-grid">{caseStudies.map((project, i) => <Reveal key={project.id} delay={i * .07}><CaseCard project={project} /></Reveal>)}</div><a className="all-projects-link pill primary" href="/projetos">{t('Veja todos os meus projetos', 'View all my projects', 'Ver todos mis proyectos')}<ArrowUpRight size={18} /></a></section>;
}

export function WorkProcess() {
  const { t } = useExperience(), paused = useMotionPaused();
  const [connected, setConnected] = useState(0);
  const roadmap = useRef<HTMLDivElement>(null);
  const [connections, setConnections] = useState<string[]>([]);
  useEffect(() => {
    const measure = () => {
      const root = roadmap.current;
      if (!root) return;
      const points = Array.from(root.querySelectorAll<HTMLElement>('.roadmap-stage')).map(stage => {
        const icon = stage.querySelector<HTMLElement>('.process-card-icon')!;
        const a = stage.getBoundingClientRect(), b = icon.getBoundingClientRect();
        return { x: stage.offsetLeft + b.left - a.left + b.width / 2, y: stage.offsetTop + b.top - a.top + b.height / 2 };
      });
      const paths = points.slice(0, -1).map((a, i) => {
        const b = points[i + 1];
        return Math.abs(a.y - b.y) < 10 ? `M ${a.x + 24} ${a.y} H ${b.x - 24}` : `M ${a.x - 24} ${a.y} H 8 V ${b.y} H ${b.x - 24}`;
      });
      setConnections(current => current.join() === paths.join() ? current : paths);
    };
    const observer = new ResizeObserver(measure);
    if (roadmap.current) { observer.observe(roadmap.current); roadmap.current.querySelectorAll('.roadmap-stage').forEach(node => observer.observe(node)); }
    measure(); return () => observer.disconnect();
  }, []);
  const stages = [
    { title: t('Investigar e decidir', 'Investigate and decide', 'Investigar y decidir'), icon: Search, text: t('Começo ouvindo as pessoas e entendendo o contexto. Cruzo dúvidas, dados e objetivos para decidir com o time qual problema vale resolver primeiro.', 'I start by listening and understanding the context. Questions, data, and goals help the team decide which problem to solve first.', 'Empiezo escuchando y entendiendo el contexto. Cruzo preguntas, datos y objetivos para decidir con el equipo qué problema resolver primero.'), tags: ['Research', 'Discovery', 'Priorização'] },
    { title: t('Dar forma à solução', 'Shape the solution', 'Dar forma a la solución'),  text: t('Organizo caminhos, desenho alternativas e coloco as ideias à prova. O protótipo ajuda a conversar, testar e ajustar antes de avançar com o desenvolvimento.', 'I organize flows, design alternatives, and test ideas. Prototypes help us discuss and refine the solution before moving into development.', 'Organizo flujos, diseño alternativas y pruebo ideas. El prototipo ayuda a conversar, probar y ajustar antes de avanzar con el desarrollo.'), tags: ['Fluxos', 'UI', 'Componentes'] },
    { title: t('Aprender com o uso', 'Learn from use', 'Aprender del uso'),  text: t('Acompanho a entrega e os sinais de uso. Reúno feedback, olho para as métricas disponíveis e volto às prioridades para entender o que precisa evoluir.', 'I follow delivery and usage signals. Feedback and available metrics help us revisit priorities and understand what needs to improve.', 'Acompaño la entrega y las señales de uso. Reúno feedback y métricas para revisar prioridades y entender qué debe evolucionar.'), tags: ['Handoff', 'Feedback', 'Métricas'] },
  ];
  return <section className="experience-section process-experience wrap" id="processo"><div className="process-heading"><WordPullUp as="h2" paused={paused} words={t('Como eu trabalho.', 'How I work.', 'Cómo trabajo.')} /><p className="section-intro">{t("O caminho muda conforme o projeto. Estes são os momentos que costumo conectar.","The path changes with each project. These are the moments I connect.","El camino cambia según el proyecto. Estos son los momentos que conecto.")}</p></div><div ref={roadmap} className="process-roadmap" data-connected={connected}><svg className="process-connections" aria-hidden="true">{connections.map((d, i) => <path key={i} d={d} pathLength="1" className={connected > i ? 'is-connected' : ''} />)}</svg>{stages.map(({ title, text, tags }, i) => <Reveal key={title} className={`roadmap-stage roadmap-stage-${i}`} delay={i * .08} onPointerEnter={() => setConnected(i)} onFocus={() => setConnected(i)} tabIndex={0}><div className="process-card-top"><span className="process-card-icon" aria-hidden="true"><ProcessIcon stage={i} /></span></div><span className="phase-label">{[t('Entender', 'Understand', 'Entender'), t('Construir', 'Build', 'Construir'), t('Evoluir', 'Evolve', 'Evolucionar')][i]}</span><h3>{title}</h3><p>{text}</p><div className="process-stage-list">{[
[['Escutar e observar','Conversas, dados, uso real e o conhecimento de quem vive o produto.'],['Escolher um foco','O que vale resolver agora, com quais restrições e como vamos reconhecer avanço.']],
[['Experimentar cedo','Comparar caminhos enquanto mudar ainda custa pouco.'],['Entregar junto','Detalhar regras e estados com Engenharia, sem perder o problema de vista.']],
[['Ouvir os sinais','Feedbacks e métricas, sem confundir coincidência com causa.'],['Decidir o próximo passo','Priorizar ajustes com o time a partir do que apareceu no uso.']]
][i].map(([label,body]) => <div className="process-stage" key={label}><strong>{label}</strong><p>{body}</p></div>)}</div><div className="process-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div></Reveal>)}</div></section>;
}

export function BeyondDeliverables() {
  const { t } = useExperience(), paused = useMotionPaused();
  return <section id="historia" className="experience-section beyond-experience wrap"><BadgeExperience /><Reveal className="beyond-copy"><WordPullUp as="h2" paused={paused} words={t('Além das entregas, tem uma história.', 'Behind the work, there is a story.', 'Más allá de las entregas, hay una historia.')} /><p>{t('O desenho foi meu primeiro jeito de explorar ideias. O design me levou à tecnologia; os projetos me ensinaram a conectar pessoas, prioridades e decisões.', 'Drawing was my first way of exploring ideas. Design led me to technology; projects taught me to connect people, priorities, and decisions.', 'Dibujar fue mi primera forma de explorar ideas. El diseño me llevó a la tecnología; los proyectos me enseñaron a conectar personas, prioridades y decisiones.')}</p><p>{t('Hoje, levo esse repertório para Product Design e Product Ownership. Continuo curiosa sobre como as coisas funcionam — e como podem funcionar melhor.', 'Today, I bring that experience to Product Design and Product Ownership. I am still curious about how things work — and how they can work better.', 'Hoy llevo esa experiencia a Product Design y Product Ownership. Sigo siendo curiosa sobre cómo funcionan las cosas y cómo pueden funcionar mejor.')}</p><a className="pill primary beyond-cta" href="/sobre">{t('Conheça minha trajetória', 'Get to know my journey', 'Conoce mi trayectoria')}<ArrowUpRight size={18} /></a></Reveal></section>;
}

export { Recommendations } from './Testimonials';
