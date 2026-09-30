import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowRight, ArrowLeft, Download, Plus, Minus, PenTool, Layers, Sparkles, Mouse, Pause, Play, Menu, X, Globe, Search, ScanLine, Send, MapPin } from 'lucide-react';
import { processContent } from './content.js';
import { useProjects } from './ProjectContext.jsx';
import { useCV } from '../context/CVContext.jsx';

const MotionContext = createContext();
const useMotion = () => useContext(MotionContext);
const contact = 'mailto:marianasenciani@gmail.com';
const linkedin = 'https://www.linkedin.com/in/mariana-senciani/';
const cv = import.meta.env.DEV ? '/api/cv/pdf' : '/Mariana-Senciani.pdf';

function Header({ path }) {
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [path]);
  return <header className="site-header wrap">
    <a className="wordmark" href="/" aria-label="Mari Mou, início">mari<span>mou</span><i>✳</i></a>
    <nav className={menu ? 'main-nav is-open' : 'main-nav'} aria-label="Navegação principal">
      <a href="/projetos" aria-current={path.startsWith('/projetos') ? 'page' : undefined} onClick={() => setMenu(false)}>Projetos</a>
      <a href="/#processo" onClick={() => setMenu(false)}>Meu processo</a>
      <a href="/sobre" aria-current={path === '/sobre' ? 'page' : undefined} onClick={() => setMenu(false)}>Sobre mim</a>
    </nav>
    <a href={contact} className="pill outline header-contact">Vamos conversar <ArrowUpRight size={16} /></a>
    <button className="icon-button menu-toggle" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
  </header>;
}

function Hero() {
  const head = useRef(null);
  const { paused } = useMotion();
  useEffect(() => {
    if (paused || !matchMedia('(pointer: fine)').matches) return;
    let frame;
    const move = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!head.current) return;
        const x = (e.clientX / innerWidth - .5) * 2;
        const y = (e.clientY / innerHeight - .5) * 2;
        head.current.style.transform = `perspective(900px) rotateY(${x * 11}deg) rotateX(${-y * 8}deg) rotateZ(${x * 2}deg) translate(${x * 11}px, ${y * 7}px)`;
      });
    };
    const reset = () => { if (head.current) head.current.style.transform = ''; };
    window.addEventListener('pointermove', move); document.addEventListener('pointerleave', reset);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', reset); reset(); };
  }, [paused]);
  return <section className="hero wrap" aria-labelledby="hero-title">
    <div className="hero-topline"><span>DESIGN COM INTENÇÃO. E PERSONALIDADE.</span><span className="location"><span className="status-dot" /> SÃO PAULO, BRASIL</span></div>
    <h1 id="hero-title">OI, SOU A MARI<span className="title-period">.</span></h1>
    <div className="hero-stage">
      <div className="hero-intro"><span className="tiny-cross">✳</span><h2>Product designer &<br /><span>Diretora de Arte.</span></h2><p>Transformo ideias em experiências<br className="desktop-br" /> que conectam pessoas e marcas.</p><a href="/projetos" className="text-link">Vem ver meu trabalho <ArrowUpRight size={18} /></a></div>
      <div className="hero-portrait"><div className="portrait-orbit" aria-hidden="true" /><div className="hero-float"><img ref={head} src="/assets/memoji.png" width="607" height="707" alt="Memoji da Mari, com cabelos ruivos cacheados" fetchpriority="high" /></div></div>
      <div className="hero-aside"><a className="pill primary" href={cv} download>Baixar currículo <Download size={16} /></a></div>
    </div>
    <div className="hero-facts"><div><PenTool size={22} /><p><strong>Desde 2020</strong><span>no universo criativo</span></p></div><div><Layers size={23} /><p><strong>Do insight à entrega</strong><span>design de ponta a ponta</span></p></div><div><Sparkles size={22} /><p><strong>Estratégia + expressão</strong><span>com pessoas no centro</span></p></div></div>
  </section>;
}

function Brands() {
  const brands = ['SIOUX', 'Adobe', 'LWSA', 'Sicredi', 'LIVO', 'AIG'];
  return <section className="brands" aria-label="Marcas que fizeram parte da minha trajetória"><p className="eyebrow">ALGUMAS MARCAS QUE JÁ CRUZARAM MEU CAMINHO</p><div className="brand-window"><div className="brand-track">{[0, 1].map(copy => <div className="brand-group" key={copy} aria-hidden={copy ? true : undefined}>{brands.map((brand, i) => <span className={`brand brand-${i}`} key={brand}>{i === 1 && <span className="adobe-symbol">Λ</span>}{i === 3 && <span className="sicredi-symbol">✳</span>}{brand}{i === 0 && <span className="sioux-symbol">◉</span>}</span>)}</div>)}</div></div></section>;
}

export function ProjectVisual({ project, className = '' }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [project.image]);
  const safeImage = typeof project.image === 'string' && /^(https?:\/\/|\/[^/]|data:image\/(png|jpeg|webp|gif);base64,)/i.test(project.image);
  return <div className={`project-visual tile-${Number(project.tile) || 0} ${className}`} role={safeImage && !failed ? undefined : 'img'} aria-label={safeImage && !failed ? undefined : `Mockup ilustrativo — ${project.title}`}>
    {safeImage && !failed && <img src={project.image} alt={project.title} onError={() => setFailed(true)} loading="lazy" />}
  </div>;
}

function ProjectCard({ project, duplicate = false }) {
  return <a className="project-card" href={`/projetos/${project.id}`} tabIndex={duplicate ? -1 : undefined} aria-hidden={duplicate || undefined}>
    <ProjectVisual project={project} /><div className="project-card-caption"><div><span>{project.category}</span><h3>{project.title}</h3></div><span className="round-arrow"><ArrowUpRight size={21} /></span></div>{project.demo && <span className="sample-label">ESTUDO VISUAL</span>}
  </a>;
}

function ProjectMarquee() {
  const { projects } = useProjects();
  if (!projects.length) return null;
  const row = projects.length < 4 ? [...projects, ...projects] : projects;
  return <section id="trabalhos" className="project-preview" aria-label="Prévia de projetos">
    <div className="preview-topline wrap"><span className="eyebrow">UM POUCO DO QUE EU CRIO</span></div>
    {[0, 1].map(r => <div className={`project-window row-${r}`} key={r}><div className="project-track">{[0, 1].map(copy => <div className="project-group" key={copy}>{(r ? [...row].reverse() : row).map((p, index) => <ProjectCard key={`${p.id}-${index}`} project={p} duplicate={!!copy} />)}</div>)}</div></div>)}
    <div className="preview-bottom wrap"><span>Ideias em diferentes formas, telas e contextos.</span><a className="text-link" href="/projetos">Explorar projetos <ArrowUpRight size={17} /></a></div>
  </section>;
}

const scenes = [
  { title: 'Produtos & experiências digitais', tile: 0 },
  { title: 'Websites & landing pages', tile: 3 },
  { title: 'Design gráfico & digital', tile: 1 },
];

function Showcase() {
  const section = useRef(null);
  const [active, setActive] = useState(0);
  const { paused } = useMotion();
  useEffect(() => {
    if (paused) return;
    let raf;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.current?.getBoundingClientRect();
        if (!rect) return;
        const progress = Math.max(0, -rect.top / innerHeight);
        setActive(Math.max(0, Math.min(2, Math.floor(progress))));
        const exit = Math.max(0, Math.min(1, (progress - 2.7) / .3));
        section.current?.style.setProperty('--showcase-offset', `${-18 * exit}px`);
        section.current?.style.setProperty('--showcase-opacity', String(1 - .28 * exit));
      });
    };
    window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); update();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [paused]);
  const choose = i => {
    if (paused) { setActive(i); return; }
    const el = section.current;
    const top = el.getBoundingClientRect().top + scrollY;
    window.scrollTo({ top: top + i * innerHeight + 8, behavior: 'smooth' });
  };
  return <section ref={section} className={`showcase-scroll ${paused ? 'no-pin' : ''}`} id="especialidades" aria-label="Três maneiras de criar" onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); choose(Math.min(2, active + 1)); } if (e.key === 'ArrowLeft') { e.preventDefault(); choose(Math.max(0, active - 1)); } }}>
    <div className="showcase-sticky"><div className="showcase-frame" data-project-badge onClick={e => { if (!e.target.closest('button,a')) e.currentTarget.querySelector('.showcase-cta')?.click(); }}>
      {scenes.map((scene, i) => <div key={scene.title} className={`scene-bg ${i === active ? 'active' : ''}`} aria-hidden="true"><ProjectVisual project={{ ...scene, title: scene.title }} /></div>)}
      <div className="showcase-shade" />
      <div className="showcase-top"><span className="eyebrow">POR AQUI, IDEIAS GANHAM VIDA.</span><span className="scroll-hint"><Mouse size={18} /> ROLE PARA DESCOBRIR</span></div>
      <div className="showcase-copy"><p>Por aqui eu torno realidade</p><div>{scenes.map((scene, i) => <button className={`scene-title ${active === i ? 'active' : ''}`} key={scene.title} onClick={() => choose(i)} aria-pressed={active === i}>{scene.title}{active === i && <ArrowUpRight />}</button>)}<a href="/projetos" className="text-link showcase-cta">Veja os demais projetos <ArrowUpRight size={15} /></a></div></div>
      <div className="showcase-bottom"><a href="#processo" className="text-link">Conheça meu processo <ArrowDown size={15} /></a></div>
    </div></div>
  </section>;
}

function Process() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(0);
  const content = processContent[tab];
  const icons = [Search, ScanLine, PenTool, Send];
  const select = i => { setTab(i); setOpen(0); };
  return <section className="process-section wrap" id="processo" aria-labelledby="process-title"><div className="section-heading"><span className="eyebrow">NÃO É SÓ SOBRE COMO FICA.</span><span className="eyebrow muted">É SOBRE COMO FUNCIONA.</span></div>
    <div role="tablist" aria-label="Processos por serviço" className="process-tabs">{processContent.map((p, i) => <button key={p.name} role="tab" id={`tab-${i}`} aria-selected={tab === i} aria-controls="process-panel" tabIndex={tab === i ? 0 : -1} className={tab === i ? 'active' : ''} onClick={() => select(i)} onKeyDown={e => { const next = e.key === 'ArrowRight' ? (i + 1) % 4 : e.key === 'ArrowLeft' ? (i + 3) % 4 : e.key === 'Home' ? 0 : e.key === 'End' ? 3 : null; if (next !== null) { e.preventDefault(); select(next); document.getElementById(`tab-${next}`)?.focus(); } }}>{p.name}</button>)}</div>
    <div className="process-panel" id="process-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}><div className="process-intro"><span className="process-spark" aria-hidden="true">✳</span><h2 id="process-title">Como é meu processo<br />de criação de <em>{content.title}?</em></h2><p>{content.intro}</p><span className="process-footnote">Cada projeto tem seu ritmo.<br />O processo se adapta ao desafio.</span></div>
      <div className="process-steps">{content.steps.map((step, i) => { const Icon = icons[i]; return <article key={`${tab}-${i}`} className={`process-step stage-${i} ${open === i ? 'is-open' : ''}`}><h3><button className="step-trigger" aria-expanded={open === i} aria-controls={`step-panel-${i}`} id={`step-button-${i}`} onClick={() => setOpen(open === i ? -1 : i)}><span className="step-number">0{i + 1}</span><span className="step-name">{step[0]}<small>{step[1]}</small></span><span className="step-symbol">{open === i ? <Minus size={18} /> : <Plus size={18} />}</span></button></h3><div id={`step-panel-${i}`} role="region" aria-labelledby={`step-button-${i}`} className="step-details" hidden={open !== i}><div className="process-art" aria-hidden="true"><Icon size={32} strokeWidth={1.5} /><span>0{i + 1}</span></div><p>{step[2]}</p><div className="step-tags">{step[3].map(tag => <span key={tag}>{tag}</span>)}</div></div></article>; })}</div>
    </div>
  </section>;
}

const tools = [{ name: 'Claude', file: 'claude', note: 'Ideias e novas possibilidades', css: 'tool-claude' }, { name: 'Figma', file: 'figma', note: 'Do fluxo ao protótipo', css: 'tool-figma' }, { name: 'Adobe Creative Cloud', file: 'creative-cloud', note: 'Expressão visual sem limites', css: 'tool-adobe' }, { name: 'Cursor', file: 'cursor', note: 'Design que ganha vida', css: 'tool-cursor' }];
function ToolTile({ tool }) {
  const { paused } = useMotion();
  const move = e => {
    if (paused || e.pointerType === 'touch') return;
    const el = e.currentTarget; const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(y - .5) * -28}deg`); el.style.setProperty('--ry', `${(x - .5) * 28}deg`);
    el.style.setProperty('--shine-x', `${x * 100}%`); el.style.setProperty('--shine-y', `${y * 100}%`);
  };
  return <button className={`tool-tile ${tool.css}`} aria-label={`${tool.name}: ${tool.note}`} onPointerMove={move} onPointerLeave={e => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg'); }}><span className="tool-object"><img src={`/assets/${tool.file}.png`} width="200" height="200" alt={tool.name} loading="lazy" /><span className="tool-shine" /></span><span className="tool-tooltip">{tool.name}<small>{tool.note}</small></span></button>;
}

function AboutTeaser() {
  const section = useRef(null);
  const { paused } = useMotion();
  useEffect(() => {
    if (paused || !matchMedia('(pointer: fine)').matches) return;
    let frame;
    const move = e => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const host = section.current;
        if (!host) return;
        const visible = host.getBoundingClientRect();
        if (visible.bottom < 0 || visible.top > innerHeight) return;
        host.querySelectorAll('.tool-tile').forEach(el => {
          const rect = el.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          const strength = Math.max(0, 1 - Math.hypot(dx, dy) / 420);
          el.style.setProperty('--pull-x', `${Math.max(-28, Math.min(28, dx * .16 * strength))}px`);
          el.style.setProperty('--pull-y', `${Math.max(-28, Math.min(28, dy * .16 * strength))}px`);
        });
      });
    };
    window.addEventListener('pointermove', move);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); section.current?.querySelectorAll('.tool-tile').forEach(el => { el.style.removeProperty('--pull-x'); el.style.removeProperty('--pull-y'); }); };
  }, [paused]);
  return <section ref={section} className="about-teaser wrap" aria-labelledby="about-title"><div className="about-orbit orbit-one" /><div className="about-orbit orbit-two" />{tools.map(tool => <ToolTile key={tool.name} tool={tool} />)}<div className="about-center"><span className="eyebrow">MUITO PRAZER, MARIANA SENCIANI.</span><img className="about-photo" src="/assets/mariana.png" width="383" height="489" alt="Mariana Senciani" loading="lazy" /><h2 id="about-title">Afinal, quem é ela<span>?</span></h2><p>Uma designer curiosa, que transita entre<br className="desktop-br" /> a estratégia e a expressão visual.</p><p className="about-description">Desde 2020, conecto UX/UI, branding e direção de arte para transformar desafios em experiências. Gosto de fazer perguntas, explorar possibilidades e cuidar dos detalhes que fazem diferença.</p><a href="/sobre" className="pill outline about-cta">Um pouco mais sobre mim <ArrowUpRight size={17} /></a></div></section>;
}

function Footer() {
  return <footer className="site-footer" id="contato"><div className="wrap"><div className="footer-top"><span className="eyebrow">O PRÓXIMO PROJETO PODE SER O SEU.</span><span className="footer-spark" aria-hidden="true">✳</span></div><a href={contact} className="contact-title">Vamos criar<br /><span>algo que importa?</span></a><div className="contact-links"><a href={contact}>marianasenciani@gmail.com <ArrowUpRight size={16} /></a><div><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a><a href={cv} download>Currículo <Download size={15} /></a></div></div><div className="footer-bottom"><a href="/" className="wordmark">mari<span>mou</span><i>✳</i></a><span>Feito com intenção, curiosidade e café.</span><span>© {new Date().getFullYear()} Mariana Senciani</span></div></div></footer>;
}

function AboutPage() {
  const { cvData } = useCV(); const data = cvData.pt;
  return <main id="main-content" className="about-page wrap"><a href="/" className="text-link back-link"><ArrowLeft size={16} /> Voltar ao início</a><section className="about-page-hero"><div><span className="eyebrow">POR TRÁS DAS IDEIAS</span><h1>Design é sobre<br /><em>conexões.</em><br />E eu também.</h1><p>{data.personal.name}. {data.personal.role}.</p><p>Entre pesquisa, estratégia e criação, encontro caminhos para tornar o complexo mais simples e o cotidiano mais interessante.</p><div className="about-actions"><a className="pill primary" href={cv} download>Baixar currículo <Download size={16} /></a><a className="pill outline" href={linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={17} /></a></div></div><div className="about-portrait-large"><img src={data.personal.profilePhoto || "/assets/mariana.png"} alt="Retrato de Mariana Senciani" /><span><MapPin size={15} /> {data.personal.location}</span></div></section><section className="about-biography"><span className="eyebrow">UM POUCO DA MINHA HISTÓRIA</span><div>{data.summary.split('\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}</div></section><section className="experience-section"><div><span className="eyebrow">CAMINHOS QUE ME TROUXERAM ATÉ AQUI</span><h2>Experiências<br />que somam.</h2><p>Do varejo à tecnologia.<br />Da ideia à experiência.</p></div><div className="experience-list">{data.experience.map((exp, i) => <details key={i}><summary><div><span>{exp.period}</span><h3>{exp.company.split('|')[0]}</h3><p>{exp.role}</p></div><Plus size={20} /></summary><ul>{exp.activities.map((a, j) => <li key={j}>{a}</li>)}</ul></details>)}</div></section><section className="education-section"><div><span className="eyebrow">APRENDER FAZ PARTE</span><h2>Sempre em<br />construção.</h2></div><div>{data.education.map((e, i) => <article key={i}><span>{e.period}</span><h3>{e.degree}</h3><p>{e.institution}</p></article>)}<div className="language-tags">{data.languages.map((l, i) => <span key={i}><Globe size={14} /> {l.name} · {l.level}</span>)}</div></div></section></main>;
}

function ProjectsPage() {
  const { projects } = useProjects(); const [filter, setFilter] = useState('Todos');
  const filtered = filter === 'Todos' ? projects : projects.filter(p => p.category === filter);
  return <main id="main-content" className="projects-page wrap"><div className="page-heading"><span className="eyebrow">ESTRATÉGIA QUE GANHA FORMA.</span><h1>Ideias, encontros<br />e <em>bons projetos.</em></h1><p>Explore diferentes formas de conectar pessoas, marcas e experiências.</p></div><div className="project-filters" aria-label="Filtrar projetos">{['Todos', ...processContent.map(p => p.name)].map(c => <button key={c} aria-pressed={filter === c} onClick={() => setFilter(c)} className={filter === c ? 'active' : ''}>{c}</button>)}</div><p className="sample-note">Os estudos visuais abaixo usam mockups demonstrativos. Os cases reais entram em breve.</p><div className="project-grid">{filtered.map(p => <ProjectCard project={p} key={p.id} />)}</div>{!filtered.length && <div className="empty-state"><Sparkles /><h2>Novas ideias a caminho.</h2><p>Ainda não há projetos nesta categoria.</p><button className="pill primary" onClick={() => setFilter('Todos')}>Ver todos os projetos</button></div>}</main>;
}

function ProjectDetail({ id }) {
  const { projects } = useProjects(); const project = projects.find(p => p.id === id);
  if (!project) return <NotFound />;
  return <main id="main-content" className="project-detail wrap"><a className="text-link back-link" href="/projetos"><ArrowLeft size={16} /> Todos os projetos</a><div className="detail-heading"><div><span className="eyebrow">{project.category} · {project.year}</span><h1>{project.title}<span>↗</span></h1><p>{project.subtitle}</p></div><div className="detail-tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div></div><ProjectVisual project={project} className="detail-visual" /><div className="detail-description"><h2>{project.demo ? 'Uma possibilidade visual.' : 'Sobre o projeto'}</h2><div><p>{project.description}</p>{project.demo && <p className="sample-note">Estudo demonstrativo criado para a prévia deste portfólio, com mockup gerado por IA. Não representa um trabalho contratado, pesquisa realizada ou resultado de negócio.</p>}<a className="pill outline" href={contact}>Vamos construir seu próximo projeto? <ArrowUpRight size={16} /></a></div></div><a href="/projetos" className="text-link">Continuar explorando <ArrowRight size={18} /></a></main>;
}
function NotFound() { return <main id="main-content" className="empty-state wrap"><span className="eyebrow">404 · CAMINHO NÃO ENCONTRADO</span><h1>Vamos por<br />outro caminho?</h1><a className="pill primary" href="/">Voltar ao início <ArrowUpRight size={18} /></a></main>; }

function CursorBadge({ paused }) {
  const badge = useRef(null);
  useEffect(() => {
    if (paused || !matchMedia('(pointer: fine)').matches) return;
    let frame;
    const move = e => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = badge.current; if (!el) return;
        el.style.transform = `translate3d(${Math.min(e.clientX + 20, innerWidth - 205)}px, ${Math.min(e.clientY + 20, innerHeight - 55)}px,0)`;
        el.classList.toggle('visible', !!e.target.closest('[data-project-badge]') && !e.target.closest('button,a'));
      });
    };
    const hide = () => badge.current?.classList.remove('visible');
    document.addEventListener('pointermove', move); document.addEventListener('pointerleave', hide); window.addEventListener('scroll', hide, { passive: true });
    return () => { cancelAnimationFrame(frame); document.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', hide); window.removeEventListener('scroll', hide); hide(); };
  }, [paused]);
  return <div className="cursor-badge" ref={badge} aria-hidden="true">Veja os demais projetos <ArrowUpRight size={13} /></div>;
}

export default function PortfolioSite({ path }) {
  const [manualPaused, setManualPaused] = useState(false);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const paused = manualPaused || reduced;
  useEffect(() => { const media = matchMedia('(prefers-reduced-motion: reduce)'); const change = e => setReduced(e.matches); media.addEventListener('change', change); return () => media.removeEventListener('change', change); }, []);
  useEffect(() => { document.title = `${path === '/sobre' ? 'Sobre mim' : path.startsWith('/projetos') ? 'Projetos' : 'Product Designer & Diretora de Arte'} — Mari Mou`; }, [path]);
  return <MotionContext.Provider value={{ paused, setManualPaused }}><div className={`portfolio-site ${paused ? 'motion-paused' : ''}`}><a className="skip-link" href="#main-content">Pular para o conteúdo</a><Header path={path} />{path === '/' ? <main id="main-content"><Hero /><Brands /><ProjectMarquee /><Showcase /><Process /><AboutTeaser /></main> : path === '/sobre' ? <AboutPage /> : path === '/projetos' ? <ProjectsPage /> : path.startsWith('/projetos/') ? <ProjectDetail id={decodeURIComponent(path.split('/')[2])} /> : <NotFound />}<Footer /><CursorBadge paused={paused} /><button className="global-motion icon-button" title={paused ? 'Retomar animações' : 'Pausar animações'} aria-label={paused ? 'Retomar animações' : 'Pausar animações'} onClick={() => setManualPaused(!manualPaused)}>{paused ? <Play size={15} /> : <Pause size={15} />}</button></div></MotionContext.Provider>;
}
