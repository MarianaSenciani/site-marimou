import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { useChapterScroll } from './useChapterScroll';
import { ArrowUp } from 'lucide-react';
import { MotionPreference } from '@/components/ui/motion-context';
import { ExperienceContext, type Language, type Theme } from './experience-context';
import { HeroExperience } from './HeroExperience';
import { FeaturedProjects, WorkProcess, BeyondDeliverables, Recommendations } from './HomeSections';
import { SiteHeader, SiteFooter, ContactSection } from './SiteChrome';
import { AboutExperience } from './AboutExperience';
import { PublicProjects, PublicCase } from './PublicProjects';
import { MariChat } from './MariChat';
import { AmbientGrid } from './AmbientGrid';

const readPreference = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
export default function PortfolioExperience({ path }: { path: string }) {
  const [lang, setLang] = useState<Language>(() => { const stored = readPreference('mari-language'); return stored === 'en' || stored === 'es' ? stored : 'pt'; });
  const [theme, setTheme] = useState<Theme>(() => readPreference('mari-theme') === 'light' ? 'light' : 'dark');
  const [hero, setHero] = useState(1);
  const [paused, setPaused] = useState<boolean>(() => { const stored = readPreference('mari-motion-paused'); if (stored !== null) return stored === 'true'; return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches; });
  const [heroVisible, setHeroVisible] = useState(true), [showTop, setShowTop] = useState(false);
  const scrollToTop = useChapterScroll(path === '/', paused);
  useEffect(() => { const media = matchMedia('(prefers-reduced-motion: reduce)'); const change = () => { if (readPreference('mari-motion-paused') === null) setPaused(media.matches); }; media.addEventListener('change', change); return () => media.removeEventListener('change', change); }, []);
  useEffect(() => { try { localStorage.setItem('mari-language', lang); localStorage.setItem('mari-theme', theme); localStorage.setItem('mari-motion-paused', String(paused)); } catch { /* Preferences remain available for this visit. */ } document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang; document.documentElement.style.colorScheme = theme; document.documentElement.classList.toggle('dark', theme === 'dark'); document.documentElement.classList.toggle('motion-paused', paused); document.body.style.backgroundColor = theme === 'dark' ? '#1b1d15' : '#f5f6ee'; }, [lang, theme, paused]);
  useEffect(() => { const change = () => setShowTop(scrollY > 550); window.addEventListener('scroll', change, { passive: true }); change(); return () => window.removeEventListener('scroll', change); }, []);
  useEffect(() => { document.title = `${path === '/projetos/sicredi' ? 'Sicredi Centro-Norte · pesquisa e experiência digital' : path === '/projetos/livo' ? 'LIVO · fluxo de compra e análise heurística' : path === '/sobre' ? 'Sobre Mariana' : path.startsWith('/projetos') ? 'Projetos' : 'Product Designer & Product Owner'} — Mari Mou`; if (path === '/') setHeroVisible(true); }, [path]);
  return <ExperienceContext.Provider value={{ lang, setLang, theme, setTheme, hero, setHero }}><MotionPreference.Provider value={paused}><MotionConfig reducedMotion={paused ? 'always' : 'user'}><div className={`portfolio-site experience-site ${paused ? 'motion-paused' : ''}`} data-theme={theme}>
    <AmbientGrid /><a href="#main-content" className="skip-link">{({ pt: 'Pular para o conteúdo', en: 'Skip to content', es: 'Saltar al contenido' })[lang]}</a><SiteHeader path={path} onToggleMotion={() => setPaused(!paused)} />
    {path === '/' ? <main id="main-content"><HeroExperience onVisibility={setHeroVisible} /><div id="explorar" className="projects-viewport"><FeaturedProjects /></div><WorkProcess /><BeyondDeliverables /><Recommendations /><ContactSection /></main>
      : path === '/sobre' ? <AboutExperience /> : path === '/projetos' ? <PublicProjects /> : path.startsWith('/projetos/') ? <PublicCase key={path} id={decodeURIComponent(path.split('/')[2])} /> : <main id="main-content" className="public-page-heading wrap"><h1>404</h1><a href="/">{({ pt: 'Voltar ao início', en: 'Back home', es: 'Volver al inicio' })[lang]}</a></main>}
    <SiteFooter /><MariChat visible={path !== '/' || !heroVisible} />
    {showTop && <button className="experience-back-top" aria-label={({ pt: 'Voltar ao topo', en: 'Back to top', es: 'Volver arriba' })[lang]} onClick={scrollToTop}><ArrowUp size={18} /></button>}
  </div></MotionConfig></MotionPreference.Provider></ExperienceContext.Provider>;
}
