import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { animate, motion, useInView, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle, Rocket } from 'lucide-react';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { useMotionPaused } from '@/components/ui/motion-context';
import { Reveal } from '@/components/ui/reveal';
import './sicredi-case.css';

const mediaRoot = '/assets/cases/sicredi/';
const usageNote = 'Dados posteriores de uso, jan–jun/2025, considerando PJ, Agro e Cuiabá. Somatório sem deduplicação entre URLs.';
const metrics = [
  { value: 260, prefix: '+', suffix: ' mil', label: 'sessões registradas' },
  { value: 96, prefix: '≈', suffix: '%', label: 'acessos mobile' },
  { value: 592, prefix: '', suffix: '', label: 'sessões com ação de contato' },
];
const phases = [
  { title: 'Pesquisa e síntese', description: 'Coleta, leitura dos padrões e definição do caminho.', steps: ['Planejamento da pesquisa', 'Roteiro de entrevistas', 'Entrevistas', 'Síntese dos dados', 'Personas + jornada'] },
  { title: 'Estrutura e design', description: 'Definição do canal, arquitetura e construção das experiências.', steps: ['Decisão de canal', 'Arquitetura + storytelling', 'UI Design', 'Quatro landing pages', 'Handoff com tecnologia'] },
  { title: 'Acompanhamento', description: 'Leitura do comportamento e ajustes contínuos.', steps: ['Publicação', 'Monitoramento', 'Leitura de comportamento', 'Ajustes e acompanhamento'] },
];
const architecture = [
  ['Atração', 'Logo no início, a pessoa precisava entender o que estava sendo oferecido e identificar rapidamente as ações disponíveis.'],
  ['Benefícios', 'Os principais diferenciais aparecem em blocos curtos e escaneáveis.'],
  ['Interatividade', 'Acordeões e FAQ permitem aprofundar apenas o conteúdo necessário.'],
  ['Próximo passo', 'Depois de entender a oferta, a pessoa segue para abertura de conta ou WhatsApp.'],
];
const campaigns = [
  { id: 'pj', name: 'PJ', description: 'Estrutura-base', body: 'Informação financeira para pequenos e médios empreendedores.', accent: '#b9c999' },
  { id: 'agro', name: 'Agro', description: 'Estrutura-base', body: 'A mesma lógica de conteúdo, no contexto do produtor rural.', accent: '#9fc1b7' },
  { id: 'amazonas', name: 'Amazonas', description: 'Adaptação expressiva', body: 'A lógica de conteúdo adaptada ao contexto esportivo.', accent: '#cbbb93' },
  { id: 'cuiaba', name: 'Cuiabá', description: 'Adaptação expressiva', body: 'Mais liberdade visual para acompanhar o contexto do clube.', accent: '#b7d69b' },
];
const chapters = [['Roadmap','sc-roadmap'],['Pesquisa','sc-pesquisa'],['Estratégia','sc-estrategia'],['Estrutura','sc-estrutura'],['Campanhas','sc-campanhas'],['Impacto','sc-impacto']] as const;

function ChapterTitle({ children, id }: { children: string; id?: string }) {
  return <WordPullUp as="h2" id={id} words={children} paused={useMotionPaused()} className="sc-title" />;
}

function SectionLead({ children, className = '' }: { children: ReactNode; className?: string }) {
  const paused = useMotionPaused();
  return <motion.p className={`sc-lead ${className}`} initial={paused ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .45 }} transition={{ duration: paused ? 0 : .65, delay: paused ? 0 : .12, ease: [.22, 1, .36, 1] }}>{children}</motion.p>;
}

function Metric({ metric, index = 0 }: { metric: typeof metrics[number]; index?: number }) {
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
    {failed || !loaded ? <img loading="lazy" src={`${mediaRoot}${campaign}-${device}.png`} alt={`Landing page ${campaign}, versão ${device}`} /> : <video ref={video} src={`${mediaRoot}${campaign}-${device}.mp4`} poster={`${mediaRoot}${campaign}-${device}.png`} muted loop playsInline autoPlay={!paused && visible && (!playOnHover || active)} preload="metadata" aria-label={`Gravação da landing page ${campaign}, versão ${device}`} onError={() => setFailed(true)} />}
  </div>;
}

function Phone({ campaign, className = '', variant = 'default', playOnHover = false }: { campaign: string; className?: string; variant?: 'default' | 'android'; playOnHover?: boolean }) {
  // No external phone frame was supplied. This CSS shell preserves the entire recorded viewport.
  return <div className={`sc-phone sc-phone-${variant} ${className}`}>{variant === 'android' ? <span className="sc-phone-camera" aria-hidden="true" /> : <span className="sc-phone-speaker" aria-hidden="true" />}<CaseVideo campaign={campaign} device="mobile" playOnHover={playOnHover} /><span className="sc-phone-home" aria-hidden="true" /></div>;
}

/** Single desktop frame (dark Safari-style) shared by every desktop mockup in the case. */
function BrowserFrame({ children, className = '', label = 'Sicredi · landing page' }: { children: ReactNode; className?: string; label?: string }) {
  return <div className={`sc-browser ${className}`}><div className="sc-browser-bar" aria-hidden="true"><span className="sc-safari-controls"><i/><i/><i/></span><span className="sc-safari-navigation">‹　›</span><span className="sc-safari-address">{label}</span><span className="sc-safari-actions">↗　＋</span></div>{children}</div>;
}

function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null), paused = useMotionPaused();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [22, -22]), phoneY = useTransform(scrollYProgress, [0, 1], [40, -38]);
  return <div ref={ref} className="sc-hero-art" aria-label="Composição das experiências Sicredi em desktop e mobile">
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
  const ref = useRef<HTMLElement>(null), paused = useMotionPaused();
  // Pinned scene: month 1 on entry, month 2 on the second scroll step, month 3 on the third; then the page releases.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const lineProgress = useTransform(scrollYProgress, [0, .78], [0, 1]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', progress => setActive(progress >= .72 ? 2 : progress >= .34 ? 1 : 0));
  return <section ref={ref} id="sc-roadmap" className={`sc-roadmap ${paused ? 'sc-still' : ''}`}><div className="sc-roadmap-sticky"><div className="wrap">
    <SectionLead>O primeiro mês foi dedicado a entender o comportamento das pessoas. No segundo, transformamos os aprendizados em páginas e colocamos a solução no ar. O terceiro ficou voltado para acompanhar o uso e ajustar o que fosse necessário.</SectionLead>
    <div className="sc-roadmap-track">
      <div className="sc-roadmap-line" aria-hidden="true"><motion.div style={{ scaleX: paused ? 1 : lineProgress }} /></div>
      <div className="sc-months">{phases.map((phase, i) => <motion.article key={phase.title} className={`${active === i ? 'is-active' : ''} ${active > i ? 'is-complete' : ''}`} initial={paused ? false : { opacity: .18, y: 28 }} animate={{ opacity: paused || active >= i ? 1 : .18, y: paused || active >= i ? 0 : 28 }} transition={{ duration: paused ? 0 : .55, ease: [.22, 1, .36, 1] }}>
        <button onClick={() => setActive(i)} aria-pressed={active === i} aria-label={`Mês ${i + 1}: ${phase.title}`}><span className="sc-month-dot"/><span>Mês 0{i + 1}</span></button>
        <h3>{phase.title}</h3><p>{phase.description}</p><ol>{phase.steps.map((step, index) => <li key={step}><span>{step}</span>{index < phase.steps.length - 1 && <ArrowRight size={12} aria-hidden="true"/>}</li>)}</ol>
      </motion.article>)}</div>
    </div>
  </div></div></section>;
}

function PrincipleSection() {
  const ref = useRef<HTMLElement>(null), paused = useMotionPaused();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'center center'] });
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0, .72], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [.94, 1]);
  return <section ref={ref} className="sc-principle"><motion.div className="wrap" style={paused ? undefined : { y, opacity, scale }}><p>A rede social continuaria importante para atrair.</p><ChapterTitle>A explicação, porém, precisava acontecer em outro lugar.</ChapterTitle></motion.div></section>;
}

function Ending() {
  const paused = useMotionPaused();
  const item = (delay: number) => ({ initial: paused ? false as const : { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .6 }, transition: { duration: paused ? 0 : .6, delay: paused ? 0 : delay, ease: [.22, 1, .36, 1] as const } });
  return <div className="sc-ending"><motion.a href="/#contato" className="pill primary" {...item(.15)}>Vamos construir algo juntos?<ArrowUpRight size={17}/></motion.a><motion.a className="sc-next" href="/projetos/lwsa" {...item(.45)}>Próximo case · LWSA<ArrowUpRight size={19}/></motion.a></div>;
}

function Flow({ title, steps, emphasis = false }: { title: string; steps: string[]; emphasis?: boolean }) {
  const paused = useMotionPaused();
  return <div className={`sc-flow ${emphasis ? 'sc-flow-chosen' : ''}`}><motion.h3 initial={paused ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: paused ? 0 : .45 }}>{title}</motion.h3><ol>{steps.map((step, i) => <motion.li key={step} initial={paused ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: paused ? 0 : .45, delay: paused ? 0 : i * .09 }}><span>{step}</span>{i < steps.length - 1 && <ArrowDown size={15} aria-hidden="true"/>}</motion.li>)}</ol></div>;
}

function PageArchitecture() {
  const { ref, active, setActive } = useScene(4), paused = useMotionPaused();
  return <section id="sc-estrutura" className="sc-chapter sc-architecture wrap">
    <div ref={ref} className={`sc-architecture-scene ${paused ? 'sc-still' : ''}`}><div className="sc-architecture-sticky">
      <div className="sc-architecture-head"><ChapterTitle>A estrutura seguia a forma como as pessoas diziam procurar informação.</ChapterTitle>
      <SectionLead>Nas entrevistas, um padrão apareceu com frequência: primeiro entender a proposta, depois descobrir o que era possível fazer e só então aprofundar os detalhes. A página foi organizada nessa mesma ordem.</SectionLead></div>
      <div className="sc-architecture-body">
      {/* Conceptual page anatomy, deliberately separate from the real screenshots. */}
      <BrowserFrame className="sc-anatomy" label="Estrutura da experiência"><div className="sc-anatomy-page">{architecture.map(([title], i) => <button key={title} onClick={() => setActive(i)} aria-pressed={active === i} className={`sc-anatomy-block sc-anatomy-${i} ${active === i ? 'is-active' : ''}`}>
        <span className="sc-anatomy-label">0{i + 1} · {title}</span>
        {i === 0 && <div className="sc-anatomy-hero"><div><i/><i/><b/></div><span>✳</span></div>}
        {i === 1 && <div className="sc-anatomy-benefits"><i/><i/><i/></div>}
        {i === 2 && <div className="sc-anatomy-faq"><span>Produto e serviços <b>+</b></span><span>Dúvidas frequentes <b>+</b></span></div>}
        {i === 3 && <div className="sc-anatomy-action"><span>Abrir conta</span><span>WhatsApp</span></div>}
      </button>)}</div></BrowserFrame>
      <div className="sc-architecture-copy"><div className="sc-stage-pips" role="group" aria-label="Etapas da estrutura">{architecture.map(([title], i) => <button key={title} aria-label={title} aria-pressed={i === active} onClick={() => setActive(i)}>0{i + 1}</button>)}</div>
        {architecture.map(([title, body], i) => <article key={title} className={active === i ? 'is-active' : ''}><span className="sc-stage-number">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}
        <span className="sc-scene-note">A ordem do conteúdo faz parte da experiência.</span>
      </div>
      </div>
    </div></div>
  </section>;
}

function CampaignGallery() {
  const [active, setActive] = useState(0);
  const campaign = campaigns[active], paused = useMotionPaused();
  return <section id="sc-campanhas" className="sc-chapter sc-campaigns wrap">
    <ChapterTitle>A mesma base, adaptada para quatro campanhas.</ChapterTitle>
    <SectionLead>PJ e Agro usaram praticamente a mesma estrutura. Nas campanhas de Amazonas e Cuiabá, mantivemos a lógica de conteúdo, mas com mais liberdade visual para acompanhar o contexto esportivo.</SectionLead>
    <div className="sc-gallery-controls"><div className="sc-campaign-tabs" role="group" aria-label="Escolher campanha">{campaigns.map((item, i) => <button key={item.id} aria-pressed={active === i} onClick={() => setActive(i)}>{item.name}<ArrowUpRight size={14}/></button>)}</div></div>
    <motion.div key={`stage-${campaign.id}`} initial={paused ? false : { opacity: .3, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: paused ? 0 : .5 }} className="sc-campaign-stage" style={{ '--campaign-accent': campaign.accent } as React.CSSProperties}>
      <div className="sc-campaign-info"><span>{campaign.description}</span><h3>{campaign.name}</h3><p>{campaign.body}</p><span className="sc-campaign-count">0{active + 1} / 04</span></div>
      {campaign.id === 'amazonas' ? <div className="sc-missing-art"><span aria-hidden="true">✳</span><strong>Amazonas</strong><p>Visual da campanha a incluir.</p>{/* ASSET PENDENTE: screenshots e gravações reais da LP Amazonas; não reutilizar outra campanha. */}</div> : <div className="sc-campaign-media">
        <BrowserFrame><CampaignScreenshot campaign={campaign.id}/></BrowserFrame>
        <div className="sc-campaign-secondary"><Phone campaign={campaign.id} variant="android" /></div>
      </div>}
    </motion.div>
  </section>;
}

function CampaignScreenshot({ campaign }: { campaign: string }) {
  const [position, setPosition] = useState(0), position_ = useRef(0), frame = useRef<HTMLDivElement>(null);
  const update = (value: number) => { position_.current = value; setPosition(value); };
  useEffect(() => { position_.current = 0; setPosition(0); }, [campaign]);
  useEffect(() => {
    const node = frame.current; if (!node) return;
    // Capture the native wheel before the page can consume it while the cursor is over the mockup.
    const onWheel = (event: WheelEvent) => {
      if (!(event.target instanceof Node) || !node.contains(event.target)) return;
      const next = Math.max(0, Math.min(100, position_.current + event.deltaY * .08));
      if (next !== position_.current) {
        event.preventDefault();
        event.stopPropagation();
        update(next);
      }
    };
    document.addEventListener('wheel', onWheel, { passive: false, capture: true });
    return () => document.removeEventListener('wheel', onWheel, { capture: true });
  }, []);
  const move = (delta: number) => update(Math.max(0, Math.min(100, position_.current + delta)));
  return <div ref={frame} className="sc-campaign-screenshot" tabIndex={0} aria-label="Role dentro da tela para percorrer a landing page" onKeyDown={event => {
    if (event.key === 'ArrowDown') { event.preventDefault(); move(8); }
    if (event.key === 'ArrowUp') { event.preventDefault(); move(-8); }
  }}><motion.img loading="lazy" src={`${mediaRoot}${campaign}-desktop.png`} alt={`Detalhes da landing page ${campaign}. Role dentro da tela para percorrer o conteúdo.`} animate={{ objectPosition: `50% ${position}%` }} transition={{ duration: .25, ease: 'easeOut' }}/><span className="sc-screen-scroll-hint">Scroll na tela</span></div>;
}

function MobileScene() {
  const mobileMetric = { ...metrics[1], label: 'acessos mobile, dados posteriores de uso — jan–jun/2025' };
  return <section id="sc-mobile" className="sc-mobile-section sc-chapter wrap"><div className="sc-mobile-copy"><ChapterTitle>O celular era o principal ponto de acesso.</ChapterTitle><SectionLead>Nos dados posteriores do Clarity, cerca de 96% das sessões analisadas vieram de dispositivos móveis. Isso reforça por que a experiência precisava funcionar bem no celular desde o início.</SectionLead><Metric metric={mobileMetric}/></div><div className="sc-mobile-composition" aria-label="Três campanhas mobile; passe o mouse para reproduzir"><Phone campaign="pj" variant="android" playOnHover /><Phone campaign="agro" variant="android" playOnHover /><Phone campaign="cuiaba" variant="android" playOnHover /></div></section>;
}

export function SicrediCase() {
  const paused = useMotionPaused(), [activeChapter, setActiveChapter] = useState('sc-roadmap'), [shortcutsVisible, setShortcutsVisible] = useState(false);
  const chapterLock = useRef<string | null>(null);
  const goToChapter = (event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    chapterLock.current = id;
    setActiveChapter(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => { chapterLock.current = null; }, 1500);
  };
  useEffect(() => { document.title = 'Sicredi Centro-Norte · pesquisa e experiência digital — Mari Mou'; }, []);
  useEffect(() => {
    const updateNavigation = () => {
      const nav = document.querySelector('.sc-chapter-nav');
      if (nav) setShortcutsVisible(window.scrollY >= nav.getBoundingClientRect().top + window.scrollY - 80);
      const current = chapters.map(([, id]) => document.getElementById(id)).filter(Boolean)
        .filter(node => node!.getBoundingClientRect().top <= window.innerHeight * .42).at(-1);
      if (current && !chapterLock.current) setActiveChapter(current.id);
    };
    updateNavigation(); window.addEventListener('scroll', updateNavigation, { passive: true });
    return () => window.removeEventListener('scroll', updateNavigation);
  }, []);
  return <main id="main-content" lang="pt-BR" className={`sicredi-case ${paused ? 'sc-motion-paused' : ''}`}>
    {/* HERO: explain the problem and show exactly three later-use highlights. */}
    <header className="sc-hero wrap"><a href="/projetos" className="sc-back"><ArrowLeft size={16}/>Todos os projetos</a><p className="sc-project-name">Sicredi Centro-Norte · 2024</p><WordPullUp className="sc-heading" paused={paused} words="Como transformamos pesquisa de campo em uma experiência digital para o Sicredi Centro-Norte."/><p className="sc-hero-lead">Durante três meses, atuei como Product Designer no projeto. Começamos investigando como as pessoas da região buscavam informações financeiras e, a partir das entrevistas, mudamos a estratégia: em vez de concentrar tudo nas redes sociais, criamos landing pages dedicadas para cada campanha.</p><div className="sc-hero-proof"><div className="sc-hero-metrics">{metrics.map((metric, i) => <Metric key={metric.label} metric={metric} index={i}/>)}</div><HeroVisual/></div></header>
    <div className="wrap sc-overview"><dl className="sc-facts">{[['Meu papel', 'Product Designer'], ['Período', '2024 · 3 meses'], ['Plataforma', 'Web / Mobile'], ['Escopo', 'Research, síntese, jornada, UI e otimização']].map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl><div className="sc-at-glance">{[['Desafio', 'Descobrir qual formato funcionaria melhor para explicar produtos financeiros a um público com hábitos digitais diferentes dos que imaginávamos no início.'], ['Meu papel', 'Criei roteiro de entrevistas, participei da pesquisa, sintetizei dados, estruturei personas e jornada e fui responsável pelo design das quatro landing pages.'], ['Caminho escolhido', 'A pesquisa mostrou que a rede social funcionava melhor para atrair. A explicação precisava acontecer em uma página própria, com mais contexto e caminhos claros para continuar.']].map(([title, body]) => <Reveal key={title}><h3>{title}</h3><p>{body}</p></Reveal>)}</div></div>
    <nav className="sc-chapter-nav" aria-label="Capítulos do case Sicredi"><div className="wrap">{chapters.map(([title,id]) => <a href={`#${id}`} key={id} onClick={event => goToChapter(event, id)} aria-current={activeChapter === id ? 'location' : undefined}>{title}</a>)}</div></nav>
    <aside className={`sc-chapter-shortcuts ${shortcutsVisible ? 'is-visible' : ''}`} aria-label="Atalhos dos capítulos">{chapters.map(([title,id]) => <a href={`#${id}`} key={id} onClick={event => goToChapter(event, id)} aria-label={title} data-label={title} aria-current={activeChapter === id ? 'location' : undefined}/>)}</aside>
    <Roadmap/>
    {/* DISCOVERY: evidence that changed the channel, not a methods checklist. */}
    <section id="sc-pesquisa" className="sc-chapter wrap"><div className="sc-initial-hypothesis"><Reveal><ChapterTitle>No começo, a aposta era usar as redes sociais como principal canal.</ChapterTitle><SectionLead>O projeto começou junto aos times de design e mídia paga. A ideia era usar banners, posts e vídeos curtos para apresentar as ofertas e levar as pessoas direto para o atendimento.</SectionLead></Reveal><div className="sc-hypothesis-note"><MessageCircle size={27}/><p>Esse mesmo canal também funcionaria para explicar produtos financeiros com mais detalhes?</p></div></div><div className="sc-research-editorial"><Reveal className="sc-interview-count"><strong>150</strong><span>entrevistas</span><ArrowDown size={25}/><p>Clientes + colaboradores + pessoas da região</p></Reveal><div><ChapterTitle>As entrevistas mudaram o rumo do projeto.</ChapterTitle><SectionLead>Falamos com cerca de 150 pessoas entre clientes, colaboradores do Sicredi e moradores da região, incluindo comerciantes, freelancers e pequenos empreendedores.</SectionLead><div className="sc-insights">{[
      ['Redes sociais eram vistas como entretenimento', 'Quando o assunto era trabalho ou dinheiro, as pessoas diziam preferir outro tipo de ambiente para buscar informação.'],
      ['O conteúdo precisava ser fácil de consultar', 'Um link podia ser salvo em uma conversa com o gerente, aberto de novo depois e compartilhado com outra pessoa.'],
      ['A ordem da informação importava', 'Primeiro entender a oferta, depois ver o que era possível fazer e, só então, entrar nos detalhes.'],
    ].map(([title, body], i) => <Reveal key={title} delay={i * .07}><h3>{title}</h3><p>{body}</p></Reveal>)}</div></div></div>
      {/* Only summarized personas are public. Portraits were not supplied, so initials remain placeholders. */}
      <div className="sc-personas">{[
        { name: 'Janice Souza', initials: 'JS', profile: 'PJ · pequeno e médio empreendedor', body: 'Proprietária de uma loja de roupas e representante do perfil de pequeno e médio empreendedor que precisava entender crédito e serviços bancários sem depender de uma conversa longa com atendimento.', needs: ['Busca clareza sobre fluxo de caixa e crédito.', 'Valoriza atendimento humano e especializado.', 'Usa canais digitais, mas prefere informação objetiva e consultável.'] },
        { name: 'João Carlos', initials: 'JC', profile: 'Agro · produtor rural', body: 'Produtor rural e representante de um público que precisava comparar opções financeiras ligadas ao ciclo agrícola, com pouco interesse em linguagem excessivamente técnica.', needs: ['Procura crédito alinhado ao ciclo da produção.', 'Tem familiaridade digital moderada.', 'Valoriza orientação próxima e informação direta.'] },
      ].map((person, i) => <Reveal key={person.name} delay={i * .1} className="sc-persona"><div className="sc-persona-top"><span className="sc-persona-portrait" role="img" aria-label={`Retrato de ${person.name} a incluir`}>{person.initials}</span><div><span>{person.profile}</span><h3>{person.name}</h3><small>Perfil sintetizado</small></div></div><p>{person.body}</p><ul>{person.needs.map(need => <li key={need}>{need}</li>)}</ul></Reveal>)}</div>
    </section>
    <PrincipleSection/>
    {/* STRATEGY: compare experience choices, without inventing an experiment result. */}
    <section id="sc-estrategia" className="sc-chapter wrap"><ChapterTitle>Foi daí que surgiu a ideia das landing pages.</ChapterTitle><SectionLead>Com esse aprendizado, passamos a trabalhar também com o time de tecnologia. A proposta foi criar páginas dedicadas para cada campanha, com contexto suficiente para a pessoa entender a oferta antes de falar com o atendimento.</SectionLead><div className="sc-flow-comparison"><Flow title="Hipótese inicial" steps={['Mídia / Social', 'Post ou vídeo', 'WhatsApp', 'Bot genérico / dúvidas']}/><ArrowRight className="sc-flow-arrow" aria-hidden="true"/><Flow title="Direção após o discovery" emphasis steps={['Mídia paga', 'Landing page dedicada', 'Oferta + benefícios + FAQ', 'Abrir conta / WhatsApp']}/></div>
      <div className="sc-flow-test"><div><ChapterTitle>A landing page passou a responder as dúvidas antes do WhatsApp.</ChapterTitle><SectionLead>Em vez de mandar a pessoa direto para um bot de triagem, a página explicava o produto, respondia dúvidas frequentes e deixava mais claro qual seria o próximo passo.</SectionLead></div><div className="sc-flow-routes"><p><span>Fluxo A</span>Anúncio → WhatsApp → Bot → dúvidas</p><p><span>Fluxo B</span>Anúncio → Landing page → oferta → benefícios → FAQ → abrir conta / WhatsApp</p><small>Uma decisão de experiência: responder às dúvidas antes de chegar ao atendimento.</small></div></div>
    </section>
    <PageArchitecture/><CampaignGallery/><MobileScene/>
    {/* ITERATION: show the decision sequence; private reports never enter the public assets. */}
    <section id="sc-acompanhamento" className="sc-chapter wrap"><ChapterTitle>Os dados mostraram quando a estrutura precisava mudar.</ChapterTitle><SectionLead>Depois de algumas alterações pedidas pelo cliente, percebi uma queda no tempo de leitura. Revisei a estrutura da página com o time de redação, reorganizamos alguns trechos e acompanhei o comportamento depois da mudança. A nova versão foi mantida porque os dados melhoraram.</SectionLead><div className="sc-iteration">{[['Mudança','Ajustes de conteúdo / estrutura solicitados pelo cliente.'],['Sinal','Queda observada no tempo de leitura / retenção.'],['Hipótese','A nova organização podia estar dificultando a leitura.'],['Iteração','Reorganização do conteúdo e revisão dos textos.'],['Validação','Os indicadores melhoraram depois dos ajustes.']].map(([title, body], i) => <Reveal key={title} delay={i * .12}><span className="sc-iteration-dot"/><h3>{title}</h3><p>{body}</p>{i === 4 && <span className="sc-validation-launch" aria-hidden="true"><Rocket fill="currentColor"/></span>}</Reveal>)}</div></section>
    {/* IMPACT: later continuity of use, never claimed as 2024 conversion or unique users. */}
    <section id="sc-impacto" className="sc-impact sc-chapter"><div className="wrap"><ChapterTitle>As páginas continuaram recebendo tráfego depois do projeto.</ChapterTitle><SectionLead>Dados do Microsoft Clarity mostram que as páginas continuavam ativas e recebendo tráfego em 2025, um ano depois do trabalho original.</SectionLead><div className="sc-impact-metrics">{metrics.map((metric, i) => <Metric key={metric.label} metric={metric} index={i}/>)}</div><Reveal className="sc-impact-box" delay={.1}><span>Período e fonte</span><p>{usageNote}</p></Reveal></div></section>
    <section className="sc-reflection sc-chapter wrap"><ChapterTitle>O que eu levo desse projeto</ChapterTitle><SectionLead>Esse projeto me mostrou, na prática, que o trabalho de Product Design pode começar antes da primeira tela. Aqui, a principal decisão foi entender onde a informação deveria estar e como ela deveria ser apresentada para aquele público.</SectionLead><SectionLead>Também foi um projeto em que aprendi a usar os dados como parte da conversa com o cliente. Quando uma mudança afetava o comportamento da página, eu conseguia sair do campo da opinião e discutir o que estava acontecendo de forma mais objetiva.</SectionLead><Ending/></section>
  </main>;
}
