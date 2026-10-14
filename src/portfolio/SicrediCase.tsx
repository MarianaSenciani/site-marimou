import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, motion, useInView, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle, Monitor, Smartphone } from 'lucide-react';
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

function ChapterTitle({ children, id }: { children: string; id?: string }) {
  return <WordPullUp as="h2" id={id} words={children} paused={useMotionPaused()} className="sc-title" />;
}

function Metric({ metric, index = 0 }: { metric: typeof metrics[number]; index?: number }) {
  const ref = useRef<HTMLDivElement>(null), visible = useInView(ref, { once: true, amount: .5 });
  const paused = useMotionPaused(), [number, setNumber] = useState(metric.value);
  useEffect(() => {
    if (!visible || paused) { setNumber(metric.value); return; }
    const controls = animate(0, metric.value, { duration: 1.1, delay: index * .1, ease: 'easeOut', onUpdate: value => setNumber(Math.round(value)) });
    return () => controls.stop();
  }, [visible, paused, metric.value, index]);
  return <div ref={ref} className="sc-metric"><strong aria-label={`${metric.prefix}${metric.value}${metric.suffix}`}><span aria-hidden="true">{metric.prefix}{number}{metric.suffix}</span></strong><span>{metric.label}</span></div>;
}

/** Load media near its scene, and stop playback outside it or when motion is paused. */
function CaseVideo({ campaign, device, eager = false }: { campaign: string; device: 'desktop' | 'mobile'; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null), video = useRef<HTMLVideoElement>(null);
  const near = useInView(ref, { margin: '250px 0px' }), visible = useInView(ref, { amount: .12 });
  const paused = useMotionPaused(), [loaded, setLoaded] = useState(eager), [failed, setFailed] = useState(false);
  useEffect(() => { if (near) setLoaded(true); }, [near]);
  useEffect(() => {
    const playback = () => {
      if (!video.current) return;
      if (visible && !paused && !document.hidden) void video.current.play().catch(() => { /* Poster remains visible if autoplay is unavailable. */ });
      else video.current.pause();
    };
    playback(); document.addEventListener('visibilitychange', playback);
    return () => { document.removeEventListener('visibilitychange', playback); video.current?.pause(); };
  }, [visible, paused, loaded, campaign, device]);
  return <div ref={ref} className={`sc-media-screen sc-media-${device}`}>
    {failed || !loaded ? <img loading="lazy" src={`${mediaRoot}${campaign}-${device}.png`} alt={`Landing page ${campaign}, versão ${device}`} /> : <video ref={video} src={`${mediaRoot}${campaign}-${device}.mp4`} poster={`${mediaRoot}${campaign}-${device}.png`} muted loop playsInline autoPlay={!paused && visible} preload="metadata" aria-label={`Gravação da landing page ${campaign}, versão ${device}`} onError={() => setFailed(true)} />}
  </div>;
}

function Phone({ campaign, className = '' }: { campaign: string; className?: string }) {
  // No external phone frame was supplied. This CSS shell preserves the entire recorded viewport.
  return <div className={`sc-phone ${className}`}><span className="sc-phone-speaker" aria-hidden="true" /><CaseVideo campaign={campaign} device="mobile" /><span className="sc-phone-home" aria-hidden="true" /></div>;
}

function BrowserFrame({ children, className = '', label = 'Sicredi · landing page' }: { children: ReactNode; className?: string; label?: string }) {
  return <div className={`sc-browser ${className}`}><div className="sc-browser-bar" aria-hidden="true"><span>● ● ●</span><span>{label}</span><Monitor size={12}/></div>{children}</div>;
}

function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null), paused = useMotionPaused();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [22, -22]), phoneY = useTransform(scrollYProgress, [0, 1], [40, -38]);
  return <div ref={ref} className="sc-hero-art" aria-label="Composição das experiências Sicredi em desktop e mobile">
    <span className="sc-art-orbit" aria-hidden="true"/><motion.div className="sc-hero-desktop" style={{ y: paused ? 0 : y }}><BrowserFrame><div className="sc-hero-capture"><img src={`${mediaRoot}pj-desktop.png`} alt="Primeira dobra e benefícios da landing page PJ"/></div></BrowserFrame></motion.div>
    <motion.div className="sc-hero-phone" style={{ y: paused ? 0 : phoneY }}><Phone campaign="agro" /></motion.div>
    <motion.div className="sc-hero-mini" style={{ y: paused ? 0 : y }}><Phone campaign="cuiaba" /></motion.div>
    <span className="sc-art-caption">Uma estrutura. Diferentes contextos.</span>
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
  const { ref, active, setActive, progress } = useScene(3), paused = useMotionPaused();
  return <section id="sc-roadmap" className="sc-chapter sc-roadmap wrap">
    <ChapterTitle>Três meses, com uma função diferente em cada etapa.</ChapterTitle>
    <p className="sc-lead">O primeiro mês foi dedicado a entender o comportamento das pessoas. No segundo, transformamos os aprendizados em páginas e colocamos a solução no ar. O terceiro ficou voltado para acompanhar o uso e ajustar o que fosse necessário.</p>
    <div ref={ref} className={`sc-roadmap-scene ${paused ? 'sc-still' : ''}`}><div className="sc-roadmap-sticky">
      <div className="sc-roadmap-line" aria-hidden="true"><motion.div style={{ scaleX: paused ? 1 : progress }} /></div>
      <div className="sc-months">{phases.map((phase, i) => <article key={phase.title} className={active === i ? 'is-active' : ''}>
        <button onClick={() => setActive(i)} aria-pressed={active === i} aria-label={`Mês ${i + 1}: ${phase.title}`}><span className="sc-month-dot"/><span>Mês 0{i + 1}</span></button>
        <h3>{phase.title}</h3><p>{phase.description}</p><ol>{phase.steps.map((step, index) => <li key={step}><span>{step}</span>{index < phase.steps.length - 1 && <ArrowRight size={12} aria-hidden="true"/>}</li>)}</ol>
      </article>)}</div><p className="sc-scene-note">2024 · Pesquisa → estrutura → acompanhamento</p>
    </div></div>
  </section>;
}

function Flow({ title, steps, emphasis = false }: { title: string; steps: string[]; emphasis?: boolean }) {
  const paused = useMotionPaused();
  return <div className={`sc-flow ${emphasis ? 'sc-flow-chosen' : ''}`}><h3>{title}</h3><ol>{steps.map((step, i) => <motion.li key={step} initial={paused ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: paused ? 0 : .45, delay: paused ? 0 : i * .09 }}><span>{step}</span>{i < steps.length - 1 && <ArrowDown size={15} aria-hidden="true"/>}</motion.li>)}</ol></div>;
}

function PageArchitecture() {
  const { ref, active, setActive } = useScene(4), paused = useMotionPaused();
  return <section id="sc-estrutura" className="sc-chapter wrap">
    <ChapterTitle>A estrutura seguia a forma como as pessoas diziam procurar informação.</ChapterTitle>
    <p className="sc-lead">Nas entrevistas, um padrão apareceu com frequência: primeiro entender a proposta, depois descobrir o que era possível fazer e só então aprofundar os detalhes. A página foi organizada nessa mesma ordem.</p>
    <div ref={ref} className={`sc-architecture-scene ${paused ? 'sc-still' : ''}`}><div className="sc-architecture-sticky">
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
    </div></div>
  </section>;
}

function CampaignGallery() {
  const [active, setActive] = useState(0), [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [showRecording, setShowRecording] = useState(false);
  const campaign = campaigns[active], paused = useMotionPaused();
  return <section id="sc-campanhas" className="sc-chapter wrap">
    <ChapterTitle>A mesma base, adaptada para quatro campanhas.</ChapterTitle>
    <p className="sc-lead">PJ e Agro usaram praticamente a mesma estrutura. Nas campanhas de Amazonas e Cuiabá, mantivemos a lógica de conteúdo, mas com mais liberdade visual para acompanhar o contexto esportivo.</p>
    <div className="sc-gallery-controls"><div className="sc-campaign-tabs" role="group" aria-label="Escolher campanha">{campaigns.map((item, i) => <button key={item.id} aria-pressed={active === i} onClick={() => setActive(i)}>{item.name}<ArrowUpRight size={14}/></button>)}</div><div className="sc-device-tabs" role="group" aria-label="Escolher dispositivo"><button aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')} aria-label="Desktop"><Monitor size={17}/></button><button aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')} aria-label="Mobile"><Smartphone size={17}/></button></div></div>
    <motion.div key={`stage-${campaign.id}-${device}`} initial={paused ? false : { opacity: .3, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: paused ? 0 : .5 }} className="sc-campaign-stage" style={{ '--campaign-accent': campaign.accent } as React.CSSProperties}>
      <div className="sc-campaign-info"><span>{campaign.description}</span><h3>{campaign.name}</h3><p>{campaign.body}</p><span className="sc-campaign-count">0{active + 1} / 04</span></div>
      {campaign.id === 'amazonas' ? <div className="sc-missing-art"><span aria-hidden="true">✳</span><strong>Amazonas</strong><p>Visual da campanha a incluir.</p>{/* ASSET PENDENTE: screenshots e gravações reais da LP Amazonas; não reutilizar outra campanha. */}</div> : <div className={`sc-campaign-media is-${device}`}>
        {device === 'desktop' ? <BrowserFrame>{showRecording ? <CaseVideo campaign={campaign.id} device="desktop" /> : <CampaignScreenshot campaign={campaign.id}/>}</BrowserFrame> : <Phone campaign={campaign.id} />}
        <div className="sc-campaign-secondary">{device === 'desktop' ? <Phone campaign={campaign.id} /> : <BrowserFrame><CaseVideo campaign={campaign.id} device="desktop" /></BrowserFrame>}</div>
      </div>}
    </motion.div>
    {campaign.id !== 'amazonas' && <div className="sc-gallery-links">{device === 'desktop' && <button className="sc-recording-toggle" aria-pressed={showRecording} onClick={() => setShowRecording(!showRecording)}>{showRecording ? 'Ver telas' : 'Ver gravação desktop'}<Monitor size={14}/></button>}<details className="sc-full-capture" key={`capture-${campaign.id}-${device}`}><summary>Ver a página completa · {campaign.name} / {device}<ArrowDown size={15}/></summary><img loading="lazy" src={`${mediaRoot}${campaign.id}-${device}.png`} alt={`Screenshot completo da landing page ${campaign.name} em ${device}`} /></details></div>}
  </section>;
}

function CampaignScreenshot({ campaign }: { campaign: string }) {
  const ref = useRef<HTMLDivElement>(null), paused = useMotionPaused();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.3', 'end 0.3'] });
  const position = useTransform(scrollYProgress, [0, 1], ['50% 0%', '50% 100%']);
  return <div ref={ref} className="sc-campaign-screenshot"><motion.img loading="lazy" src={`${mediaRoot}${campaign}-desktop.png`} alt={`Detalhes da landing page ${campaign}. O recorte acompanha a leitura do case.`} style={{ objectPosition: paused ? '50% 0%' : position }}/></div>;
}

function MobileScene() {
  const ref = useRef<HTMLDivElement>(null), paused = useMotionPaused();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const left = useTransform(scrollYProgress, [0, 1], [35, -35]), right = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  return <section id="sc-mobile" className="sc-mobile-section sc-chapter wrap"><div className="sc-mobile-copy"><ChapterTitle>O celular era o principal ponto de acesso.</ChapterTitle><p className="sc-lead">Nos dados posteriores do Clarity, cerca de 96% das sessões analisadas vieram de dispositivos móveis. Isso reforça por que a experiência precisava funcionar bem no celular desde o início.</p><Metric metric={metrics[1]}/><p className="sc-caption">Dados posteriores de uso — jan–jun/2025.</p></div><div ref={ref} className="sc-mobile-composition"><motion.div className="sc-mobile-background sc-mobile-left" style={{ y: paused ? 0 : left }}><img loading="lazy" src={`${mediaRoot}pj-mobile.png`} alt="Interface mobile da campanha PJ"/></motion.div><motion.div className="sc-mobile-background sc-mobile-right" style={{ y: paused ? 0 : right }}><img loading="lazy" src={`${mediaRoot}cuiaba-mobile.png`} alt="Interface mobile da campanha Cuiabá"/></motion.div><Phone campaign="agro" /><span className="sc-mobile-callout"><Smartphone size={16}/>Informação para consultar de novo.</span></div></section>;
}

export function SicrediCase() {
  const paused = useMotionPaused();
  useEffect(() => { document.title = 'Sicredi Centro-Norte · pesquisa e experiência digital — Mari Mou'; }, []);
  return <main id="main-content" lang="pt-BR" className={`sicredi-case ${paused ? 'sc-motion-paused' : ''}`}>
    {/* HERO: explain the problem and show exactly three later-use highlights. */}
    <header className="sc-hero wrap"><a href="/projetos" className="sc-back"><ArrowLeft size={16}/>Todos os projetos</a><p className="sc-project-name">Sicredi Centro-Norte · 2024</p><WordPullUp className="sc-heading" paused={paused} words="Como transformamos pesquisa de campo em uma experiência digital para o Sicredi Centro-Norte."/><p className="sc-hero-lead">Durante três meses, atuei como Product Designer no projeto. Começamos investigando como as pessoas da região buscavam informações financeiras e, a partir das entrevistas, mudamos a estratégia: em vez de concentrar tudo nas redes sociais, criamos landing pages dedicadas para cada campanha.</p><div className="sc-hero-proof"><div className="sc-hero-metrics">{metrics.map((metric, i) => <Metric key={metric.label} metric={metric} index={i}/>)}</div><HeroVisual/></div><p className="sc-caption sc-hero-caption">Dados posteriores de uso, registrados entre jan–jun/2025. Eles mostram a continuidade das experiências depois dos três meses de projeto em 2024.</p></header>
    <div className="wrap sc-overview"><dl className="sc-facts">{[['Meu papel', 'Product Designer'], ['Período', '2024 · 3 meses'], ['Plataforma', 'Web / Mobile'], ['Escopo', 'Research, síntese, jornada, UI e otimização']].map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl><div className="sc-at-glance">{[['Desafio', 'Descobrir qual formato funcionaria melhor para explicar produtos financeiros a um público com hábitos digitais diferentes dos que imaginávamos no início.'], ['Meu papel', 'Criei roteiro de entrevistas, participei da pesquisa, sintetizei dados, estruturei personas e jornada e fui responsável pelo design das quatro landing pages.'], ['Caminho escolhido', 'A pesquisa mostrou que a rede social funcionava melhor para atrair. A explicação precisava acontecer em uma página própria, com mais contexto e caminhos claros para continuar.']].map(([title, body]) => <Reveal key={title}><h3>{title}</h3><p>{body}</p></Reveal>)}</div></div>
    <nav className="sc-chapter-nav" aria-label="Capítulos do case Sicredi"><div className="wrap">{[['Roadmap','sc-roadmap'],['Pesquisa','sc-pesquisa'],['Estratégia','sc-estrategia'],['Estrutura','sc-estrutura'],['Campanhas','sc-campanhas'],['Impacto','sc-impacto']].map(([title,id]) => <a href={`#${id}`} key={id}>{title}</a>)}</div></nav>
    <Roadmap/>
    {/* DISCOVERY: evidence that changed the channel, not a methods checklist. */}
    <section id="sc-pesquisa" className="sc-chapter wrap"><div className="sc-initial-hypothesis"><Reveal><ChapterTitle>No começo, a aposta era usar as redes sociais como principal canal.</ChapterTitle><p className="sc-lead">O projeto começou junto aos times de design e mídia paga. A ideia era usar banners, posts e vídeos curtos para apresentar as ofertas e levar as pessoas direto para o atendimento.</p></Reveal><div className="sc-hypothesis-note"><MessageCircle size={27}/><p>Esse mesmo canal também funcionaria para explicar produtos financeiros com mais detalhes?</p></div></div><div className="sc-research-editorial"><Reveal className="sc-interview-count"><strong>150</strong><span>entrevistas</span><ArrowDown size={25}/><p>Clientes + colaboradores + pessoas da região</p></Reveal><div><ChapterTitle>As entrevistas mudaram o rumo do projeto.</ChapterTitle><p className="sc-lead">Falamos com cerca de 150 pessoas entre clientes, colaboradores do Sicredi e moradores da região, incluindo comerciantes, freelancers e pequenos empreendedores.</p><div className="sc-insights">{[
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
    <section className="sc-principle"><div className="wrap"><Reveal><p>A rede social continuaria importante para atrair.</p><ChapterTitle>A explicação, porém, precisava acontecer em outro lugar.</ChapterTitle></Reveal></div></section>
    {/* STRATEGY: compare experience choices, without inventing an experiment result. */}
    <section id="sc-estrategia" className="sc-chapter wrap"><ChapterTitle>Foi daí que surgiu a ideia das landing pages.</ChapterTitle><p className="sc-lead">Com esse aprendizado, passamos a trabalhar também com o time de tecnologia. A proposta foi criar páginas dedicadas para cada campanha, com contexto suficiente para a pessoa entender a oferta antes de falar com o atendimento.</p><div className="sc-flow-comparison"><Flow title="Hipótese inicial" steps={['Mídia / Social', 'Post ou vídeo', 'WhatsApp', 'Bot genérico / dúvidas']}/><ArrowRight className="sc-flow-arrow" aria-hidden="true"/><Flow title="Direção após o discovery" emphasis steps={['Mídia paga', 'Landing page dedicada', 'Oferta + benefícios + FAQ', 'Abrir conta / WhatsApp']}/></div>
      <div className="sc-flow-test"><div><ChapterTitle>A landing page passou a responder as dúvidas antes do WhatsApp.</ChapterTitle><p className="sc-lead">Em vez de mandar a pessoa direto para um bot de triagem, a página explicava o produto, respondia dúvidas frequentes e deixava mais claro qual seria o próximo passo.</p></div><div className="sc-flow-routes"><p><span>Fluxo A</span>Anúncio → WhatsApp → Bot → dúvidas</p><p><span>Fluxo B</span>Anúncio → Landing page → oferta → benefícios → FAQ → abrir conta / WhatsApp</p><small>Uma decisão de experiência: responder às dúvidas antes de chegar ao atendimento.</small></div></div>
    </section>
    <PageArchitecture/><CampaignGallery/><MobileScene/>
    {/* ITERATION: show the decision sequence; private reports never enter the public assets. */}
    <section id="sc-acompanhamento" className="sc-chapter wrap"><ChapterTitle>Os dados mostraram quando a estrutura precisava mudar.</ChapterTitle><p className="sc-lead">Depois de algumas alterações pedidas pelo cliente, percebi uma queda no tempo de leitura. Revisei a estrutura da página com o time de redação, reorganizamos alguns trechos e acompanhei o comportamento depois da mudança. A nova versão foi mantida porque os dados melhoraram.</p><div className="sc-iteration">{[['Mudança','Ajustes de conteúdo / estrutura solicitados pelo cliente.'],['Sinal','Queda observada no tempo de leitura / retenção.'],['Hipótese','A nova organização podia estar dificultando a leitura.'],['Iteração','Reorganização do conteúdo e revisão dos textos.'],['Validação','Os indicadores melhoraram depois dos ajustes.']].map(([title, body], i) => <Reveal key={title} delay={i * .09}><span className="sc-iteration-dot"/><h3>{title}</h3><p>{body}</p></Reveal>)}</div></section>
    {/* IMPACT: later continuity of use, never claimed as 2024 conversion or unique users. */}
    <section id="sc-impacto" className="sc-impact sc-chapter"><div className="wrap"><ChapterTitle>As páginas continuaram recebendo tráfego depois do projeto.</ChapterTitle><p className="sc-lead">Dados do Microsoft Clarity mostram que as páginas continuavam ativas e recebendo tráfego em 2025, um ano depois do trabalho original.</p><div className="sc-impact-metrics">{metrics.map((metric, i) => <Metric key={metric.label} metric={metric} index={i}/>)}</div><p className="sc-caption">{usageNote}</p><p className="sc-caption">592 sessões com o evento “Entre em contato conosco”.</p></div></section>
    <section className="sc-reflection sc-chapter wrap"><ChapterTitle>O que eu levo desse projeto</ChapterTitle><Reveal><p className="sc-lead">Esse projeto me mostrou, na prática, que o trabalho de Product Design pode começar antes da primeira tela. Aqui, a principal decisão foi entender onde a informação deveria estar e como ela deveria ser apresentada para aquele público.</p><p>Também foi um projeto em que aprendi a usar os dados como parte da conversa com o cliente. Quando uma mudança afetava o comportamento da página, eu conseguia sair do campo da opinião e discutir o que estava acontecendo de forma mais objetiva.</p></Reveal></section>
    <div className="sc-ending wrap"><a href="/#contato" className="pill primary">Vamos construir algo juntos?<ArrowUpRight size={17}/></a><a className="sc-next" href="/projetos/lwsa">Próximo case · LWSA<ArrowUpRight size={19}/></a></div>
  </main>;
}
