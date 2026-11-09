import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { Reveal } from '@/components/ui/reveal';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience } from './experience-context';
import './about-hero-variants.css';

export function PhotoStory() {
  const { t } = useExperience(), paused = useMotionPaused();
  const [index, setIndex] = useState(0);
  const stories = [
    { name: t('O começo', 'The beginning', 'El comienzo'), text: t('Sempre gostei de desenhar e de explorar ideias pela arte. Foi assim que me apaixonei por design: vi que criar também podia ajudar pessoas a entender e usar melhor as coisas.', 'I have always loved drawing and exploring ideas through art. Design showed me that creating could also help people understand and use things better.', 'Siempre me gustó dibujar y explorar ideas a través del arte. El diseño me mostró que crear también podía ayudar a las personas a entender y usar mejor las cosas.') },
    { name: t('Uma porta se abriu', 'An open door', 'Una puerta se abrió'), text: t('Queria estudar design, mas não tinha como pagar a faculdade. Consegui uma bolsa integral, e foi assim que o desenho virou profissão.', 'I wanted to study design but could not afford college. A full scholarship let me turn drawing into a profession.', 'Quería estudiar diseño, pero no podía pagar la universidad. Conseguí una beca completa y así fue como el dibujo se convirtió en profesión.') },
    { name: t('Design encontra tecnologia', 'Design meets technology', 'Diseño y tecnología'), text: t('Na faculdade, tive contato com desenvolvimento web. Gostei de ver as ideias funcionando na tela e me aproximei de UX, sem deixar para trás meu olhar de design.', 'At college, I discovered web development. Seeing ideas work on screen brought me closer to UX without losing my design perspective.', 'En la universidad conocí el desarrollo web. Ver las ideas funcionando en la pantalla me acercó a UX sin dejar atrás mi mirada de diseño.') },
    { name: t('Construir junto', 'Building together', 'Construir juntos'), text: t('Na LIVO, eu estava em Marketing e propus uma análise heurística do e-commerce. Ali percebi que investigar o problema era tão importante para mim quanto criar telas. Desde então começo pelas pessoas e pelos dados, e só depois desenho.', 'At LIVO, while in Marketing, I proposed a heuristic analysis of the e-commerce. That was when I realized researching the problem mattered just as much to me as creating screens. Since then, I start with people and data before designing.', 'En LIVO, estaba en Marketing y propuse un análisis heurístico del e-commerce. Allí me di cuenta de que investigar el problema era tan importante para mí como crear pantallas. Desde entonces comienzo por las personas y los datos, y solo después diseño.') },
    { name: t('Hoje e o que vem depois', 'Today and what comes next', 'Hoy y lo que viene'), text: t('Hoje sou Product Owner e Builder na Smartleader, da descoberta à entrega com Engenharia. Uso IA todos os dias para ganhar tempo em discovery, documentação e protótipos.', 'Today I am a Product Owner and Builder at Smartleader, from discovery to delivery alongside Engineering. I use AI every day to speed up discovery, documentation, and prototyping.', 'Hoy soy Product Owner y Builder en Smartleader, desde el discovery hasta la entrega junto con Ingeniería. Uso IA todos los días para ganar tiempo en discovery, documentación y prototipos.') },
  ];
  const move = (direction: number) => setIndex(value => (value + direction + stories.length) % stories.length);
  return <section className="photo-story experience-section wrap"><div className="photo-story-copy"><WordPullUp as="h2" words={t('Como cheguei até aqui.', 'How I got here.', 'Cómo llegué hasta aquí.')} paused={paused} /><motion.p key={index} aria-live="polite" initial={paused ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>{stories[index].text}</motion.p><span className="story-index">0{index + 1} / 05 · {stories[index].name}</span></div><div className="photo-story-stack" tabIndex={0} role="group" aria-label={t('Arraste para a direita para avançar. Use as setas no teclado.', 'Drag right to advance. Use arrow keys on a keyboard.', 'Arrastra a la derecha para avanzar. Usa las flechas del teclado.')} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
    {stories.map((story, i) => { const depth = (i - index + stories.length) % stories.length; return <motion.figure className="story-polaroid" key={i} style={{ zIndex: 5 - depth, touchAction: 'pan-y' }}
      animate={{ rotate: depth === 0 ? -4 : depth % 2 ? 7 : -8, y: depth * 7, scale: 1 - depth * .025 }} transition={{ duration: paused ? 0 : .35 }}
      drag={depth === 0 ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={.65} dragMomentum={false} dragSnapToOrigin onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 55) move(info.offset.x > 0 ? 1 : -1); }}>
      <img src={`/assets/about/${i + 1}.jpeg`} alt={`${story.name} — Mariana Senciani`} draggable={false} loading={i === 0 ? 'eager' : 'lazy'} /><figcaption><span className="story-polaroid-num">0{i + 1}</span> · {story.name}</figcaption></motion.figure>; })}<span className="story-drag-hint"><MoveHorizontal size={17} />{t('Arraste para a direita para conhecer minha história', 'Drag right to explore my story', 'Arrastra a la derecha para conocer mi historia')}</span></div></section>;
}

export function AboutExperience() {
  const { t } = useExperience(), paused = useMotionPaused();

  const journey = useRef<HTMLDivElement>(null);
  const lastEntryRef = useRef<HTMLDivElement>(null);
  const lastDotRef = useRef<HTMLSpanElement>(null);
  const [lineMaxHeight, setLineMaxHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const measure = () => {
      if (journey.current && lastDotRef.current) {
        const jRect = journey.current.getBoundingClientRect();
        const dRect = lastDotRef.current.getBoundingClientRect();
        const height = Math.round((dRect.top - jRect.top) + (dRect.height / 2) - 8);
        if (height > 0) setLineMaxHeight(prev => prev === height ? prev : height);
      }
    };
    measure();
    const timer = setTimeout(measure, 300);
    const ro = new ResizeObserver(measure);
    if (journey.current) ro.observe(journey.current);
    if (lastEntryRef.current) ro.observe(lastEntryRef.current);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);
  const { scrollYProgress } = useScroll({
    target: journey,
    offset: ['start 75%', 'end 105%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const cvHref = import.meta.env.DEV ? '/api/cv/pdf' : '/Mariana-Senciani.pdf';

  const headline = t(
    'Do desenho ao produto.',
    'From drawing to product.',
    'Del dibujo al producto.'
  );

  const leadText = t(
    'Comecei desenhando, passei por direção de arte, dados, UX e pesquisa, e hoje sou Product Designer e Product Owner. Gosto de entender o problema antes de desenhar a tela.',
    'I started drawing, moved through art direction, data, UX, and research, and today I work as a Product Designer and Product Owner. I like to understand the problem before drawing the screen.',
    'Empecé dibujando, pasé por dirección de arte, datos, UX e investigación, y hoy soy Product Designer y Product Owner. Me gusta entender el problema antes de diseñar la pantalla.'
  );

  const experiences = [
    ['2020 — 2021 · Grupo Rabbit', 'Organizar o time criativo para o projeto andar', 'Comecei como assistente de arte e passei a liderar o time criativo, distribuindo tarefas e acompanhando entregas. Foi ali que aprendi a organizar demandas entre copy, design e clientes de educação.'],
    ['2021 — 2022 · VEX', 'Ler número de campanha para decidir mídia', 'Fiz a ponte entre Marketing, Vendas e Planejamento e analisei métricas de campanhas para apoiar decisões de mídia. Implementei a metodologia ágil Kanban e aprendi a apresentar dados para quem precisa decidir.'],
    ['2022 — 2023 · LIVO', 'Onde investigar ficou tão importante quanto desenhar', 'Eu estava em Marketing quando propus uma análise heurística do e-commerce. Depois vieram testes e o redesenho de home, coleções, produto e checkout. O abandono de carrinho foi de 42% para 20% em dois meses, junto com outras ações comerciais.'],
    ['2023 — 2024 · LWSA', 'Pesquisa e direção visual em uma mudança de marca', 'Conduzi a pesquisa e a direção visual da evolução de Locaweb Company para LWSA, alinhando decisões com stakeholders e conectando o novo posicionamento à identidade.'],
    ['2025 · Sicredi', 'Descobrir onde as pessoas queriam ler sobre dinheiro', 'Criei o roteiro de entrevistas e participei da pesquisa com públicos locais, participei da decisão de canal e desenhei landing pages pensando primeiro no celular. No Sicredi Centro-Norte, as páginas somaram mais de 260 mil sessões, cerca de 96% no celular. Foi aqui que comecei a usar IA para organizar o discovery, planejar entrevistas e gerar imagens.'],
    ['2026 — atual · Smartleader', 'Do desenho do produto à entrega', 'Hoje sou Product Owner e Builder na Smartleader, da descoberta à entrega com Engenharia. Uso IA todos os dias para ganhar tempo em discovery, documentação e protótipos.'],
  ];

  const heroPile = [
    { src: '/assets/about/1.jpeg', label: t('01 · O começo', '01 · The beginning', '01 · El comienzo'), x: -46, y: -24, rotate: -13 },
    { src: '/assets/about/2.jpeg', label: t('02 · Uma porta se abriu', '02 · An open door', '02 · Una puerta se abrió'), x: 48, y: -18, rotate: 11 },
    { src: '/assets/about/3.jpeg', label: t('03 · Design encontra tecnologia', '03 · Design meets technology', '03 · Diseño y tecnología'), x: -38, y: 28, rotate: -8 },
    { src: '/assets/about/4.jpeg', label: t('04 · Construir junto', '04 · Building together', '04 · Construir juntos'), x: 42, y: 24, rotate: 9 },
    { src: '/assets/about/5.jpeg', label: 'Product Designer', x: 0, y: 0, rotate: 2.5, isMain: true },
  ];

  return (
    <main id="main-content" className="about-experience-page">
      <section className="about-experience-hero about-hero-viewport wrap">
        <div className="about-hero-v1">
          <div className="about-v1-copy">
            <WordPullUp paused={paused} words={headline} />
            <p className="about-hero-lead">{leadText}</p>
            <div className="about-cv-bar">
              <a className="pill primary" href={cvHref} download>
                {t('Baixar currículo', 'Download résumé', 'Descargar currículo')}
              </a>
              <a className="text-link about-timeline-link" href="#jornada">
                {t('Ver linha do tempo', 'View timeline', 'Ver línea de tiempo')}
                <ArrowDown size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="about-v1-pile" aria-label={t('Fotos da trajetória de Mariana Senciani', 'Photos from Mariana Senciani’s journey', 'Fotos de la trayectoria de Mariana Senciani')}>
            {heroPile.map((item, i) => (
              <motion.figure
                key={item.src}
                className={`about-v1-polaroid ${item.isMain ? 'is-main' : 'is-under'}`}
                style={{ zIndex: i + 1 }}
                initial={
                  paused
                    ? false
                    : {
                        opacity: 0,
                        scale: 1.55,
                        x: item.x * 1.35,
                        y: item.y * 1.35,
                        rotate: item.rotate + (i % 2 === 0 ? -12 : 12),
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: item.x,
                  y: item.y,
                  rotate: item.rotate,
                }}
                transition={
                  paused
                    ? { duration: 0 }
                    : {
                        delay: 0.38 + i * 0.14,
                        duration: 0.44,
                        ease: [0.42, 0, 0.2, 1],
                        opacity: {
                          delay: 0.38 + i * 0.14,
                          duration: 0.22,
                          ease: 'easeIn',
                        },
                      }
                }
              >
                <img src={item.src} alt={`${item.label} — Mariana Senciani`} draggable={false} loading="eager" />
                {item.isMain ? (
                  <figcaption>
                    <strong>Product Designer</strong>
                    <span className="polaroid-years">2020 — 2026</span>
                    <span className="polaroid-line">
                      {t('Da direção de arte ao produto digital', 'From art direction to digital product', 'De dirección de arte a producto digital')}
                    </span>
                  </figcaption>
                ) : (
                  <figcaption className="polaroid-mini-caption">
                    <span>{item.label}</span>
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="jornada" className="career-journey experience-section wrap">
        <div className="career-entries" ref={journey}>
          <motion.div className="career-progress" aria-hidden="true" style={{ height: lineMaxHeight, scaleY: paused ? 1 : progress }} />
          {experiences.map(([period, title, text], i) => {
            const isLast = i === experiences.length - 1;
            return (
              <Reveal className={`career-entry ${isLast ? 'career-entry-last' : ''}`} key={period}>
                <span className="career-date">{period}</span>
                <div ref={isLast ? lastEntryRef : undefined}>
                  <span className="career-dot" ref={isLast ? lastDotRef : undefined} aria-hidden="true">{isLast ? '✳' : '•'}</span>
                  <span className="career-context">
                    {['Educação · Liderança criativa', 'Publicidade · Dados e mídia', 'Varejo óptico e e-commerce', 'Ecossistema de tecnologia', 'Projeto Sicredi Centro-Norte', 'B2B SaaS · Gestão de performance e RH'][i]}
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="case-tags">
                    {[['Liderança criativa', 'Planejamento', 'Educação'], ['Métricas de mídia', 'Análise de dados', 'Apresentações'], ['Heurísticas', 'Testes', 'E-commerce', 'UX'], ['Pesquisa', 'UX web', 'Marca', 'Alinhamento entre áreas'], ['Pesquisa de contexto', 'Mobile-first', 'Arquitetura', 'Métricas'], ['Discovery', 'Priorização', 'PRDs e histórias', 'Design System']][i].map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
      <PhotoStory />
    </main>
  );
}
