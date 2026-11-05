import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { useMotionPaused } from './motion-context';
import './progressive-carousel.css';

export type ProgressiveSlide = { id: string; phrase: string; image?: string; alt?: string; content?: ReactNode };

/** The caption's top edge is the timer; the image and caption backgrounds stay unchanged. */
export function ProgressiveCarousel({ items, duration = 6500, label = 'Imagens do projeto' }: { items: readonly ProgressiveSlide[]; duration?: number; label?: string }) {
  const [active, setActive] = useState(0), [stopped, setStopped] = useState(false), [progressCycle, setProgressCycle] = useState(0);
  const [hovered, setHovered] = useState(false), [focused, setFocused] = useState(false), [visible, setVisible] = useState(false), [hidden, setHidden] = useState(false);
  const root = useRef<HTMLDivElement>(null), reduced = useReducedMotion(), globallyPaused = useMotionPaused(), id = useId();
  const index = Math.min(active, Math.max(0, items.length - 1));
  const slide = items[index];
  const running = items.length > 1 && !stopped && !hovered && !focused && visible && !hidden && !reduced && !globallyPaused;
  const runningRef = useRef(running);
  runningRef.current = running;
  useEffect(() => { if (running) setProgressCycle(value => value + 1); }, [running]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (root.current) observer.observe(root.current);
    const onVisibility = () => setHidden(document.hidden);
    onVisibility(); document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  useEffect(() => {
    if (focused) root.current?.querySelector<HTMLElement>('[aria-pressed="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  }, [index, focused]);
  if (!slide) return null;
  return <div ref={root} className="progressive-carousel" role="region" aria-roledescription="carrossel" aria-label={label}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="progressive-carousel-stage" id={`${id}-image`} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${items.length}: ${slide.phrase}`}>
      <motion.div key={slide.id} className="progressive-carousel-image" initial={{ opacity: reduced || globallyPaused ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: .45 }}>
        {slide.image ? <img src={slide.image} alt={slide.alt || slide.phrase}/> : slide.content}
      </motion.div>
    </div>
    {items.length > 1 && <button className="progressive-carousel-play" type="button" aria-label={stopped ? 'Retomar troca automática' : 'Pausar troca automática'} aria-pressed={stopped} onClick={() => setStopped(value => !value)} disabled={!!reduced || globallyPaused}>{stopped || reduced || globallyPaused ? <Play size={16}/> : <Pause size={16}/>}</button>}
    <div className="progressive-carousel-captions" aria-label="Selecionar imagem">
      {items.map((item, i) => <button type="button" key={item.id} aria-pressed={index === i} aria-controls={`${id}-image`} onClick={() => setActive(i)}>
        <span className="progressive-carousel-timer" aria-hidden="true">{index === i && <span key={`${item.id}-${index}-${progressCycle}`} style={{ animationDuration: `${Math.max(2000, duration)}ms` }} onAnimationEnd={() => { if (runningRef.current) setActive(value => (value + 1) % items.length); }}/>}</span>
        <span>{item.phrase}</span>
      </button>)}
    </div>
  </div>;
}
