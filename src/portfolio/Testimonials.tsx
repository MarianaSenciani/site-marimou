import { useEffect, useState, type CSSProperties } from 'react';
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
  avatarStyle?: CSSProperties;
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
          'Eu só tenho elogios à Mariana e ao trabalho dela. Sempre achei que a paciência e a didática dela são habilidades super positivas. Também observei que, quanto a prazos e organização, ela também nunca deixou a desejar, muito pelo contrário, é uma real inspiração pra mim. Além da simpatia e empatia contagiantes dela. No geral, foi muito bom e importante tê-la como colega de trabalho naquele período.',
          'I only have praise for Mariana and her work. I have always found her patience and clear way of teaching to be great strengths. When it came to deadlines and organization, she never fell short—quite the opposite, she is a real inspiration to me. On top of that, her warmth and empathy are contagious. Overall, it was really great and meaningful to have her as a colleague during that time.',
          'Solo tengo elogios para Mariana y su trabajo. Siempre pensé que su paciencia y su didáctica son habilidades muy positivas. También noté que, en cuanto a plazos y organización, nunca quedó a deber; todo lo contrario, es una verdadera inspiración para mí. Además de su simpatía y empatía contagiosas. En general, fue muy bueno e importante tenerla como compañera de trabajo en aquel período.',
        ),
      ],
      author: 'Luiz',
      role: t('Assistente de arte e estagiário · LWSA', 'Art Assistant & Intern · LWSA', 'Asistente de arte y pasante · LWSA'),
      companyName: 'LWSA',
      avatarSrc: '/assets/testimonials/luiz.jpg',
      avatarStyle: { transform: 'scale(1.65)', transformOrigin: '62% 22%' },
    },
    {
      paragraphs: [
        t(
          'A Mariana se destaca pela autonomia, pelo pensamento crítico e pela capacidade de transformar problemas complexos em soluções bem estruturadas, sempre buscando equilibrar as necessidades dos usuários com os objetivos do negócio. Um exemplo disso foi um projeto de escopo bastante complexo que ela conduziu de ponta a ponta, demonstrando muita responsabilidade, capacidade de resolução de problemas e segurança nas decisões até chegar a uma solução aprovada pela diretoria.',
          'Mariana stands out for her autonomy, critical thinking, and ability to turn complex problems into well-structured solutions, always seeking to balance user needs with business goals. One example of this was a highly complex project she led from end to end, showing strong ownership, problem-solving skills, and confidence in her decisions until reaching a solution approved by leadership.',
          'Mariana se destaca por su autonomía, su pensamiento crítico y su capacidad para transformar problemas complejos en soluciones bien estructuradas, buscando siempre equilibrar las necesidades de los usuarios con los objetivos del negocio. Un ejemplo de esto fue un proyecto de alcance bastante complejo que condujo de principio a fin, demostrando mucha responsabilidad, capacidad de resolución de problemas y seguridad en las decisiones hasta llegar a una solución aprobada por la dirección.',
        ),
        t(
          'Além da sua competência em design e pesquisa, destaco também sua comunicação e colaboração com o time, que fazem a diferença no desenvolvimento das soluções e no alinhamento entre as diferentes áreas.',
          'Beyond her expertise in design and research, I also highlight her communication and collaboration with the team, which make a real difference in developing solutions and keeping different areas aligned.',
          'Además de su competencia en diseño e investigación, destaco también su comunicación y colaboración con el equipo, que marcan la diferencia en el desarrollo de las soluciones y en el alineamiento entre las distintas áreas.',
        ),
        t(
          'É muito bom trabalhar com uma profissional que combina autonomia, sensibilidade para a experiência do usuário e visão de produto. Recomendo a Mariana com confiança para times que buscam uma Product Designer capaz de conectar UX, tecnologia e negócio para gerar valor de verdade.',
          'It is great to work with a professional who combines autonomy, sensitivity to user experience, and product vision. I confidently recommend Mariana to teams looking for a Product Designer capable of connecting UX, technology, and business to generate real value.',
          'Es muy bueno trabajar con una profesional que combina autonomía, sensibilidad para la experiencia del usuario y visión de producto. Recomiendo a Mariana con confianza para equipos que buscan una Product Designer capaz de conectar UX, tecnología y negocio para generar valor real.',
        ),
      ],
      author: 'Victor Stati',
      role: t('Par e Product Owner · Smartleader', 'Peer & Product Owner · Smartleader', 'Par y Product Owner · Smartleader'),
      companyName: 'Smartleader',
      avatarSrc: '/assets/testimonials/victor-stati.jpg',
    },
  ];
  const current = entries[index];
  const fullLength = current.paragraphs.join(' ').length;
  const isExtraLongQuote = current.paragraphs.length >= 3 || fullLength > 650;
  const isLongQuote = !isExtraLongQuote && (current.paragraphs.length > 1 || fullLength > 180);
  const move = (step: number) => setIndex(currentIdx => (currentIdx + step + entries.length) % entries.length);
  useEffect(() => {
    if (paused || interacting) return;
    const delay = isExtraLongQuote ? 22000 : isLongQuote ? 15000 : 8500;
    const timer = setInterval(() => { if (!document.hidden) setIndex(currentIdx => (currentIdx + 1) % entries.length); }, delay);
    return () => clearInterval(timer);
  }, [paused, interacting, index, isExtraLongQuote, isLongQuote, entries.length]);
  return <section id="recomendacoes" className="experience-section recommendations wrap" aria-roledescription={t('Carrossel de recomendações', 'Recommendation carousel', 'Carrusel de recomendaciones')}
    onPointerEnter={() => setInteracting(true)} onPointerLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
    <WordPullUp as="h2" paused={paused} words={t('O que dizem sobre meu trabalho.', 'What people say about my work.', 'Lo que dicen sobre mi trabajo.')} />
    <div className="testimonial-stage">
      <span className="testimonial-number" aria-hidden="true">0{index + 1}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.article key={index} className="testimonial-story" initial={paused ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: paused ? 0 : .3 }}
          drag={paused ? false : 'x'} dragConstraints={{ left: 0, right: 0 }} dragElastic={.1} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 45) move(info.offset.x < 0 ? 1 : -1); }}>
          <blockquote className={`testimonial-quote ${isExtraLongQuote ? 'testimonial-quote--long' : isLongQuote ? 'testimonial-quote--multi' : ''}`}>
            {current.paragraphs.map((paragraph, pIdx) => <p key={pIdx}>{paragraph}</p>)}
          </blockquote>
          <div className="testimonial-attribution">
            <span className="testimonial-avatar" aria-hidden="true">
              {current.avatarSrc ? <img src={current.avatarSrc} alt="" style={current.avatarStyle} loading="lazy" draggable={false} /> : <UserRound size={24} />}
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
