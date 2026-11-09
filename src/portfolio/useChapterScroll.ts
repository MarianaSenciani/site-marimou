import { useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fluid, section-by-section viewport navigation for Home and About.
 * Starts with Hero at 100% viewport and glides smoothly with a single small gesture ("meio scroll").
 * Retains continuous smooth scrolling for other pages.
 */
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
      smoothWheel: !home,
      virtualScroll: () => !home,
      lerp: 0.12,
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

    if (!home) {
      return () => {
        window.clearTimeout(refreshTimer);
        gsap.ticker.remove(update);
        lenis.destroy();
        controller.current = null;
        if (typeof window !== 'undefined') delete (window as any).__lenis;
        document.documentElement.classList.remove('home-chapters');
      };
    }

    // --- VIEWPORT NAVIGATION LOGIC FOR HOME & SOBRE ---
    let isAnimating = false;
    let animationEndTime = 0;
    let accumulatedDelta = 0;
    let lastWheelTime = 0;
    let lastDirection = 0;

    const isNestedScroll = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return !!target.closest(
        '[data-lenis-prevent], .mari-chat, .chat-history, .compact-menu-panel, input, textarea, select, [contenteditable="true"]'
      );
    };

    const getSnapTargets = (): number[] => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('#main-content > *, .site-footer'));
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const targets: number[] = [0];

      nodes.forEach((node, index) => {
        if (index === 0) return;
        const top = Math.round(node.getBoundingClientRect().top + window.scrollY);
        const height = node.offsetHeight;
        const bottom = top + height;

        if (node.id === 'jornada' || node.classList.contains('career-journey')) {
          const entries = Array.from(node.querySelectorAll<HTMLElement>('.career-entry'));
          targets.push(Math.min(top, maxScroll));
          if (entries.length >= 4) {
            const midEntry = entries[3];
            const midTop = Math.round(midEntry.getBoundingClientRect().top + window.scrollY - 125);
            if (midTop > top + 150) {
              targets.push(Math.min(midTop, maxScroll));
            }
          }
        } else if (height <= window.innerHeight + 80) {
          targets.push(Math.min(top, maxScroll));
        } else {
          // Tall section
          targets.push(Math.min(top, maxScroll));
          const bottomSnap = Math.min(bottom - window.innerHeight, maxScroll);
          if (bottomSnap > top + 100) {
            if (height > window.innerHeight * 2.2) {
              let step = top + window.innerHeight * 0.9;
              while (step < bottomSnap - 150) {
                targets.push(Math.round(step));
                step += window.innerHeight * 0.9;
              }
            }
            targets.push(bottomSnap);
          }
        }
      });

      const unique: number[] = [];
      targets
        .filter(t => t >= 0 && t <= maxScroll)
        .sort((a, b) => a - b)
        .forEach(t => {
          if (unique.length === 0 || t - unique[unique.length - 1] > 40) {
            unique.push(t);
          }
        });

      if (unique.length === 0 || unique[unique.length - 1] < maxScroll - 30) {
        unique.push(maxScroll);
      }

      return unique;
    };

    const advance = (dir: number) => {
      const targets = getSnapTargets();
      const currentY = window.scrollY;

      let closestIndex = 0;
      let minDiff = Infinity;
      for (let i = 0; i < targets.length; i++) {
        const diff = Math.abs(targets[i] - currentY);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      }

      let nextIndex = closestIndex;
      if (dir > 0) {
        if (targets[closestIndex] > currentY + 15) {
          nextIndex = closestIndex;
        } else {
          nextIndex = Math.min(targets.length - 1, closestIndex + 1);
        }
      } else {
        if (targets[closestIndex] < currentY - 15) {
          nextIndex = closestIndex;
        } else {
          nextIndex = Math.max(0, closestIndex - 1);
        }
      }

      const destination = targets[nextIndex];
      if (Math.abs(destination - currentY) < 2) return;

      isAnimating = true;
      animationEndTime = performance.now() + 720;

      lenis.scrollTo(destination, {
        duration: 0.72,
        easing: (t: number) => 1 - Math.pow(1 - t, 3.2),
        force: true,
        onComplete: () => {
          isAnimating = false;
        },
      });
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (isNestedScroll(event.target)) return;

      event.preventDefault();

      const now = performance.now();
      const deltaY = event.deltaY * (event.deltaMode === 1 ? 24 : event.deltaMode === 2 ? window.innerHeight : 1);
      const direction = Math.sign(deltaY);
      if (!direction) return;

      if (isAnimating && now >= animationEndTime) {
        isAnimating = false;
      }

      const idle = now - lastWheelTime > 130;
      lastWheelTime = now;

      // Direction change or idle resets the accumulator
      if (idle || (lastDirection !== 0 && direction !== lastDirection)) {
        accumulatedDelta = 0;
      }
      lastDirection = direction;

      // If animation is in flight:
      if (isAnimating) {
        // If direction changed, allow immediate reverse!
        if (direction !== lastDirection) {
          accumulatedDelta = deltaY;
        } else if (now < animationEndTime - 160) {
          // Ignore momentum tail during early part of slide
          return;
        }
      }

      accumulatedDelta += deltaY;

      // "Meio scroll que seja": small threshold (15px) triggers the smooth glide!
      if (Math.abs(accumulatedDelta) >= 15) {
        advance(Math.sign(accumulatedDelta));
        accumulatedDelta = 0;
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || isNestedScroll(event.target)) return;
      if (event.target instanceof Element && event.target.closest('button, a, input, textarea')) return;

      const dir = ['ArrowDown', 'PageDown', ' '].includes(event.key)
        ? (event.shiftKey ? -1 : 1)
        : ['ArrowUp', 'PageUp'].includes(event.key)
        ? -1
        : 0;

      if (dir !== 0) {
        event.preventDefault();
        advance(dir);
      }
    };

    let touchStartY = 0;
    let touchStartX = 0;
    let touchActive = false;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1 || isNestedScroll(event.target)) return;
      if (event.target instanceof Element && event.target.closest('.story-polaroid, .about-v1-polaroid, .physical-badge-card')) return;
      touchStartY = event.touches[0].clientY;
      touchStartX = event.touches[0].clientX;
      touchActive = true;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!touchActive || !event.changedTouches.length) return;
      touchActive = false;
      const dy = touchStartY - event.changedTouches[0].clientY;
      const dx = touchStartX - event.changedTouches[0].clientX;
      if (Math.abs(dy) > 42 && Math.abs(dy) > Math.abs(dx) * 1.2) {
        advance(Math.sign(dy));
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel, true);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
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
