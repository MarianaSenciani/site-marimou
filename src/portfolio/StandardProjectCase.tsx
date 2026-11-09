import { useState, type ReactNode } from 'react';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { Reveal } from '@/components/ui/reveal';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useCaseOpening, CaseSectionDetails } from './CaseSections';
import { useExperience } from './experience-context';
import { LwsaMedia } from './LwsaMedia';
import { LwsaHeroPhoto } from './LwsaHeroPhoto';
import { CaseHero, CaseHighlights, CaseOverview, CaseReading, CaseReflection, CaseNext, CaseVisualPlaceholder, type CaseFact } from './CaseLayout';

/** New registered projects inherit the framing; optional editorial fields stay project-specific. */
type Project = {
  id: string; title: string; subtitle?: string; brand?: string; category?: string; year?: string;
  role?: string; platform?: string; tags?: string[]; tagKeys?: string[]; description?: string; image?: string; demo?: boolean;
  chapters?: readonly (readonly string[])[];
  caseDetails?: {
    highlights?: CaseFact[]; challenge?: string; contribution?: string; approach?: string; reflection?: string;
  };
};

function Cover({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const safe = project.image && /^(https?:\/\/|\/[^/]|data:image\/(png|jpeg|webp|gif);base64,)/i.test(project.image);
  return safe && !failed
    ? <img className="case-custom-image" src={project.image} alt={project.title} onError={() => setFailed(true)}/>
    : <CaseVisualPlaceholder name={project.brand ?? project.title} kind={project.id === 'lwsa' ? 'brand' : 'interface'}/>;
}

export function StandardProjectCase({ project }: { project: Project }) {
  const paused = useMotionPaused(), { t } = useExperience(), opening = useCaseOpening(project.id), editorial = project.caseDetails;
  const lwsa = project.id === 'lwsa';
  const curating = t('Em curadoria', 'Being curated', 'En curaduría');
  const sections = project.chapters?.length ? project.chapters : [
    [t('Contexto', 'Context', 'Contexto'), t('O contexto do projeto.', 'The project context.', 'El contexto del proyecto.'), project.description || project.subtitle || t('Conteúdo do projeto em curadoria.', 'Project content being curated.', 'Contenido del proyecto en curaduría.')],
  ];
  const chapters = sections.map(([label], index) => [label, `chapter-${index}`] as const);
  const highlights: readonly CaseFact[] = editorial?.highlights?.length === 3 ? editorial.highlights : opening?.highlights?.map(([value, label]) => [value, label] as const) ?? [
    [project.category || t('Projeto', 'Project', 'Proyecto'), t('Área de atuação', 'Area of work', 'Área de actuación')],
    [project.year || curating, t('Período do projeto', 'Project period', 'Período del proyecto')],
    [project.platform || project.tags?.join(' · ') || curating, t('Plataforma e foco', 'Platform and focus', 'Plataforma y enfoque')],
  ];
  let reflection: ReactNode = editorial?.reflection || t('Os aprendizados específicos deste projeto estão em curadoria.', 'The specific learnings from this project are being curated.', 'Los aprendizajes específicos de este proyecto están en curaduría.');
  if (lwsa && !editorial?.reflection) reflection = t(
    'Conectar a pesquisa de posicionamento às escolhas visuais e às aprovações com stakeholders foi o eixo deste trabalho. Levo essa relação entre contexto de negócio, direção visual e alinhamento entre áreas para os próximos projetos.',
    'Connecting positioning research to visual choices and stakeholder approvals was the backbone of this work. I carry this relationship between business context, visual direction, and alignment across teams into my next projects.',
    'Conectar la investigación de posicionamiento con las decisiones visuales y las aprobaciones de stakeholders fue el eje de este trabajo. Llevo esa relación entre contexto de negocio, dirección visual y alineación entre áreas a los próximos proyectos.');
  return <main id="main-content" className="project-case standard-project-case">
    <CaseHero name={[project.brand || project.title, project.category, project.year].filter(Boolean).join(' · ')}
      title={project.title} subtitle={project.subtitle || project.description || ''}
      highlights={<CaseHighlights items={highlights}/>} visual={lwsa ? <LwsaHeroPhoto/> : <Cover project={project}/>}/>
    <CaseOverview facts={[[ t('Meu papel', 'My role', 'Mi rol'), project.role || curating ], [ t('Período', 'Period', 'Período'), project.year || curating ], [ t('Plataforma', 'Platform', 'Plataforma'), project.platform || curating ], [ t('Escopo', 'Scope', 'Alcance'), project.tags?.join(' · ') || project.category || curating ]]}
      challenge={editorial?.challenge || (lwsa
        ? t('Representar a expansão do grupo com uma identidade alinhada ao novo posicionamento do ecossistema.', 'Representing the group’s expansion with an identity aligned to the ecosystem’s new positioning.', 'Representar la expansión del grupo con una identidad alineada al nuevo posicionamiento del ecosistema.')
        : project.description || project.subtitle || t('Contexto em curadoria.', 'Context being curated.', 'Contexto en curaduría.'))}
      contribution={editorial?.contribution || (lwsa ? opening!.summary : project.role || t('Contribuição em curadoria.', 'Contribution being curated.', 'Contribución en curaduría.'))}
      approach={editorial?.approach || (lwsa
        ? t('Conectar pesquisa de posicionamento e benchmarking com RP à direção visual, com aprovação das partes interessadas.', 'Connecting positioning research and benchmarking with PR to the visual direction, with stakeholder approval.', 'Conectar la investigación de posicionamiento y el benchmarking con RR. PP. con la dirección visual, con aprobación de las partes interesadas.')
        : t('As decisões e os artefatos específicos deste projeto serão apresentados nos capítulos abaixo.', 'The specific decisions and artifacts of this project will be presented in the chapters below.', 'Las decisiones y los artefactos específicos de este proyecto se presentarán en los capítulos siguientes.'))}/>
    <CaseReading chapters={chapters}>
      {sections.map(([label, title, body], index) => <section className={`case-standard-chapter wrap ${lwsa && index === 3 ? 'case-full-scene' : ''}`} key={chapters[index][1]} id={chapters[index][1]}>
        <Reveal><WordPullUp as="h2" paused={paused} words={title}/><p>{body}</p></Reveal>
        {opening && <CaseSectionDetails id={project.id} chapter={index}/>}
        {lwsa && <LwsaMedia chapter={index}/>}
      </section>)}
      {project.demo && <p className="wrap case-demo-note">{t('Estudo visual demonstrativo, sem resultados de negócio atribuídos.', 'Demonstrative visual study, with no business results attributed.', 'Estudio visual demostrativo, sin resultados de negocio atribuidos.')}</p>}
      <CaseReflection>{reflection}</CaseReflection>
      <CaseNext href={lwsa ? '/projetos/livo' : '/projetos'} label={lwsa ? t('Próximo case · LIVO', 'Next case · LIVO', 'Siguiente caso · LIVO') : undefined}/>
    </CaseReading>
  </main>;
}
