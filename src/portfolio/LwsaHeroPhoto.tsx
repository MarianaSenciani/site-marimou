import { motion, useReducedMotion } from 'framer-motion';
import { useMotionPaused } from '@/components/ui/motion-context';
import './lwsa-hero-photo.css';
const photo = '/assets/cases/lwsa/team.jpg';
export function LwsaHeroPhoto() {
  const paused = useMotionPaused(), reduced = useReducedMotion();
  return <div className={`lwsa-team-hero layout-0 ${paused || reduced ? 'is-still' : ''}`}>
    <motion.figure className="lwsa-team-scene" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:paused || reduced ? 0 : .35}}>
      <div className="lwsa-team-photo" tabIndex={0} aria-label="Foto do time LWSA. Mariana é a pessoa ruiva acima da letra S. Foque para aproximar.">
        <img src={photo} alt="Mariana com o time da LWSA, atrás do letreiro da empresa" />
        <div className="lwsa-face-marker" aria-hidden="true"><svg viewBox="0 0 100 100"><motion.path d="M 77 12 C 44 -8 4 18 8 55 C 12 96 73 108 92 66 C 110 25 63 -1 29 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:paused || reduced ? 0 : 1.2,delay:paused || reduced ? 0 : 1.5}}/></svg><motion.span className="lwsa-self-note" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:paused || reduced ? 0 : 1.5, duration:.4}}>Essa sou eu<svg className="lwsa-note-arrow" viewBox="0 0 80 58"><path d="M70 4C72 28 42 12 15 46M15 46l2-13M15 46l14-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></motion.span></div>
      </div>
      <figcaption>Uma marca construída em equipe.</figcaption>
    </motion.figure>
  </div>;
}


