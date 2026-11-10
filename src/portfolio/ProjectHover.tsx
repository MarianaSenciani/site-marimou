import { AndroidStatus } from './AndroidStatus';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useMotionPaused } from '@/components/ui/motion-context';
import './project-hover.css';

export function ProjectHover({ id }: { id: string }) {
  const root = useRef<HTMLDivElement>(null), video = useRef<HTMLVideoElement>(null);
  const paused = useMotionPaused(), reduced = useReducedMotion();
  useEffect(() => {
    const card = root.current?.closest('a');
    if (!card || !video.current) return;
    let timer: ReturnType<typeof setTimeout>;
    const stop = () => { clearTimeout(timer); video.current?.pause(); };
    const start = () => { stop(); if (!paused && !reduced && matchMedia('(hover:hover)').matches && !document.hidden) timer = setTimeout(() => { video.current?.play().catch(() => {}); }, 900); };
    const exit = () => { if (!card.matches(':hover, :focus-within')) stop(); };
    const visibility = () => { if (document.hidden) stop(); };
    card.addEventListener('pointerenter', start); card.addEventListener('pointerleave', exit); card.addEventListener('focusin', start); card.addEventListener('focusout', exit); document.addEventListener('visibilitychange', visibility);
    return () => { stop(); card.removeEventListener('pointerenter', start); card.removeEventListener('pointerleave', exit); card.removeEventListener('focusin', start); card.removeEventListener('focusout', exit); document.removeEventListener('visibilitychange', visibility); };
  }, [paused, reduced]);
  return <div ref={root} className={`project-hover hover-${id} project-hover-sequential ${paused || reduced ? 'is-still' : ''}`} aria-hidden="true">
    {id === 'sicredi' ? <><div className="hover-tablet project-hover-item" style={{ '--sequence-index': 0 } as React.CSSProperties}><img src="/assets/cases/sicredi/pj-desktop.png" alt="" loading="lazy"/></div><div className="hover-phone project-hover-item" style={{ '--sequence-index': 1 } as React.CSSProperties}><AndroidStatus /><video ref={video} src="/assets/cases/sicredi/agro-mobile.mp4" poster="/assets/cases/sicredi/agro-mobile.png" muted loop playsInline preload="none" tabIndex={-1}/></div></> : id === 'lwsa' ? <>
      <div className="hover-polaroid hover-polaroid-0 project-hover-item" style={{ '--sequence-index': 0 } as React.CSSProperties}><div className="hover-polaroid-photo"><img className="hover-polaroid-team-img" src="/assets/cases/lwsa/team.jpg" alt="" loading="lazy"/></div></div>
      <div className="hover-polaroid hover-polaroid-1 project-hover-item" style={{ '--sequence-index': 1 } as React.CSSProperties}><div className="hover-polaroid-photo"><img className="hover-polaroid-entrance-img" src="/assets/cases/lwsa/institutional-team.jpg" alt="" loading="lazy"/></div></div>
      <div className="hover-polaroid hover-polaroid-2 project-hover-item" style={{ '--sequence-index': 2 } as React.CSSProperties}><div className="hover-polaroid-photo"><img className="hover-polaroid-reception-img" src="/assets/cases/lwsa/reception.jpg" alt="" loading="lazy"/></div></div>
    </> : <>
      <div className="hover-phone hover-livo-phone hover-livo-phone-0 project-hover-item" style={{ '--sequence-index': 0 } as React.CSSProperties}><AndroidStatus /><img src="/assets/cases/livo/home.png" alt="" loading="lazy"/></div>
      <div className="hover-phone hover-livo-phone hover-livo-phone-1 project-hover-item" style={{ '--sequence-index': 1 } as React.CSSProperties}><AndroidStatus /><img src="/assets/cases/livo/produto.png" alt="" loading="lazy"/></div>
      <div className="hover-phone hover-livo-phone hover-livo-phone-2 project-hover-item" style={{ '--sequence-index': 2 } as React.CSSProperties}><AndroidStatus /><img src="/assets/cases/livo/checkout.png" alt="" loading="lazy"/></div>
    </>}
  </div>;
}

