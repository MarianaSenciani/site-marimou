import { useState } from 'react';
import livoMockup from '../assets/livo-mockup.png';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const filters = ['Product Design', 'Webdesign', 'Social media', 'Campanhas on/off', 'Impressos & OOH'];

// TODO: confirmar com Mari os demais projetos de cada categoria — só o projeto Livo
// (Product Design) está descrito no print de referência.
const projects = [
  {
    id: 1,
    category: 'Product Design',
    badge: 'PRODUCT DESIGN',
    title: 'App de Gestão Financeira · Livo',
  },
  {
    id: 2,
    category: 'Product Design',
    badge: 'PRODUCT DESIGN',
    title: 'App de Gestão Financeira · Livo',
  },
  {
    id: 3,
    category: 'Product Design',
    badge: 'PRODUCT DESIGN',
    title: 'App de Gestão Financeira · Livo',
  },
];

function ProjectCard({ project }) {
  return (
    /* Full-width card: shrink-0 removed so it stretches inside the grid.
       Hover: subtle scale-up + stronger bottom shadow. */
    <div className="animate-fade-slide-in w-full transition-all duration-300 ease-out-custom hover:scale-[1.03] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.4)] focus-within:scale-[1.03] focus-within:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.4)]">
      <div className="relative flex flex-col gap-5 rounded-[32px] p-5 bg-lime shadow-[0px_8px_24px_rgba(0,0,0,0.08)]">
        {/* banner: painel branco com o mockup do app LIVO */}
        <div className="relative rounded-[20px] bg-white overflow-hidden">
          <img
            src={livoMockup}
            alt={`Prévia do app do projeto ${project.title}`}
            className="w-full h-[230px] object-cover object-top"
          />
          {/* badge sobreposto ao topo do painel */}
          <span className="absolute top-3 left-3 z-10 bg-lime text-near-black text-[11px] font-bold uppercase tracking-[0.5px] px-4 py-2 rounded-[14px] shadow-[0px_2px_8px_rgba(0,0,0,0.12)]">
            {project.badge}
          </span>
        </div>

        {/* título + CTA */}
        <div className="flex items-end justify-between gap-3">
          <h3 className="text-near-black text-[20px] font-bold leading-[1.2] max-w-[68%]">
            {project.title}
          </h3>
          <button
            type="button"
            aria-label={`Ver projeto ${project.title}`}
            className="shrink-0 w-12 h-12 rounded-[16px] bg-[#2D2D2D] text-white flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-near-black"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('Product Design');

  const visibleProjects = projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="bg-grid-dark min-h-screen snap-start flex flex-col justify-center">
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-12 py-8 -mt-6 md:-mt-10">
        <p data-split className="text-lime text-center text-sm font-bold uppercase tracking-[0.2em] mb-3">
          Portfólio
        </p>
        <h2 data-split className="text-bg-cream text-center text-2xl md:text-4xl mb-8">
          Projetos que me orgulho
        </h2>

        <div className="reveal flex flex-wrap items-center justify-center gap-3 mb-10">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={
                  'btn-pill rounded-pill px-5 py-2 text-sm font-bold border transition-colors duration-150 ' +
                  (isActive
                    ? 'bg-lime text-near-black border-lime'
                    : 'bg-transparent text-lime border-lime')
                }
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Grid de 3 colunas — ocupa 100% da largura, sem carrossel */}
        <div key={activeFilter} className="reveal grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
