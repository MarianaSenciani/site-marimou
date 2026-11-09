import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience } from './experience-context';
import { ProgressiveCarousel } from '@/components/ui/progressive-carousel';
import './lwsa-media.css';
import { AndroidStatus } from './AndroidStatus';

export function LwsaPhoto({ src, title, alt }: { src: string; title: string; alt: string }) {
return <figure className="lwsa-documentary-photo"><img src={'/assets/cases/lwsa/'+src} alt={alt} loading="lazy" decoding="async"/><figcaption>{title}</figcaption></figure>;
}
function DigitalTouchpoints() {
const { t } = useExperience();
return <div className="lwsa-digital-stage"><div className="lwsa-digital-browser"><div className="lwsa-digital-toolbar" aria-hidden="true"><span>● ● ●</span><span>lwsa.tech</span></div><div className="lwsa-digital-scroll" tabIndex={0} role="region" aria-label={t('Explore o site LWSA com o scroll','Scroll to explore LWSA','Explora el sitio LWSA')} data-lenis-prevent><img src="/assets/cases/lwsa/website.png" alt="Site LWSA"/></div></div><div className="lwsa-digital-phone"><AndroidStatus/><div className="lwsa-digital-scroll" tabIndex={0} role="region" aria-label={t('Explore o Instagram com o scroll','Scroll to explore Instagram','Explora Instagram')} data-lenis-prevent><img src="/assets/cases/lwsa/instagram.png" alt="Instagram lwsa.tech"/></div></div><p className="lwsa-digital-hint">{t('Explore as telas com o scroll.','Scroll to explore the screens.','Explora las pantallas con el scroll.')}</p></div>;
}

function LwsaLaptopViewer({ paused, t }: { paused: boolean; t: (pt: string, en: string, es: string) => string }) {
  const stageRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stageRef, { amount: 0.35, once: true });
  const [isHovered, setIsHovered] = useState(false);
  const userInteractingRef = useRef(false);
  const userTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused || !isInView) return;

    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    // States: waiting after lid opens -> scrolling down -> resting at bottom -> smooth glide up -> resting at top -> repeat
    let state: 'waiting_open' | 'scrolling_down' | 'pause_bottom' | 'scrolling_up' | 'pause_top' = 'waiting_open';
    let stateStartTime = performance.now();
    let lastTime = performance.now();

    // Timings:
    // Lid opening takes 1150ms. Wait ~650ms after open before scrolling begins.
    const OPEN_DELAY_MS = 1800;
    const BOTTOM_PAUSE_MS = 2400;
    const TOP_PAUSE_MS = 1600;
    const SPEED_DOWN = 54; // px / sec (smooth, readable pace)
    const SPEED_UP = 420; // px / sec (swift and smooth return)

    const loop = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isHovered && !userInteractingRef.current) {
        const maxScroll = el.scrollHeight - el.clientHeight;

        if (maxScroll > 10) {
          if (state === 'waiting_open') {
            if (now - stateStartTime >= OPEN_DELAY_MS) {
              state = 'scrolling_down';
            }
          } else if (state === 'scrolling_down') {
            el.scrollTop += SPEED_DOWN * delta;
            if (el.scrollTop >= maxScroll - 2) {
              el.scrollTop = maxScroll;
              state = 'pause_bottom';
              stateStartTime = now;
            }
          } else if (state === 'pause_bottom') {
            if (now - stateStartTime >= BOTTOM_PAUSE_MS) {
              state = 'scrolling_up';
            }
          } else if (state === 'scrolling_up') {
            el.scrollTop -= SPEED_UP * delta;
            if (el.scrollTop <= 2) {
              el.scrollTop = 0;
              state = 'pause_top';
              stateStartTime = now;
            }
          } else if (state === 'pause_top') {
            if (now - stateStartTime >= TOP_PAUSE_MS) {
              state = 'scrolling_down';
            }
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
    };
  }, [isInView, paused, isHovered]);

  const onUserInteraction = () => {
    userInteractingRef.current = true;
    if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
    userTimeoutRef.current = setTimeout(() => {
      userInteractingRef.current = false;
    }, 2000);
  };

  return (
    <figure ref={stageRef} className="lwsa-laptop-stage">
      <div className="lwsa-laptop-perspective">
        <motion.div
          className="lwsa-laptop-lid"
          initial={paused ? false : { rotateX: -85, opacity: 0 }}
          whileInView={{ rotateX: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={
            paused
              ? { duration: 0 }
              : {
                  duration: 1.15,
                  ease: [0.16, 1, 0.3, 1],
                  opacity: { duration: 0.35 },
                }
          }
        >
          <div
            className="lwsa-mac-browser"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="lwsa-mac-bar" aria-hidden="true">
              <span className="lwsa-mac-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="lwsa-mac-nav">‹　›</span>
              <span className="lwsa-mac-address">investnews.com.br</span>
              <span className="lwsa-mac-actions">↗　＋</span>
            </div>
            <div className="lwsa-mac-viewport">
              <div
                ref={scrollRef}
                className="lwsa-article-scroll"
                onWheel={onUserInteraction}
                onTouchMove={onUserInteraction}
              >
                <img
                  src="/assets/cases/investnews-article.jpg"
                  alt={t(
                    'Matéria do InvestNews: Locaweb muda nome para LWSA e mira aquisições para expansão',
                    'InvestNews article: Locaweb changes its name to LWSA and targets acquisitions for expansion',
                    'Nota de InvestNews: Locaweb cambia su nombre a LWSA y apunta a adquisiciones para expandirse'
                  )}
                  decoding="async"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </motion.div>
        <div className="lwsa-laptop-base" aria-hidden="true">
          <span className="lwsa-laptop-notch" />
        </div>
      </div>
      <figcaption>
        {t(
          'Matéria original do InvestNews documentando a transição da marca.',
          'Original InvestNews article documenting the brand transition.',
          'Nota original de InvestNews que documenta la transición de la marca.'
        )}
      </figcaption>
    </figure>
  );
}

export function LwsaMedia({ chapter }: { chapter: number }) {
  const paused = useMotionPaused(),
    { t } = useExperience();

  if (chapter === 1) {
    return (
      <Reveal>
        <LwsaPhoto src="reception.jpg" title={t('Referências e pesquisa','References and research','Referencias e investigación')} alt={t('Recepção LWSA com marca no painel de madeira','LWSA reception with branded wooden wall','Recepción LWSA con marca en el panel de madera')}/>
      </Reveal>
    );
  }

  if (chapter === 2) {
    return (
      <Reveal>
        <ProgressiveCarousel
          label={t('Estudos e aplicações da identidade LWSA', 'LWSA identity studies and applications', 'Estudios y aplicaciones de la identidad LWSA')}
          items={[
            {
              id: 'evolution',
              phrase: t('A evolução da identidade.', 'The evolution of the identity.', 'La evolución de la identidad.'),
              image: "/assets/cases/lwsa/institutional-team.jpg",
            },
            {
              id: 'institutional',
              phrase: t('A marca no contexto institucional.', 'The brand in an institutional context.', 'La marca en el contexto institucional.'),
              image: "/assets/cases/lwsa/signage.jpg",
            },
            {
              id: 'workplace',
              phrase: t('A identidade acompanha o trabalho.','The identity at work.','La identidad acompaña el trabajo.'),
              image: '/assets/cases/lwsa/brand-in-use.jpg',
              alt: t('Mãos no notebook Dell com o site LWSA','Hands on a Dell laptop showing LWSA','Manos en un portátil Dell con LWSA'),
            },
            {
              id: 'digital',
              phrase: t('Uma identidade nos pontos de contato digitais.', 'An identity across digital touchpoints.', 'Una identidad en los puntos de contacto digitales.'),
              content: <DigitalTouchpoints />,
            },
            {
              id: 'onboarding',
              phrase: t('A marca no dia a dia · Mockup de onboarding.','The everyday brand · Onboarding mockup.','La marca cotidiana · Mockup de onboarding.'),
              image: '/assets/cases/lwsa/onboarding.png',
              alt: t('Mockup ilustrativo: caderno, caneta, notebook Dell e mochila','Illustrative mockup: notebook, pen, Dell laptop and backpack','Mockup ilustrativo: cuaderno, bolígrafo, portátil Dell y mochila'),
            },
          ]}
        />
      </Reveal>
    );
  }

  if (chapter !== 3) return null;

  return (
    <Reveal>
      <article className="lwsa-press">
        <div className="lwsa-press-copy">
          <p className="lwsa-press-eyebrow">{t('Na imprensa · InvestNews', 'In the press · InvestNews', 'En la prensa · InvestNews')}</p>
          <h3>
            {t(
              'A nova fase da marca ganhou espaço no noticiário.',
              'The brand’s new phase made it into the news.',
              'La nueva etapa de la marca ganó espacio en las noticias.'
            )}
          </h3>
          <p>
            {t(
              'A matéria apresenta a mudança de Locaweb para LWSA no contexto de expansão do grupo e de novas aquisições. É um registro público do lançamento e do posicionamento que orientou o projeto.',
              'The article presents the change from Locaweb to LWSA in the context of the group’s expansion and new acquisitions. It is a public record of the launch and of the positioning that guided the project.',
              'La nota presenta el cambio de Locaweb a LWSA en el contexto de expansión del grupo y de novas aquisições. É um registro público del lanzamiento y del posicionamento que orientó el projeto.'
            )}
          </p>
          <a
            className="pill primary"
            href="https://investnews.com.br/negocios/locaweb-muda-nome-para-lwsa-e-mira-aquisicoes-para-expansao/"
            target="_blank"
            rel="noreferrer"
          >
            {t('Ler no InvestNews', 'Read on InvestNews', 'Leer en InvestNews')} <ArrowUpRight size={18} />
          </a>
        </div>

        <LwsaLaptopViewer paused={paused} t={t} />
      </article>
    </Reveal>
  );
}

