import { ArrowUpRight, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';
import { useMotionPaused } from '@/components/ui/motion-context';
import { ProgressiveCarousel } from '@/components/ui/progressive-carousel';
import './lwsa-media.css';

function MediaSpace({ title, detail, wide = false }: { title: string; detail: string; wide?: boolean }) {
  return <figure className={`lwsa-media-space ${wide ? 'is-wide' : ''}`}><div aria-hidden="true"><Image size={28}/><span>{title}</span></div><figcaption>{detail}</figcaption></figure>;
}

export function LwsaMedia({ chapter }: { chapter: number }) {
  const paused = useMotionPaused();

  if (chapter === 1) return <Reveal><MediaSpace title="Referências e pesquisa" detail="Espaço para os registros originais de posicionamento e benchmarking." wide/></Reveal>;
  if (chapter === 2) return <Reveal><ProgressiveCarousel label="Estudos e aplicações da identidade LWSA" items={[
    { id: 'evolution', phrase: 'A evolução da identidade.', content: <CarouselSpace variant="evolution" title="Evolução do logo"/> },
    { id: 'institutional', phrase: 'A marca no contexto institucional.', content: <CarouselSpace variant="institutional" title="Aplicação institucional"/> },
    { id: 'digital', phrase: 'Uma identidade nos pontos de contato digitais.', content: <CarouselSpace variant="digital" title="Presença digital"/> },
    { id: 'details', phrase: 'As formas e os detalhes do sistema visual.', content: <CarouselSpace variant="details" title="Detalhes da identidade"/> },
  ]}/></Reveal>;
  if (chapter !== 3) return null;

  return (
    <Reveal>
      <article className="lwsa-press">
        <div className="lwsa-press-copy">
          <p className="lwsa-press-eyebrow">Na imprensa · InvestNews</p>
          <h3>A nova fase da marca ganhou espaço no noticiário.</h3>
          <p>
            A matéria apresenta a mudança de Locaweb para LWSA no contexto de expansão do grupo e de novas aquisições. É um registro público do lançamento e do posicionamento que orientou o projeto.
          </p>
          <a
            className="pill primary"
            href="https://investnews.com.br/negocios/locaweb-muda-nome-para-lwsa-e-mira-aquisicoes-para-expansao/"
            target="_blank"
            rel="noreferrer"
          >
            Ler no InvestNews <ArrowUpRight size={18} />
          </a>
        </div>

        <figure className="lwsa-laptop-stage">
          <div className="lwsa-laptop-perspective">
            <motion.div
              className="lwsa-laptop-lid"
              initial={paused ? false : { rotateX: -85, opacity: 0 }}
              whileInView={{ rotateX: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={
                paused
                  ? { duration: 0 }
                  : {
                      duration: 1.15,
                      ease: [0.16, 1, 0.3, 1],
                      opacity: { duration: 0.35 },
                    }
              }
            >
              <div className="lwsa-mac-browser">
                <div className="lwsa-mac-bar" aria-hidden="true">
                  <span className="lwsa-mac-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="lwsa-mac-nav">‹　›</span>
                  <span className="lwsa-mac-address">investnews.com.br</span>
                  <span className="lwsa-mac-actions">↗　＋</span>
                </div>
                <div className="lwsa-mac-viewport">
                  <div className="lwsa-article-scroll">
                    <img
                      src="/assets/cases/investnews-article.jpg"
                      alt="Matéria do InvestNews: Locaweb muda nome para LWSA e mira aquisições para expansão"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="lwsa-laptop-base" aria-hidden="true">
              <span className="lwsa-laptop-notch" />
            </div>
          </div>
          <figcaption>Matéria original do InvestNews documentando a transição da marca.</figcaption>
        </figure>
      </article>
    </Reveal>
  );
}

function CarouselSpace({ variant, title }: { variant: string; title: string }) {
  return <div className={`lwsa-carousel-placeholder is-${variant}`}><div className="lwsa-carousel-art" aria-hidden="true"><i/><i/><i/></div><div className="lwsa-carousel-placeholder-copy"><span>{title}</span><p>Espaço reservado para o mockup aprovado</p></div></div>;
}
