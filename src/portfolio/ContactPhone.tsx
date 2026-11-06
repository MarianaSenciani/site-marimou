import { AndroidStatus } from './AndroidStatus';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, BatteryFull, CheckCheck, Mic, Plus, Signal, Video, Phone, Wifi } from 'lucide-react';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience } from './experience-context';

export function ContactPhone() {
  const { t } = useExperience();
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const section = ref.current?.closest('#contato');
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= .2), { threshold: .2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const paused = useMotionPaused();
  const reduced = useReducedMotion();
  const staticView = paused || reduced;
  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(0);
    if (!inView || staticView) return;
    const timers = [600, 1800, 4200, 6500, 8000, 10500].map((delay, i) =>
      window.setTimeout(() => setStep(i + 1), delay));
    return () => timers.forEach(window.clearTimeout);
  }, [inView, staticView]);
  const current = staticView ? 6 : step;
  const messages = [
    t('Oi, Mariana! Vim pelo seu portfólio e gostaria de conversar sobre um projeto.', 'Hi Mariana! I found your portfolio and would love to discuss a project.', '¡Hola, Mariana! Vi tu portafolio y me gustaría conversar sobre un proyecto.'),
    t('Oi! Que bom te ver por aqui 😊 Me conta: o que você tem em mente?', 'Hi! Lovely to hear from you 😊 Tell me: what do you have in mind?', '¡Hola! Qué bueno verte por aquí 😊 Cuéntame: ¿qué tienes en mente?'),
    t('Tenho uma ideia para um aplicativo, mas ainda não sei por onde começar.', 'I have an app idea, but I’m not sure where to start.', 'Tengo una idea para una app, pero aún no sé por dónde empezar.'),
    t('Vamos descobrir juntos. Uma conversa já pode ser o primeiro passo ✨', 'Let’s figure it out together. A conversation can be the first step ✨', 'Descubrámoslo juntos. Una conversación puede ser el primer paso ✨'),
  ];
  const visible = [0, 1, 1, 2, 3, 3, 4][current];
  const typing = current === 2 || current === 5;
  return <figure ref={ref} className="contact-phone-scene">
    <div className="contact-phone">
      <AndroidStatus />
      <div className="phone-chat-header">
        <ArrowLeft size={19} aria-hidden="true"/>
        <img src="/assets/memoji/center-portrait.png" alt="" width="40" height="40"/>
        <div><strong>Mariana</strong><small>{t('Design & produto', 'Design & product', 'Diseño y producto')}</small></div>
        <Video size={18} aria-hidden="true"/><Phone size={16} aria-hidden="true"/>
      </div>
      <div className="phone-chat-body">
        <span className="phone-date">{t('Hoje', 'Today', 'Hoy')}</span>
        <ol className="phone-messages" aria-label={t('Exemplo de conversa', 'Example conversation', 'Ejemplo de conversación')}>
          {messages.slice(0, visible).map((text, i) => <motion.li
            key={i} className={i % 2 === 0 ? 'phone-message sent' : 'phone-message received'}
            initial={staticView ? false : { opacity: 0, x: i % 2 === 0 ? 16 : -8, y: 14, scale: .95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: staticView ? 0 : .35 }}>
            <span className="sr-only">{i % 2 === 0 ? t('Visitante: ', 'Visitor: ', 'Visitante: ') : 'Mariana: '}</span>
            {text}<span className="phone-message-time" aria-hidden="true">9:{String(41 + i).padStart(2, '0')}{i % 2 === 0 && <CheckCheck size={13}/>}</span>
          </motion.li>)}
        </ol>
        {typing && <div className="phone-typing received" aria-hidden="true"><i/><i/><i/></div>}
      </div>
      <div className="phone-composer" aria-hidden="true"><Plus size={20}/><span>{t('Mensagem', 'Message', 'Mensaje')}</span><Mic size={19}/></div>
      <div className="phone-home" aria-hidden="true"/>
    </div>
  </figure>;
}

