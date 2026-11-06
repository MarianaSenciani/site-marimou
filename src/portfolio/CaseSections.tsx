import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { useExperience } from './experience-context';
import { LwsaEcosystem } from './LwsaEcosystem';

type Opening = { summary: string; highlights: string[][] };

/** Opening summary and highlights for the curated cases, in the active language. */
export function useCaseOpening(id: string): Opening | undefined {
  const { t } = useExperience();
  const openings: Record<string, Opening> = {
    sicredi: {
      summary: t(
        'Trabalhando pela Sioux, participei da investigação com gerentes e públicos locais, da definição da abordagem junto a estratégia, redação e mídia e conduzi o design das páginas. O objetivo era explicar serviços e oferecer um próximo passo compreensível.',
        'Working through Sioux, I took part in the research with managers and local audiences, in defining the approach together with strategy, copywriting, and media, and I led the page design. The goal was to explain services and offer an understandable next step.',
        'Trabajando por medio de Sioux, participé en la investigación con gerentes y públicos locales, en la definición del enfoque junto con estrategia, redacción y medios, y conduje el diseño de las páginas. El objetivo era explicar los servicios y ofrecer un siguiente paso comprensible.'),
      highlights: [
        [t('+260 mil', '+260K', '+260 mil'), t('Sessões registradas nas três URLs · jan–jun/2025.', 'Sessions recorded across the three URLs · Jan–Jun 2025.', 'Sesiones registradas en las tres URL · ene–jun/2025.')],
        ['≈96%', t('Acessos mobile nos dados posteriores.', 'Mobile access in the later data.', 'Accesos móviles en los datos posteriores.')],
        ['592', t('Sessões com ação de contato.', 'Sessions with a contact action.', 'Sesiones con una acción de contacto.')],
      ],
    },
    lwsa: {
      summary: t(
        'Conduzi a direção visual da evolução de Locaweb Company para LWSA e as aprovações com as partes interessadas. Com Relações Públicas, pesquisei o posicionamento desejado e participei do benchmarking que orientou a marca.',
        'I led the visual direction for the evolution from Locaweb Company to LWSA, as well as the approvals with stakeholders. With Public Relations, I researched the desired positioning and took part in the benchmarking that guided the brand.',
        'Conduje la dirección visual de la evolución de Locaweb Company a LWSA y las aprobaciones con las partes interesadas. Con Relaciones Públicas, investigué el posicionamiento deseado y participé en el benchmarking que orientó la marca.'),
      highlights: [
        [t('Pesquisa com RP', 'Research with PR', 'Investigación con RR. PP.'), t('Entendimento do posicionamento desejado para a nova fase.', 'Understanding the desired positioning for the new phase.', 'Comprensión del posicionamiento deseado para la nueva etapa.')],
        [t('Direção visual', 'Visual direction', 'Dirección visual'), t('Desenvolvimento e aprovação com stakeholders.', 'Development and approval with stakeholders.', 'Desarrollo y aprobación con stakeholders.')],
        [t('Repercussão pública', 'Public coverage', 'Repercusión pública'), t('Mudança de marca noticiada por veículos de negócios.', 'Rebrand reported by business media.', 'Cambio de marca difundido por medios de negocios.')],
      ],
    },
    livo: {
      summary: t(
        'Analisei a jornada de compra, participei de testes assistidos e redesenhei telas ligadas aos problemas encontrados. As mudanças envolveram organização das categorias, nomenclatura de cores e clareza até a finalização.',
        'I analyzed the purchase journey, took part in assisted tests, and redesigned screens tied to the problems found. The changes involved organizing categories, naming colors, and improving clarity through to checkout.',
        'Analicé el recorrido de compra, participé en pruebas asistidas y rediseñé pantallas vinculadas a los problemas encontrados. Los cambios incluyeron la organización de las categorías, la nomenclatura de los colores y la claridad hasta la finalización.'),
      highlights: [
        ['42% → 20%', t('Abandono de carrinho: queda de 22 pontos percentuais.', 'Cart abandonment: a drop of 22 percentage points.', 'Abandono de carrito: caída de 22 puntos porcentuales.')],
        [t('2 pontos de saída', '2 exit points', '2 puntos de salida'), t('Após adicionar ao carrinho e durante o checkout.', 'After adding to the cart and during checkout.', 'Después de agregar al carrito y durante el checkout.')],
        [t('Heurística + testes', 'Heuristics + testing', 'Heurística + pruebas'), t('Diagnóstico do fluxo antes das mudanças visuais.', 'Flow diagnosis before the visual changes.', 'Diagnóstico del flujo antes de los cambios visuales.')],
      ],
    },
  };
  return openings[id];
}

function Cards({ items }: { items: string[][] }) {
  return <div className="case-insight-grid">{items.map(([title, body], i) => <Reveal key={i} delay={i * .06}><article className="case-insight-card"><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></article></Reveal>)}</div>;
}

function Artifact({ title, caption }: { title: string; caption: string }) {
  const { t } = useExperience();
  return <div className="case-artifact-placeholder"><span aria-hidden="true">✳</span><strong>{title}</strong><p>{caption}</p><small>{t('Artefato visual em curadoria', 'Visual artifact being curated', 'Artefacto visual en curaduría')}</small></div>;
}

export function CaseSectionDetails({ id, chapter }: { id: string; chapter: number }) {
  const { t } = useExperience();
  if (id === 'sicredi') return <div className="case-section-details">
    {chapter === 0 && <Cards items={[
      [t('Gerentes das agências', 'Branch managers', 'Gerentes de las agencias'), t('O que as pessoas perguntavam e como os serviços eram explicados no atendimento.', 'What people asked and how services were explained during customer service.', 'Lo que las personas preguntaban y cómo se explicaban los servicios en la atención.')],
      [t('Clientes e empreendedores', 'Customers and entrepreneurs', 'Clientes y emprendedores'), t('Hábitos, necessidades e linguagem de quem vive o contexto da região.', 'Habits, needs, and language of the people who live the region’s context.', 'Hábitos, necesidades y lenguaje de quienes viven el contexto de la región.')],
      [t('Equipe multidisciplinar', 'Multidisciplinary team', 'Equipo multidisciplinario'), t('Estratégia, redação, mídia e design conectando os achados à comunicação.', 'Strategy, copywriting, media, and design connecting the findings to communication.', 'Estrategia, redacción, medios y diseño conectando los hallazgos con la comunicación.')],
    ]}/>}
    {chapter === 1 && <Artifact title={t('Mapa de achados da pesquisa', 'Research findings map', 'Mapa de hallazgos de la investigación')} caption={t('Sínteses anonimizadas e sua relação com as decisões de conteúdo. Os registros públicos ainda estão sendo selecionados.', 'Anonymized syntheses and how they relate to content decisions. The public records are still being selected.', 'Síntesis anonimizadas y su relación con las decisiones de contenido. Los registros públicos aún se están seleccionando.')}/>}
    {chapter === 2 && <><Cards items={[
      [t('Aplicativo', 'App', 'Aplicación'), t('Alternativa considerada no início da discussão.', 'Alternative considered at the start of the discussion.', 'Alternativa considerada al inicio de la discusión.')],
      ['Landing pages', t('Canal escolhido para reunir informação e oferecer caminhos de ação.', 'Channel chosen to gather information and offer paths to action.', 'Canal elegido para reunir información y ofrecer caminos de acción.')],
      [t('Posts e vídeos', 'Posts and videos', 'Posts y videos'), t('Alternativas de distribuição, com limites para explicar o assunto inteiro.', 'Distribution alternatives, with limits for explaining the whole subject.', 'Alternativas de distribución, con límites para explicar todo el tema.')],
    ]}/><div className="architecture-flow">{[
      [t('Primeira mensagem', 'First message', 'Primer mensaje'), t('Qual necessidade vem antes?', 'Which need comes first?', '¿Qué necesidad viene primero?')],
      [t('Explicação', 'Explanation', 'Explicación'), t('Como apresentar os serviços?', 'How to present the services?', '¿Cómo presentar los servicios?')],
      [t('Clareza e confiança', 'Clarity and trust', 'Claridad y confianza'), t('Quais dúvidas responder?', 'Which questions to answer?', '¿Qué dudas responder?')],
      [t('Próximo passo', 'Next step', 'Siguiente paso'), t('Abertura de conta ou WhatsApp.', 'Account opening or WhatsApp.', 'Apertura de cuenta o WhatsApp.')],
    ].map(([title, body], i) => <article key={i}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p><ArrowRight aria-hidden="true"/></article>)}</div><p className="case-curation-note">{t('Esquema de leitura em validação; não representa uma reprodução da ordem final das campanhas.', 'Reading scheme under validation; it does not reproduce the final order of the campaigns.', 'Esquema de lectura en validación; no representa una reproducción del orden final de las campañas.')}</p></>}
    {chapter === 3 && <Cards items={[
      [t('Alcance', 'Reach', 'Alcance'), t('257.417 sessões registradas nas duas landing pages; sessões não equivalem a pessoas únicas.', '257,417 sessions recorded across the two landing pages; sessions are not equivalent to unique people.', '257.417 sesiones registradas en las dos landing pages; las sesiones no equivalen a personas únicas.')],
      [t('Permanência', 'Time on page', 'Permanencia'), t('De 21 para 28 segundos de tempo médio. Esse indicador não é uma taxa de retenção.', 'From 21 to 28 seconds of average time. This indicator is not a retention rate.', 'De 21 a 28 segundos de tiempo promedio. Este indicador no es una tasa de retención.')],
      [t('Aprendizado', 'Learning', 'Aprendizaje'), t('Pesquisa, conteúdo, experiência e mídia atuaram juntos. A leitura dos números considera esse contexto.', 'Research, content, experience, and media worked together. Reading the numbers takes that context into account.', 'Investigación, contenido, experiencia y medios actuaron juntos. La lectura de los números considera ese contexto.')],
    ]}/>}
  </div>;
  if (id === 'lwsa') return <div className="case-section-details">
    {chapter === 0 && <LwsaEcosystem />}
    {chapter === 1 && <Cards items={[
      [t('O que comunicar', 'What to communicate', 'Qué comunicar'), t('Entender o posicionamento desejado no contexto de expansão.', 'Understanding the desired positioning in the context of expansion.', 'Entender el posicionamiento deseado en el contexto de expansión.')],
      [t('O que comparar', 'What to compare', 'Qué comparar'), t('Pesquisa de benchmarking realizada em conjunto com Relações Públicas.', 'Benchmarking research carried out together with Public Relations.', 'Investigación de benchmarking realizada en conjunto con Relaciones Públicas.')],
      [t('O que aprovar', 'What to approve', 'Qué aprobar'), t('Alinhamento com as partes interessadas ao longo da direção visual.', 'Alignment with stakeholders throughout the visual direction.', 'Alineación con las partes interesadas a lo largo de la dirección visual.')],
    ]}/>}
    {chapter === 2 && <><Cards items={[
      [t('Critério de marca', 'Brand criterion', 'Criterio de marca'), t('Conectar o posicionamento desejado às escolhas de identidade.', 'Connecting the desired positioning to identity choices.', 'Conectar el posicionamiento deseado con las decisiones de identidad.')],
      [t('Alinhamento', 'Alignment', 'Alineación'), t('Conduzir a direção visual e as aprovações com stakeholders.', 'Leading the visual direction and approvals with stakeholders.', 'Conducir la dirección visual y las aprobaciones con stakeholders.')],
      [t('Aplicações', 'Applications', 'Aplicaciones'), t('Materiais corporativos e pontos de contato digitais. Exemplos autorizados em seleção.', 'Corporate materials and digital touchpoints. Authorized examples being selected.', 'Materiales corporativos y puntos de contacto digitales. Ejemplos autorizados en selección.')],
    ]}/><Artifact title={t('Marca e sistema em uso', 'Brand and system in use', 'Marca y sistema en uso')} caption={t('Espaço para versões, composições e aplicações reais da identidade.', 'Space for versions, compositions, and real applications of the identity.', 'Espacio para versiones, composiciones y aplicaciones reales de la identidad.')}/></>}
    {chapter === 3 && <Cards items={[
      [t('Lançamento', 'Launch', 'Lanzamiento'), t('A marca passou a representar publicamente o grupo em sua nova fase.', 'The brand began publicly representing the group in its new phase.', 'La marca pasó a representar públicamente al grupo en su nueva etapa.')],
      [t('Repercussão', 'Coverage', 'Repercusión'), t('A mudança foi noticiada em veículos de negócios, incluindo o InvestNews.', 'The change was reported by business media, including InvestNews.', 'El cambio fue difundido por medios de negocios, incluido InvestNews.')],
      [t('Leitura do resultado', 'Reading the result', 'Lectura del resultado'), t('A repercussão da marca não implica atribuir resultados financeiros ao design.', 'Coverage of the brand does not imply attributing financial results to design.', 'La repercusión de la marca no implica atribuir resultados financieros al diseño.')],
    ]}/>}
  </div>;
  return <div className="case-section-details">
    {chapter === 0 && <div className="purchase-flow">{[
      ['Home', t('Entrada e navegação', 'Entry and navigation', 'Entrada y navegación')],
      [t('Coleções', 'Collections', 'Colecciones'), t('Encontrar o item', 'Find the item', 'Encontrar el artículo')],
      [t('Produto', 'Product', 'Producto'), t('Escolher variação', 'Choose a variant', 'Elegir variante')],
      [t('Carrinho', 'Cart', 'Carrito'), t('Primeiro ponto de saída', 'First exit point', 'Primer punto de salida')],
      ['Checkout', t('Segundo ponto de saída', 'Second exit point', 'Segundo punto de salida')],
      [t('Compra', 'Purchase', 'Compra'), t('Objetivo da jornada', 'Goal of the journey', 'Objetivo del recorrido')],
    ].map(([title, body], i) => <article className={i === 3 || i === 4 ? 'friction-step' : ''} key={i}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p><ArrowRight aria-hidden="true"/></article>)}</div>}
    {chapter === 1 && <><Cards items={[
      [t('Seções misturadas', 'Mixed sections', 'Secciones mezcladas'), t('Óculos de grau, sol, campanhas e outlet sem separação suficiente.', 'Prescription glasses, sunglasses, campaigns, and outlet without enough separation.', 'Anteojos recetados, de sol, campañas y outlet sin suficiente separación.')],
      [t('Cores e SKUs', 'Colors and SKUs', 'Colores y SKU'), t('Nomes inconsistentes e variações que nem sempre correspondiam à escolha.', 'Inconsistent names and variants that did not always match the selection.', 'Nombres inconsistentes y variantes que no siempre correspondían a la elección.')],
      [t('Compra interrompida', 'Interrupted purchase', 'Compra interrumpida'), t('Pontos da jornada em que compreensão e confiança caíam antes da conclusão.', 'Points in the journey where understanding and trust dropped before completion.', 'Puntos del recorrido en los que la comprensión y la confianza caían antes de la conclusión.')],
    ]}/><Artifact title={t('Auditoria heurística anotada', 'Annotated heuristic audit', 'Auditoría heurística anotada')} caption={t('Problema → evidência observada → prioridade → tela afetada. Registros publicáveis em curadoria.', 'Problem → observed evidence → priority → affected screen. Publishable records being curated.', 'Problema → evidencia observada → prioridad → pantalla afectada. Registros publicables en curaduría.')}/></>}
    {chapter === 2 && <div className="case-comparison">{[
      [t('Antes / fricções', 'Before / friction', 'Antes / fricciones'), [
        t('Produtos e campanhas misturados.', 'Products and campaigns mixed together.', 'Productos y campañas mezclados.'),
        t('Rótulos de cores sem consistência.', 'Inconsistent color labels.', 'Etiquetas de colores sin consistencia.'),
        t('Seleção que podia exibir outra cor.', 'A selection that could show another color.', 'Una selección que podía mostrar otro color.')]],
      [t('Depois / decisões', 'After / decisions', 'Después / decisiones'), [
        t('Seções de produto e campanha separadas.', 'Product and campaign sections separated.', 'Secciones de producto y campaña separadas.'),
        t('Famílias de cor e labels organizados.', 'Color families and labels organized.', 'Familias de color y etiquetas organizadas.'),
        t('Interface e conteúdo ajustados à oferta.', 'Interface and content adjusted to the offer.', 'Interfaz y contenido ajustados a la oferta.')]],
    ].map(([title, items], i) => <article key={i}><h3>{title as string}</h3><ul>{(items as string[]).map((text, j) => <li key={j}>{text}</li>)}</ul></article>)}</div>}
    {chapter === 3 && <Cards items={[
      [t('O indicador', 'The metric', 'El indicador'), t('Pessoas que adicionaram itens ao carrinho e não concluíram a compra.', 'People who added items to the cart and did not complete the purchase.', 'Personas que agregaron artículos al carrito y no concluyeron la compra.')],
      [t('A variação', 'The change', 'La variación'), t('De 42% para 20%, uma queda de 22 pontos percentuais no abandono.', 'From 42% to 20%, a drop of 22 percentage points in abandonment.', 'De 42% a 20%, una caída de 22 puntos porcentuales en el abandono.')],
      [t('O que o case explica', 'What the case explains', 'Qué explica el caso'), t('Como auditoria e testes orientaram mudanças no caminho até a compra.', 'How audit and testing guided changes along the path to purchase.', 'Cómo la auditoría y las pruebas orientaron cambios en el camino hasta la compra.')],
    ]}/>}
  </div>;
}
