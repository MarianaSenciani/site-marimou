import { useEffect, useRef, useState } from 'react';

// TODO: trocar pelo número real da Mari (formato internacional, sem + nem espaços).
const WHATSAPP_URL =
  'https://wa.me/5599999999999?text=Ol%C3%A1%2C%20Mari!%20Vim%20pelo%20seu%20portf%C3%B3lio.';

export default function Header({ currentPath = '/' }) {
  const isSobre = currentPath === '/sobre';
  const navLinks = [
    { label: 'Serviços', href: isSobre ? '/#servicos' : '#servicos' },
    { label: 'Portfólio', href: isSobre ? '/#portfolio' : '#portfolio' },
    // Sempre aponta para a página Sobre completa, não para o teaser
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: isSobre ? '/#contato' : '#contato' },
  ];
  const [open, setOpen] = useState(false);
  const hamRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Acessibilidade do painel: foca o 1º link, fecha no Esc e devolve o foco.
  useEffect(() => {
    if (!open) return undefined;
    // preventScroll evita que o foco role a página (que, com scroll-snap, pularia de seção).
    firstLinkRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        hamRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* LOGO "Mari Mou" — canto superior esquerdo, sempre visível, linka para Home */}
      <a
        href="/"
        className="fixed top-5 left-6 z-50 font-bold text-near-black text-xl tracking-tight hover:opacity-70 transition-opacity duration-150"
      >
        Mari Mou
      </a>

      {/* BOTÃO DE MENU VERDE — canto superior direito, sempre visível */}
      <div className="fixed top-4 right-4 z-50">
        <button
          ref={hamRef}
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-panel"
          onClick={() => setOpen((o) => !o)}
          className="relative w-14 h-14 rounded-full bg-lime flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-near-black"
        >
          {/* Ícone padrão: 3 linhas (menu) que viram um X (fechar) */}
          <span className="relative block w-6 h-[16px]">
            <span
              className={`absolute left-0 h-[2.5px] w-6 rounded bg-near-black transition-all duration-300 ${
                open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2.5px] w-6 rounded bg-near-black transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-[2.5px] w-6 rounded bg-near-black transition-all duration-300 ${
                open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[13.5px]'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Camada invisível para fechar ao clicar fora (não escurece o conteúdo) */}
      {open && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 cursor-default"
        />
      )}

      {/* PAINEL DROPDOWN — compacto no canto superior direito, pouco invasivo */}
      <div
        id="menu-panel"
        role="dialog"
        aria-modal="false"
        aria-label="Menu de navegação"
        className={`fixed top-[84px] right-4 z-50 w-[260px] origin-top-right rounded-[24px] bg-near-black/95 backdrop-blur p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((l, i) => (
            <li key={l.href}>
              <a
                ref={i === 0 ? firstLinkRef : null}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-[14px] text-bg-cream hover:bg-white/10 hover:text-lime transition-colors duration-150 font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="btn-pill mt-2 flex items-center justify-center rounded-pill bg-lime text-near-black font-bold px-5 py-3"
        >
          Entre em contato
        </a>
      </div>
    </>
  );
}
