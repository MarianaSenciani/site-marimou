import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, UserRound } from 'lucide-react';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience } from './experience-context';

interface RecommendationEntry {
  paragraphs: string[];
  author: string;
  role: string;
  companyName?: string;
  avatarSrc?: string;
}

export function Recommendations() {
  const { t } = useExperience(), paused = useMotionPaused();
  const [index, setIndex] = useState(0), [interacting, setInteracting] = useState(false);
  const entries: RecommendationEntry[] = [
    {
      paragraphs: [
        t(
          'A Mariana foi uma parceira de trabalho essencial para colocarmos projetos em prática dentro da Livo. Durante o período em que esteve no time, marcou a identidade visual e a comunicação da marca, trazendo um olhar jovem e criativo.',
          'Mariana was an essential work partner in bringing projects to life at Livo. During her time on the team, she left her mark on the brand’s visual identity and communication, bringing a youthful and creative perspective.',
          'Mariana fue una compañera de trabajo esencial para poner en práctica los proyectos dentro de Livo. Durante el período en que estuvo en el equipo, marcó la identidad visual y la comunicación de la marca, aportando una mirada joven y creativa.',
        ),
        t(
          'Proativa, antenada e muito inteligente, Mariana demonstrou dedicação e organização em um momento atípico, no qual a empresa transitava de uma estrutura pequena e nacional para uma multinacional com atuação na América Latina.',
          'Proactive, plugged-in, and very smart, Mariana showed dedication and organization during an atypical time, when the company was transitioning from a small, national operation into a multinational active across Latin America.',
          'Proactiva, atenta y muy inteligente, Mariana demostró dedicación y organización en un momento atípico, en el que la empresa pasaba de una estructura pequeña y nacional a una multinacional con presencia en América Latina.',
        ),
      ],
      author: 'Gustavo Gall',
      role: t('Par no time de Marketing · LIVO', 'Marketing Team Peer · LIVO', 'Par en el equipo de Marketing · LIVO'),
      companyName: 'LIVO',
      avatarSrc: '/assets/testimonials/gustavo-gall.jpg',
    },
    {
      paragraphs: [
        t(
          'A experiência de trabalhar em equipe, compartilhar decisões e encontrar caminhos. Depoimento a incluir.',
          'Working as a team, sharing decisions, and finding a path forward. Recommendation to be added.',
          'La experiencia de trabajar en equipo, compartir decisiones y encontrar caminos. Testimonio por incluir.',
        ),
      ],
      author: t('Nome a confirmar', 'Name to be confirmed', 'Nombre por confirmar'),
      role: t('Cargo · contexto da parceria', 'Role · partnership context', 'Cargo · contexto de la colaboración'),
      companyName: t('Logo da empresa', 'Company logo', 'Logo de la empresa'),
    },
    {
      paragraphs: [
        t(
          'O olhar de quem acompanhou um projeto do começo à entrega. Este espaço aguarda uma recomendação autorizada.',
          'A view from someone who followed a project from start to delivery. This space awaits an approved recommendation.',
          'La mirada de quien acompañó un proyecto de principio a fin. Este espacio espera una recomendación autorizada.',
        ),
      ],
      author: t('Nome a confirmar', 'Name to be confirmed', 'Nombre por confirmar'),
      role: t('Cargo · contexto da parceria', 'Role · partnership context', 'Cargo · contexto de la colaboración'),
      companyName: t('Logo da empresa', 'Company logo', 'Logo de la empresa'),
    },
  ];
  const current = entries[index];
  const move = (step: number) => setIndex(currentIdx => (currentIdx + step + entries.length) % entries.length);
  useEffect(() => {
    if (paused || interacting) return;
    const delay = current.paragraphs.length > 1 ? 15000 : 8500;
    const timer = setInterval(() => { if (!document.hidden) setIndex(currentIdx => (currentIdx + 1) % entries.length); }, delay);
    return () => clearInterval(timer);
  }, [paused, interacting, index, current.paragraphs.length, entries.length]);
  return <section id="recomendacoes" className="experience-section recommendations wrap" aria-roledescription={t('Carrossel de recomendações', 'Recommendation carousel', 'Carrusel de recomendaciones')}
    onPointerEnter={() => setInteracting(true)} onPointerLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
    <WordPullUp as="h2" paused={paused} words={t('O que dizem sobre meu trabalho.', 'What people say about my work.', 'Lo que dicen sobre mi trabajo.')} />
    <div className="testimonial-stage">
      <span className="testimonial-number" aria-hidden="true">0{index + 1}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.article key={index} className="testimonial-story" initial={paused ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: paused ? 0 : .3 }}
          drag={paused ? false : 'x'} dragConstraints={{ left: 0, right: 0 }} dragElastic={.1} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 45) move(info.offset.x < 0 ? 1 : -1); }}>
          <blockquote className={`testimonial-quote ${current.paragraphs.length > 1 ? 'testimonial-quote--multi' : ''}`}>
            {current.paragraphs.map((paragraph, pIdx) => <p key={pIdx}>{paragraph}</p>)}
          </blockquote>
          <div className="testimonial-attribution">
            <span className="testimonial-avatar" aria-hidden="true">
              {current.avatarSrc ? <img src={current.avatarSrc} alt="" loading="lazy" draggable={false} /> : <UserRound size={24} />}
            </span>
            <div>
              <strong>{current.author}</strong>
              <span>{current.role}</span>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
    <div className="testimonial-controls"><div className="testimonial-progress">{entries.map((_, i) => <button key={i} aria-label={`${t('Ver recomendação', 'View recommendation', 'Ver recomendación')} ${i + 1}`} aria-pressed={i === index} onClick={() => setIndex(i)}><span className={i === index ? 'is-active' : ''}/></button>)}</div><span className="testimonial-counter">{String(index + 1).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}</span><div className="testimonial-arrows"><button aria-label={t('Recomendação anterior', 'Previous recommendation', 'Recomendación anterior')} onClick={() => move(-1)}><ChevronLeft size={22}/></button><button aria-label={t('Próxima recomendação', 'Next recommendation', 'Siguiente recomendación')} onClick={() => move(1)}><ChevronRight size={22}/></button></div></div>
  </section>;
}
