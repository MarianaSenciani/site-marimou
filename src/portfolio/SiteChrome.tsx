import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { BubbleText } from '@/components/ui/bubble-text';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { Reveal } from '@/components/ui/reveal';
import { useMotionPaused } from '@/components/ui/motion-context';
import { email, linkedin, useExperience, type Language } from './experience-context';

function LanguageFlag({ language }: { language: Language }) {
  return <svg width="23" height="16" viewBox="0 0 30 20" aria-hidden="true" className="language-flag">
    {language === 'pt' ? <><path fill="#229447" d="M0 0h30v20H0z"/><path fill="#ffdf45" d="m15 2 12 8-12 8L3 10z"/><circle cx="15" cy="10" r="5" fill="#234493"/><path d="M10.3 8.5q5-.8 9.1 3" fill="none" stroke="white" strokeWidth="1"/></> : language === 'es' ? <><path fill="#b92435" d="M0 0h30v20H0z"/><path fill="#ffce43" d="M0 5h30v10H0z"/><path fill="#b92435" d="M8 8h3v5H8z"/></> : <><path fill="#24396a" d="M0 0h30v20H0z"/><path d="m0 0 30 20M30 0 0 20" stroke="white" strokeWidth="4"/><path d="m0 0 30 20M30 0 0 20" stroke="#cc3343" strokeWidth="1.5"/><path d="M15 0v20M0 10h30" stroke="white" strokeWidth="7"/><path d="M15 0v20M0 10h30" stroke="#cc3343" strokeWidth="4"/></>}
  </svg>;
}

export function SiteHeader({ path }: { path: string }) {
  const { hero, setHero, theme, setTheme, lang, setLang, t } = useExperience();
  const [menu, setMenu] = useState(false), [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { const scroll = () => setScrolled(scrollY > 24); scroll(); window.addEventListener('scroll', scroll, { passive: true }); return () => window.removeEventListener('scroll', scroll); }, []);
  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    const close = (event: PointerEvent) => { if (!ref.current?.contains(event.target as Node)) { setMenu(false); ref.current?.querySelectorAll('details').forEach(el => el.open = false); } };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenu(false); ref.current?.querySelectorAll('details').forEach(el => el.open = false); } };
    document.addEventListener('pointerdown', close); document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape); };
  }, []);
  return <header ref={ref} className={`experience-header wrap ${scrolled ? 'is-scrolled' : ''}`}>
    <a href="/" className="wordmark" aria-label="Mari Mou — início">mari<span>mou</span><i>✳</i></a>
    <nav className={menu ? 'experience-nav is-open' : 'experience-nav'} aria-label={t('Navegação principal', 'Main navigation', 'Navegación principal')}>
      <a href="/projetos" aria-current={path.startsWith('/projetos') ? 'page' : undefined}>{t('Projetos', 'Projects', 'Proyectos')}</a><a href="/sobre" aria-current={path === '/sobre' ? 'page' : undefined}>{t('Sobre mim', 'About me', 'Sobre mí')}</a>
    </nav>
    <div className="experience-header-actions">
      {path === '/' && <details className="header-dropdown hero-selector"><summary>Hero {hero}/3<ChevronDown size={12} /></summary><div className="header-dropdown-panel">{[t('Editorial', 'Editorial', 'Editorial'), t('Decisões', 'Decisions', 'Decisiones'), t('Perfil', 'Profile', 'Perfil')].map((name, i) => <button key={name} aria-pressed={hero === i + 1} onClick={event => { setHero(i + 1); event.currentTarget.closest('details')!.open = false; }}>0{i + 1} · {name}</button>)}</div></details>}
      <a className="pill primary header-talk" href="/#contato">{t('Falar comigo', 'Let’s talk', 'Hablemos')}<ArrowUpRight size={14} /></a>
      <details className="header-dropdown language-selector"><summary aria-label={t('Selecionar idioma', 'Select language', 'Elegir idioma')}><LanguageFlag language={lang} /><ChevronDown size={11} /></summary><div className="header-dropdown-panel">{(['pt', 'en', 'es'] as Language[]).map(code => <button key={code} lang={code} aria-pressed={lang === code} onClick={event => { setLang(code); event.currentTarget.closest('details')!.open = false; }}>{({ pt: '🇧🇷 Português', en: '🇬🇧 English', es: '🇪🇸 Español' })[code]}</button>)}</div></details>
      <button className="theme-control" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? t('Ativar tema claro', 'Use light theme', 'Activar tema claro') : t('Ativar tema escuro', 'Use dark theme', 'Activar tema oscuro')}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
      <button className="mobile-menu-control" aria-label={t('Menu de navegação', 'Navigation menu', 'Menú de navegación')} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
  </header>;
}

export function ContactSection() {
  const { t } = useExperience(), paused = useMotionPaused();
  return <section id="contato" className="experience-contact wrap"><Reveal><WordPullUp as="h2" paused={paused} words={t('Tem um projeto para tirar do papel?', 'Have a project to bring to life?', '¿Tienes un proyecto por hacer realidad?')} /><p className="contact-lead">{t('Se você tem uma ideia e quer transformá-la em realidade, posso apoiar desde a definição do problema até a experiência, a consultoria e a gestão do projeto. Podemos começar por uma conversa sobre o que já existe e qual é o próximo passo.','If you have an idea to bring to life, I can support you from defining the problem to experience, consulting and project management. Let’s start with the context and next steps.','Si tienes una idea para hacer realidad, puedo apoyar desde la definición del problema hasta la experiencia, consultoría y gestión. Empecemos por el contexto y el próximo paso.')}</p><div className="contact-facts"><div><strong>{t('Para quem','Who it is for','Para quién')}</strong><span>{t('Quem tem uma ideia, um produto em evolução ou precisa de apoio para decidir.','People with an idea, an evolving product or a decision to make.','Quien tiene una idea, un producto en evolución o necesita apoyo para decidir.')}</span></div><div><strong>{t('Como posso apoiar','How I can help','Cómo puedo ayudar')}</strong><span>{t('Design de experiência, consultoria e gestão de projetos.','Experience design, consulting and project management.','Diseño de experiencia, consultoría y gestión de proyectos.')}</span></div><div><strong>{t('Sobre o quê','What we can discuss','Sobre qué')}</strong><span>{t('Sistemas e aplicativos, websites e landing pages.','Systems and apps, websites and landing pages.','Sistemas y aplicaciones, sitios y landing pages.')}</span></div></div><p className="meeting-duration">{t('Conversa inicial sugerida: 30 minutos a 1 hora, a combinar.','Suggested first conversation: 30 minutes to 1 hour, by arrangement.','Primera conversación sugerida: de 30 minutos a 1 hora, a convenir.')}</p><a className="text-link contact-text-cta" href={email+'?subject=Tenho%20um%20projeto%20para%20conversar'}><BubbleText paused={paused} text={t('Conte-me sobre seu projeto','Tell me about your project','Cuéntame tu proyecto')} /><ArrowUpRight/></a></Reveal></section>;
}

export function SiteFooter() {
  const { t } = useExperience();
  return <footer className="site-footer restored-footer"><div className="wrap footer-wireframe-grid">
    <div className="footer-brand"><a href="/" className="wordmark">mari<span>mou</span><i>✳</i></a><h2>{t('Vamos conversar, vamos construir algo juntos.','Let’s talk. Let’s build something together.','Conversemos, construyamos algo juntos.')}</h2><p>{t('Experiência, produto e ideias digitais com espaço para colaboração.','Experience, product and digital ideas with room for collaboration.','Experiencia, producto e ideas digitales con espacio para colaborar.')}</p></div>
    <nav className="footer-column" aria-label={t('Seções do site','Site sections','Secciones del sitio')}><strong>{t('Explorar','Explore','Explorar')}</strong><a href="/">Home<ArrowUpRight size={15}/></a><a href="/projetos">{t('Projetos','Projects','Proyectos')}<ArrowUpRight size={15}/></a><a href="/sobre">{t('Sobre mim','About me','Sobre mí')}<ArrowUpRight size={15}/></a></nav>
    <nav className="footer-column" aria-label={t('Contato e redes','Contact and social','Contacto y redes')}><strong>{t('Contato e redes','Contact and social','Contacto y redes')}</strong><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={15}/></a><a href="https://www.whatsapp.com/" target="_blank" rel="noreferrer" title="Link provisório">WhatsApp<ArrowUpRight size={15}/></a><a href={email}>E-mail<Mail size={15}/></a></nav>
    <div className="footer-bottom"><span>{t('Feito com intenção, curiosidade e café.','Made with intention, curiosity, and coffee.','Hecho con intención, curiosidad y café.')}</span><span>© {new Date().getFullYear()} Mariana Senciani</span></div>
  </div></footer>;
}
