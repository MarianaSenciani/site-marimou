import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { BubbleText } from '@/components/ui/bubble-text';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience } from './experience-context';
const ToolModel = lazy(() => import('./ToolModel'));

export function CharacterOrbit() {
  const { t } = useExperience();
  const paused = useMotionPaused();
  const [open, setOpen] = useState(false), [loaded, setLoaded] = useState(false), [tip, setTip] = useState<string | null>(null);
  const tipX = useMotionValue(0), tipY = useMotionValue(0);
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => { if (open) setLoaded(true); }, [open]);
  useEffect(() => () => clearTimeout(leaveTimer.current), []);
  const tools = [
    { id: 'claude', name: 'Claude', note: t('Ideação e estudo de problemas', 'Ideation and problem exploration', 'Ideación y estudio de problemas') },
    { id: 'figma', name: 'Figma', note: t('Criação e organização de componentes', 'Designing and organizing components', 'Creación y organización de componentes') },
    { id: 'creative-cloud', name: 'Creative Cloud', note: t('Criação e edição de materiais visuais', 'Creating and editing visual assets', 'Creación y edición de materiales visuales') },
    { id: 'github', name: 'GitHub', note: t('Versionamento e colaboração no código', 'Version control and code collaboration', 'Versionado y colaboración en código') },
    { id: 'cursor', name: 'Cursor', note: t('Prototipação e construção de interfaces', 'Prototyping and building interfaces', 'Prototipado y construcción de interfaces') },
  ];
  useEffect(() => { const hide = () => setTip(null); window.addEventListener('scroll', hide, { passive: true }); return () => window.removeEventListener('scroll', hide); }, []);
  const tooltip = (text: string, x: number, y: number) => { setTip(text); tipX.set(Math.max(10, Math.min(x + 16, innerWidth - 258))); tipY.set(Math.max(10, Math.min(y + 18, innerHeight - 95))); };
  return <div className={`character-orbit ${open ? 'is-exploring' : ''}`} onPointerEnter={e => { clearTimeout(leaveTimer.current); if (e.pointerType === 'mouse') setOpen(true); }}
    onPointerLeave={e => { if (e.pointerType === 'mouse') { leaveTimer.current = setTimeout(() => { setOpen(false); setTip(null); }, 180); } }}
    onFocus={e => { if (e.target.matches(':focus-visible')) setOpen(true); }} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) { setOpen(false); setTip(null); } }}>
    <div className="character-halo" aria-hidden="true" />
    <motion.button className="character-trigger" aria-expanded={open} aria-label={t('Explorar minhas ferramentas', 'Explore my tools', 'Explorar mis herramientas')}
      onClick={() => { setOpen(true); setTip(null); }} animate={paused ? {} : { rotate: open ? -3 : 0, y: open ? -7 : 0 }} transition={{ type: 'spring', stiffness: 150, damping: 15 }}>
      <img className="character-image" src="/assets/memoji-neutral.png" width="1086" height="1448" alt={t('Memoji da Mari, com cabelos vermelhos', 'Mari’s Memoji with red hair', 'Memoji de Mari con pelo rojo')} {...{ fetchpriority: 'high' }} />
    </motion.button>
    <div className="tools-orbit" {...(!open ? { inert: '' } : {})} aria-hidden={!open}>
      {tools.map((tool, i) => <motion.button key={tool.id} type="button" className={`orbit-tool orbit-tool-${i}`} tabIndex={open ? 0 : -1}
        initial={false} animate={{ opacity: open ? 1 : 0, scale: open ? 1 : .65, y: open ? 0 : 14 }} transition={{ duration: paused ? 0 : .3, delay: open && !paused ? i * .04 : 0 }}
        aria-label={`${tool.name}: ${tool.note}`} onPointerEnter={e => tooltip(`${tool.name} — ${tool.note}`, e.clientX, e.clientY)}
        onPointerMove={e => { if (e.pointerType !== 'touch') tooltip(`${tool.name} — ${tool.note}`, e.clientX, e.clientY); }}
        onPointerLeave={() => setTip(null)} onFocus={e => { const rect = e.currentTarget.getBoundingClientRect(); tooltip(`${tool.name} — ${tool.note}`, rect.left, rect.bottom); }}
        onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); tooltip(`${tool.name} — ${tool.note}`, rect.left, rect.bottom); }}>
        {loaded && tool.id === 'github' ? <Suspense fallback={<span className="tool-model">GH</span>}><ToolModel name={tool.id} paused={paused} active={open} /></Suspense> : tool.id === 'github' ? <span className="tool-model">GH</span> : <img src={`/assets/${tool.id}.png`} alt="" width="120" height="120" />}
        <small>{tool.name}</small>
      </motion.button>)}
    </div>
    {tip && createPortal(<motion.div role="tooltip" className="mari-tool-tip" style={{ left: tipX, top: tipY }}>{tip}</motion.div>, document.body)}
  </div>;
}

export function HeroExperience({ onVisibility }: { onVisibility: (visible: boolean) => void }) {
  const { hero, t, lang } = useExperience(), paused = useMotionPaused();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => onVisibility(entry.isIntersecting), { threshold: 0 }); if (ref.current) observer.observe(ref.current); return () => observer.disconnect(); }, [onVisibility, hero, lang]);
  const role = 'Product Designer & Product Owner';
  return <section ref={ref} className={`experience-hero hero-option-${hero} wrap`} aria-labelledby="hero-heading" key={`${hero}-${lang}`}>
    {hero === 1 && <>
      <div className="hero-editorial-copy"><p className="hero-role">{role}</p><WordPullUp id="hero-heading" paused={paused} words={t('Oi, sou a Mari.', 'Hi, I’m Mari.', 'Hola, soy Mari.')} /><p className="hero-editorial-role">{t('Transformo perguntas em caminhos para produtos digitais.', 'I turn questions into paths for digital products.', 'Convierto preguntas en caminos para productos digitales.')}</p></div>
      <div className="hero-character-block"><CharacterOrbit /></div>
      <div className="hero-editorial-aside"><span className="hero-aside-index">01 / {t('Sobre meu trabalho','About my work','Sobre mi trabajo')}</span><p>{t('Atuo entre pesquisa, experiência e decisões de produto. Gosto de entender o contexto, construir com o time e aprender com o uso.', 'I work across research, experience, and product decisions. I learn the context, build with the team, and improve with real use.', 'Trabajo entre investigación, experiencia y decisiones de producto. Entiendo el contexto, construyo con el equipo y aprendo del uso.')}</p><a className="pill primary" href="#projetos">{t('Ver projetos','View projects','Ver proyectos')}<ArrowUpRight size={18}/></a><a className="text-link" href="/sobre">{t('Minha trajetória','My journey','Mi trayectoria')}<ArrowUpRight size={16}/></a></div>
      <a className="hero-scroll-cue" href="#faixas" aria-label={t('Continuar explorando o portfólio','Continue exploring the portfolio','Seguir explorando el portafolio')}><span>{t('Continue explorando','Keep exploring','Sigue explorando')}</span><ArrowDown size={17}/></a>
    </>}
    {hero === 2 && <>
      <div className="hero-decision-top"><span>Mariana Senciani / {role}</span><span>02 / {t('Decisões de produto','Product decisions','Decisiones de producto')}</span></div>
      <div className="hero-decision-stage"><div className="decision-character-frame"><CharacterOrbit/></div><div className="hero-decision-note"><p className="hero-role">{t('Do problema ao próximo passo','From the problem to the next step','Del problema al siguiente paso')}</p><WordPullUp id="hero-heading" paused={paused} words={t('Entre a ideia e o produto, existe uma decisão importante.', 'Between an idea and a product, there is a decision to make.', 'Entre una idea y un producto, hay una decisión importante.')} /><p>{t('É nesse ponto que eu atuo: conecto pesquisa, experiência e prioridades de negócio para o time saber o que vale construir agora.', 'That is where I work: connecting research, experience, and business priorities so the team knows what is worth building now.', 'Ahí es donde trabajo: conecto investigación, experiencia y prioridades de negocio para decidir qué vale construir ahora.')}</p><a className="text-link" href="#projetos">{t('Veja como isso aparece nos projetos', 'See this in my projects', 'Mira cómo se refleja en mis proyectos')}<ArrowDown size={17} /></a></div></div>
      <div className="decision-path">{[t('Escutar o contexto', 'Listen to the context', 'Escuchar el contexto'), t('Escolher o foco', 'Choose a focus', 'Elegir el foco'), t('Aprender com a entrega', 'Learn from delivery', 'Aprender de la entrega')].map((text, i) => <div key={text}><span>0{i + 1}</span>{text}<ArrowUpRight size={17} /></div>)}</div>
    </>}
    {hero === 3 && <>
      <div className="hero-profile-copy"><p className="hero-role">{role}</p><WordPullUp id="hero-heading" className="profile-name" paused={paused} words="Mariana Senciani." /><BubbleText paused={paused} className="profile-statement" text={role} />
        <p className="hero-lead">{t('Trabalho com pesquisa, experiência digital e gestão de produto para tirar ideias do papel e evoluir o que já existe.', 'I work across research, digital experience, and product management to bring ideas to life and improve what already exists.', 'Trabajo con investigación, experiencia digital y gestión de producto para dar vida a ideas y mejorar lo que ya existe.')}</p><div className="hero-profile-actions"><a href="#projetos" className="pill primary">{t('Ver projetos', 'View projects', 'Ver proyectos')}<ArrowUpRight size={18} /></a><a href="#contato" className="text-link">{t('Falar comigo', 'Let’s talk', 'Hablemos')}<ArrowUpRight size={17} /></a></div></div>
      <div className="hero-profile-card"><CharacterOrbit /><dl><div><dt>{t('O que faço', 'What I do', 'Qué hago')}</dt><dd>{t('Pesquisa, estratégia e interfaces', 'Research, strategy, and interfaces', 'Investigación, estrategia e interfaces')}</dd></div><div><dt>{t('Como atuo', 'How I work', 'Cómo trabajo')}</dt><dd>{t('Do diagnóstico à entrega com o time', 'From diagnosis to delivery with the team', 'Del diagnóstico a la entrega con el equipo')}</dd></div><div><dt>{t('Onde aplicar','Where it fits','Dónde aplicarlo')}</dt><dd>{t('Produtos digitais, sistemas e web','Digital products, systems and web','Productos digitales, sistemas y web')}</dd></div></dl></div>
    </>}
  </section>;
}

export function RibbonTransition() {
  const { t } = useExperience(), paused = useMotionPaused();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const brandsY = useTransform(scrollYProgress, [0, 1], [32, -48]);
  const processY = useTransform(scrollYProgress, [0, 1], [-18, 54]);
  return <section id="faixas" ref={ref} className="experience-ribbons" aria-label={t('Processo e marcas da trajetória', 'Process and brands from my journey', 'Proceso y marcas de mi trayectoria')}>
    {[['LWSA', 'Locaweb', 'Sicredi', 'Smartleader', 'Pryon Cash', 'LIVO'], t('Entender · Decidir · Construir · Aprender', 'Understand · Decide · Build · Learn', 'Entender · Decidir · Construir · Aprender').split(' · ')].map((items, row) => <motion.div className={`experience-ribbon ribbon-${row}`} style={paused ? undefined : { y: row === 0 ? brandsY : processY, rotate: row === 0 ? -2 : 2 }} key={row}><div className="experience-ribbon-track">{[0, 1, 2, 3].map(copy => <div className="experience-ribbon-group" key={copy} aria-hidden={copy > 0}>{items.map(item => <span key={item}>{item}<i aria-hidden="true">✳</i></span>)}</div>)}</div></motion.div>)}
  </section>;
}
