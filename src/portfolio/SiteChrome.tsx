import { ArrowUpRight } from 'lucide-react';
import './contact-section.css';
import { ContactPhone } from './ContactPhone';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { Reveal } from '@/components/ui/reveal';
import { useMotionPaused } from '@/components/ui/motion-context';
import { email, linkedin, useExperience, whatsapp } from './experience-context';

export { SiteHeader } from './HeaderMenu';

export function ContactSection() {
  const { t } = useExperience(), paused = useMotionPaused();
  return <section id="contato" className={`experience-contact wrap contact-redesign contact-option-2 ${paused ? 'contact-motion-paused' : ''}`}>
    <Reveal className="contact-composition">
      <ContactPhone />
      <div className="contact-copy"><WordPullUp as="h2" paused={paused} words={t('Tem um projeto para tirar do papel?', 'Have a project to bring to life?', '¿Tienes un proyecto por hacer realidad?')} /><p className="contact-lead">{t('Se você tem uma ideia e quer transformá-la em realidade, posso apoiar desde a definição do problema até a experiência, a consultoria e a gestão do projeto. Podemos começar por uma conversa sobre o que já existe e qual é o próximo passo.','If you have an idea to bring to life, I can support you from defining the problem to experience, consulting and project management. Let’s start with the context and next steps.','Si tienes una idea para hacer realidad, puedo apoyar desde la definición del problema hasta la experiencia, consultoría y gestión. Empecemos por el contexto y el próximo paso.')}</p><a className="pill primary contact-text-cta" href={whatsapp} target="_blank" rel="noreferrer">{t('Conte-me sobre seu projeto','Tell me about your project','Cuéntame tu proyecto')}<ArrowUpRight/></a></div></Reveal></section>;
}

export function SiteFooter() {
  const { t } = useExperience();
  return <footer className="site-footer restored-footer"><div className="wrap footer-wireframe-grid">
    <div className="footer-brand"><a href="/" className="wordmark">mari<span>mou</span><i>✳</i></a><h2>{t('Vamos conversar?','Let’s talk?','¿Conversamos?')}</h2></div>
    <nav className="footer-column" aria-label={t('Seções do site','Site sections','Secciones del sitio')}><strong>{t('Explorar','Explore','Explorar')}</strong><a href="/">Home</a><a href="/projetos">{t('Projetos','Projects','Proyectos')}</a><a href="/sobre">{t('Sobre mim','About me','Sobre mí')}</a></nav>
    <nav className="footer-column" aria-label={t('Contato e redes','Contact and social','Contacto y redes')}><strong>{t('Contato e redes','Contact and social','Contacto y redes')}</strong><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={15}/></a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp<ArrowUpRight size={15} aria-hidden="true"/></a><a href={email}>E-mail<ArrowUpRight size={15} aria-hidden="true"/></a></nav>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Mariana Senciani</span></div>
  </div></footer>;
}
