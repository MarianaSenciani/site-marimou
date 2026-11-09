import { AndroidStatus } from './AndroidStatus';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { animate, motion, useInView, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, MessageCircle, Rocket } from 'lucide-react';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { useMotionPaused } from '@/components/ui/motion-context';
import { Reveal } from '@/components/ui/reveal';
import './sicredi-case.css';
import { CaseHero, CaseOverview, CaseReading } from './CaseLayout';
import { useExperience } from './experience-context';

type Translate = (pt: string, en: string, es: string) => string;

const mediaRoot = '/assets/cases/sicredi/';
const htmlLangs = { pt: 'pt-BR', en: 'en', es: 'es' } as const;
const getUsageNote = (t: Translate) => t(
  'Dados posteriores de uso, jan–jun/2025, considerando PJ, Agro e Cuiabá. Somatório sem deduplicação entre URLs.',
  'Later usage data, Jan–Jun/2025, covering PJ, Agro, and Cuiabá. Sum without deduplication across URLs.',
  'Datos posteriores de uso, ene–jun/2025, considerando PJ, Agro y Cuiabá. Suma sin deduplicación entre URLs.',
);
const getMetrics = (t: Translate) => [
  { value: 260, prefix: '+', suffix: t(' mil', 'K', ' mil'), label: t('sessões registradas', 'recorded sessions', 'sesiones registradas') },
  { value: 96, prefix: '≈', suffix: '%', label: t('acessos mobile', 'mobile access', 'accesos mobile') },
  { value: 592, prefix: '', suffix: '', label: t('sessões com ação de contato', 'sessions with a contact action', 'sesiones con acción de contacto') },
];
type MetricData = ReturnType<typeof getMetrics>[number];
const getPhases = (t: Translate) => [
  {
    title: t('Pesquisa e síntese', 'Research and synthesis', 'Investigación y síntesis'),
    description: t('Coleta, leitura dos padrões e definição do caminho.', 'Data collection, reading the patterns, and defining the path.', 'Recolección de datos, lectura de los patrones y definición del camino.'),
    steps: [
      t('Planejamento da pesquisa', 'Research planning', 'Planificación de la investigación'),
      t('Roteiro de entrevistas', 'Interview script', 'Guion de entrevistas'),
      t('Entrevistas', 'Interviews', 'Entrevistas'),
      t('Síntese dos dados', 'Data synthesis', 'Síntesis de los datos'),
      t('Personas + jornada', 'Personas + journey', 'Personas + journey'),
    ],
  },
  {
    title: t('Estrutura e design', 'Structure and design', 'Estructura y diseño'),
    description: t('Definição do canal, arquitetura e construção das experiências.', 'Defining the channel, the architecture, and building the experiences.', 'Definición del canal, la arquitectura y construcción de las experiencias.'),
    steps: [
      t('Decisão de canal', 'Channel decision', 'Decisión de canal'),
      t('Arquitetura + storytelling', 'Architecture + storytelling', 'Arquitectura + storytelling'),
      t('UI Design', 'UI Design', 'UI Design'),
      t('Quatro landing pages', 'Four landing pages', 'Cuatro landing pages'),
      t('Handoff com tecnologia', 'Handoff with tech', 'Handoff con tecnología'),
    ],
  },
  {
    title: t('Acompanhamento', 'Monitoring', 'Seguimiento'),
    description: t('Leitura do comportamento e ajustes contínuos.', 'Reading behavior and making continuous adjustments.', 'Lectura del comportamiento y ajustes continuos.'),
    steps: [
      t('Publicação', 'Launch', 'Publicación'),
      t('Monitoramento', 'Monitoring', 'Monitoreo'),
      t('Leitura de comportamento', 'Behavior analysis', 'Lectura de comportamiento'),
      t('Ajustes e acompanhamento', 'Adjustments and follow-up', 'Ajustes y seguimiento'),
    ],
  },
];
const getArchitecture = (t: Translate) => [
  [t('Atração', 'Attraction', 'Atracción'), t('Logo no início, a pessoa precisava entender o que estava sendo oferecido e identificar rapidamente as ações disponíveis.', 'Right at the start, people needed to understand what was being offered and quickly identify the available actions.', 'Desde el inicio, la persona necesitaba entender qué se estaba ofreciendo e identificar rápidamente las acciones disponibles.')],
  [t('Benefícios', 'Benefits', 'Beneficios'), t('Os principais diferenciais aparecem em blocos curtos e escaneáveis.', 'The main differentiators appear in short, scannable blocks.', 'Los principales diferenciales aparecen en bloques cortos y fáciles de escanear.')],
  [t('Interatividade', 'Interactivity', 'Interactividad'), t('Acordeões e FAQ permitem aprofundar apenas o conteúdo necessário.', 'Accordions and FAQs let people dive deeper into only the content they need.', 'Los acordeones y las preguntas frecuentes permiten profundizar solo en el contenido necesario.')],
  [t('Próximo passo', 'Next step', 'Próximo paso'), t('Depois de entender a oferta, a pessoa segue para abertura de conta ou WhatsApp.', 'After understanding the offer, people move on to opening an account or WhatsApp.', 'Después de entender la oferta, la persona sigue hacia la apertura de cuenta o WhatsApp.')],
];
const getCampaigns = (t: Translate) => [
  { id: 'pj', name: 'PJ', description: t('Estrutura-base', 'Base structure', 'Estructura base'), body: t('Informação financeira para pequenos e médios empreendedores.', 'Financial information for small and medium business owners.', 'Información financiera para pequeños y medianos emprendedores.'), accent: '#b9c999' },
  { id: 'agro', name: 'Agro', description: t('Estrutura-base', 'Base structure', 'Estructura base'), body: t('A mesma lógica de conteúdo, no contexto do produtor rural.', 'The same content logic, in the context of the rural producer.', 'La misma lógica de contenido, en el contexto del productor rural.'), accent: '#9fc1b7' },
  { id: 'amazonas', name: 'Amazonas', description: t('Adaptação expressiva', 'Expressive adaptation', 'Adaptación expresiva'), body: t('A lógica de conteúdo adaptada ao contexto esportivo.', 'The content logic adapted to the sports context.', 'La lógica de contenido adaptada al contexto deportivo.'), accent: '#cbbb93' },
  { id: 'cuiaba', name: 'Cuiabá', description: t('Adaptação expressiva', 'Expressive adaptation', 'Adaptación expresiva'), body: t('Mais liberdade visual para acompanhar o contexto do clube.', 'More visual freedom to match the club\'s context.', 'Más libertad visual para acompañar el contexto del club.'), accent: '#b7d69b' },
];
const getChapters = (t: Translate) => [
  [t('Roadmap', 'Roadmap', 'Roadmap'), 'sc-roadmap'],
  [t('Pesquisa', 'Research', 'Investigación'), 'sc-pesquisa'],
  [t('Estratégia', 'Strategy', 'Estrategia'), 'sc-estrategia'],
  [t('Estrutura', 'Structure', 'Estructura'), 'sc-estrutura'],
  [t('Campanhas', 'Campaigns', 'Campañas'), 'sc-campanhas'],
  [t('Impacto', 'Impact', 'Impacto'), 'sc-impacto'],
] as const;

function ChapterTitle({ children, id }: { children: string; id?: string }) {
  return <WordPullUp as="h2" id={id} words={children} paused={useMotionPaused()} className="sc-title" />;
}

function SectionLead({ children, className = '' }: { children: ReactNode; className?: string }) {
  const paused = useMotionPaused();
  return <motion.p className={`sc-lead ${className}`} initial={paused ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .45 }} transition={{ duration: paused ? 0 : .65, delay: paused ? 0 : .12, ease: [.22, 1, .36, 1] }}>{children}</motion.p>;
}

function Metric({ metric, index = 0 }: { metric: MetricData; index?: number }) {
  const ref = useRef<HTMLDivElement>(null), visible = useInView(ref, { once: true, amount: .9 });
  const paused = useMotionPaused(), [number, setNumber] = useState(paused ? metric.value : 0);
  useEffect(() => {
    if (paused) { setNumber(metric.value); return; }
    if (!visible) return;
    setNumber(0);
    const controls = animate(0, metric.value, { duration: 1.45, delay: index * .14, ease: 'easeOut', onUpdate: value => setNumber(Math.round(value)) });
    return () => controls.stop();
  }, [visible, paused, metric.value, index]);
  return <motion.div ref={ref} className="sc-metric" initial={paused ? false : { opacity: 0, y: 22 }} animate={visible || paused ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} transition={{ duration: paused ? 0 : .55, delay: paused ? 0 : index * .1 }}><strong aria-label={`${metric.prefix}${metric.value}${metric.suffix}`}><span aria-hidden="true"><span>{metric.prefix}{number}</span>{metric.suffix && <small>{metric.suffix}</small>}</span></strong><span>{metric.label}</span></motion.div>;
}

/** Load media near its scene, and stop playback outside it or when motion is paused. */
function CaseVideo({ campaign, device, eager = false, playOnHover = false }: { campaign: string; device: 'desktop' | 'mobile'; eager?: boolean; playOnHover?: boolean }) {
  const { t } = useExperience();
  const ref = useRef<HTMLDivElement>(null), video = useRef<HTMLVideoElement>(null);
  const near = useInView(ref, { margin: '250px 0px' }), visible = useInView(ref, { amount: .12 });
  const paused = useMotionPaused(), [loaded, setLoaded] = useState(eager), [failed, setFailed] = useState(false), [active, setActive] = useState(false);
  useEffect(() => { if (near) setLoaded(true); }, [near]);
  useEffect(() => {
    const playback = () => {
      if (!video.current) return;
      if (visible && !paused && !document.hidden && (!playOnHover || active)) void video.current.play().catch(() => { /* Poster remains visible if autoplay is unavailable. */ });
      else video.current.pause();
    };
    playback(); document.addEventListener('visibilitychange', playback);
    return () => { document.removeEventListener('visibilitychange', playback); video.current?.pause(); };
  }, [visible, paused, loaded, campaign, device, playOnHover, active]);
  return <div ref={ref} className={`sc-media-screen sc-media-${device} ${active ? 'is-playing' : ''}`} tabIndex={playOnHover ? 0 : undefined} onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)} onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
    {failed || !loaded ? <img loading="lazy" src={`${mediaRoot}${campaign}-${device}.png`} alt={t(`Landing page ${campaign}, versão ${device}`, `${campaign} landing page, ${device} version`, `Landing page ${campaign}, versión ${device}`)} /> : <video ref={video} src={`${mediaRoot}${campaign}-${device}.mp4`} poster={`${mediaRoot}${campaign}-${device}.png`} muted loop playsInline autoPlay={!paused && visible && (!playOnHover || active)} preload="metadata" aria-label={t(`Gravação da landing page ${campaign}, versão ${device}`, `Recording of the ${campaign} landing page, ${device} version`, `Grabación de la landing page ${campaign}, versión ${device}`)} onError={() => setFailed(true)} />}
  </div>;
}

function Phone({ campaign, className = '', variant = 'default', playOnHover = false }: { campaign: string; className?: string; variant?: 'default' | 'android'; playOnHover?: boolean }) {
  // No external phone frame was supplied. This CSS shell preserves the entire recorded viewport.
  return <div className={`sc-phone sc-phone-${variant} ${className}`}><AndroidStatus /><CaseVideo campaign={campaign} device="mobile" playOnHover={playOnHover} /><span className="sc-phone-home" aria-hidden="true" /></div>;
}

/** Single desktop frame (dark Safari-style) shared by every desktop mockup in the case. */
function BrowserFrame({ children, className = '', label = 'Sicredi · landing page' }: { children: ReactNode; className?: string; label?: string }) {
  return <div className={`sc-browser ${className}`}><div className="sc-browser-bar" aria-hidden="true"><span className="sc-safari-controls"><i/><i/><i/></span><span className="sc-safari-navigation">‹　›</span><span className="sc-safari-address">{label}</span><span className="sc-safari-actions">↗　＋</span></div>{children}</div>;
}

function HeroVisual() {
  const { t } = useExperience();
  const ref = useRef<HTMLDivElement>(null), paused = useMotionPaused();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [22, -22]), phoneY = useTransform(scrollYProgress, [0, 1], [40, -38]);
  return <div ref={ref} className="sc-hero-art" aria-label={t('Composição das experiências Sicredi em desktop e mobile', 'Composition of the Sicredi experiences on desktop and mobile', 'Composición de las experiencias de Sicredi en desktop y mobile')}>
    <motion.div className="sc-hero-desktop" style={{ y: paused ? 0 : y }}><BrowserFrame className="sc-hero-browser"><CaseVideo campaign="pj" device="desktop" eager /></BrowserFrame></motion.div>
    <motion.div className="sc-hero-phone" style={{ y: paused ? 0 : phoneY }}><Phone campaign="agro" variant="android" /></motion.div>
  </div>;
}

/** A single scroll timeline per sticky scene; state changes only at chapter boundaries. */
function useScene(count: number) {
  const ref = useRef<HTMLDivElement>(null), [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', progress => setActive(Math.min(count - 1, Math.max(0, Math.floor(progress * count)))));
  return { ref, active, setActive, progress: scrollYProgress };
}

function Roadmap() {
  const { t } = useExperience();
  const phases = getPhases(t);
  const ref = useRef<HTMLElement>(null), paused = useMotionPaused();
  // Pinned scene: month 1 on entry, month 2 on the second scroll step, month 3 on the third; then the page releases.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const lineProgress = useTransform(scrollYProgress, [0, .78], [0, 1]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', progress => setActive(progress >= .72 ? 2 : progress >= .34 ? 1 : 0));
  return <section ref={ref} id="sc-roadmap" className={`sc-roadmap ${paused ? 'sc-still' : ''}`}><div className="sc-roadmap-sticky"><div className="wrap">
    <SectionLead>{t('O primeiro mês foi dedicado a entender o comportamento das pessoas. No segundo, transformamos os aprendizados em páginas e colocamos a solução no ar. O terceiro ficou voltado para acompanhar o uso e ajustar o que fosse necessário.', 'The first month was dedicated to understanding people\'s behavior. In the second, we turned what we learned into pages and put the solution live. The third focused on monitoring usage and adjusting whatever was needed.', 'El primer mes se dedicó a entender el comportamiento de las personas. En el segundo, transformamos los aprendizajes en páginas y pusimos la solución en línea. El tercero se enfocó en acompañar el uso y ajustar lo que fuera necesario.')}</SectionLead>
    <div className="sc-roadmap-track">
      <div className="sc-roadmap-line" aria-hidden="true"><motion.div style={{ scaleX: paused ? 1 : lineProgress }} /></div>
      <div className="sc-months">{phases.map((phase, i) => <motion.article key={i} className={`${active === i ? 'is-active' : ''} ${active > i ? 'is-complete' : ''}`} initial={paused ? false : { opacity: .18, y: 28 }} animate={{ opacity: paused || active >= i ? 1 : .18, y: paused || active >= i ? 0 : 28 }} transition={{ duration: paused ? 0 : .55, ease: [.22, 1, .36, 1] }}>
        <button onClick={() => setActive(i)} aria-pressed={active === i} aria-label={`${t('Mês', 'Month', 'Mes')} ${i + 1}: ${phase.title}`}><span className="sc-month-dot"/><span>{t('Mês', 'Month', 'Mes')} 0{i + 1}</span></button>
        <h3>{phase.title}</h3><p>{phase.description}</p><ol>{phase.steps.map((step, index) => <li key={index}><span>{step}</span>{index < phase.steps.length - 1 && <ArrowRight size={12} aria-hidden="true"/>}</li>)}</ol>
      </motion.article>)}</div>
    </div>
  </div></div></section>;
}

function PrincipleSection() {
  const { t } = useExperience();
  const ref = useRef<HTMLElement>(null), paused = useMotionPaused();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'center center'] });
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0, .72], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [.94, 1]);
  return <section ref={ref} className="sc-principle"><motion.div className="wrap" style={paused ? undefined : { y, opacity, scale }}><p>{t('A rede social continuaria importante para atrair.', 'Social media would still be important for attracting people.', 'La red social seguiría siendo importante para atraer.')}</p><ChapterTitle>{t('A explicação, porém, precisava acontecer em outro lugar.', 'The explanation, however, needed to happen somewhere else.', 'La explicación, sin embargo, necesitaba ocurrir en otro lugar.')}</ChapterTitle></motion.div></section>;
}

function Ending() {
  const { t } = useExperience();
  const paused = useMotionPaused();
  const item = (delay: number) => ({ initial: paused ? false as const : { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .6 }, transition: { duration: paused ? 0 : .6, delay: paused ? 0 : delay, ease: [.22, 1, .36, 1] as const } });
  return <div className="sc-ending"><motion.a href="/#contato" className="pill primary" {...item(.15)}>{t('Vamos construir algo juntos?', 'Shall we build something together?', '¿Construimos algo juntos?')}<ArrowUpRight size={17}/></motion.a><motion.a className="sc-next" href="/projetos/lwsa" {...item(.45)}>{t('Próximo case · LWSA', 'Next case · LWSA', 'Próximo caso · LWSA')}<ArrowUpRight size={19}/></motion.a></div>;
}

function Flow({ title, steps, emphasis = false }: { title: string; steps: string[]; emphasis?: boolean }) {
  const paused = useMotionPaused();
  return <div className={`sc-flow ${emphasis ? 'sc-flow-chosen' : ''}`}><motion.h3 initial={paused ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: paused ? 0 : .45 }}>{title}</motion.h3><ol>{steps.map((step, i) => <motion.li key={i} initial={paused ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: paused ? 0 : .45, delay: paused ? 0 : i * .09 }}><span>{step}</span>{i < steps.length - 1 && <ArrowDown size={15} aria-hidden="true"/>}</motion.li>)}</ol></div>;
}

function PageArchitecture() {
  const { t } = useExperience();
  const architecture = getArchitecture(t);
  const { ref, active, setActive } = useScene(4), paused = useMotionPaused();
  return <section id="sc-estrutura" className="sc-chapter sc-architecture wrap">
    <div ref={ref} className={`sc-architecture-scene ${paused ? 'sc-still' : ''}`}><div className="sc-architecture-sticky">
      <div className="sc-architecture-head"><ChapterTitle>{t('A estrutura seguia a forma como as pessoas diziam procurar informação.', 'The structure followed the way people said they looked for information.', 'La estructura seguía la forma en que las personas decían buscar información.')}</ChapterTitle>
      <SectionLead>{t('Nas entrevistas, um padrão apareceu com frequência: primeiro entender a proposta, depois descobrir o que era possível fazer e só então aprofundar os detalhes. A página foi organizada nessa mesma ordem.', 'In the interviews, one pattern came up often: first understand the proposal, then find out what could be done, and only then dive into the details. The page was organized in that same order.', 'En las entrevistas, apareció con frecuencia un patrón: primero entender la propuesta, luego descubrir qué era posible hacer y solo entonces profundizar en los detalles. La página se organizó en ese mismo orden.')}</SectionLead></div>
      <div className="sc-architecture-body">
      {/* Conceptual page anatomy, deliberately separate from the real screenshots. */}
      <BrowserFrame className="sc-anatomy" label={t('Estrutura da experiência', 'Experience structure', 'Estructura de la experiencia')}><div className="sc-anatomy-page">{architecture.map(([title], i) => <button key={i} onClick={() => setActive(i)} aria-pressed={active === i} className={`sc-anatomy-block sc-anatomy-${i} ${active === i ? 'is-active' : ''}`}>
        <span className="sc-anatomy-label">0{i + 1} · {title}</span>
        {i === 0 && <div className="sc-anatomy-hero"><div><i/><i/><b/></div><span>✳</span></div>}
        {i === 1 && <div className="sc-anatomy-benefits"><i/><i/><i/></div>}
        {i === 2 && <div className="sc-anatomy-faq"><span>{t('Produto e serviços', 'Product and services', 'Producto y servicios')} <b>+</b></span><span>{t('Dúvidas frequentes', 'Frequently asked questions', 'Preguntas frecuentes')} <b>+</b></span></div>}
        {i === 3 && <div className="sc-anatomy-action"><span>{t('Abrir conta', 'Open an account', 'Abrir cuenta')}</span><span>WhatsApp</span></div>}
      </button>)}</div></BrowserFrame>
      <div className="sc-architecture-copy"><div className="sc-stage-pips" role="group" aria-label={t('Etapas da estrutura', 'Structure stages', 'Etapas de la estructura')}>{architecture.map(([title], i) => <button key={i} aria-label={title} aria-pressed={i === active} onClick={() => setActive(i)}>0{i + 1}</button>)}</div>
        {architecture.map(([title, body], i) => <article key={i} className={active === i ? 'is-active' : ''}><span className="sc-stage-number">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}
        <span className="sc-scene-note">{t('A ordem do conteúdo faz parte da experiência.', 'The order of the content is part of the experience.', 'El orden del contenido es parte de la experiencia.')}</span>
      </div>
      </div>
    </div></div>
  </section>;
}

function CampaignGallery() {
  const { t } = useExperience();
  const campaigns = getCampaigns(t);
  const [active, setActive] = useState(0);
  const campaign = campaigns[active], paused = useMotionPaused();
  return <section id="sc-campanhas" className="sc-chapter sc-campaigns wrap">
    <ChapterTitle>{t('A mesma base, adaptada para quatro campanhas.', 'The same foundation, adapted for four campaigns.', 'La misma base, adaptada para cuatro campañas.')}</ChapterTitle>
    <SectionLead>{t('PJ e Agro usaram praticamente a mesma estrutura. Nas campanhas de Amazonas e Cuiabá, mantivemos a lógica de conteúdo, mas com mais liberdade visual para acompanhar o contexto esportivo.', 'PJ and Agro used practically the same structure. In the Amazonas and Cuiabá campaigns, we kept the content logic, but with more visual freedom to match the sports context.', 'PJ y Agro usaron prácticamente la misma estructura. En las campañas de Amazonas y Cuiabá, mantuvimos la lógica de contenido, pero con más libertad visual para acompañar el contexto deportivo.')}</SectionLead>
    <div className="sc-gallery-controls"><div className="sc-campaign-tabs" role="group" aria-label={t('Escolher campanha', 'Choose campaign', 'Elegir campaña')}>{campaigns.map((item, i) => <button key={item.id} aria-pressed={active === i} onClick={() => setActive(i)}>{item.name}<ArrowUpRight size={14}/></button>)}</div></div>
    <motion.div key={`stage-${campaign.id}`} initial={paused ? false : { opacity: .3, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: paused ? 0 : .5 }} className="sc-campaign-stage" style={{ '--campaign-accent': campaign.accent } as React.CSSProperties}>
      <div className="sc-campaign-info"><span>{campaign.description}</span><h3>{campaign.name}</h3><p>{campaign.body}</p><span className="sc-campaign-count">0{active + 1} / 04</span></div>
      {campaign.id === 'amazonas' ? <div className="sc-missing-art"><span aria-hidden="true">✳</span><strong>Amazonas</strong><p>{t('Visual da campanha a incluir.', 'Campaign visual to be added.', 'Visual de la campaña por incluir.')}</p>{/* ASSET PENDENTE: screenshots e gravações reais da LP Amazonas; não reutilizar outra campanha. */}</div> : <div className="sc-campaign-media">
        <BrowserFrame><CampaignScreenshot campaign={campaign.id}/></BrowserFrame>
        <div className="sc-campaign-secondary"><Phone campaign={campaign.id} variant="android" /></div>
      </div>}
    </motion.div>
  </section>;
}

function CampaignScreenshot({ campaign }: { campaign: string }) {
  const { t } = useExperience();
  const [position, setPosition] = useState(0), position_ = useRef(0), frame = useRef<HTMLDivElement>(null);
  const update = (value: number) => { position_.current = value; setPosition(value); };
  useEffect(() => { position_.current = 0; setPosition(0); }, [campaign]);
  useEffect(() => {
    const node = frame.current; if (!node) return;
    let raf = 0, dir = 1, last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const next = Math.max(0, Math.min(100, position_.current + dir * dt * 11));
      if (next >= 100) dir = -1;
      else if (next <= 0) dir = 1;
      update(next);
      raf = requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) { last = performance.now(); raf = requestAnimationFrame(tick); }
    }, { threshold: 0.25 });
    obs.observe(node);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, []);
  const move = (delta: number) => update(Math.max(0, Math.min(100, position_.current + delta)));
  return <div ref={frame} className="sc-campaign-screenshot" tabIndex={0} aria-label={t('Role dentro da tela para percorrer a landing page', 'Scroll inside the screen to browse the landing page', 'Desplázate dentro de la pantalla para recorrer la landing page')} onKeyDown={event => {
    if (event.key === 'ArrowDown') { event.preventDefault(); move(8); }
    if (event.key === 'ArrowUp') { event.preventDefault(); move(-8); }
  }}><motion.img loading="lazy" src={`${mediaRoot}${campaign}-desktop.png`} alt={t(`Detalhes da landing page ${campaign}. Role dentro da tela para percorrer o conteúdo.`, `Details of the ${campaign} landing page. Scroll inside the screen to browse the content.`, `Detalles de la landing page ${campaign}. Desplázate dentro de la pantalla para recorrer el contenido.`)} animate={{ objectPosition: `50% ${position}%` }} transition={{ duration: .25, ease: 'easeOut' }}/><span className="sc-screen-scroll-hint">{t('Scroll na tela', 'Scroll inside the screen', 'Scroll en la pantalla')}</span></div>;
}

function MobileScene() {
  const { t } = useExperience();
  const metrics = getMetrics(t);
  const mobileMetric = { ...metrics[1], label: t('acessos mobile, dados posteriores de uso — jan–jun/2025', 'mobile access, later usage data — Jan–Jun/2025', 'accesos mobile, datos posteriores de uso — ene–jun/2025') };
  return <section id="sc-mobile" className="sc-mobile-section sc-chapter wrap"><div className="sc-mobile-copy"><ChapterTitle>{t('O celular era o principal ponto de acesso.', 'The phone was the main point of access.', 'El celular era el principal punto de acceso.')}</ChapterTitle><SectionLead>{t('Nos dados posteriores do Clarity, cerca de 96% das sessões analisadas vieram de dispositivos móveis. Isso reforça por que a experiência precisava funcionar bem no celular desde o início.', 'In the later Clarity data, about 96% of the analyzed sessions came from mobile devices. This reinforces why the experience needed to work well on mobile from the start.', 'En los datos posteriores de Clarity, cerca del 96% de las sesiones analizadas provino de dispositivos móviles. Esto refuerza por qué la experiencia necesitaba funcionar bien en el celular desde el inicio.')}</SectionLead><Metric metric={mobileMetric}/></div><div className="sc-mobile-composition" aria-label={t('Três campanhas mobile; passe o mouse para reproduzir', 'Three mobile campaigns; hover to play', 'Tres campañas mobile; pasa el cursor para reproducir')}><Phone campaign="pj" variant="android" playOnHover /><Phone campaign="agro" variant="android" playOnHover /><Phone campaign="cuiaba" variant="android" playOnHover /></div></section>;
}

export function SicrediCase() {
  const { t, lang } = useExperience();
  const paused = useMotionPaused();
  const metrics = getMetrics(t), chapters = getChapters(t);
  const insights = [
    [t('Redes sociais eram vistas como entretenimento', 'Social media was seen as entertainment', 'Las redes sociales se veían como entretenimiento'), t('Quando o assunto era trabalho ou dinheiro, as pessoas diziam preferir outro tipo de ambiente para buscar informação.', 'When the subject was work or money, people said they preferred a different kind of environment to look for information.', 'Cuando el tema era trabajo o dinero, las personas decían preferir otro tipo de entorno para buscar información.')],
    [t('O conteúdo precisava ser fácil de consultar', 'The content needed to be easy to consult', 'El contenido tenía que ser fácil de consultar'), t('Um link podia ser salvo em uma conversa com o gerente, aberto de novo depois e compartilhado com outra pessoa.', 'A link could be saved in a conversation with the manager, opened again later, and shared with someone else.', 'Un enlace se podía guardar en una conversación con el gerente, volver a abrirse después y compartirse con otra persona.')],
    [t('A ordem da informação importava', 'The order of the information mattered', 'El orden de la información importaba'), t('Primeiro entender a oferta, depois ver o que era possível fazer e, só então, entrar nos detalhes.', 'First understand the offer, then see what could be done, and only then get into the details.', 'Primero entender la oferta, luego ver qué era posible hacer y, solo entonces, entrar en los detalles.')],
  ];
  const personas = [
    { name: 'Janice Souza', initials: 'JS', profile: t('PJ · pequeno e médio empreendedor', 'PJ · small and medium business owner', 'PJ · pequeño y mediano emprendedor'), body: t('Proprietária de uma loja de roupas e representante do perfil de pequeno e médio empreendedor que precisava entender crédito e serviços bancários sem depender de uma conversa longa com atendimento.', 'Owner of a clothing store and representative of the small and medium business owner profile who needed to understand credit and banking services without relying on a long conversation with customer service.', 'Propietaria de una tienda de ropa y representante del perfil de pequeño y mediano emprendedor que necesitaba entender el crédito y los servicios bancarios sin depender de una conversación larga con atención al cliente.'), needs: [t('Busca clareza sobre fluxo de caixa e crédito.', 'Looks for clarity about cash flow and credit.', 'Busca claridad sobre flujo de caja y crédito.'), t('Valoriza atendimento humano e especializado.', 'Values human, specialized service.', 'Valora la atención humana y especializada.'), t('Usa canais digitais, mas prefere informação objetiva e consultável.', 'Uses digital channels, but prefers objective information that is easy to consult.', 'Usa canales digitales, pero prefiere información objetiva y fácil de consultar.')] },
    { name: 'João Carlos', initials: 'JC', profile: t('Agro · produtor rural', 'Agro · rural producer', 'Agro · productor rural'), body: t('Produtor rural e representante de um público que precisava comparar opções financeiras ligadas ao ciclo agrícola, com pouco interesse em linguagem excessivamente técnica.', 'Rural producer and representative of an audience that needed to compare financial options tied to the agricultural cycle, with little interest in overly technical language.', 'Productor rural y representante de un público que necesitaba comparar opciones financieras ligadas al ciclo agrícola, con poco interés en un lenguaje excesivamente técnico.'), needs: [t('Procura crédito alinhado ao ciclo da produção.', 'Looks for credit aligned with the production cycle.', 'Busca crédito alineado con el ciclo de producción.'), t('Tem familiaridade digital moderada.', 'Has moderate digital familiarity.', 'Tiene una familiaridad digital moderada.'), t('Valoriza orientação próxima e informação direta.', 'Values close guidance and direct information.', 'Valora la orientación cercana y la información directa.')] },
  ];
  const iteration = [
    [t('Mudança', 'Change', 'Cambio'), t('Ajustes de conteúdo / estrutura solicitados pelo cliente.', 'Content / structure adjustments requested by the client.', 'Ajustes de contenido / estructura solicitados por el cliente.')],
    [t('Sinal', 'Signal', 'Señal'), t('Queda observada no tempo de leitura / retenção.', 'Drop observed in reading time / retention.', 'Caída observada en el tiempo de lectura / retención.')],
    [t('Hipótese', 'Hypothesis', 'Hipótesis'), t('A nova organização podia estar dificultando a leitura.', 'The new organization might have been making reading harder.', 'La nueva organización podía estar dificultando la lectura.')],
    [t('Iteração', 'Iteration', 'Iteración'), t('Reorganização do conteúdo e revisão dos textos.', 'Reorganization of the content and revision of the copy.', 'Reorganización del contenido y revisión de los textos.')],
    [t('Validação', 'Validation', 'Validación'), t('Os indicadores melhoraram depois dos ajustes.', 'The indicators improved after the adjustments.', 'Los indicadores mejoraron después de los ajustes.')],
  ];
  useLayoutEffect(() => {
    // Prevent the browser/Fast Refresh from restoring an obsolete position inside a changed sticky scene.
    if (window.location.hash) return;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const frame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previous;
    };
  }, []);
  useEffect(() => { document.title = t('Sicredi Centro-Norte · pesquisa e experiência digital — Mari Mou', 'Sicredi Centro-Norte · research and digital experience — Mari Mou', 'Sicredi Centro-Norte · investigación y experiencia digital — Mari Mou'); }, [lang]);
  return <main id="main-content" lang={htmlLangs[lang]} className={`sicredi-case project-case ${paused ? 'sc-motion-paused' : ''}`}>
    <CaseHero name={t('Sicredi Centro-Norte · 2024', 'Sicredi Centro-Norte · 2024', 'Sicredi Centro-Norte · 2024')} title={t('Como transformamos pesquisa de campo em uma experiência digital para o Sicredi Centro-Norte.', 'How we turned field research into a digital experience for Sicredi Centro-Norte.', 'Cómo transformamos la investigación de campo en una experiencia digital para Sicredi Centro-Norte.')} subtitle={t('Durante três meses, atuei como Product Designer no projeto. Começamos investigando como as pessoas da região buscavam informações financeiras e, a partir das entrevistas, mudamos a estratégia: em vez de concentrar tudo nas redes sociais, criamos landing pages dedicadas para cada campanha.', 'For three months, I worked as a Product Designer on the project. We started by investigating how people in the region looked for financial information and, based on the interviews, we changed the strategy: instead of concentrating everything on social media, we created dedicated landing pages for each campaign.', 'Durante tres meses, actué como Product Designer en el proyecto. Comenzamos investigando cómo las personas de la región buscaban información financiera y, a partir de las entrevistas, cambiamos la estrategia: en lugar de concentrar todo en las redes sociales, creamos landing pages dedicadas para cada campaña.')}
      highlights={<div className="sc-hero-metrics">{metrics.map((metric, i) => <Metric key={i} metric={metric} index={i}/>)}</div>}
      visual={<HeroVisual/>}/>
    <CaseOverview facts={[[ t('Meu papel', 'My role', 'Mi rol'), 'Product Designer' ], [ t('Período', 'Period', 'Período'), t('2024 · 3 meses', '2024 · 3 months', '2024 · 3 meses') ], [ t('Plataforma', 'Platform', 'Plataforma'), 'Web / Mobile' ], [ t('Escopo', 'Scope', 'Alcance'), t('Research, síntese, jornada, UI e otimização', 'Research, synthesis, journey, UI, and optimization', 'Research, síntesis, journey, UI y optimización') ]]}
      challenge={t('Descobrir qual formato funcionaria melhor para explicar produtos financeiros a um público com hábitos digitais diferentes dos que imaginávamos no início.', 'Discover which format would work best to explain financial products to an audience with digital habits different from what we imagined at the start.', 'Descubrir qué formato funcionaría mejor para explicar productos financieros a un público con hábitos digitales distintos de los que imaginábamos al inicio.')}
      contribution={t('Criei roteiro de entrevistas, participei da pesquisa, sintetizei dados, estruturei personas e jornada e fui responsável pelo design das quatro landing pages.', 'I created the interview script, took part in the research, synthesized data, structured personas and the journey, and was responsible for the design of the four landing pages.', 'Creé el guion de entrevistas, participé en la investigación, sinteticé datos, estructuré personas y journey, y fui responsable del diseño de las cuatro landing pages.')}
      approach={t('A pesquisa mostrou que a rede social funcionava melhor para atrair. A explicação precisava acontecer em uma página própria, com mais contexto e caminhos claros para continuar.', 'The research showed that social media worked best for attracting people. The explanation needed to happen on a page of its own, with more context and clear paths to continue.', 'La investigación mostró que la red social funcionaba mejor para atraer. La explicación necesitaba ocurrir en una página propia, con más contexto y caminos claros para continuar.')}/>
    <CaseReading chapters={chapters}>
    <Roadmap/>
    {/* DISCOVERY: evidence that changed the channel, not a methods checklist. */}
    <section id="sc-pesquisa" className="sc-chapter wrap"><div className="sc-initial-hypothesis"><Reveal><ChapterTitle>{t('No começo, a aposta era usar as redes sociais como principal canal.', 'At the beginning, the bet was to use social media as the main channel.', 'Al principio, la apuesta era usar las redes sociales como canal principal.')}</ChapterTitle><SectionLead>{t('O projeto começou junto aos times de design e mídia paga. A ideia era usar banners, posts e vídeos curtos para apresentar as ofertas e levar as pessoas direto para o atendimento.', 'The project started alongside the design and paid media teams. The idea was to use banners, posts, and short videos to present the offers and take people straight to customer service.', 'El proyecto comenzó junto con los equipos de diseño y medios pagados. La idea era usar banners, posts y videos cortos para presentar las ofertas y llevar a las personas directo a la atención.')}</SectionLead></Reveal><div className="sc-hypothesis-note"><MessageCircle size={27}/><p>{t('Esse mesmo canal também funcionaria para explicar produtos financeiros com mais detalhes?', 'Would that same channel also work to explain financial products in more detail?', '¿Ese mismo canal también funcionaría para explicar productos financieros con más detalle?')}</p></div></div><div className="sc-research-editorial"><Reveal className="sc-interview-count"><strong>150</strong><span>{t('entrevistas', 'interviews', 'entrevistas')}</span><ArrowDown size={25}/><p>{t('Clientes + colaboradores + pessoas da região', 'Customers + employees + people from the region', 'Clientes + colaboradores + personas de la región')}</p></Reveal><div><ChapterTitle>{t('As entrevistas mudaram o rumo do projeto.', 'The interviews changed the direction of the project.', 'Las entrevistas cambiaron el rumbo del proyecto.')}</ChapterTitle><SectionLead>{t('Falamos com cerca de 150 pessoas entre clientes, colaboradores do Sicredi e moradores da região, incluindo comerciantes, freelancers e pequenos empreendedores.', 'We spoke with about 150 people, including customers, Sicredi employees, and residents of the region, among them shopkeepers, freelancers, and small business owners.', 'Hablamos con cerca de 150 personas entre clientes, colaboradores de Sicredi y habitantes de la región, incluyendo comerciantes, freelancers y pequeños emprendedores.')}</SectionLead><div className="sc-insights">{insights.map(([title, body], i) => <Reveal key={i} delay={i * .07}><h3>{title}</h3><p>{body}</p></Reveal>)}</div></div></div>
      {/* Only summarized personas are public. Portraits were not supplied, so initials remain placeholders. */}
      <div className="sc-personas">{personas.map((person, i) => <Reveal key={person.initials} delay={i * .1} className="sc-persona"><div className="sc-persona-top"><span className="sc-persona-portrait" role="img" aria-label={t(`Retrato de ${person.name} a incluir`, `Portrait of ${person.name} to be added`, `Retrato de ${person.name} por incluir`)}>{person.initials}</span><div><span>{person.profile}</span><h3>{person.name}</h3><small>{t('Perfil sintetizado', 'Synthesized profile', 'Perfil sintetizado')}</small></div></div><p>{person.body}</p><ul>{person.needs.map((need, n) => <li key={n}>{need}</li>)}</ul></Reveal>)}</div>
    </section>
    <PrincipleSection/>
    {/* STRATEGY: compare experience choices, without inventing an experiment result. */}
    <section id="sc-estrategia" className="sc-chapter wrap"><ChapterTitle>{t('Foi daí que surgiu a ideia das landing pages.', 'That is where the idea of landing pages came from.', 'De ahí surgió la idea de las landing pages.')}</ChapterTitle><SectionLead>{t('Com esse aprendizado, passamos a trabalhar também com o time de tecnologia. A proposta foi criar páginas dedicadas para cada campanha, com contexto suficiente para a pessoa entender a oferta antes de falar com o atendimento.', 'With this learning, we also began working with the tech team. The proposal was to create dedicated pages for each campaign, with enough context for people to understand the offer before talking to customer service.', 'Con este aprendizaje, empezamos a trabajar también con el equipo de tecnología. La propuesta fue crear páginas dedicadas para cada campaña, con contexto suficiente para que la persona entendiera la oferta antes de hablar con atención al cliente.')}</SectionLead><div className="sc-flow-comparison"><Flow title={t('Hipótese inicial', 'Initial hypothesis', 'Hipótesis inicial')} steps={[t('Mídia / Social', 'Media / Social', 'Medios / Social'), t('Post ou vídeo', 'Post or video', 'Post o video'), 'WhatsApp', t('Bot genérico / dúvidas', 'Generic bot / questions', 'Bot genérico / dudas')]}/><ArrowRight className="sc-flow-arrow" aria-hidden="true"/><Flow title={t('Direção após o discovery', 'Direction after discovery', 'Dirección después del discovery')} emphasis steps={[t('Mídia paga', 'Paid media', 'Medios pagados'), t('Landing page dedicada', 'Dedicated landing page', 'Landing page dedicada'), t('Oferta + benefícios + FAQ', 'Offer + benefits + FAQ', 'Oferta + beneficios + FAQ'), t('Abrir conta / WhatsApp', 'Open an account / WhatsApp', 'Abrir cuenta / WhatsApp')]}/></div>
      <div className="sc-flow-test"><div><ChapterTitle>{t('A landing page passou a responder as dúvidas antes do WhatsApp.', 'The landing page started answering questions before WhatsApp.', 'La landing page pasó a responder las dudas antes del WhatsApp.')}</ChapterTitle><SectionLead>{t('Em vez de mandar a pessoa direto para um bot de triagem, a página explicava o produto, respondia dúvidas frequentes e deixava mais claro qual seria o próximo passo.', 'Instead of sending people straight to a triage bot, the page explained the product, answered frequently asked questions, and made the next step clearer.', 'En lugar de enviar a la persona directo a un bot de triaje, la página explicaba el producto, respondía preguntas frecuentes y dejaba más claro cuál sería el próximo paso.')}</SectionLead></div><div className="sc-flow-routes"><p><span>{t('Fluxo A', 'Flow A', 'Flujo A')}</span>{t('Anúncio → WhatsApp → Bot → dúvidas', 'Ad → WhatsApp → Bot → questions', 'Anuncio → WhatsApp → Bot → dudas')}</p><p><span>{t('Fluxo B', 'Flow B', 'Flujo B')}</span>{t('Anúncio → Landing page → oferta → benefícios → FAQ → abrir conta / WhatsApp', 'Ad → Landing page → offer → benefits → FAQ → open an account / WhatsApp', 'Anuncio → Landing page → oferta → beneficios → FAQ → abrir cuenta / WhatsApp')}</p><small>{t('Uma decisão de experiência: responder às dúvidas antes de chegar ao atendimento.', 'An experience decision: answer questions before people reach customer service.', 'Una decisión de experiencia: responder a las dudas antes de llegar a la atención.')}</small></div></div>
    </section>
    <PageArchitecture/><CampaignGallery/><MobileScene/>
    {/* ITERATION: show the decision sequence; private reports never enter the public assets. */}
    <section id="sc-acompanhamento" className="sc-chapter wrap"><ChapterTitle>{t('Os dados mostraram quando a estrutura precisava mudar.', 'The data showed when the structure needed to change.', 'Los datos mostraron cuándo la estructura necesitaba cambiar.')}</ChapterTitle><SectionLead>{t('Depois de algumas alterações pedidas pelo cliente, percebi uma queda no tempo de leitura. Revisei a estrutura da página com o time de redação, reorganizamos alguns trechos e acompanhei o comportamento depois da mudança. A nova versão foi mantida porque os dados melhoraram.', 'After some changes requested by the client, I noticed a drop in reading time. I reviewed the page structure with the copywriting team, we reorganized a few sections, and I monitored behavior after the change. The new version was kept because the data improved.', 'Después de algunos cambios pedidos por el cliente, noté una caída en el tiempo de lectura. Revisé la estructura de la página con el equipo de redacción, reorganizamos algunos fragmentos y seguí el comportamiento después del cambio. La nueva versión se mantuvo porque los datos mejoraron.')}</SectionLead><div className="sc-iteration">{iteration.map(([title, body], i) => <Reveal key={i} delay={i * .12}><span className="sc-iteration-dot"/><h3>{title}</h3><p>{body}</p>{i === 4 && <span className="sc-validation-launch" aria-hidden="true"><Rocket fill="currentColor"/></span>}</Reveal>)}</div></section>
    {/* IMPACT: later continuity of use, never claimed as 2024 conversion or unique users. */}
    <section id="sc-impacto" className="sc-impact sc-chapter"><div className="wrap"><ChapterTitle>{t('As páginas continuaram recebendo tráfego depois do projeto.', 'The pages kept receiving traffic after the project.', 'Las páginas siguieron recibiendo tráfico después del proyecto.')}</ChapterTitle><SectionLead>{t('Dados do Microsoft Clarity mostram que as páginas continuavam ativas e recebendo tráfego em 2025, um ano depois do trabalho original.', 'Microsoft Clarity data shows the pages were still active and receiving traffic in 2025, a year after the original work.', 'Los datos de Microsoft Clarity muestran que las páginas seguían activas y recibiendo tráfico en 2025, un año después del trabajo original.')}</SectionLead><div className="sc-impact-metrics">{metrics.map((metric, i) => <Metric key={i} metric={metric} index={i}/>)}</div><Reveal className="sc-impact-box" delay={.1}><span>{t('Período e fonte', 'Period and source', 'Período y fuente')}</span><p>{getUsageNote(t)}</p></Reveal></div></section>
    <section className="sc-reflection sc-chapter wrap"><ChapterTitle>{t('O que eu levo desse projeto', 'What I take away from this project', 'Lo que me llevo de este proyecto')}</ChapterTitle><SectionLead>{t('Esse projeto me mostrou, na prática, que o trabalho de Product Design pode começar antes da primeira tela. Aqui, a principal decisão foi entender onde a informação deveria estar e como ela deveria ser apresentada para aquele público.', 'This project showed me, in practice, that Product Design work can begin before the first screen. Here, the main decision was understanding where the information should live and how it should be presented to that audience.', 'Este proyecto me mostró, en la práctica, que el trabajo de Product Design puede comenzar antes de la primera pantalla. Aquí, la decisión principal fue entender dónde debía estar la información y cómo debía presentarse para ese público.')}</SectionLead><SectionLead>{t('Também foi um projeto em que aprendi a usar os dados como parte da conversa com o cliente. Quando uma mudança afetava o comportamento da página, eu conseguia sair do campo da opinião e discutir o que estava acontecendo de forma mais objetiva.', 'It was also a project in which I learned to use data as part of the conversation with the client. When a change affected the page\'s behavior, I could move out of the realm of opinion and discuss what was happening more objectively.', 'También fue un proyecto en el que aprendí a usar los datos como parte de la conversación con el cliente. Cuando un cambio afectaba el comportamiento de la página, podía salir del terreno de la opinión y discutir lo que estaba pasando de forma más objetiva.')}</SectionLead><Ending/></section>
    </CaseReading>
  </main>;
}
