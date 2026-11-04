import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { Reveal } from '@/components/ui/reveal';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience } from './experience-context';
import './case-layout.css';

export type CaseChapter = readonly [label: string, id: string];
export type CaseFact = readonly [label: string, value: string];

export function CaseHighlights({ items }: { items: readonly CaseFact[] }) {
  return <div className="case-opening-highlights">{items.slice(0, 3).map(([value, label]) =>
    <Reveal key={value}><strong>{value}</strong><p>{label}</p></Reveal>)}</div>;
}

export function CaseHero({ name, title, subtitle, highlights, visual }: {
  name: string; title: string; subtitle: string; highlights: ReactNode; visual: ReactNode;
}) {
  const { t } = useExperience();
  return <header className="case-opening wrap">
    <a className="case-opening-back" href="/projetos"><ArrowLeft size={16}/>{t('Todos os projetos', 'All projects', 'Todos los proyectos')}</a>
    <p className="case-opening-kicker">{name}</p>
    <WordPullUp className="case-opening-title" paused={useMotionPaused()} words={title}/>
    <p className="case-opening-subtitle">{subtitle}</p>
    <div className="case-opening-stage"><div className="case-opening-aside" aria-label={t('Três destaques do projeto', 'Three project highlights', 'Tres destacados del proyecto')}>{highlights}</div><div className="case-opening-visual">{visual}</div></div>
  </header>;
}

export function CaseOverview({ facts, challenge, contribution, approach }: {
  facts: readonly CaseFact[]; challenge: string; contribution: string; approach: string;
}) {
  const { t } = useExperience();
  return <div className="case-overview wrap">
    <dl className="case-opening-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <div className="case-opening-summary">{[
      [t('Desafio', 'Challenge', 'Desafío'), challenge],
      [t('Minha contribuição', 'My contribution', 'Mi contribución'), contribution],
      [t('Caminho escolhido', 'Chosen approach', 'Camino elegido'), approach],
    ].map(([label, value]) => <Reveal key={label}><h2>{label}</h2><p>{value}</p></Reveal>)}</div>
  </div>;
}

/** Illustrative placement only: never presents an invented application as delivered work. */
export function CaseVisualPlaceholder({ name, kind = 'interface' }: { name: string; kind?: 'brand' | 'interface' }) {
  const { t } = useExperience();
  return <figure className={`case-visual-placeholder case-placeholder-${kind}`}>
    <div className="case-placeholder-desktop" aria-hidden="true">
      <div className="case-placeholder-toolbar"><i/><i/><i/><span>{name}</span></div>
      <div className="case-placeholder-canvas">{kind === 'brand'
        ? <><span className="case-placeholder-monogram">Aa</span><div className="case-placeholder-swatches"><i/><i/><i/></div><div className="case-placeholder-lines"><i/><i/></div></>
        : <><div className="case-placeholder-lines"><i/><i/></div><div className="case-placeholder-panels"><i/><i/><i/></div></>}</div>
    </div>
    <div className="case-placeholder-card" aria-hidden="true"><span>{name}</span><i>↗</i></div>
    <figcaption>{t('Composição ilustrativa · espaço para imagens do projeto', 'Illustrative composition · space for project images', 'Composición ilustrativa · espacio para imágenes del proyecto')}</figcaption>
  </figure>;
}

export function CaseReading({ chapters, children }: { chapters: readonly CaseChapter[]; children: ReactNode }) {
  const paused = useMotionPaused(), { t } = useExperience();
  const root = useRef<HTMLDivElement>(null), nav = useRef<HTMLElement>(null);
  const [active, setActive] = useState(chapters[0]?.[1] ?? ''), [showSide, setShowSide] = useState(false);
  const chapterKey = chapters.map(([, id]) => id).join('|');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!root.current || !nav.current) return;
      const bounds = root.current.getBoundingClientRect();
      const offset = parseFloat(getComputedStyle(root.current).getPropertyValue('--case-nav-top')) || 78;
      setShowSide(bounds.top <= offset + 1 && bounds.bottom > innerHeight * .4);
      const sections = chapterKey.split('|').map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
      const current = sections.filter(el => el.getBoundingClientRect().top <= innerHeight * .42).at(-1) ?? sections[0];
      if (current) setActive(current.id);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [chapterKey]);
  useEffect(() => {
    const selected = nav.current?.querySelector<HTMLElement>('[aria-current="location"]');
    if (selected && nav.current) {
      const strip = selected.parentElement!;
      const left = selected.offsetLeft - strip.offsetLeft - (strip.clientWidth - selected.offsetWidth) / 2;
      strip.scrollTo({ left, behavior: paused ? 'instant' : 'smooth' });
    }
  }, [active, paused]);
  return <div className="case-reading" ref={root}>
    <nav ref={nav} className="case-reading-nav" aria-label={t('Capítulos do projeto', 'Project chapters', 'Capítulos del proyecto')}><div className="wrap" data-lenis-prevent>
      {chapters.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
    </div></nav>
    <aside className={`case-reading-shortcuts ${showSide ? 'is-visible' : ''}`} aria-label={t('Atalhos dos capítulos', 'Chapter shortcuts', 'Atajos de capítulos')} {...(!showSide ? { inert: '' } : {})}>
      {chapters.map(([label, id]) => <a key={id} href={`#${id}`} aria-label={label} data-label={label} aria-current={active === id ? 'location' : undefined}/>)}
    </aside>
    {children}
  </div>;
}

export function CaseReflection({ children }: { children: ReactNode }) {
  const { t } = useExperience();
  return <section className="case-reflection wrap"><Reveal><p className="case-opening-kicker">{t('O que levo deste projeto', 'What I take from this project', 'Lo que me llevo de este proyecto')}</p><WordPullUp as="h2" paused={useMotionPaused()} words={t('Uma decisão que fica para os próximos desafios.', 'A decision to carry into the next challenge.', 'Una decisión para los próximos desafíos.')}/><div className="case-reflection-copy">{children}</div></Reveal></section>;
}

export function CaseNext({ href = '/projetos', label }: { href?: string; label?: string }) {
  const { t } = useExperience();
  return <div className="case-next wrap"><a href={href}>{label ?? t('Explorar outros projetos', 'Explore other projects', 'Explorar otros proyectos')}<ArrowUpRight size={20}/></a></div>;
}
