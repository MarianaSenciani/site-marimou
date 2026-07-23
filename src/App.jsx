import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import SobreMimTeaser from './components/SobreMimTeaser.jsx';
import Servicos from './components/Servicos.jsx';
import Portfolio from './components/Portfolio.jsx';
import Footer from './components/Footer.jsx';
import Sobre from './components/Sobre.jsx';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function App() {
  const rootRef = useRef(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Escuta os botões de voltar/avançar do navegador
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Habilita/desabilita scroll-snap conforme a página (apenas na Home "/")
  useEffect(() => {
    const html = document.documentElement;
    if (currentPath === '/') {
      html.classList.add('snap-enabled');
    } else {
      html.classList.remove('snap-enabled');
    }
  }, [currentPath]);

  // Intercepta cliques em links locais para fazer navegação SPA suave
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignora links externos, PDFs, novas abas, etc.
      if (
        anchor.getAttribute('target') === '_blank' ||
        anchor.hasAttribute('download') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('http')
      ) {
        return;
      }

      if (href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        const parts = href.split('#');
        const path = parts[0] || '/';
        const hash = parts[1] || '';

        window.history.pushState({}, '', href);
        setCurrentPath(path);

        if (hash) {
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } else {
          window.scrollTo(0, 0);
        }
      } else if (href.startsWith('#')) {
        e.preventDefault();
        const hash = href.substring(1);

        if (window.location.pathname !== '/') {
          window.history.pushState({}, '', '/' + href);
          setCurrentPath('/');
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        } else {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Acessibilidade: sem animação, mostra tudo direto.
    if (reduceMotion) {
      root.classList.remove('gsap-enabled');
      return undefined;
    }

    let ctx;
    try {
      ctx = gsap.context(() => {
        // 1) Texto: SplitText em linhas, cada linha sobe atrás de uma máscara (efeito AutoSplit).
        gsap.utils.toArray('[data-split]').forEach((el) => {
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { opacity: 1 });
              return gsap.from(self.lines, {
                yPercent: 110,
                autoAlpha: 0,
                duration: 0.85,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              });
            },
          });
        });

        // 2) Elementos genéricos (imagens, cards, botões): fade + slide-up.
        gsap.utils.toArray('.reveal').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // 3) Ícones de ferramentas: só fade (o transform fica reservado para o hover spring).
        gsap.utils.toArray('.reveal-fade').forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // 4) Animação de entrada do "riscadinho" verde: aparece um instante
        //    depois do resto do conteúdo, desenhando o sublinhado da esquerda p/ direita.
        gsap.fromTo(
          '.risco',
          { backgroundSize: '0% 3px' },
          {
            backgroundSize: '100% 3px',
            duration: 0.6,
            delay: 0.7,
            ease: 'power2.out',
          }
        );
      }, rootRef);
    } catch (err) {
      // Se algo falhar, garante que o conteúdo apareça.
      root.classList.remove('gsap-enabled');
      // eslint-disable-next-line no-console
      console.error('Falha ao inicializar animações GSAP:', err);
      return undefined;
    }

    return () => {
      ctx && ctx.revert();
    };
  }, [currentPath]); // Re-inicia animações quando a rota muda

  return (
    <div ref={rootRef} className={`font-alexandria ${currentPath === '/sobre' ? 'bg-[#303324]' : ''}`}>
      <Header currentPath={currentPath} />
      {currentPath === '/sobre' ? (
        <Sobre />
      ) : (
        <>
          <Hero />
          <SobreMimTeaser />
          <Servicos />
          <Portfolio />
        </>
      )}
      <Footer />
    </div>
  );
}
