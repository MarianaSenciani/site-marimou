import { useState, type ReactNode } from 'react';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { Reveal } from '@/components/ui/reveal';
import { useMotionPaused } from '@/components/ui/motion-context';
import { caseOpenings, CaseSectionDetails } from './CaseSections';
import { LwsaMedia } from './LwsaMedia';
import { CaseHero, CaseHighlights, CaseOverview, CaseReading, CaseReflection, CaseNext, CaseVisualPlaceholder, type CaseFact } from './CaseLayout';

/** New registered projects inherit the framing; optional editorial fields stay project-specific. */
type Project = {
  id: string; title: string; subtitle?: string; brand?: string; category?: string; year?: string;
  role?: string; platform?: string; tags?: string[]; description?: string; image?: string; demo?: boolean;
  chapters?: readonly (readonly [string, string, string])[];
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
  const paused = useMotionPaused(), opening = caseOpenings[project.id], editorial = project.caseDetails;
  const lwsa = project.id === 'lwsa';
  const sections = project.chapters?.length ? project.chapters : [
    ['Contexto', 'O contexto do projeto.', project.description || project.subtitle || 'Conteúdo do projeto em curadoria.'],
  ];
  const chapters = sections.map(([label], index) => [label, `chapter-${index}`] as const);
  const highlights: readonly CaseFact[] = editorial?.highlights?.length === 3 ? editorial.highlights : opening?.highlights?.map(([value, label]) => [value, label] as const) ?? [
    [project.category || 'Projeto', 'Área de atuação'],
    [project.year || 'Em curadoria', 'Período do projeto'],
    [project.platform || project.tags?.join(' · ') || 'Em curadoria', 'Plataforma e foco'],
  ];
  let reflection: ReactNode = editorial?.reflection || 'Os aprendizados específicos deste projeto estão em curadoria.';
  if (lwsa && !editorial?.reflection) reflection = 'Conectar a pesquisa de posicionamento às escolhas visuais e às aprovações com stakeholders foi o eixo deste trabalho. Levo essa relação entre contexto de negócio, direção visual e alinhamento entre áreas para os próximos projetos.';
  return <main id="main-content" className="project-case standard-project-case">
    <CaseHero name={[project.brand || project.title, project.category, project.year].filter(Boolean).join(' · ')}
      title={project.title} subtitle={project.subtitle || project.description || ''}
      highlights={<CaseHighlights items={highlights}/>} visual={<Cover project={project}/>}/>
    <CaseOverview facts={[[ 'Meu papel', project.role || 'Em curadoria' ], [ 'Período', project.year || 'Em curadoria' ], [ 'Plataforma', project.platform || 'Em curadoria' ], [ 'Escopo', project.tags?.join(' · ') || project.category || 'Em curadoria' ]]}
      challenge={editorial?.challenge || (lwsa ? 'Representar a expansão do grupo com uma identidade alinhada ao novo posicionamento do ecossistema.' : project.description || project.subtitle || 'Contexto em curadoria.')}
      contribution={editorial?.contribution || (lwsa ? opening.summary : project.role || 'Contribuição em curadoria.')}
      approach={editorial?.approach || (lwsa ? 'Conectar pesquisa de posicionamento e benchmarking com RP à direção visual, com aprovação das partes interessadas.' : 'As decisões e os artefatos específicos deste projeto serão apresentados nos capítulos abaixo.')}/>
    <CaseReading chapters={chapters}>
      {sections.map(([label, title, body], index) => <section className={`case-standard-chapter wrap ${lwsa && index === 3 ? 'case-full-scene' : ''}`} key={chapters[index][1]} id={chapters[index][1]}>
        <Reveal><p className="case-opening-kicker">{String(index + 1).padStart(2, '0')} / {label}</p><WordPullUp as="h2" paused={paused} words={title}/><p>{body}</p></Reveal>
        {opening && <CaseSectionDetails id={project.id} chapter={index}/>}
        {lwsa && <LwsaMedia chapter={index}/>}
      </section>)}
      {project.demo && <p className="wrap case-demo-note">Estudo visual demonstrativo, sem resultados de negócio atribuídos.</p>}
      <CaseReflection>{reflection}</CaseReflection>
      <CaseNext href={lwsa ? '/projetos/livo' : '/projetos'} label={lwsa ? 'Próximo case · LIVO' : undefined}/>
    </CaseReading>
  </main>;
}
