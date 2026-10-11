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
      onClick={() => { setOpen(true); setTip(null); }} animate={paused ? {} : { rotate: open ? -2 : 0, scale: open ? 1.015 : 1 }} transition={{ type: 'spring', stiffness: 150, damping: 18 }}>
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
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => onVisibility(entry.isIntersecting && entry.intersectionRatio > .01), { threshold: [0, .01] }); if (ref.current) observer.observe(ref.current); return () => observer.disconnect(); }, [onVisibility, hero, lang]);
  const role = 'Product Designer & Product Owner';
  return <section ref={ref} className={`experience-hero hero-option-${hero} wrap`} aria-labelledby="hero-heading" key={`${hero}-${lang}`}>
    {hero === 1 && <>
      <WordPullUp id="hero-heading" className="hero-first-title" paused={paused} words={t('OI, SOU A MARI', 'HI, I’M MARI', 'HOLA, SOY MARI')} />
      <div className="hero-first-stage">
        <motion.div className="hero-first-intro hero-first-side" initial={paused ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .45 }}>
          <p className="hero-first-role">Product Designer <span>&amp;</span><br/>Product Owner.</p>
          <p className="hero-first-description">{t('Conecto pesquisa, design e visão de produto para criar experiências digitais que fazem sentido para as pessoas.', 'I connect research, design, and product thinking to create digital experiences that make sense to people.', 'Conecto investigación, diseño y visión de producto para crear experiencias digitales que tengan sentido para las personas.')}</p>
        </motion.div>
        <div className="hero-character-block"><CharacterOrbit /></div>
        <motion.div className="hero-first-action hero-first-side" initial={paused ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .58 }}>
          <p className="hero-first-prompt">{t('Conheça as ', 'Explore the ', 'Conoce las ')}<span className="decision-word">{t('decisões', 'decisions', 'decisiones')}</span>{t(' por trás dos projetos.', ' behind the projects.', ' detrás de los proyectos.')}</p>
          <a className="pill primary hero-first-project-link" href="#explorar">{t('Explorar projetos', 'Explore projects', 'Explorar proyectos')}<ArrowUpRight size={17} aria-hidden="true" /></a>
        </motion.div>
      </div>
    </>}
    {hero === 2 && <>
      <div className="hero-decision-top"><span>Mariana Senciani / {role}</span><span>02 / {t('Decisões de produto','Product decisions','Decisiones de producto')}</span></div>
      <div className="hero-decision-stage"><div className="decision-character-frame"><CharacterOrbit/></div><div className="hero-decision-note"><p className="hero-role">{t('Do problema ao próximo passo','From the problem to the next step','Del problema al siguiente paso')}</p><WordPullUp id="hero-heading" paused={paused} words={t('Entre a ideia e o produto, existe uma decisão importante.', 'Between an idea and a product, there is a decision to make.', 'Entre una idea y un producto, hay una decisión importante.')} /><p>{t('É nesse ponto que eu atuo: conecto pesquisa, experiência e prioridades de negócio para o time saber o que vale construir agora.', 'That is where I work: connecting research, experience, and business priorities so the team knows what is worth building now.', 'Ahí es donde trabajo: conecto investigación, experiencia y prioridades de negocio para decidir qué vale construir ahora.')}</p><a className="pill primary" href="#explorar">{t('Veja como isso aparece nos projetos', 'See this in my projects', 'Mira cómo se refleja en mis proyectos')}<ArrowDown size={17} /></a></div></div>
      <div className="decision-path">{[t('Escutar o contexto', 'Listen to the context', 'Escuchar el contexto'), t('Escolher o foco', 'Choose a focus', 'Elegir el foco'), t('Aprender com a entrega', 'Learn from delivery', 'Aprender de la entrega')].map((text, i) => <div key={text}><span>0{i + 1}</span>{text}<ArrowUpRight size={17} /></div>)}</div>
    </>}
    {hero === 3 && <>
      <div className="hero-profile-copy"><p className="hero-role">{role}</p><WordPullUp id="hero-heading" className="profile-name" paused={paused} words="Mariana Senciani." /><BubbleText paused={paused} className="profile-statement" text={role} />
        <p className="hero-lead">{t('Trabalho com pesquisa, experiência digital e gestão de produto para tirar ideias do papel e evoluir o que já existe.', 'I work across research, digital experience, and product management to bring ideas to life and improve what already exists.', 'Trabajo con investigación, experiencia digital y gestión de producto para dar vida a ideas y mejorar lo que ya existe.')}</p><div className="hero-profile-actions"><a href="#explorar" className="pill primary">{t('Ver projetos', 'View projects', 'Ver proyectos')}<ArrowUpRight size={18} /></a><a href="#contato" className="pill primary">{t('Falar comigo', 'Let’s talk', 'Hablemos')}<ArrowUpRight size={17} /></a></div></div>
      <div className="hero-profile-card"><CharacterOrbit /><dl><div><dt>{t('O que faço', 'What I do', 'Qué hago')}</dt><dd>{t('Pesquisa, estratégia e interfaces', 'Research, strategy, and interfaces', 'Investigación, estrategia e interfaces')}</dd></div><div><dt>{t('Como atuo', 'How I work', 'Cómo trabajo')}</dt><dd>{t('Do diagnóstico à entrega com o time', 'From diagnosis to delivery with the team', 'Del diagnóstico a la entrega con el equipo')}</dd></div><div><dt>{t('Onde aplicar','Where it fits','Dónde aplicarlo')}</dt><dd>{t('Produtos digitais, sistemas e web','Digital products, systems and web','Productos digitales, sistemas y web')}</dd></div></dl></div>
    </>}
  </section>;
}

export function RibbonTransition() {
  const { t } = useExperience(), paused = useMotionPaused();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const brandsY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const processY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  return <section id="faixas" ref={ref} className="experience-ribbons" aria-label={t('Processo e marcas da trajetória', 'Process and brands from my journey', 'Proceso y marcas de mi trayectoria')}>
    {[['LWSA', 'Locaweb', 'Sicredi', 'Smartleader', 'Pryon Cash', 'LIVO'], t('Entender · Decidir · Construir · Aprender', 'Understand · Decide · Build · Learn', 'Entender · Decidir · Construir · Aprender').split(' · ')].map((items, row) => <motion.div className={`experience-ribbon ribbon-${row}`} style={paused ? undefined : { y: row === 0 ? brandsY : processY, rotate: row === 0 ? -1.2 : 1.2 }} key={row}><div className="experience-ribbon-track">{[0, 1, 2, 3].map(copy => <div className="experience-ribbon-group" key={copy} aria-hidden={copy > 0}>{items.map(item => <span key={item}>{item}<i aria-hidden="true">✳</i></span>)}</div>)}</div></motion.div>)}
  </section>;
}
