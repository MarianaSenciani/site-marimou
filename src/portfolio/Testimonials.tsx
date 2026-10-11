import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, UserRound } from 'lucide-react';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience } from './experience-context';

export function Recommendations() {
  const { t } = useExperience(), paused = useMotionPaused();
  const [index, setIndex] = useState(0), [interacting, setInteracting] = useState(false);
  const entries = [
    t('Uma perspectiva de quem construiu produtos comigo. Em breve, uma recomendação autorizada sobre essa parceria.', 'A perspective from someone who built products with me. An approved recommendation about this partnership is coming soon.', 'La perspectiva de quien construyó productos conmigo. Pronto, una recomendación autorizada sobre esta colaboración.'),
    t('A experiência de trabalhar em equipe, compartilhar decisões e encontrar caminhos. Depoimento a incluir.', 'Working as a team, sharing decisions, and finding a path forward. Recommendation to be added.', 'La experiencia de trabajar en equipo, compartir decisiones y encontrar caminos. Testimonio por incluir.'),
    t('O olhar de quem acompanhou um projeto do começo à entrega. Este espaço aguarda uma recomendação autorizada.', 'A view from someone who followed a project from start to delivery. This space awaits an approved recommendation.', 'La mirada de quien acompañó un proyecto de principio a fin. Este espacio espera una recomendación autorizada.'),
  ];
  const move = (step: number) => setIndex(current => (current + step + entries.length) % entries.length);
  useEffect(() => {
    if (paused || interacting) return;
    const timer = setInterval(() => { if (!document.hidden) setIndex(current => (current + 1) % 3); }, 8500);
    return () => clearInterval(timer);
  }, [paused, interacting, index]);
  return <section id="recomendacoes" className="experience-section recommendations wrap" aria-roledescription={t('Carrossel de recomendações', 'Recommendation carousel', 'Carrusel de recomendaciones')}
    onPointerEnter={() => setInteracting(true)} onPointerLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
    <WordPullUp as="h2" paused={paused} words={t('O que dizem sobre meu trabalho.', 'What people say about my work.', 'Lo que dicen sobre mi trabajo.')} />
    <div className="testimonial-stage">
      <span className="testimonial-number" aria-hidden="true">0{index + 1}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.article key={index} className="testimonial-story" initial={paused ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: paused ? 0 : .3 }}
          drag={paused ? false : 'x'} dragConstraints={{ left: 0, right: 0 }} dragElastic={.1} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 45) move(info.offset.x < 0 ? 1 : -1); }}>
          <p className="testimonial-quote">{entries[index]}</p>
          <div className="testimonial-attribution"><div className="testimonial-media"><span className="testimonial-avatar" aria-hidden="true"><UserRound size={24}/></span><span className="testimonial-company">{t('Logo da empresa', 'Company logo', 'Logo de la empresa')}</span></div><div><strong>{t('Nome a confirmar', 'Name to be confirmed', 'Nombre por confirmar')}</strong><span>{t('Cargo · contexto da parceria', 'Role · partnership context', 'Cargo · contexto de la colaboración')}</span></div></div>
        </motion.article>
      </AnimatePresence>
    </div>
    <div className="testimonial-controls"><div className="testimonial-progress">{entries.map((_, i) => <button key={i} aria-label={`${t('Ver recomendação', 'View recommendation', 'Ver recomendación')} ${i + 1}`} aria-pressed={i === index} onClick={() => setIndex(i)}><span className={i === index ? 'is-active' : ''}/></button>)}</div><span className="testimonial-counter">0{index + 1} / 03</span><div className="testimonial-arrows"><button aria-label={t('Recomendação anterior', 'Previous recommendation', 'Recomendación anterior')} onClick={() => move(-1)}><ChevronLeft size={22}/></button><button aria-label={t('Próxima recomendação', 'Next recommendation', 'Siguiente recomendación')} onClick={() => move(1)}><ChevronRight size={22}/></button></div></div>
  </section>;
}
