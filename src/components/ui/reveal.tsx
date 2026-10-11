import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { useMotionPaused } from './motion-context';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const paused = useMotionPaused();
  const [visible, setVisible] = useState(false);
  return <motion.div className={`${className} ${visible ? 'is-in-view' : ''}`} initial={paused ? false : { opacity: 0, y: 32 }}
    onViewportEnter={() => setVisible(true)} onViewportLeave={() => setVisible(false)}
    whileInView={{ opacity: 1, y: 0 }} animate={paused ? { opacity: 1, y: 0 } : undefined}
    viewport={{ amount: .12 }} transition={{ duration: paused ? 0 : .7, delay: paused ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
