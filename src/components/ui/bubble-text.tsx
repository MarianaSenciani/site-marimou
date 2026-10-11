"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

export function BubbleText({ text, className, as: Tag = 'span', paused = false }: {
  text: string; className?: string; as?: 'span' | 'h2' | 'h3'; paused?: boolean;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  let offset = 0;
  return <Tag className={cn('bubble-text', className)} aria-label={text} onMouseLeave={() => setHoveredIndex(null)}>
    {text.split(' ').map((word, w) => {
      const start = offset; offset += Array.from(word).length + 1;
      return <span className="bubble-word" key={w} aria-hidden="true">{Array.from(word).map((char, i) => {
        const index = start + i;
        const distance = paused || hoveredIndex === null ? 9 : Math.abs(hoveredIndex - index);
        return <span key={i} className={`bubble-char bubble-distance-${Math.min(distance, 3)}`}
          onMouseEnter={() => !paused && setHoveredIndex(index)}>{char}</span>;
      })}{w < text.split(' ').length - 1 ? ' ' : ''}</span>;
    })}
  </Tag>;
}
