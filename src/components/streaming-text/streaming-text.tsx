// Copyright (c) 2026 Bruno Delorence. MIT License.

'use client';

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { useAutoplay } from './use-autoplay';
import styles from './streaming-text.module.css';

/*
 * Streaming text: an assistant's answer that arrives word by word behind a thin caret, with a
 * source cited inline, a row of message actions, the sources it read, and follow-up questions.
 *
 * - The answer is a list of parts: runs of words and citations. They are cut into tokens, one per
 *   word or citation, and the stream reveals one more token every `speed` ms (58 by default). Each
 *   word is a span of its own with its trailing space, so a revealed word never reflows the ones
 *   before it; the paragraph wraps "pretty", so the last lines settle as it grows.
 * - The caret is a 2 by 12 px bar that fades in when a stream starts and goes with the last word.
 *   A citation is a small chip (the source's tile and domain) that pops in as it arrives.
 * - While the answer streams, the actions and the follow-ups fade out (400 ms) and stop taking the
 *   pointer, and the sources list folds away. With the last word they fade back, the open sources
 *   list unfolds again (a 0fr to 1fr grid row, 300 ms), and the follow-ups rise in one by one,
 *   90 ms apart.
 * - Retry plays the stream again; copy puts the answer's text on the clipboard; the thumbs are
 *   toggles. "10 sources" opens the list of sources, each a link with its tile, name and domain.
 * - While on screen and untouched, the demo replays the answer every five seconds. Any press or
 *   key in it hands it to the reader until they leave it alone for six seconds.
 * - Light or dark: every colour is a light-dark() token in the CSS, so the scheme is the page's
 *   color-scheme, or the one the colorScheme prop sets.
 */

export type StreamingSource = {
  /** The source's name, in the sources list. */
  name: string;
  /** Its domain, on the citation chip and in the list. */
  domain: string;
  /** Where it opens. */
  href: string;
  /** A square tile drawn at 12 to 16 px; without one, a tile with the name's first letter. */
  icon?: ReactNode;
};

/** Words, or a citation of `sources[cite]`. */
export type AnswerPart = string | { cite: number };

export type MessageAction = 'copy' | 'retry' | 'like' | 'dislike';

/** One token every SPEED ms while streaming. */
const SPEED = 58;
/** The demo replays the answer every CYCLE ms, the first time START ms after it comes on screen. */
const CYCLE = 5000;
const START = 150;

/* The sample answer's tiles, drawn on a 64-unit square. */
function ScoopTile() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#1f7a5f" />
      <circle cx="32" cy="26" r="11.5" fill="#bff3dd" />
      <path d="M18.5 35h27a13.5 13 0 0 1-27 0Z" fill="#fff" />
      <path
        d="M25 25.5a8 8 0 0 1 14 0"
        fill="none"
        stroke="#1f7a5f"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function TrendTile() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#2f6fec" />
      <path
        d="m14 44 12-12 8 7 15-17"
        fill="none"
        stroke="#fff"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="49.5" cy="20" r="5.5" fill="#bfe0ff" />
    </svg>
  );
}
function BarsTile() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#e56d24" />
      <path d="M16 45V27h8v18Zm12 0V17h8v28Zm12 0V31h8v14Z" fill="#fff" />
      <path d="M15 50h34" stroke="#ffd6b8" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

const SAMPLE_SOURCES: StreamingSource[] = [
  {
    name: 'Scoop Data',
    domain: 'scoopdata.test',
    href: 'https://scoopdata.test/',
    icon: <ScoopTile />,
  },
  {
    name: 'Trends Index',
    domain: 'trendsindex.test',
    href: 'https://trendsindex.test/',
    icon: <TrendTile />,
  },
  {
    name: 'Market Basket',
    domain: 'marketbasket.test',
    href: 'https://marketbasket.test/',
    icon: <BarsTile />,
  },
];

const SAMPLE_ANSWER: AnswerPart[] = [
  'Pistachio is your fastest-growing flavor — sales are up 23% this month and margins beat vanilla by 8 points.',
  { cite: 0 },
  'Stone-fruit flavors are trending in the same range.',
];

const SAMPLE_FOLLOW_UPS = [
  'Which flavors sell best in winter',
  'Compare gelato and soft serve margins',
];

type Token = { word: string } | { cite: number };

function tokenize(answer: AnswerPart[]): Token[] {
  return answer.flatMap((part): Token[] =>
    typeof part === 'string'
      ? part
          .split(/\s+/)
          .filter(Boolean)
          .map((word) => ({ word }))
      : [part],
  );
}

/** The source's own tile, or one with its first letter. */
function Tile({ source, className }: { source: StreamingSource; className: string }) {
  return (
    <span className={className} aria-hidden="true">
      {source.icon ?? <span className={styles.letter}>{source.name.charAt(0)}</span>}
    </span>
  );
}

/* Action icons, drawn on a 24-unit square with a 1.8 stroke. */
const ICONS: Record<MessageAction | 'done', ReactNode> = {
  copy: (
    <>
      <rect x="8.75" y="8.75" width="12.25" height="12.25" rx="2.5" />
      <path d="M15.25 5.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8.25a2 2 0 0 0 2 2h.5" />
    </>
  ),
  retry: <path d="M20.6 12.4a8.6 8.6 0 1 1-2.4-6.3M20.6 3.4v5.4h-5.4" />,
  like: (
    <path d="M7.2 10.4V21.6M2.6 11.6a1.2 1.2 0 0 1 1.2-1.2h3.4l3.6-7.1a.9.9 0 0 1 .8-.5 2.8 2.8 0 0 1 2.7 3.5l-.9 3.6h5.6a2 2 0 0 1 1.9 2.6l-2.2 7.6a2 2 0 0 1-1.9 1.5H3.8a1.2 1.2 0 0 1-1.2-1.2Z" />
  ),
  dislike: (
    <path
      transform="rotate(180 12 12)"
      d="M7.2 10.4V21.6M2.6 11.6a1.2 1.2 0 0 1 1.2-1.2h3.4l3.6-7.1a.9.9 0 0 1 .8-.5 2.8 2.8 0 0 1 2.7 3.5l-.9 3.6h5.6a2 2 0 0 1 1.9 2.6l-2.2 7.6a2 2 0 0 1-1.9 1.5H3.8a1.2 1.2 0 0 1-1.2-1.2Z"
    />
  ),
  done: <path d="m4.5 12.5 5 5 10-11" />,
};

const ACTION_LABELS: Record<MessageAction, string> = {
  copy: 'Copy',
  retry: 'Retry',
  like: 'Good answer',
  dislike: 'Bad answer',
};

export function StreamingText({
  answer = SAMPLE_ANSWER,
  sources = SAMPLE_SOURCES,
  sourceCount,
  followUpsLabel = 'Follow-ups',
  followUps = SAMPLE_FOLLOW_UPS,
  speed = SPEED,
  onFollowUp,
  onAction,
  autoplay = true,
  streamOnMount = false,
  paused = false,
  locale = 'pt',
  colorScheme,
  className = '',
}: {
  /** The answer: runs of words, and citations of a source by its index in `sources`. */
  answer?: AnswerPart[];
  /** The sources read for it; the first three show their tiles on the sources button. */
  sources?: StreamingSource[];
  /** How many sources the button counts; 10 for the sample answer, else the length of `sources`. */
  sourceCount?: number;
  /** The heading over the follow-ups. */
  followUpsLabel?: string;
  /** Questions to ask next. */
  followUps?: string[];
  /** Ms between two words of the stream. */
  speed?: number;
  /** Called with a follow-up's words when it is pressed. */
  onFollowUp?: (question: string) => void;
  /** Called when a message action is pressed (retry also replays the stream). */
  onAction?: (action: MessageAction) => void;
  /** While on screen and untouched, the answer replays itself every five seconds. */
  autoplay?: boolean;
  streamOnMount?: boolean;
  paused?: boolean;
  locale?: 'pt' | 'en' | 'es';
  /** Light or dark colours, or the reader's ('system'); without it, the page's color-scheme. */
  colorScheme?: 'light' | 'dark' | 'system';
  className?: string;
}) {
  const { ref: root, playing, take } = useAutoplay<HTMLDivElement>(6000);
  const tokens = useMemo(() => tokenize(answer), [answer]);
  const total = tokens.length;
  /** How many tokens are on screen: all of them, except while a stream plays. */
  const [shown, setShown] = useState(() => streamOnMount && !paused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : total);
  const streaming = shown < total;
  const [open, setOpen] = useState(false);
  const [vote, setVote] = useState<'like' | 'dislike' | null>(null);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');
  const copiedTimer = useRef(0);
  const count = sourceCount ?? (sources === SAMPLE_SOURCES ? 10 : sources.length);
  const plain = tokens
    .map((token) => ('word' in token ? token.word : `[${sources[token.cite]?.domain ?? ''}]`))
    .join(' ');

  const labels = {
    pt: { copy: 'Copiar', retry: 'Repetir resposta', like: 'Resposta útil', dislike: 'Resposta pouco útil', ready: 'Resposta pronta.', writing: 'Preparando resposta…', copied: 'Copiado.', failed: 'Não foi possível copiar.', sources: 'Fontes' },
    en: { ...ACTION_LABELS, ready: 'Answer ready.', writing: 'Writing the answer…', copied: 'Copied.', failed: 'Could not copy.', sources: 'Sources' },
    es: { copy: 'Copiar', retry: 'Repetir respuesta', like: 'Respuesta útil', dislike: 'Respuesta poco útil', ready: 'Respuesta lista.', writing: 'Preparando respuesta…', copied: 'Copiado.', failed: 'No se pudo copiar.', sources: 'Fuentes' },
  }[locale];
  useEffect(() => { if (paused) setShown(total); }, [paused, total]);

  const replay = () => {
    if (!total) return;
    const reduced = paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setShown(total);
      setMessage(labels.ready);
      return;
    }
    setShown(0);
    setMessage(labels.writing);
  };

  // The stream: one more token every `speed` ms until all are shown.
  useEffect(() => {
    if (!streaming) return;
    const timer = window.setInterval(() => setShown((n) => Math.min(n + 1, total)), speed);
    return () => window.clearInterval(timer);
  }, [streaming, speed, total]);

  useEffect(() => {
    if (!streaming && message === labels.writing) setMessage(labels.ready);
  }, [streaming, message, labels.writing, labels.ready]);

  // The demo: replay the answer soon after it comes on screen, then every CYCLE ms.
  const replayRef = useRef(replay);
  useEffect(() => {
    replayRef.current = replay;
  });
  useEffect(() => {
    if (!autoplay || !playing || paused) return;
    let timer = window.setTimeout(function loop() {
      replayRef.current();
      timer = window.setTimeout(loop, CYCLE);
    }, START);
    return () => window.clearTimeout(timer);
  }, [autoplay, playing, paused]);

  useEffect(() => () => window.clearTimeout(copiedTimer.current), []);

  const act = (action: MessageAction) => {
    onAction?.(action);
    if (action === 'retry') replay();
    else if (action === 'copy') {
      navigator.clipboard?.writeText(plain).then(
        () => {
          setCopied(true);
          setMessage(labels.copied);
          window.clearTimeout(copiedTimer.current);
          copiedTimer.current = window.setTimeout(() => setCopied(false), 1500);
        },
        () => setMessage(labels.failed),
      );
    } else setVote((current) => (current === action ? null : action));
  };

  const listId = useId();

  return (
    <div
      ref={root}
      className={`${styles.root} ${className}`}
      data-color-scheme={colorScheme}
      onPointerDown={take}
      onKeyDown={take}
    >
      <div className={styles.frame}>
        <div className={styles.message} data-streaming={streaming || undefined}>
          <p className={styles.answer}>
            {tokens.slice(0, shown).map((token, index) => {
              if ('word' in token)
                return (
                  <span key={index} className={styles.word}>
                    {token.word}{' '}
                  </span>
                );
              const source = sources[token.cite];
              if (!source) return null;
              return (
                <a
                  key={index}
                  className={styles.chip}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Source: ${source.name}`}
                >
                  <Tile source={source} className={styles.chipTile} />
                  <span>{source.domain}</span>
                </a>
              );
            })}
            {streaming && <span className={styles.caret} aria-hidden="true" />}
          </p>

          <div className={styles.actions}>
            {(['copy', 'retry', 'like', 'dislike'] as const).map((action) => {
              const pressed =
                action === 'like' || action === 'dislike' ? vote === action : undefined;
              return (
                <button
                  key={action}
                  type="button"
                  className={styles.action}
                  aria-label={labels[action]}
                  aria-pressed={pressed}
                  onClick={() => act(action)}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {action === 'copy' && copied ? ICONS.done : ICONS[action]}
                  </svg>
                </button>
              );
            })}
            {sources.length > 0 && (
              <button
                type="button"
                className={styles.sourcesButton}
                aria-expanded={open}
                aria-controls={listId}
                onClick={() => setOpen((value) => !value)}
              >
                <span className={styles.stack}>
                  {sources.slice(0, 3).map((source) => (
                    <Tile key={source.href} source={source} className={styles.avatar} />
                  ))}
                </span>
                <span className={styles.count}>
                  {count} {count === 1 ? 'source' : 'sources'}
                </span>
              </button>
            )}
          </div>

          <div
            className={styles.fold}
            data-open={(open && !streaming) || undefined}
            {...(!(open && !streaming) ? { inert: '' } : {})}
          >
            <div className={styles.foldInner}>
              <ul className={styles.list} id={listId} aria-label={labels.sources}>
                {sources.map((source) => (
                  <li key={source.href}>
                    <a className={styles.row} href={source.href} target="_blank" rel="noreferrer">
                      <Tile source={source} className={styles.rowTile} />
                      <span className={styles.rowName}>{source.name}</span>
                      <span className={styles.rowDomain}>{source.domain}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {followUps.length > 0 && (
            <div className={styles.followUps}>
              <p className={styles.followUpsLabel}>{followUpsLabel}</p>
              <ul className={styles.followUpList}>
                {followUps.map((question, index) => (
                  <li key={question}>
                    <button
                      type="button"
                      className={styles.followUp}
                      style={{ animationDelay: `${index * 90}ms` }}
                      onClick={() => onFollowUp?.(question)}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M8.6 9.6 4.2 14l4.4 4.4M19.8 4.2v6.6a3.2 3.2 0 0 1-3.2 3.2H4.2" />
                      </svg>
                      {question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className={styles.hidden} role="status">
        {message}
      </p>
    </div>
  );
}
