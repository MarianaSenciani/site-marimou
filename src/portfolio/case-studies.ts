// Public summaries approved during ideation. Supporting reports remain private.
// Base copy is Portuguese; `caseTranslations` carries the English and Spanish versions of every visible string.
import type { Language } from './experience-context';

export const caseStudies = [
  { id: 'sicredi', brand: 'Sicredi', title: 'Informação financeira que começa pela escuta.', subtitle: 'Pesquisa para orientar canais, linguagem e a ordem das informações nas páginas.',
    titleLines: ['Informação financeira', 'que começa pela escuta.'],
    category: 'Pesquisa & experiência web', year: '2025 · março a maio (lançado em junho)', role: 'Pesquisa, arquitetura e design, pela Sioux', platform: 'Web · landing pages',
    tags: ['Research', 'UX', 'Web'], metric: '+260 mil', metricLabel: 'sessões nas três URLs · jun–dez/2025', color: 'sage',
    points: ['Escuta de gerentes e públicos locais para entender hábitos e dúvidas.', 'Escolha dos canais junto aos times de estratégia, redação e mídia.', 'Arquitetura e sequência do conteúdo orientadas pelo diagnóstico.'],
    chapters: [
      ['O contexto', 'Levar informação sem presumir familiaridade digital.', 'O desafio era aproximar informações sobre serviços financeiros de públicos do Centro-Norte com diferentes níveis de familiaridade digital. Antes de desenhar páginas, investigamos as dúvidas das pessoas e como elas buscavam orientação.'],
      ['Pesquisa', 'A escuta veio antes da interface.', 'Participei da investigação com gerentes, clientes e empreendedores, em colaboração com estratégia, redação e mídia. Esse trabalho ajudou a definir a abordagem e a escolher canais adequados ao contexto.'],
      ['Arquitetura', 'Organizar a informação para facilitar o próximo passo.', 'As descobertas orientaram a hierarquia e a ordem do conteúdo nas landing pages. Conduzi o design das páginas com orientação do meu gestor, buscando uma comunicação compreensível e caminhos claros para conhecer os serviços e entrar em contato.'],
      ['Resultados', 'Continuidade de uso.', 'Dados posteriores de jun–dez/2025 registraram mais de 260 mil sessões nas URLs PJ, Agro e Cuiabá, cerca de 96% de acesso mobile e 592 sessões com ação de contato. O somatório não deduplica sessões entre URLs e não representa pessoas únicas nem contas abertas.'],
    ],
  },
  { id: 'lwsa', brand: 'LWSA', title: 'Uma marca para acompanhar a expansão.', subtitle: 'Pesquisa e direção visual na evolução de Locaweb Company para LWSA.',
    titleLines: ['Uma marca para', 'acompanhar a expansão.'],
    category: 'Pesquisa & estratégia de marca', year: '2023 — 2024', role: 'Direção visual e aprovações com stakeholders', platform: 'Identidade · ecossistema de marca',
    tags: ['Benchmarking', 'Estratégia', 'Direção visual'], metric: 'LWSA', metricLabel: 'uma nova identidade para o grupo', color: 'lilac',
    points: ['Pesquisa de posicionamento e benchmarking com Relações Públicas.', 'Direção visual conduzida por mim, com aprovação das partes interessadas.', 'Identidade lançada e repercutida em veículos de negócios.'],
    chapters: [
      ['O contexto', 'Uma identidade que representasse o grupo.', 'A evolução de Locaweb Company para LWSA acompanhou um movimento de expansão do ecossistema. O projeto precisava representar esse posicionamento e construir uma linguagem visual coerente para a marca.'],
      ['Pesquisa', 'Entender a direção antes de desenhar.', 'Junto ao time de Relações Públicas, pesquisei o posicionamento que a empresa queria seguir. Fizemos o benchmarking em conjunto, conectando referências e contexto de negócio à direção visual.'],
      ['Direção visual', 'Da pesquisa à aprovação com as partes interessadas.', 'Conduzi a direção visual, desenvolvi a identidade e acompanhei as aprovações com stakeholders. Minha atuação formal em design gráfico se conectou, neste projeto, à pesquisa, ao alinhamento entre áreas e à visão de negócio.'],
      ['Resultados', 'Uma identidade lançada publicamente.', 'A marca LWSA foi apresentada ao mercado e repercutiu em veículos de negócios, como o InvestNews. A cobertura registra o lançamento. Não dá para medir o que a identidade mudou nos resultados financeiros da empresa.'],
    ],
  },
  { id: 'livo', brand: 'LIVO', title: 'Menos fricção entre escolher e comprar.', subtitle: 'Análise heurística para entender e melhorar o fluxo de compra do e-commerce.',
    titleLines: ['Menos fricção entre', 'escolher e comprar.'],
    category: 'UX & e-commerce', year: '2022 — 2023', role: 'Análise heurística, testes e revisão de interfaces', platform: 'Web · e-commerce',
    tags: ['Heurísticas', 'User flow', 'UX'], metric: '42% → 20%', metricLabel: 'abandono de carrinho · após 2 meses', color: 'blush',
    points: ['Análise da jornada, da escolha do produto à finalização da compra.', 'Testes assistidos para entender onde as pessoas desistiam.', 'Revisão de categorias, cores e telas conforme o diagnóstico.'],
    chapters: [
      ['O contexto', 'O caminho até a compra precisava de atenção.', 'Pessoas adicionavam produtos sem avançar para o carrinho ou chegavam ao checkout sem concluir a compra. O objetivo foi entender as fricções ao longo do fluxo, antes de propor novas telas.'],
      ['Diagnóstico', 'Olhar para a jornada inteira.', 'A análise heurística e os testes assistidos ajudaram a localizar problemas de navegação e escolha: categorias misturadas, rótulos inconsistentes de cor e SKU, e seleção de uma cor que mostrava outra.'],
      ['Decisões', 'Mais consistência para decidir e avançar.', 'Participei da reorganização das categorias, da revisão das opções de produto e dos ajustes de interface da home ao checkout. As mudanças responderam aos problemas identificados na jornada, em colaboração com o time.'],
      ['Resultados', 'Uma queda de 22 pontos percentuais.', 'A taxa de abandono de carrinho relatada passou de 42% para 20%: a proporção de pessoas que adicionavam itens e não concluíam a compra. A variação acompanha as melhorias do projeto e não deve ser atribuída exclusivamente ao design.'],
    ],
  },
];

export type CaseStudy = typeof caseStudies[number];

type CaseCopy = {
  title: string; subtitle: string; titleLines: string[]; category: string; year: string; role: string; platform: string;
  tags: string[]; metric: string; metricLabel: string; points: string[]; chapters: string[][];
};

const caseTranslations: Record<string, Record<'en' | 'es', CaseCopy>> = {
  sicredi: {
    en: {
      title: 'Financial information that starts with listening.', subtitle: 'Research to guide channels, language, and the order of information on the pages.',
      titleLines: ['Financial information', 'that starts with listening.'],
      category: 'Research & web experience', year: '2025 · March to May (launched in June)', role: 'Research, architecture, and design, at Sioux', platform: 'Web · landing pages',
      tags: ['Research', 'UX', 'Web'], metric: '+260K', metricLabel: 'sessions across the three URLs · Jun–Dec 2025',
      points: ['Listening to branch managers and local audiences to understand habits and questions.', 'Choosing channels together with the strategy, copywriting, and media teams.', 'Content architecture and sequence guided by the diagnosis.'],
      chapters: [
        ['The context', 'Delivering information without assuming digital familiarity.', 'The challenge was to bring information about financial services closer to audiences in the Center-North region with different levels of digital familiarity. Before designing pages, we investigated people’s questions and how they looked for guidance.'],
        ['Research', 'Listening came before the interface.', 'I took part in the research with managers, customers, and entrepreneurs, working with strategy, copywriting, and media. This work helped define the approach and choose channels suited to the context.'],
        ['Architecture', 'Organizing information to make the next step easier.', 'The findings guided the hierarchy and order of content on the landing pages. I led the page design under my manager’s guidance, aiming for clear communication and straightforward paths to learn about the services and get in touch.'],
        ['Results', 'Continued use.', 'Later data from Jun–Dec 2025 recorded more than 260K sessions across the PJ, Agro, and Cuiabá URLs, about 96% mobile access, and 592 sessions with a contact action. The total does not deduplicate sessions across URLs and does not represent unique people or opened accounts.'],
      ],
    },
    es: {
      title: 'Información financiera que empieza por la escucha.', subtitle: 'Investigación para orientar canales, lenguaje y el orden de la información en las páginas.',
      titleLines: ['Información financiera', 'que empieza por la escucha.'],
      category: 'Investigación y experiencia web', year: '2025 · marzo a mayo (lanzado en junio)', role: 'Investigación, arquitectura y diseño, en Sioux', platform: 'Web · landing pages',
      tags: ['Research', 'UX', 'Web'], metric: '+260 mil', metricLabel: 'sesiones en las tres URL · jun–dic/2025',
      points: ['Escucha de gerentes y públicos locales para entender hábitos y dudas.', 'Elección de los canales junto con los equipos de estrategia, redacción y medios.', 'Arquitectura y secuencia del contenido orientadas por el diagnóstico.'],
      chapters: [
        ['El contexto', 'Llevar información sin presumir familiaridad digital.', 'El desafío era acercar la información sobre servicios financieros a públicos del Centro-Norte con distintos niveles de familiaridad digital. Antes de diseñar las páginas, investigamos las dudas de las personas y cómo buscaban orientación.'],
        ['Investigación', 'La escucha vino antes que la interfaz.', 'Participé en la investigación con gerentes, clientes y emprendedores, en colaboración con estrategia, redacción y medios. Ese trabajo ayudó a definir el enfoque y a elegir canales adecuados al contexto.'],
        ['Arquitectura', 'Organizar la información para facilitar el siguiente paso.', 'Los hallazgos orientaron la jerarquía y el orden del contenido en las landing pages. Conduje el diseño de las páginas con la guía de mi gerente, buscando una comunicación comprensible y caminos claros para conocer los servicios y ponerse en contacto.'],
        ['Resultados', 'Continuidad de uso.', 'Datos posteriores de jun–dic/2025 registraron más de 260 mil sesiones en las URL PJ, Agro y Cuiabá, cerca de un 96% de acceso móvil y 592 sesiones con una acción de contacto. La suma no deduplica sesiones entre URL y no representa personas únicas ni cuentas abiertas.'],
      ],
    },
  },
  lwsa: {
    en: {
      title: 'A brand to keep pace with expansion.', subtitle: 'Research and visual direction in the evolution from Locaweb Company to LWSA.',
      titleLines: ['A brand to keep', 'pace with expansion.'],
      category: 'Research & brand strategy', year: '2023 — 2024', role: 'Visual direction and stakeholder approvals', platform: 'Identity · brand ecosystem',
      tags: ['Benchmarking', 'Strategy', 'Visual direction'], metric: 'LWSA', metricLabel: 'a new identity for the group',
      points: ['Positioning research and benchmarking with Public Relations.', 'Visual direction led by me, with stakeholder approval.', 'Identity launched and covered by business media.'],
      chapters: [
        ['The context', 'An identity that represented the group.', 'The evolution from Locaweb Company to LWSA followed the expansion of the ecosystem. The project needed to represent that positioning and build a coherent visual language for the brand.'],
        ['Research', 'Understanding the direction before designing.', 'Together with the Public Relations team, I researched the positioning the company wanted to pursue. We ran the benchmarking jointly, connecting references and business context to the visual direction.'],
        ['Visual direction', 'From research to stakeholder approval.', 'I led the visual direction, developed the identity, and followed the approvals with stakeholders. In this project, my formal graphic design role connected with research, alignment across teams, and business vision.'],
        ['Results', 'An identity launched publicly.', 'The LWSA brand was presented to the market and covered by business media, such as InvestNews. The coverage records the launch. It is not possible to measure how the identity changed the company’s financial results.'],
      ],
    },
    es: {
      title: 'Una marca para acompañar la expansión.', subtitle: 'Investigación y dirección visual en la evolución de Locaweb Company a LWSA.',
      titleLines: ['Una marca para', 'acompañar la expansión.'],
      category: 'Investigación y estrategia de marca', year: '2023 — 2024', role: 'Dirección visual y aprobaciones con stakeholders', platform: 'Identidad · ecosistema de marca',
      tags: ['Benchmarking', 'Estrategia', 'Dirección visual'], metric: 'LWSA', metricLabel: 'una nueva identidad para el grupo',
      points: ['Investigación de posicionamiento y benchmarking con Relaciones Públicas.', 'Dirección visual conducida por mí, con aprobación de las partes interesadas.', 'Identidad lanzada y con repercusión en medios de negocios.'],
      chapters: [
        ['El contexto', 'Una identidad que representara al grupo.', 'La evolución de Locaweb Company a LWSA acompañó un movimiento de expansión del ecosistema. El proyecto debía representar ese posicionamiento y construir un lenguaje visual coherente para la marca.'],
        ['Investigación', 'Entender la dirección antes de diseñar.', 'Junto con el equipo de Relaciones Públicas, investigué el posicionamiento que la empresa quería seguir. Hicimos el benchmarking en conjunto, conectando referencias y contexto de negocio con la dirección visual.'],
        ['Dirección visual', 'De la investigación a la aprobación con las partes interesadas.', 'Conduje la dirección visual, desarrollé la identidad y acompañé las aprobaciones con stakeholders. Mi actuación formal en diseño gráfico se conectó, en este proyecto, con la investigación, la alineación entre áreas y la visión de negocio.'],
        ['Resultados', 'Una identidad lanzada públicamente.', 'La marca LWSA fue presentada al mercado y tuvo repercusión en medios de negocios, como InvestNews. La cobertura registra el lanzamiento. No se puede medir cuánto cambió la identidad en los resultados financieros de la empresa.'],
      ],
    },
  },
  livo: {
    en: {
      title: 'Less friction between choosing and buying.', subtitle: 'Heuristic analysis to understand and improve the e-commerce purchase flow.',
      titleLines: ['Less friction between', 'choosing and buying.'],
      category: 'UX & e-commerce', year: '2022 — 2023', role: 'Heuristic analysis, testing, and interface review', platform: 'Web · e-commerce',
      tags: ['Heuristics', 'User flow', 'UX'], metric: '42% → 20%', metricLabel: 'cart abandonment · after 2 months',
      points: ['Analysis of the journey, from choosing a product to completing the purchase.', 'Assisted tests to understand where people gave up.', 'Review of categories, colors, and screens based on the diagnosis.'],
      chapters: [
        ['The context', 'The path to purchase needed attention.', 'People added products without moving on to the cart, or reached checkout without completing the purchase. The goal was to understand the friction along the flow before proposing new screens.'],
        ['Diagnosis', 'Looking at the whole journey.', 'Heuristic analysis and assisted tests helped locate navigation and choice problems: mixed categories, inconsistent color and SKU labels, and selecting one color that displayed another.'],
        ['Decisions', 'More consistency to decide and move forward.', 'I took part in reorganizing categories, reviewing product options, and adjusting the interface from the home page to checkout. The changes responded to the problems identified in the journey, in collaboration with the team.'],
        ['Results', 'A drop of 22 percentage points.', 'The reported cart abandonment rate went from 42% to 20%: the share of people who added items and did not complete the purchase. The change accompanies the project’s improvements and should not be attributed to design alone.'],
      ],
    },
    es: {
      title: 'Menos fricción entre elegir y comprar.', subtitle: 'Análisis heurístico para entender y mejorar el flujo de compra del e-commerce.',
      titleLines: ['Menos fricción entre', 'elegir y comprar.'],
      category: 'UX y e-commerce', year: '2022 — 2023', role: 'Análisis heurístico, pruebas y revisión de interfaces', platform: 'Web · e-commerce',
      tags: ['Heurísticas', 'User flow', 'UX'], metric: '42% → 20%', metricLabel: 'abandono de carrito · después de 2 meses',
      points: ['Análisis del recorrido, desde la elección del producto hasta finalizar la compra.', 'Pruebas asistidas para entender dónde las personas abandonaban.', 'Revisión de categorías, colores y pantallas según el diagnóstico.'],
      chapters: [
        ['El contexto', 'El camino hasta la compra necesitaba atención.', 'Las personas agregaban productos sin avanzar al carrito o llegaban al checkout sin concluir la compra. El objetivo fue entender las fricciones a lo largo del flujo antes de proponer nuevas pantallas.'],
        ['Diagnóstico', 'Mirar el recorrido completo.', 'El análisis heurístico y las pruebas asistidas ayudaron a localizar problemas de navegación y elección: categorías mezcladas, etiquetas inconsistentes de color y SKU, y la selección de un color que mostraba otro.'],
        ['Decisiones', 'Más consistencia para decidir y avanzar.', 'Participé en la reorganización de las categorías, en la revisión de las opciones de producto y en los ajustes de interfaz desde la home hasta el checkout. Los cambios respondieron a los problemas identificados en el recorrido, en colaboración con el equipo.'],
        ['Resultados', 'Una caída de 22 puntos porcentuales.', 'La tasa de abandono de carrito reportada pasó de 42% a 20%: la proporción de personas que agregaban artículos y no concluían la compra. La variación acompaña las mejoras del proyecto y no debe atribuirse exclusivamente al diseño.'],
      ],
    },
  },
};

/** Returns the case with every visible string in the requested language; `tags` keep their PT keys for filtering via `tagKeys`. */
export function localizeCase(project: CaseStudy, lang: Language) {
  const copy = lang === 'pt' ? undefined : caseTranslations[project.id]?.[lang];
  return { ...project, ...copy, tagKeys: project.tags, tags: copy?.tags ?? project.tags };
}
export type LocalizedCase = ReturnType<typeof localizeCase>;
