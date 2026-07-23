function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const navegarLinks = ['Serviços', 'Portfólio', 'Sobre', 'Contato'];
const conectarLinks = ['Instagram', 'LinkedIn', 'Twitter'];

export default function Footer() {
  // Footer compacto: sem min-h-screen (não ocupa mais a viewport inteira) +
  // grid marrom sutil (.bg-grid-footer) sobre o lime.
  return (
    <footer id="contato" className="bg-lime bg-grid-footer snap-start">
      {/* py reduzido (era py-20 + flex-1 items-center que enchiam a tela) */}
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          <div>
            {/* .reveal no lugar de data-split: evita o clipping do "Ç" que a
                máscara de linhas do SplitText causava. leading + pb dão folga ao cedilha. */}
            <h3 className="reveal text-near-black text-3xl md:text-4xl leading-[1.15] pb-1">
              CRIE.
              <br />
              MUDE.
              <br />
              CRESÇA.
            </h3>
            <a
              href="#contato"
              className="btn-pill mt-8 inline-flex items-center gap-2 rounded-pill bg-near-black text-bg-cream font-bold px-6 py-3"
            >
              Vamos trabalhar
              <ArrowIcon />
            </a>
          </div>

          <div>
            <h4 className="font-bold text-near-black mb-4">Navegar</h4>
            <ul className="space-y-2">
              {navegarLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-near-black hover:opacity-70 transition-opacity">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-near-black mb-4">Conectar</h4>
            <ul className="space-y-2">
              {conectarLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-near-black hover:opacity-70 transition-opacity">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-near-black">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-bg-cream text-xs">
          <p>© 2026 Mari Mou. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-70 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
