import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience } from './experience-context';


export function LivoProblem() {
  const { t } = useExperience();
  const stages = [
    { title: t('Encontrar o produto', 'Find the product', 'Encontrar el producto'), description: t('Da entrada no site à descoberta de uma opção.', 'From arriving on the site to discovering an option.', 'Desde la entrada al sitio hasta el descubrimiento de una opción.'), steps: ['Home', t('Coleções', 'Collections', 'Colecciones'), t('Produto', 'Product', 'Producto')] },
    { title: t('Escolher e revisar', 'Choose and review', 'Elegir y revisar'), description: t('Confirmar a variação e seguir para o carrinho.', 'Confirm the variant and move on to the cart.', 'Confirmar la variante y continuar al carrito.'), steps: [t('Escolher a cor', 'Choose the color', 'Elegir el color'), t('Adicionar ao carrinho', 'Add to cart', 'Agregar al carrito'), t('Revisar a escolha', 'Review the choice', 'Revisar la elección')] },
    { title: t('Concluir a compra', 'Complete the purchase', 'Concluir la compra'), description: t('Informar a entrega, escolher o pagamento e finalizar.', 'Enter delivery details, choose payment, and finish.', 'Indicar la entrega, elegir el pago y finalizar.'), steps: ['Checkout', t('Entrega e pagamento', 'Delivery and payment', 'Entrega y pago'), t('Compra', 'Purchase', 'Compra')] },
  ];
  const ref = useRef<HTMLElement>(null), paused = useMotionPaused(), [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useTransform(scrollYProgress, [0, .82], [0, 1]);
  useMotionValueEvent(scrollYProgress, 'change', value => setActive(value >= .72 ? 2 : value >= .34 ? 1 : 0));
  return <section ref={ref} id="livo-problema" className={`lv-problem-scene ${paused ? 'is-still' : ''}`}><div className="lv-problem-pin wrap">
    <header><h2 className="lv-title">{t('A compra se interrompia em dois momentos.', 'The purchase broke off at two moments.', 'La compra se interrumpía en dos momentos.')}</h2><p>{t(<>Os relatórios da VTEX mostravam saídas após adicionar um produto e antes de concluir o checkout. O abandono de carrinho estava em <strong>42%</strong>. Onde a jornada deixava de orientar a próxima decisão?</>, <>VTEX reports showed exits after adding a product and before completing checkout. Cart abandonment was at <strong>42%</strong>. Where did the journey stop guiding the next decision?</>, <>Los informes de VTEX mostraban salidas después de agregar un producto y antes de concluir el checkout. El abandono de carrito estaba en <strong>42%</strong>. ¿Dónde dejaba el recorrido de orientar la siguiente decisión?</>)}</p></header>
    <div className="lv-roadmap-track"><div className="lv-roadmap-line" aria-hidden="true"><motion.div style={{ scaleX: paused ? 1 : progress }}/></div><div className="lv-roadmap-columns">{stages.map((stage, i) => <motion.article key={stage.title} animate={{ opacity: paused || active >= i ? 1 : .18, y: paused || active >= i ? 0 : 28 }} transition={{ duration: paused ? 0 : .55 }}><div className="lv-roadmap-marker"><i className={paused || active >= i ? 'is-filled' : ''}/><span>{t('Etapa', 'Stage', 'Etapa')} 0{i + 1}</span></div><h3>{stage.title}</h3><p>{stage.description}</p><ol>{stage.steps.map((step, index) => <li key={index}><span>{step}</span>{index < stage.steps.length - 1 && <ArrowRight size={12} aria-hidden="true"/>}</li>)}</ol></motion.article>)}</div></div>
  </div></section>;
}
