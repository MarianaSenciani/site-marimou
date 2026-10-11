// Public summaries approved during ideation. Supporting reports remain private.
export const caseStudies = [
  { id: 'sicredi', brand: 'Sicredi', title: 'Informação financeira que começa pela escuta.', subtitle: 'Pesquisa para orientar canais, linguagem e a ordem das informações nas páginas.',
    category: 'Pesquisa & experiência web', year: '2024 — 2025', role: 'Pesquisa, arquitetura e design, pela Sioux', platform: 'Web · landing pages',
    tags: ['Research', 'UX', 'Web'], metric: '257 mil+', metricLabel: 'sessões em duas landing pages', color: 'sage',
    points: ['Escuta de gerentes e públicos locais para entender hábitos e dúvidas.', 'Escolha dos canais junto aos times de estratégia, redação e mídia.', 'Arquitetura e sequência do conteúdo orientadas pelo diagnóstico.'],
    chapters: [
      ['O contexto', 'Levar informação sem presumir familiaridade digital.', 'O desafio era aproximar informações sobre serviços financeiros de públicos do Centro-Norte com diferentes níveis de familiaridade digital. Antes de desenhar páginas, investigamos as dúvidas das pessoas e como elas buscavam orientação.'],
      ['Pesquisa', 'A escuta veio antes da interface.', 'Participei da investigação com gerentes, clientes e empreendedores, em colaboração com estratégia, redação e mídia. Esse trabalho ajudou a definir a abordagem e a escolher canais adequados ao contexto.'],
      ['Arquitetura', 'Organizar a informação para facilitar o próximo passo.', 'As descobertas orientaram a hierarquia e a ordem do conteúdo nas landing pages. Conduzi o design das páginas com orientação do meu gestor, buscando uma comunicação compreensível e caminhos claros para conhecer os serviços e entrar em contato.'],
      ['Resultados', 'Alcance e qualidade da visita.', 'As duas landing pages somaram 257.417 sessões. A permanência média registrada no material do projeto passou de 21 para 28 segundos. Sessões não equivalem a pessoas únicas, e permanência não é uma medida de retenção. Os resultados refletem o trabalho conjunto de pesquisa, conteúdo, design e mídia.'],
    ],
  },
  { id: 'lwsa', brand: 'LWSA', title: 'Uma marca para acompanhar a expansão.', subtitle: 'Pesquisa e direção visual na evolução de Locaweb Company para LWSA.',
    category: 'Pesquisa & estratégia de marca', year: '2023 — 2024', role: 'Direção visual e aprovações com stakeholders', platform: 'Identidade · ecossistema de marca',
    tags: ['Benchmarking', 'Estratégia', 'Direção visual'], metric: 'LWSA', metricLabel: 'uma nova identidade para o grupo', color: 'lilac',
    points: ['Pesquisa de posicionamento e benchmarking com Relações Públicas.', 'Direção visual conduzida por mim, com aprovação das partes interessadas.', 'Identidade lançada e repercutida em veículos de negócios.'],
    chapters: [
      ['O contexto', 'Uma identidade que representasse o grupo.', 'A evolução de Locaweb Company para LWSA acompanhou um movimento de expansão do ecossistema. O projeto precisava representar esse posicionamento e construir uma linguagem visual coerente para a marca.'],
      ['Pesquisa', 'Entender a direção antes de desenhar.', 'Junto ao time de Relações Públicas, pesquisei o posicionamento que a empresa queria seguir. Fizemos o benchmarking em conjunto, conectando referências e contexto de negócio à direção visual.'],
      ['Direção visual', 'Da pesquisa à aprovação com as partes interessadas.', 'Conduzi a direção visual, desenvolvi a identidade e acompanhei as aprovações com stakeholders. Minha atuação formal em design gráfico se conectou, neste projeto, à pesquisa, ao alinhamento entre áreas e à visão de negócio.'],
      ['Resultados', 'Uma identidade lançada publicamente.', 'A marca LWSA foi apresentada e repercutiu em veículos de negócios, incluindo o InvestNews. A cobertura registra o anúncio e seu contexto estratégico; não representa uma medida isolada de impacto do design sobre os resultados financeiros da companhia.'],
    ],
  },
  { id: 'livo', brand: 'LIVO', title: 'Menos fricção entre escolher e comprar.', subtitle: 'Análise heurística para entender e melhorar o fluxo de compra do e-commerce.',
    category: 'UX & e-commerce', year: '2022 — 2023', role: 'Análise heurística, testes e revisão de interfaces', platform: 'Web · e-commerce',
    tags: ['Heurísticas', 'User flow', 'UX'], metric: '42% → 20%', metricLabel: 'taxa de abandono de carrinho', color: 'blush',
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
