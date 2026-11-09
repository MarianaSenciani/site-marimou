"use client";

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WordPullUpProps {
  words: string;
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  paused?: boolean;
}

export function WordPullUp({ words, delayMultiple = .055, wrapperFramerProps,
  framerProps, className, as = 'h1', id, paused = false }: WordPullUpProps) {
  const reduced = useReducedMotion();
  const still = reduced || paused;
  const Heading = as === 'h2' ? motion.h2 : as === 'h3' ? motion.h3 : motion.h1;
  return <Heading key={words} id={id} aria-label={words} className={cn('word-pull-up', className)}
    variants={wrapperFramerProps ?? { hidden: {}, show: { transition: { staggerChildren: still ? 0 : delayMultiple } } }}
    initial={still ? false : 'hidden'} whileInView="show" animate={still ? 'show' : undefined}
    viewport={{ once: true, amount: .2 }}>
    {words.trim().split(/\s+/).map((word, i) => <motion.span key={`${word}-${i}`} aria-hidden="true"
      className="pull-word" variants={framerProps ?? { hidden: { y: 18, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: still ? 0 : .45, ease: [.22, 1, .36, 1] } } }}>
      {word}{' '}
    </motion.span>)}
  </Heading>;
}
