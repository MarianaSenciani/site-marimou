import { useState, useEffect } from 'react';
import sobrePhoto from '../assets/sobre-photo.png';

// Lista de Cursos Complementares com suas categorias para o filtro
const cursosData = [
  {
    letter: 'O',
    title: 'Front End & UI/UX Design',
    detail: 'Origamid, 2023 · 74 horas',
    desc: 'Desenvolvimento front-end focado em boas práticas de HTML5, CSS3 e Javascript puro.',
    categories: ['Web', 'Softwares e Programação', 'Design'],
  },
  {
    letter: 'O',
    title: 'Web Design Completo (HTML, CSS & JavaScript)',
    detail: 'Origamid, 2023 · 44 horas',
    desc: 'Fundamentos teóricos de design visual aplicados ao web design e codificação responsiva.',
    categories: ['Web', 'Softwares e Programação', 'Design'],
  },
  {
    letter: 'H',
    title: 'Bootcamp UX Design',
    detail: 'How Bootcamps, 2022 · 60 horas',
    desc: 'Pesquisa com usuários, mapeamento de jornadas, prototipação e testes de usabilidade.',
    categories: ['Design', 'Frameworks e Processos'],
  },
  {
    letter: 'E',
    title: 'UX Research: Methods and Applications',
    detail: 'UX Alliance, 2022 · 8 horas',
    desc: 'Métricas quantitativas e qualitativas de pesquisa aplicada à experiência do usuário.',
    categories: ['Design', 'Frameworks e Processos'],
  },
  {
    letter: 'D',
    title: 'Adobe InDesign do zero ao avançado',
    detail: 'Daniel/Udemy, 2022 · 18 horas',
    desc: 'Diagramação profissional de livros, revistas e materiais interativos com o software.',
    categories: ['Softwares de criação'],
  },
  {
    letter: 'D',
    title: 'Adobe Illustrator para Design Gráfico',
    detail: 'Daniel/Udemy, 2020 · 24 horas',
    desc: 'Vetorização avançada, criação de ilustrações e identidade de marca institucional.',
    categories: ['Softwares de criação', 'Design'],
  },
  {
    letter: 'D',
    title: 'Adobe Photoshop do Zero ao Avançado',
    detail: 'Daniel/Udemy, 2020 · 20 horas',
    desc: 'Edição avançada de imagens e manipulações complexas para portfólio.',
    categories: ['Softwares de criação', 'Design'],
  },
  {
    letter: 'E',
    title: 'EF SET English Certificate – C1 Advanced',
    detail: 'EF Standard English Test, 2026',
    desc: 'Certificação internacional de proficiência em inglês nível C1 Advanced.',
    categories: ['Softwares e Programação'], // Categoria geral ou Softwares e Programação
  },
];

const categories = [
  'Todos',
  'Softwares de criação',
  'Web',
  'Design',
  'Frameworks e Processos',
  'Softwares e Programação',
];

export default function Sobre() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [filteredCursos, setFilteredCursos] = useState(cursosData);

  useEffect(() => {
    if (activeFilter === 'Todos') {
      setFilteredCursos(cursosData);
    } else {
      setFilteredCursos(
        cursosData.filter((c) => c.categories.includes(activeFilter))
      );
    }
  }, [activeFilter]);

  return (
    <div className="w-full">
      {/* ── 1. SOBRE MIM (Top Section) ── */}
      <section className="bg-grid-dark-sobre text-white min-h-screen flex items-center pt-8 pb-12 md:pt-10 md:pb-16">
        <div className="max-w-[1040px] mx-auto w-full px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
          
          {/* Card Esquerda - Moldura da Foto */}
          <div className="md:col-span-5 flex justify-center">
            {/* Card com grid background claro de menor intensidade */}
            <div className="w-full max-w-[300px] bg-grid-light-sobre border border-near-black rounded-[32px] p-5 md:p-6 text-center flex flex-col gap-5 shadow-[0_8px_30px_rgba(0,0,0,0.15)] reveal">
              
              {/* Moldura de Fio Quadrada para a Foto */}
              {/* Para trocar a imagem posteriormente, basta substituir o src do sobrePhoto */}
              <div className="w-full aspect-square border-2 border-near-black rounded-3xl p-1 bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(58,59,53,1)] relative">
                <img
                  src={sobrePhoto}
                  alt="Mariana Senciani"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              <div>
                <h3 className="text-lime text-2xl font-bold mb-2">Afinal, quem é ela?</h3>
                <p className="text-near-black text-xs sm:text-sm leading-relaxed mb-4">
                  Desde 2021 no mercado criativo, com passagem por grandes marcas como Adobe, Brasil Tecpar, LWSA e PIC Seguros. Comecei pelo design gráfico, passei pela direção de arte até que...
                </p>
                <button
                  onClick={() => {
                    document.getElementById('formacao')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-pill inline-flex items-center rounded-pill bg-lime text-near-black font-bold px-6 py-2.5 text-xs sm:text-sm border border-near-black/15 shadow-sm"
                >
                  Saiba mais
                </button>
              </div>
            </div>
          </div>

          {/* Conteúdo da Direita - Biografia */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <span className="text-lime font-bold tracking-wider text-xs sm:text-sm uppercase mb-2 reveal">
              SOBRE MIM
            </span>
            <h1 data-split className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Mariana Senciani.
            </h1>
            <h2 className="text-lime text-lg sm:text-xl font-bold mb-6 reveal">
              UX/UI · Direção de Arte
            </h2>
            
            <div className="space-y-4 text-white/80 text-sm sm:text-base leading-relaxed reveal">
              <p>
                Desde 2021 no mercado criativo, com passagem por grandes marcas como Adobe, Brasil Tecpar, LWSA e PIC Seguros. Comecei pelo design gráfico, passei pela direção de arte até que encontrei meu sentido na intersecção entre estética e estratégia – onde uma tela bonita também precisa funcionar.
              </p>
              <p>
                Hoje atuo como UX/UI, branding e direção de arte para marcas que buscam presença visual de verdade. Da pesquisa com usuário ao pixel final – wireframes, design systems, campanhas de performance e identidade visual. Tudo com o mesmo nível de entrega.
              </p>
              <p>
                Acredito que design bom é o design que resolve. Que cada decisão visual tem um motivo. E que o melhor projeto é aquele que o cliente entende sem precisar de explicação.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. EMPRESAS COM QUEM TRABALHEI ── */}
      <section className="bg-lime py-6 border-y border-near-black/10">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[10px] sm:text-xs font-bold text-near-black/80 tracking-widest uppercase mb-4 reveal">
            EMPRESAS COM QUEM TRABALHEI
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-near-black font-extrabold text-sm sm:text-base md:text-lg reveal-fade">
            <span>Pryon Cash</span>
            <span>Sioux</span>
            <span>LWSA</span>
            <span>LIVO Eyewear</span>
            <span>VEX Painéis</span>
            <span>Rabbit Partnership</span>
          </div>
        </div>
      </section>

      {/* ── 3. FORMAÇÃO ── */}
      <section id="formacao" className="bg-grid-light-sobre py-16 md:py-24">
        <div className="max-w-[1040px] mx-auto px-6">
          <span className="text-lime font-bold tracking-wider text-xs sm:text-sm uppercase block text-center mb-2 reveal">
            FORMAÇÃO
          </span>
          <h2 data-split className="text-near-black text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
            Base que sustenta o trabalho.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
            {/* Card 1 */}
            <div className="bg-white/70 backdrop-blur-sm border border-near-black/10 rounded-3xl p-6 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-near-black/5 rounded-xl flex items-center justify-center font-bold text-near-black text-xl shrink-0 border border-near-black/5">
                U
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-block bg-lime/20 text-near-black text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                  Pós Graduação
                </span>
                <h4 className="text-near-black font-bold text-base sm:text-lg mb-1 leading-tight">
                  User Experience (UX) & User Interface (UI)
                </h4>
                <p className="text-near-black/75 text-xs sm:text-sm mb-0.5">Universidade Positivo</p>
                <p className="text-near-black/50 text-[10px] sm:text-xs">Abr 2022 - Mar 2023 · Curitiba, Brasil</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/70 backdrop-blur-sm border border-near-black/10 rounded-3xl p-6 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 border border-blue-700/10">
                UNIP
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-block bg-lime/20 text-near-black text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                  Graduação
                </span>
                <h4 className="text-near-black font-bold text-base sm:text-lg mb-1 leading-tight">
                  Curso Superior de Tecnologia (CST) – Design Gráfico
                </h4>
                <p className="text-near-black/75 text-xs sm:text-sm mb-0.5">Universidade Paulista (UNIP)</p>
                <p className="text-near-black/50 text-[10px] sm:text-xs">Fev 2020 - Dez 2022 · São Paulo, Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CURSOS COMPLEMENTARES ── */}
      <section className="bg-grid-dark-sobre py-16 md:py-24 text-white">
        <div className="max-w-[800px] mx-auto px-6">
          <span className="text-lime font-bold tracking-wider text-xs sm:text-sm uppercase block text-center mb-2 reveal">
            CURSOS COMPLEMENTARES
          </span>
          <h2 data-split className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10">
            Sempre aprendendo.
          </h2>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 reveal-fade">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border duration-150 ${
                  activeFilter === cat
                    ? 'bg-lime text-near-black border-lime'
                    : 'bg-transparent text-white/80 border-white/20 hover:border-white/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lista de Cursos */}
          <div className="space-y-4 reveal">
            {filteredCursos.map((curso, index) => (
              <div
                key={index}
                className="bg-lime text-near-black rounded-[20px] p-5 flex items-center justify-between gap-4 border border-near-black/5 animate-fade-slide-in hover:scale-[1.01] transition-transform duration-150 shadow-sm"
              >
                <div className="flex gap-4 items-start min-w-0">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-near-black text-lg shrink-0">
                    {curso.letter}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm sm:text-base leading-tight">
                      {curso.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs opacity-75 font-semibold mt-0.5">
                      {curso.detail}
                    </p>
                    <p className="text-xs mt-1.5 opacity-90 hidden sm:block leading-relaxed">
                      {curso.desc}
                    </p>
                  </div>
                </div>

                {/* Botão de detalhe (Seta) */}
                <button
                  aria-label="Ver mais detalhes"
                  className="w-8 h-8 rounded-full border border-near-black/30 flex items-center justify-center hover:bg-near-black hover:text-white transition-colors duration-150 shrink-0"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ))}
            
            {filteredCursos.length === 0 && (
              <p className="text-center text-white/50 text-sm py-8">Nenhum curso cadastrado nesta categoria.</p>
            )}
          </div>
        </div>
      </section>

      {/* ── 5. FERRAMENTAS & COMPETÊNCIAS ── */}
      <section className="bg-grid-light-sobre py-16 md:py-24">
        <div className="max-w-[1040px] mx-auto px-6">
          <span className="text-lime font-bold tracking-wider text-xs sm:text-sm uppercase block text-center mb-2 reveal">
            FERRAMENTAS & COMPETÊNCIAS
          </span>
          <h2 data-split className="text-near-black text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16">
            Com o que trabalho.
          </h2>

          <div className="space-y-12 max-w-[800px] mx-auto">
            {/* Categoria 1: Design & Produção Visual */}
            <div className="reveal">
              <h4 className="text-near-black/50 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-center mb-6">
                DESIGN & PRODUÇÃO VISUAL
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 text-center">
                {[
                  { name: 'Photoshop', level: 'Avançado' },
                  { name: 'Illustrator', level: 'Avançado' },
                  { name: 'InDesign', level: 'Avançado' },
                  { name: 'Premiere Pro', level: 'Praticante' },
                  { name: 'After Effects', level: 'Aprendizado' },
                  { name: 'CorelDraw', level: 'Avançado' },
                ].map((item) => (
                  <div key={item.name} className="flex flex-col items-center">
                    <h5 className="font-bold text-near-black text-sm sm:text-base">{item.name}</h5>
                    <span className="inline-block mt-1.5 text-[10px] sm:text-xs font-bold px-3 py-0.5 rounded-full bg-lime text-near-black border border-near-black/5">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Categoria 2: No Dia a Dia / Agilidade */}
            <div className="reveal">
              <h4 className="text-near-black/50 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-center mb-6">
                NO DIA A DIA / AGILIDADE
              </h4>
              {/* Badges de agilidade centralizados conforme solicitado */}
              <div className="flex flex-wrap justify-center gap-2 max-w-[640px] mx-auto">
                {[
                  'SLACK',
                  'ATLASSIAN',
                  'NOTION',
                  'JIRA',
                  'TEAMS',
                  'ASANA',
                  'GOOGLE WORKSPACE',
                ].map((badge) => (
                  <span
                    key={badge}
                    className="bg-magenta text-white text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-full tracking-wider shadow-sm border border-magenta/10 hover:scale-105 transition-transform duration-100 cursor-default"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Categoria 3: Web & Produto */}
            <div className="reveal">
              <h4 className="text-near-black/50 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-center mb-6">
                WEB & PRODUTO
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 text-center">
                {[
                  { name: 'HTML, CSS & Javascript', level: 'Intermediário', type: 'lime' },
                  { name: 'Figma', level: 'Avançado', type: 'purple' },
                  { name: 'WordPress + Elementor', level: 'Avançado', type: 'purple' },
                  { name: 'Layout Web', level: 'Intermediário', type: 'dark' },
                  { name: 'Otimização SEO', level: 'Intermediário', type: 'dark' },
                  { name: 'Art Direction', level: 'Intermediário', type: 'dark' },
                ].map((item) => (
                  <div key={item.name} className="flex flex-col items-center">
                    <h5 className="font-bold text-near-black text-sm sm:text-base leading-snug">{item.name}</h5>
                    <span
                      className={`inline-block mt-1.5 text-[10px] sm:text-xs font-bold px-3 py-0.5 rounded-full border border-near-black/5 ${
                        item.type === 'lime'
                          ? 'bg-lime text-near-black'
                          : item.type === 'purple'
                          ? 'bg-purple text-white'
                          : 'bg-near-black text-bg-cream'
                      }`}
                    >
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. IDIOMAS (Bottom Section) ── */}
      <section className="bg-grid-dark-sobre py-16 md:py-24 text-white border-t border-white/5">
        <div className="max-w-[1040px] mx-auto px-6">
          <span className="text-lime font-bold tracking-wider text-xs sm:text-sm uppercase block text-center mb-2 reveal">
            FERRAMENTAS & COMPETÊNCIAS
          </span>
          <h2 data-split className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
            Com o que trabalho.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto reveal">
            {/* Inglês */}
            <div className="bg-[#515443]/45 border border-white/10 rounded-3xl p-6 flex items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                <span className="text-3xl shrink-0" role="img" aria-label="Bandeira dos EUA/Reino Unido">
                  🇺🇸
                </span>
                <div>
                  <h4 className="font-bold text-base sm:text-lg">Inglês</h4>
                </div>
              </div>
              <span className="bg-lime text-near-black text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border border-near-black/5">
                Bilingual (C1)
              </span>
            </div>

            {/* Português */}
            <div className="bg-[#515443]/45 border border-white/10 rounded-3xl p-6 flex items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                <span className="text-3xl shrink-0" role="img" aria-label="Bandeira do Brasil">
                  🇧🇷
                </span>
                <div>
                  <h4 className="font-bold text-base sm:text-lg">Português</h4>
                </div>
              </div>
              <span className="bg-lime text-near-black text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border border-near-black/5">
                Nativo
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
