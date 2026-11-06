import { ArrowUpRight, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience } from './experience-context';
import { ProgressiveCarousel } from '@/components/ui/progressive-carousel';
import './lwsa-media.css';

function MediaSpace({ title, detail, wide = false }: { title: string; detail: string; wide?: boolean }) {
  return <figure className={`lwsa-media-space ${wide ? 'is-wide' : ''}`}><div aria-hidden="true"><Image size={28}/><span>{title}</span></div><figcaption>{detail}</figcaption></figure>;
}

export function LwsaMedia({ chapter }: { chapter: number }) {
  const paused = useMotionPaused(), { t } = useExperience();

  if (chapter === 1) return <Reveal><MediaSpace title={t('Referências e pesquisa', 'References and research', 'Referencias e investigación')} detail={t('Espaço para os registros originais de posicionamento e benchmarking.', 'Space for the original positioning and benchmarking records.', 'Espacio para los registros originales de posicionamiento y benchmarking.')} wide/></Reveal>;
  if (chapter === 2) return <Reveal><ProgressiveCarousel label={t('Estudos e aplicações da identidade LWSA', 'LWSA identity studies and applications', 'Estudios y aplicaciones de la identidad LWSA')} items={[
    { id: 'evolution', phrase: t('A evolução da identidade.', 'The evolution of the identity.', 'La evolución de la identidad.'), content: <CarouselSpace variant="evolution" title={t('Evolução do logo', 'Logo evolution', 'Evolución del logo')}/> },
    { id: 'institutional', phrase: t('A marca no contexto institucional.', 'The brand in an institutional context.', 'La marca en el contexto institucional.'), content: <CarouselSpace variant="institutional" title={t('Aplicação institucional', 'Institutional application', 'Aplicación institucional')}/> },
    { id: 'digital', phrase: t('Uma identidade nos pontos de contato digitais.', 'An identity across digital touchpoints.', 'Una identidad en los puntos de contacto digitales.'), content: <CarouselSpace variant="digital" title={t('Presença digital', 'Digital presence', 'Presencia digital')}/> },
    { id: 'details', phrase: t('As formas e os detalhes do sistema visual.', 'The shapes and details of the visual system.', 'Las formas y los detalles del sistema visual.'), content: <CarouselSpace variant="details" title={t('Detalhes da identidade', 'Identity details', 'Detalles de la identidad')}/> },
  ]}/></Reveal>;
  if (chapter !== 3) return null;

  return (
    <Reveal>
      <article className="lwsa-press">
        <div className="lwsa-press-copy">
          <p className="lwsa-press-eyebrow">{t('Na imprensa · InvestNews', 'In the press · InvestNews', 'En la prensa · InvestNews')}</p>
          <h3>{t('A nova fase da marca ganhou espaço no noticiário.', 'The brand’s new phase made it into the news.', 'La nueva etapa de la marca ganó espacio en las noticias.')}</h3>
          <p>
            {t('A matéria apresenta a mudança de Locaweb para LWSA no contexto de expansão do grupo e de novas aquisições. É um registro público do lançamento e do posicionamento que orientou o projeto.', 'The article presents the change from Locaweb to LWSA in the context of the group’s expansion and new acquisitions. It is a public record of the launch and of the positioning that guided the project.', 'La nota presenta el cambio de Locaweb a LWSA en el contexto de expansión del grupo y de nuevas adquisiciones. Es un registro público del lanzamiento y del posicionamiento que orientó el proyecto.')}
          </p>
          <a
            className="pill primary"
            href="https://investnews.com.br/negocios/locaweb-muda-nome-para-lwsa-e-mira-aquisicoes-para-expansao/"
            target="_blank"
            rel="noreferrer"
          >
            {t('Ler no InvestNews', 'Read on InvestNews', 'Leer en InvestNews')} <ArrowUpRight size={18} />
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
                      alt={t('Matéria do InvestNews: Locaweb muda nome para LWSA e mira aquisições para expansão', 'InvestNews article: Locaweb changes its name to LWSA and targets acquisitions for expansion', 'Nota de InvestNews: Locaweb cambia su nombre a LWSA y apunta a adquisiciones para expandirse')}
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
          <figcaption>{t('Matéria original do InvestNews documentando a transição da marca.', 'Original InvestNews article documenting the brand transition.', 'Nota original de InvestNews que documenta la transición de la marca.')}</figcaption>
        </figure>
      </article>
    </Reveal>
  );
}

function CarouselSpace({ variant, title }: { variant: string; title: string }) {
  const { t } = useExperience();
  return <div className={`lwsa-carousel-placeholder is-${variant}`}><div className="lwsa-carousel-art" aria-hidden="true"><i/><i/><i/></div><div className="lwsa-carousel-placeholder-copy"><span>{title}</span><p>{t('Espaço reservado para o mockup aprovado', 'Space reserved for the approved mockup', 'Espacio reservado para el mockup aprobado')}</p></div></div>;
}
