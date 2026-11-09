import { useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Fluid, continuous smooth scrolling powered by Lenis + GSAP ScrollTrigger. */
export function useChapterScroll(home: boolean, paused: boolean) {
  const controller = useRef<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('home-chapters', home);

    if (paused) {
      controller.current = null;
      if (typeof window !== 'undefined') delete (window as any).__lenis;
      return () => {
        document.documentElement.classList.remove('home-chapters');
      };
    }

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      lerp: 0.11,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: false,
      anchors: { offset: 0 },
    });

    controller.current = lenis;
    if (typeof window !== 'undefined') (window as any).__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const refreshTimer = window.setTimeout(() => {
      try {
        lenis.resize();
        ScrollTrigger.refresh();
      } catch {}
    }, 150);

    return () => {
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(update);
      lenis.destroy();
      controller.current = null;
      if (typeof window !== 'undefined') delete (window as any).__lenis;
      document.documentElement.classList.remove('home-chapters');
    };
  }, [home, paused]);

  return useCallback(() => {
    if (controller.current) controller.current.scrollTo(0, { duration: 0.85, force: true });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
}

/** Smooth scroll to the contact/phone section with ease-in acceleration */
export function scrollToContact(options?: { onComplete?: () => void }) {
  if (typeof window === 'undefined') return;
  const target = document.getElementById('contato');
  if (!target) return;

  const isReduced =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('motion-paused');

  if (isReduced) {
    target.scrollIntoView({ behavior: 'instant' });
    options?.onComplete?.();
    return;
  }

  const lenis = (window as any).__lenis;
  // Ease-in easing function: starts gentle and accelerates towards the phone section
  const easeIn = (t: number) => Math.pow(t, 2.6);

  if (lenis && typeof lenis.scrollTo === 'function') {
    try { lenis.resize(); } catch {}
    lenis.scrollTo(target, {
      duration: 1.4,
      easing: easeIn,
      force: true,
      offset: -10,
      onComplete: options?.onComplete,
    });
  } else {
    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY - 10;
    const distance = targetY - startY;
    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeIn(progress));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        options?.onComplete?.();
      }
    };
    requestAnimationFrame(animate);
  }
}
