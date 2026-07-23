import heroBitmoji from '../assets/hero-bitmoji.png';

export default function Hero() {
  return (
    <section id="home" className="bg-grid-light relative overflow-hidden min-h-screen snap-start flex flex-col justify-center">
      <div className="max-w-[1280px] mx-auto w-full px-6 md:px-12 py-6 md:py-8">
        {/* H1 posicionado atrás do Bitmoji — serve como "fundo tipográfico" */}
        <h1 data-split className="text-near-black text-[clamp(8rem,7.5vw,9rem)] leading-[1] tracking-tight text-center whitespace-nowrap mt-4 md:mt-8">
          OI, SOU A MARI!
        </h1>

        {/* Container central: Bitmoji (maior), texto lateral, botão Baixar CV */}
        <div className="relative flex flex-col items-center md:flex-row md:items-center justify-between gap-6 md:gap-4 -mt-4 md:-mt-12">

          {/* Texto lateral — posicionado à esquerda no desktop */}
          <p className="reveal order-2 md:order-none text-near-black text-base md:text-lg max-w-[240px] text-center md:text-left">
            {/* Sublinhado verde animado na entrada (ver .risco) */}
            <a href="#sobre" className="risco">
              Product Designer &amp; Diretora de Arte
            </a>{' '}
            há mais de 6 anos.
          </p>

          {/* Bitmoji — centralizado, sobrepõe a base do H1. Tamanho +15% */}
          <div className="order-1 md:order-none relative shrink-0">
            {/* Círculo verde de fundo — aumentado +15% proporcionalmente */}
            <div
              className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[253px] h-[253px] md:w-[322px] md:h-[322px] rounded-full bg-lime"
              aria-hidden="true"
            />
            <img
              src={heroBitmoji}
              alt="Bitmoji ilustrado da Mari, cabelo cacheado bordô, camiseta preta estampada"
              className="relative block w-[265px] md:w-[345px] h-auto mx-auto"
            />
          </div>

          {/* Botão Baixar CV — fundo verde (lime), posicionado à direita no desktop */}
          <a
            href="/assets/cv-placeholder.pdf"
            download
            /* TODO: adicionar PDF do currículo real */
            className="btn-pill reveal order-3 md:order-none shrink-0 inline-flex items-center gap-2 rounded-pill bg-lime text-near-black font-bold px-8 py-3"
          >
            Baixar CV
            {/* Ícone de seta para baixo (download) */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
              <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
