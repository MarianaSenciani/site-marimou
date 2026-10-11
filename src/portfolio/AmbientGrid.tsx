import { useEffect, useRef } from 'react';
import { useMotionPaused } from '@/components/ui/motion-context';

export function AmbientGrid() {
  const paused = useMotionPaused();
  const glow = useRef<HTMLDivElement>(null), grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (paused || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const align = () => { if (grid.current) grid.current.style.backgroundPosition = `0 ${-scrollY % 40}px`; };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !glow.current || !grid.current) return;
      // Direct updates keep the glow and highlighted grid attached to the cursor.
      glow.current.style.transform = `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
      glow.current.style.opacity = '1';
      grid.current.style.setProperty('--cursor-x', `${event.clientX}px`);
      grid.current.style.setProperty('--cursor-y', `${event.clientY}px`);
      grid.current.style.opacity = '1';
    };
    const leave = () => { if (glow.current) glow.current.style.opacity = '0'; if (grid.current) grid.current.style.opacity = '0'; };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', align, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    align();
    return () => { leave(); window.removeEventListener('pointermove', move); window.removeEventListener('scroll', align); document.documentElement.removeEventListener('pointerleave', leave); window.removeEventListener('blur', leave); };
  }, [paused]);
  return <><div ref={glow} className="ambient-grid-glow" aria-hidden="true" /><div ref={grid} className="ambient-grid-highlight" aria-hidden="true" /></>;
}
