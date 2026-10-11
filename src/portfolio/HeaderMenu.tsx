import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, Moon, Sun, X, Pause, Play } from 'lucide-react';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience, type Language } from './experience-context';

function LanguageFlag({ language }: { language: Language }) {
  return <svg width="23" height="16" viewBox="0 0 30 20" aria-hidden="true" className="language-flag">
    {language === 'pt' ? <><path fill="#229447" d="M0 0h30v20H0z"/><path fill="#ffdf45" d="m15 2 12 8-12 8L3 10z"/><circle cx="15" cy="10" r="5" fill="#234493"/><path d="M10.3 8.5q5-.8 9.1 3" fill="none" stroke="white" strokeWidth="1"/></> : language === 'es' ? <><path fill="#b92435" d="M0 0h30v20H0z"/><path fill="#ffce43" d="M0 5h30v10H0z"/><path fill="#b92435" d="M8 8h3v5H8z"/></> : <><path fill="#24396a" d="M0 0h30v20H0z"/><path d="m0 0 30 20M30 0 0 20" stroke="white" strokeWidth="4"/><path d="m0 0 30 20M30 0 0 20" stroke="#cc3343" strokeWidth="1.5"/><path d="M15 0v20M0 10h30" stroke="white" strokeWidth="7"/><path d="M15 0v20M0 10h30" stroke="#cc3343" strokeWidth="4"/></>}
  </svg>;
}

export function SiteHeader({ path, onToggleMotion, motionDisabled }: { path: string; onToggleMotion: () => void; motionDisabled: boolean }) {
  const { hero, setHero, theme, setTheme, lang, setLang, t } = useExperience();
  const paused = useMotionPaused();
  const [menu, setMenu] = useState(false), [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { const scroll = () => setScrolled(scrollY > 48); scroll(); window.addEventListener('scroll', scroll, { passive: true }); return () => window.removeEventListener('scroll', scroll); }, []);
  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    const close = (event: PointerEvent) => { if (!ref.current?.contains(event.target as Node)) { setMenu(false); ref.current?.querySelectorAll('details').forEach(el => el.open = false); } };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenu(false); ref.current?.querySelectorAll('details').forEach(el => el.open = false); } };
    document.addEventListener('pointerdown', close); document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape); };
  }, []);
  const controls = () => <>
    {path === '/' && <details className="header-dropdown hero-selector"><summary>Hero {hero}/3<ChevronDown size={12} /></summary><div className="header-dropdown-panel">{[t('Editorial', 'Editorial', 'Editorial'), t('Decisões', 'Decisions', 'Decisiones'), t('Perfil', 'Profile', 'Perfil')].map((name, i) => <button key={name} aria-pressed={hero === i + 1} onClick={event => { setHero(i + 1); event.currentTarget.closest('details')!.open = false; }}>0{i + 1} · {name}</button>)}</div></details>}
    <a className="pill primary header-talk" href="/#contato" onClick={() => setMenu(false)}>{t('Falar comigo', 'Let’s talk', 'Hablemos')}<ArrowUpRight size={14} /></a>
    <details className="header-dropdown language-selector"><summary aria-label={t('Selecionar idioma', 'Select language', 'Elegir idioma')}><LanguageFlag language={lang} /><ChevronDown size={11} /></summary><div className="header-dropdown-panel">{(['pt', 'en', 'es'] as Language[]).map(code => <button key={code} lang={code} aria-pressed={lang === code} onClick={event => { setLang(code); event.currentTarget.closest('details')!.open = false; }}>{({ pt: '🇧🇷 Português', en: '🇬🇧 English', es: '🇪🇸 Español' })[code]}</button>)}</div></details>
    <button className="theme-control" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? t('Ativar tema claro', 'Use light theme', 'Activar tema claro') : t('Ativar tema escuro', 'Use dark theme', 'Activar tema oscuro')}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
  </>;
  return <header ref={ref} className={`experience-header wrap ${scrolled ? 'is-collapsed' : ''}`}>
    <div className="header-full">
      <a href="/" className="wordmark" aria-label="Mari Mou — início">mari<span>mou</span><i>✳</i></a>
      <nav className="experience-nav" aria-label={t('Navegação principal', 'Main navigation', 'Navegación principal')}>
        <a href="/projetos" aria-current={path.startsWith('/projetos') ? 'page' : undefined}>{t('Projetos', 'Projects', 'Proyectos')}</a><a href="/sobre" aria-current={path === '/sobre' ? 'page' : undefined}>{t('Sobre mim', 'About me', 'Sobre mí')}</a>
      </nav>
      <div className="experience-header-actions">{controls()}</div>
    </div>
    <div className={`compact-menu ${menu ? 'is-open' : ''}`} onPointerEnter={event => { if (event.pointerType === 'mouse' && matchMedia('(min-width: 801px) and (hover: hover)').matches) setMenu(true); }} onPointerLeave={event => { if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) setMenu(false); }}>
      <button className="compact-menu-trigger" aria-label={t('Menu de navegação', 'Navigation menu', 'Menú de navegación')} aria-expanded={menu} aria-controls="compact-navigation" onClick={() => setMenu(!menu)}>{menu ? <X size={21} /> : <Menu size={21} />}</button>
      <div id="compact-navigation" className="compact-menu-panel" {...(!menu ? { inert: '' } : {})}>
        <a href="/" className="compact-menu-brand">mari mou <span>✳</span></a>
        <nav aria-label={t('Explorar o site', 'Explore the site', 'Explorar el sitio')}>
          <a href="/projetos" onClick={() => setMenu(false)}>{t('Projetos', 'Projects', 'Proyectos')}<ArrowUpRight size={19}/></a>
          <a href="/sobre" onClick={() => setMenu(false)}>{t('Sobre mim', 'About me', 'Sobre mí')}<ArrowUpRight size={19}/></a>
        </nav>
        <div className="compact-menu-options">{controls()}</div>
        <button className="menu-motion-control" onClick={onToggleMotion} disabled={motionDisabled} aria-pressed={paused}>{paused ? <Play size={14}/> : <Pause size={14}/>} {paused ? t('Retomar animações', 'Resume animations', 'Reanudar animaciones') : t('Pausar animações', 'Pause animations', 'Pausar animaciones')}</button>
      </div>
    </div>
  </header>;
}
