import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useMotionPaused } from '@/components/ui/motion-context';

const stages = [
  { title: 'Encontrar o produto', description: 'Da entrada no site à descoberta de uma opção.', steps: ['Home', 'Coleções', 'Produto'] },
  { title: 'Escolher e revisar', description: 'Confirmar a variação e seguir para o carrinho.', steps: ['Escolher a cor', 'Adicionar ao carrinho', 'Revisar a escolha'] },
  { title: 'Concluir a compra', description: 'Informar a entrega, escolher o pagamento e finalizar.', steps: ['Checkout', 'Entrega e pagamento', 'Compra'] },
];
export function LivoProblem() {
  const ref = useRef<HTMLElement>(null), paused = useMotionPaused(), [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useTransform(scrollYProgress, [0, .82], [0, 1]);
  useMotionValueEvent(scrollYProgress, 'change', value => setActive(value >= .72 ? 2 : value >= .34 ? 1 : 0));
  return <section ref={ref} id="livo-problema" className={`lv-problem-scene ${paused ? 'is-still' : ''}`}><div className="lv-problem-pin wrap">
    <header><h2 className="lv-title">A compra se interrompia em dois momentos.</h2><p>Os relatórios da VTEX mostravam saídas após adicionar um produto e antes de concluir o checkout. O abandono de carrinho estava em <strong>42%</strong>. Onde a jornada deixava de orientar a próxima decisão?</p></header>
    <div className="lv-roadmap-track"><div className="lv-roadmap-line" aria-hidden="true"><motion.div style={{ scaleX: paused ? 1 : progress }}/></div><div className="lv-roadmap-columns">{stages.map((stage, i) => <motion.article key={stage.title} animate={{ opacity: paused || active >= i ? 1 : .18, y: paused || active >= i ? 0 : 28 }} transition={{ duration: paused ? 0 : .55 }}><div className="lv-roadmap-marker"><i className={paused || active >= i ? 'is-filled' : ''}/><span>Etapa 0{i + 1}</span></div><h3>{stage.title}</h3><p>{stage.description}</p><ol>{stage.steps.map((step, index) => <li key={step}><span>{step}</span>{index < stage.steps.length - 1 && <ArrowRight size={12} aria-hidden="true"/>}</li>)}</ol></motion.article>)}</div></div>
  </div></section>;
}
