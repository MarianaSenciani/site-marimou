import { useEffect, useId, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience } from './experience-context';

export function BadgeExperience() {
  const { t } = useExperience(), paused = useMotionPaused();
  const section = useRef<HTMLDivElement>(null), pattern = useId().replace(/:/g, '');
  const x = useMotionValue(0), y = useMotionValue(0), rotate = useTransform(x, [-100, 100], [-12, 12]);
  const rope = useTransform(() => { const dx = x.get(), dy = y.get(), end = Math.max(0, 170 + dy); return `M 200 -20 C 200 ${end * .3}, ${200 + dx * .8} ${end * .7}, ${200 + dx} ${end}`; });
  const [pulls, setPulls] = useState(0), [ready, setReady] = useState(false);
  const activeAnimations = useRef<ReturnType<typeof animate>[]>([]);
  const stop = () => { activeAnimations.current.forEach(control => control.stop()); activeAnimations.current = []; };
  const returnToRest = () => { stop(); activeAnimations.current = [animate(x, 0, { type: 'spring', stiffness: 135, damping: 13 }), animate(y, 0, { type: 'spring', stiffness: 155, damping: 13 })]; };
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>, entered = false, previous = scrollY, down = true;
    const direction = () => { down = scrollY >= previous; previous = scrollY; };
    window.addEventListener('scroll', direction, { passive: true });
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= .25 && !entered) {
        entered = true; clearTimeout(timer); setPulls(0);
        if (paused) { stop(); x.set(0); y.set(0); setReady(true); return; }
        x.set(-22); y.set(-410); setReady(false);
        timer = setTimeout(() => { setReady(true); returnToRest(); }, down ? 500 : 0);
      } else if (!entry.isIntersecting) { entered = false; clearTimeout(timer); stop(); setReady(false); setPulls(0); }
    }, { threshold: [0, .25] });
    if (section.current) observer.observe(section.current);
    return () => { clearTimeout(timer); stop(); observer.disconnect(); window.removeEventListener('scroll', direction); };
  }, [paused]);
  const pull = () => setPulls(value => Math.min(2, value + 1));
  return <div className="physical-badge" ref={section}>
    <svg className="badge-cord" viewBox="0 0 400 550" aria-hidden="true"><defs><pattern id={pattern} width="330" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(90)"><image href="/assets/badge/cord.svg" width="330" height="22" preserveAspectRatio="none" /></pattern></defs><motion.path d={rope} fill="none" stroke="#4b5140" strokeWidth="24" /><motion.path d={rope} fill="none" stroke="#24281e" strokeWidth="19" /><motion.path d={rope} fill="none" stroke={`url(#${pattern})`} strokeWidth="24" strokeLinecap="butt" /></svg>
    <motion.div className="physical-badge-card" style={{ x, y, rotate, opacity: ready ? 1 : 0 }}
      drag={pulls < 2 && ready && !paused} dragConstraints={{ top: -70, bottom: 100, left: -90, right: 90 }} dragElastic={.15} dragMomentum={false}
      onDragStart={stop} onDragEnd={(_, info) => { returnToRest(); if (Math.hypot(info.offset.x, info.offset.y) > 28) pull(); }}
      tabIndex={0} role="button" aria-expanded={pulls === 2} aria-label={t('Puxe duas vezes ou pressione Enter duas vezes para revelar o cartão de contato', 'Pull twice or press Enter twice to reveal the contact card', 'Arrastra dos veces o pulsa Enter dos veces para revelar el contacto')}
      onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); pull(); } }}>
      <img className="badge-contact-art" src="/assets/badge/contact.svg" alt="" draggable={false} />
      <motion.div className="badge-front-flap" animate={{ rotateX: pulls === 2 ? 118 : 0 }} transition={{ duration: paused ? 0 : .75, type: 'tween', ease: [.22, 1, .36, 1] }}>
        <img className="badge-front-art" src="/assets/badge/front.svg" alt={t('Crachá de Mariana Senciani', 'Mariana Senciani’s badge', 'Credencial de Mariana Senciani')} draggable={false} />
        <div className="badge-back-art" aria-hidden="true"><span>mari mou ✳</span><strong>{t('Uma boa conversa pode ser o começo.', 'A good conversation can be the start.', 'Una buena conversación puede ser el comienzo.')}</strong></div>
      </motion.div>
      <img className="badge-clip-art" src="/assets/badge/clip.svg" alt="" draggable={false} />
    </motion.div>
    <div className="physical-badge-hint" aria-live="polite">{pulls === 2 ? <><span>{t('QR ilustrativo · contato pelo e-mail abaixo', 'Sample QR · use the email below to contact me', 'QR ilustrativo · contacto por correo abajo')}</span><button className="text-link" onClick={() => setPulls(0)}><RotateCcw size={14} />{t('Mais uma vez', 'Try again', 'Otra vez')}</button></> : <span>{t('Puxe e solte duas vezes', 'Pull and release twice', 'Arrastra y suelta dos veces')} <b>{pulls}/2</b></span>}</div>
  </div>;
}
