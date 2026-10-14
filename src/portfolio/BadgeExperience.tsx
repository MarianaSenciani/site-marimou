import { useEffect, useId, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience } from './experience-context';

export function BadgeExperience() {
  const { t } = useExperience(), paused = useMotionPaused();
  const section = useRef<HTMLDivElement>(null), card = useRef<HTMLDivElement>(null), clip = useRef<HTMLImageElement>(null), pattern = useId().replace(/:/g, '');
  const [geometry, setGeometry] = useState({ width: 400, height: 580, top: 150, anchor: -42 });
  const x = useMotionValue(0), y = useMotionValue(0), rotate = useTransform(x, [-100, 100], [-10, 10]);
  const rope = useTransform(() => { const cx = geometry.width / 2, dx = x.get(), end = geometry.top + geometry.anchor + y.get(); return `M ${cx} -1200 C ${cx} ${end - 450}, ${cx + dx * .65} ${end * .72}, ${cx + dx} ${end}`; });
  const [revealed, setRevealed] = useState(false), [ready, setReady] = useState(false);
  const activeAnimations = useRef<ReturnType<typeof animate>[]>([]);
  const stop = () => { activeAnimations.current.forEach(control => control.stop()); activeAnimations.current = []; };
  const returnToRest = () => { stop(); activeAnimations.current = [animate(x, 0, { type: 'spring', stiffness: 135, damping: 13 }), animate(y, 0, { type: 'spring', stiffness: 155, damping: 13 })]; };
  useEffect(() => {
    const measure = () => {
      if (!section.current || !card.current || !clip.current) return;
      const clipTop = parseFloat(getComputedStyle(clip.current).top);
      const next = { width: section.current.clientWidth, height: section.current.clientHeight, top: card.current.offsetTop, anchor: clipTop + clip.current.clientHeight * .12 };
      setGeometry(current => Object.keys(next).every(key => current[key as keyof typeof next] === next[key as keyof typeof next]) ? current : next);
    };
    const observer = new ResizeObserver(measure);
    if (section.current) observer.observe(section.current);
    if (card.current) observer.observe(card.current);
    measure(); return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>, entered = false, previous = scrollY, down = true;
    const direction = () => { down = scrollY >= previous; previous = scrollY; };
    window.addEventListener('scroll', direction, { passive: true });
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= .25 && !entered) {
        entered = true; clearTimeout(timer); setRevealed(false);
        if (paused) { stop(); x.set(0); y.set(0); setReady(true); return; }
        x.set(-22); y.set(-410); setReady(false);
        timer = setTimeout(() => { setReady(true); returnToRest(); }, down ? 500 : 0);
      } else if (!entry.isIntersecting) { entered = false; clearTimeout(timer); stop(); setReady(false); setRevealed(false); }
    }, { threshold: [0, .25] });
    if (section.current) observer.observe(section.current);
    return () => { clearTimeout(timer); stop(); observer.disconnect(); window.removeEventListener('scroll', direction); };
  }, [paused]);
  return <div className="physical-badge" ref={section}>
    <svg className="badge-cord" viewBox={`0 0 ${geometry.width} ${geometry.height}`} style={{ opacity: ready ? 1 : 0 }} aria-hidden="true"><defs><pattern id={pattern} width="550.8" height="22" patternUnits="userSpaceOnUse" patternTransform={`translate(${geometry.width / 2 + 11} 0) rotate(90)`}><image href="/assets/badge/cord.svg?v=2f4e4337" width="550.8" height="22" preserveAspectRatio="none" /></pattern></defs><motion.path d={rope} fill="none" stroke="#bddb42" strokeWidth="24" /><motion.path d={rope} fill="none" stroke="#bddb42" strokeWidth="19" /><motion.path d={rope} fill="none" stroke={`url(#${pattern})`} strokeWidth="24" strokeLinecap="butt" /></svg>
    <motion.div ref={card} className="physical-badge-card" style={{ x, y, rotate, opacity: ready ? 1 : 0, transformOrigin: `50% ${geometry.anchor}px` }}
      drag={ready && !paused} dragConstraints={{ top: -65, bottom: 85, left: -80, right: 80 }} dragElastic={.08} dragMomentum={false}
      onDragStart={stop} onDragEnd={(_, info) => { returnToRest(); if (Math.hypot(info.offset.x, info.offset.y) > 24) setRevealed(current => !current); }}
      tabIndex={ready ? 0 : -1} role="button" aria-pressed={revealed} aria-label={revealed ? t('Verso do crachá. Puxe e solte ou pressione Enter para ver a frente.', 'Back of the badge. Pull and release or press Enter to see the front.', 'Reverso de la credencial. Arrastra o pulsa Enter para ver el frente.') : t('Frente do crachá. Puxe e solte ou pressione Enter para ver o verso.', 'Front of the badge. Pull and release or press Enter to see the back.', 'Frente de la credencial. Arrastra o pulsa Enter para ver el reverso.')}
      onKeyDown={event => { if (ready && !event.repeat && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); setRevealed(current => !current); } }}>
      <motion.div className="badge-turnover" animate={{ rotateY: revealed ? 180 : 0 }} transition={{ duration: paused ? 0 : .85, ease: [.22, 1, .36, 1] }}>
        <div className="badge-face badge-face-front" aria-hidden={revealed}><img src="/assets/badge/front.svg?v=857da831" alt={t('Frente do crachá de Mariana Senciani', 'Front of Mariana Senciani’s badge', 'Frente de la credencial de Mariana Senciani')} draggable={false} /></div>
        <div className="badge-face badge-face-back" aria-hidden={!revealed}><img src="/assets/badge/back.svg?v=89edd69b" alt={t('Verso do crachá de Mariana Senciani', 'Back of Mariana Senciani’s badge', 'Reverso de la credencial de Mariana Senciani')} draggable={false} />
      <svg className="badge-qr-placeholder" viewBox="0 0 21 21" aria-label={t('QR ilustrativo, link do WhatsApp a definir', 'Sample QR, WhatsApp link pending', 'QR ilustrativo, enlace de WhatsApp por definir')} role="img">
        <rect width="21" height="21" fill="#f2f1e8"/>
        {[[1,1],[13,1],[1,13]].map(([left,top]) => <g key={`${left}-${top}`}><rect x={left} y={top} width="7" height="7" fill="#26321c"/><rect x={left+1} y={top+1} width="5" height="5" fill="#f2f1e8"/><rect x={left+2} y={top+2} width="3" height="3" fill="#26321c"/></g>)}
        {Array.from({length: 19 * 19}, (_, i) => { const cx = i % 19 + 1, cy = Math.floor(i / 19) + 1; if ((cx < 9 && cy < 9) || (cx > 11 && cy < 9) || (cx < 9 && cy > 11) || (cx * 7 + cy * 11 + cx * cy) % 5 > 1) return null; return <rect key={i} x={cx} y={cy} width="1" height="1" fill="#26321c"/>; })}
      </svg>
        </div>
      </motion.div>
      <img ref={clip} className="badge-clip-art" src="/assets/badge/clip.svg?v=54d6e49a" alt="" draggable={false} />
    </motion.div>
    {!revealed && <div className="physical-badge-hint">{t('Puxe e solte para descobrir', 'Pull and release to discover', 'Arrastra y suelta para descubrir')}</div>}
  </div>;
}
