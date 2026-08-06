import sobrePhoto from '../assets/sobre-photo.png';
import toolClaude from '../assets/tool-claude.png';
import toolFigma from '../assets/tool-figma.png';
import toolCreativeCloud from '../assets/tool-creative-cloud.png';
import toolCursor from '../assets/tool-cursor.png';

export default function SobreMimTeaser() {
  return (
    <section id="sobre" className="bg-grid-light min-h-screen snap-start flex flex-col justify-center">
      <div className="max-w-[1040px] w-full mx-auto px-6 pt-0 pb-10 md:pb-12">
        {/* ── Desktop: 3 colunas [ícones esq | conteúdo | ícones dir] ── */}
        <div className="hidden md:flex items-center justify-between gap-8">
          {/* Coluna esquerda */}
          <div className="flex flex-col items-center justify-center gap-10 shrink-0 w-44">
            <img
              src={toolClaude}
              alt="Ícone Claude"
              tabIndex={0}
              className="tool-icon reveal-fade w-40"
            />
            <img
              src={toolCreativeCloud}
              alt="Ícone Creative Cloud"
              tabIndex={0}
              className="tool-icon reveal-fade w-32"
            />
          </div>

          {/* Centro */}
          <div className="flex flex-col items-center text-center gap-5 flex-1">
            <img
              src={sobrePhoto}
              alt="Foto de Mari, cabelo cacheado bordô"
              className="reveal w-52 h-auto"
            />
            <h2 data-split className="text-lime text-2xl md:text-3xl">Afinal, quem é ela?</h2>
            <p data-split className="text-near-black max-w-[480px] text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam plasurond temporo
              tincidunt ut laoret dolore magna aliquat. #515443Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed diam plasurond temporo tincidunt ut laoret dolore
              magna aliquat. #515443
            </p>
            <a
              href="/sobre"
              className="btn-pill reveal inline-flex items-center rounded-pill bg-lime text-near-black font-bold px-8 py-3"
            >
              Saiba mais
            </a>
          </div>

          {/* Coluna direita */}
          <div className="flex flex-col items-center justify-center gap-10 shrink-0 w-44">
            <img
              src={toolFigma}
              alt="Ícone Figma"
              data-side="right"
              tabIndex={0}
              className="tool-icon reveal-fade w-32"
            />
            <img
              src={toolCursor}
              alt="Ícone Cursor"
              data-side="right"
              tabIndex={0}
              className="tool-icon reveal-fade w-36"
            />
          </div>
        </div>

        {/* ── Mobile: centro empilhado + ícones em linha abaixo ── */}
        <div className="flex flex-col items-center text-center gap-5 md:hidden">
          <img
            src={sobrePhoto}
            alt="Foto de Mari, cabelo cacheado bordô"
            className="reveal w-44 h-auto"
          />
          <h2 data-split className="text-lime text-2xl">Afinal, quem é ela?</h2>
          <p data-split className="text-near-black max-w-[340px] text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam plasurond temporo
            tincidunt ut laoret dolore magna aliquat. #515443Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed diam plasurond temporo tincidunt ut laoret dolore
            magna aliquat. #515443
          </p>
          <a
            href="/sobre"
            className="btn-pill reveal inline-flex items-center rounded-pill bg-lime text-near-black font-bold px-8 py-3"
          >
            Saiba mais
          </a>

          {/* Ícones em linha no mobile */}
          <div className="flex justify-center items-center gap-6 pt-4">
            <img src={toolClaude} alt="Ícone Claude" tabIndex={0} className="tool-icon reveal-fade w-20" />
            <img src={toolFigma} alt="Ícone Figma" data-side="right" tabIndex={0} className="tool-icon reveal-fade w-16" />
            <img src={toolCreativeCloud} alt="Ícone Creative Cloud" tabIndex={0} className="tool-icon reveal-fade w-16" />
            <img src={toolCursor} alt="Ícone Cursor" data-side="right" tabIndex={0} className="tool-icon reveal-fade w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
