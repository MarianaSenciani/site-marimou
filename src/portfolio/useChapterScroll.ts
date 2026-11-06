import { useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';

/** One intentional wheel gesture per chapter; long chapters retain their readable content. */
export function useChapterScroll(home: boolean, paused: boolean) {
  const controller = useRef<Lenis | null>(null);
  useEffect(() => {
    document.documentElement.classList.toggle('home-chapters', home);
    // Home gestures are handled below; Lenis only animates the requested slides.
    const lenis = paused ? null : new Lenis({ autoRaf: true, smoothWheel: !home, virtualScroll: () => !home, lerp: .14, anchors: { offset: 0 } });
    controller.current = lenis;
    if (typeof window !== "undefined") (window as any).__lenis = lenis;
    if (!home) return () => { lenis?.destroy(); controller.current = null; if (typeof window !== "undefined") delete (window as any).__lenis; document.documentElement.classList.remove('home-chapters'); };
    let lockedUntil = 0, lastWheel = 0, accumulated = 0, lastDirection = 0;
    const nested = (target: EventTarget | null) => target instanceof Element && !!target.closest('[data-lenis-prevent], .compact-menu-panel, input, textarea, select, [contenteditable="true"]');
    const advance = (direction: number) => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('#main-content > *, .site-footer'));
      const tops = nodes.map((node, index) => index === 0 ? 0 : Math.min(node.getBoundingClientRect().top + scrollY, document.documentElement.scrollHeight - innerHeight));
      let current = 0;
      tops.forEach((top, index) => { if (top <= scrollY + 15) current = index; });

      let destination = scrollY;
      if (direction > 0) {
        const currentNode = nodes[current];
        const isCurrentTall = currentNode && currentNode.offsetHeight > innerHeight + 60;
        const currentTop = tops[current];
        const currentBottom = currentTop + (currentNode ? currentNode.offsetHeight : innerHeight);

        const maxScrollInNode = currentBottom - innerHeight;
        const scrollable = Math.max(0, maxScrollInNode - currentTop);
        const steps = Math.max(2, Math.ceil(scrollable / (innerHeight * 0.55)));
        const stepSize = scrollable > 0 ? scrollable / steps : innerHeight;

        if (isCurrentTall && scrollY < maxScrollInNode - 20) {
          destination = Math.min(scrollY + stepSize, maxScrollInNode);
        } else {
          destination = tops[current + 1] ?? scrollY;
        }
      } else {
        const currentNode = nodes[current];
        const isCurrentTall = currentNode && currentNode.offsetHeight > innerHeight + 60;
        const currentTop = tops[current];
        const currentBottom = currentTop + (currentNode ? currentNode.offsetHeight : innerHeight);
        const maxScrollInNode = currentBottom - innerHeight;
        const scrollable = Math.max(0, maxScrollInNode - currentTop);
        const steps = Math.max(2, Math.ceil(scrollable / (innerHeight * 0.55)));
        const stepSize = scrollable > 0 ? scrollable / steps : innerHeight;

        if (isCurrentTall && scrollY > currentTop + 20) {
          destination = Math.max(currentTop, scrollY - stepSize);
        } else {
          const prevIndex = Math.max(0, current - 1);
          const prevNode = nodes[prevIndex];
          const prevTop = tops[prevIndex];
          if (prevNode && prevNode.offsetHeight > innerHeight + 60) {
            destination = Math.max(prevTop, prevTop + prevNode.offsetHeight - innerHeight);
          } else {
            destination = prevTop;
          }
        }
      }
      if (Math.abs(destination - scrollY) < 2) return;
      lockedUntil = performance.now() + (paused ? 180 : 700);
      if (lenis) lenis.scrollTo(destination, { duration: .7, easing: progress => 1 - Math.pow(1 - progress, 3), force: true });
      else window.scrollTo({ top: destination, behavior: 'instant' });
    };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.shiftKey || nested(event.target) || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
      event.preventDefault();
      const now = performance.now(), idle = now - lastWheel > 180;
      const direction = Math.sign(event.deltaY), reversed = lastDirection !== 0 && direction !== lastDirection;
      lastWheel = now;
      lastDirection = direction;
      // A new gesture or a direction change can interrupt the current slide.
      if (idle || reversed) accumulated = 0;
      if (now < lockedUntil && !idle && !reversed) return;
      if (accumulated === Infinity) return; // Ignore the inertial tail of the same gesture.
      accumulated += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (Math.abs(accumulated) >= 18) { advance(Math.sign(accumulated)); accumulated = Infinity; }
    };
    const key = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || nested(event.target) || (event.target instanceof Element && event.target.closest('button,a'))) return;
      const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key) ? (event.shiftKey ? -1 : 1) : ['ArrowUp', 'PageUp'].includes(event.key) ? -1 : 0;
      if (direction) {
        event.preventDefault();
        if (performance.now() >= lockedUntil || direction !== lastDirection) { lastDirection = direction; advance(direction); }
      }
    };
    let touch: { x: number; y: number; chapter: boolean } | null = null;
    const touchStart = (event: TouchEvent) => {
      touch = null;
      if (event.touches.length !== 1 || nested(event.target) || (event.target instanceof Element && event.target.closest('.physical-badge-card, .story-polaroid'))) return;
      const chapters = Array.from(document.querySelectorAll<HTMLElement>('#main-content > *'));
      const section = chapters.find(node => { const rect = node.getBoundingClientRect(); return rect.top <= 80 && rect.bottom > 80; });
      touch = { x: event.touches[0].clientX, y: event.touches[0].clientY, chapter: !!section && section.offsetHeight <= innerHeight + 5 };
    };
    const touchMove = (event: TouchEvent) => {
      if (!touch?.chapter || event.touches.length !== 1) return;
      const dx = event.touches[0].clientX - touch.x, dy = event.touches[0].clientY - touch.y;
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10 && event.cancelable) event.preventDefault();
    };
    const touchEnd = (event: TouchEvent) => {
      if (!touch?.chapter || !event.changedTouches.length) { touch = null; return; }
      const dx = event.changedTouches[0].clientX - touch.x, dy = touch.y - event.changedTouches[0].clientY;
      if (Math.abs(dy) > 45 && Math.abs(dy) > Math.abs(dx) && performance.now() >= lockedUntil) advance(Math.sign(dy));
      touch = null;
    };
    window.addEventListener('touchstart', touchStart, { passive: true });
    window.addEventListener('touchmove', touchMove, { passive: false });
    window.addEventListener('touchend', touchEnd, { passive: true });
    window.addEventListener('wheel', wheel, { passive: false, capture: true });
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('touchstart', touchStart); window.removeEventListener('touchmove', touchMove); window.removeEventListener('touchend', touchEnd); window.removeEventListener('wheel', wheel, true); window.removeEventListener('keydown', key); lenis?.destroy(); controller.current = null; document.documentElement.classList.remove('home-chapters'); };
  }, [home, paused]);
  return useCallback(() => {
    if (controller.current) controller.current.scrollTo(0, { duration: .85, force: true });
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
