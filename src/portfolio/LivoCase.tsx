import { AndroidStatus } from './AndroidStatus';
import { LivoProblem } from './LivoProblem';
import { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { Reveal } from '@/components/ui/reveal';
import { useMotionPaused } from '@/components/ui/motion-context';
import './livo-case.css';
import { CaseHero, CaseHighlights, CaseOverview, CaseReading } from './CaseLayout';
import { useExperience } from './experience-context';

const media = '/assets/cases/livo/';

function Title({ children }: { children: string }) {
  return <WordPullUp as="h2" words={children} paused={useMotionPaused()} className="lv-title" />;
}

function Screen({ src, alt, className = '', full: _full = false }: { src: string; alt: string; className?: string; full?: boolean }) {
  const isMobile = src !== 'legado-catalogo.png';
  return <div className={`lv-screen ${isMobile ? 'lv-android-frame' : ''} ${className}`}>{isMobile && <AndroidStatus />}{src === 'legado-carrinho.png' ? <div className="lv-cart-evidence-crop"><img src={`${media}${src}`} alt={alt} loading="lazy" /></div> : <img src={`${media}${src}`} alt={alt} loading="lazy" />}</div>;
}

function Pair({
  before, after, beforeAlt, afterAlt, beforeText, afterText, kind = '',
}: {
  before: string; after: string; beforeAlt: string; afterAlt: string;
  beforeText: string; afterText: string; kind?: string;
}) {
  const { t } = useExperience();
  return <div className={`lv-pair ${kind}`}>
    <figure className="lv-pair-card lv-pair-before"><figcaption><span>{t('Antes · evidência da auditoria', 'Before · audit evidence', 'Antes · evidencia de la auditoría')}</span><p>{beforeText}</p><p className="lv-small">{t('Recortes de diferentes partes da interface antiga, reunidos na auditoria.', 'Crops from different parts of the old interface, gathered during the audit.', 'Recortes de distintas partes de la interfaz anterior, reunidos en la auditoría.')}</p></figcaption><Screen src={before} alt={beforeAlt} full /></figure>
    <span className="lv-pair-arrow" aria-hidden="true"><ArrowRight size={24} /></span>
    <figure className="lv-pair-card lv-pair-after"><figcaption><span>{t('Depois · tela redesenhada', 'After · redesigned screen', 'Después · pantalla rediseñada')}</span><p>{afterText}</p></figcaption><Screen src={after} alt={afterAlt} /></figure>
  </div>;
}

function Evidence({ number, label, title, text }: { number: string; label: string; title: string; text: string }) {
  return <Reveal className="lv-evidence"><span className="lv-evidence-number">{number}</span><small>{label}</small><h3>{title}</h3><p>{text}</p></Reveal>;
}

export function LivoCase() {
  const paused = useMotionPaused();
  const { t, lang } = useExperience();
  useEffect(() => {
    document.title = t(
      'LIVO · fluxo de compra e análise heurística — Mari Mou',
      'LIVO · purchase flow and heuristic analysis — Mari Mou',
      'LIVO · flujo de compra y análisis heurístico — Mari Mou',
    );
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const chapters: readonly (readonly [string, string])[] = [
    [t('O problema', 'The problem', 'El problema'), 'livo-problema'],
    [t('Investigação', 'Research', 'Investigación'), 'livo-investigacao'],
    [t('Catálogo', 'Catalog', 'Catálogo'), 'livo-catalogo'],
    [t('Cores', 'Colors', 'Colores'), 'livo-cores'],
    [t('Carrinho', 'Cart', 'Carrito'), 'livo-carrinho'],
    [t('Resultado', 'Result', 'Resultado'), 'livo-resultado'],
  ];

  const auditFindings = [
    [
      t('Navegação', 'Navigation', 'Navegación'),
      t('Alguns links de menu e ajuda levavam ao destino errado ou exigiam outra busca.', 'Some menu and help links led to the wrong destination or required another search.', 'Algunos enlaces del menú y de ayuda llevaban al destino equivocado o exigían otra búsqueda.'),
      t('Levar cada item diretamente ao conteúdo esperado.', 'Take each item straight to the expected content.', 'Llevar cada ítem directamente al contenido esperado.'),
    ],
    [
      t('Busca', 'Search', 'Búsqueda'),
      t('Depois do clique, o campo não recebia foco e pedia uma interação extra.', 'After the click, the field did not receive focus and required an extra interaction.', 'Después del clic, el campo no recibía el foco y pedía una interacción adicional.'),
      t('Deixar a digitação pronta assim que a busca abre.', 'Have typing ready as soon as the search opens.', 'Dejar lista la escritura apenas se abre la búsqueda.'),
    ],
    [
      t('Pós-compra', 'Post-purchase', 'Poscompra'),
      t('A página de acompanhar pedido abria sem exibir o conteúdo imediatamente.', 'The order tracking page opened without showing its content right away.', 'La página de seguimiento del pedido se abría sin mostrar el contenido de inmediato.'),
      t('Mostrar o pedido sem exigir um segundo passo.', 'Show the order without requiring a second step.', 'Mostrar el pedido sin exigir un segundo paso.'),
    ],
  ];

  const galleryScreens = [
    { file: 'home.png', label: t('Home', 'Home', 'Home'), alt: t('Home mobile da LIVO', 'LIVO mobile Home', 'Home móvil de LIVO') },
    { file: 'produto.png', label: t('Produto', 'Product', 'Producto'), alt: t('Produto mobile da LIVO', 'LIVO mobile product page', 'Producto móvil de LIVO') },
    { file: 'checkout.png', label: t('Checkout', 'Checkout', 'Checkout'), alt: t('Checkout mobile da LIVO', 'LIVO mobile Checkout', 'Checkout móvil de LIVO') },
  ];

  return <main id="main-content" lang={lang === 'pt' ? 'pt-BR' : lang} className={`livo-case project-case ${paused ? 'lv-motion-paused' : ''}`}>
    <CaseHero name={t('LIVO Eyewear · E-commerce · 2022–2023', 'LIVO Eyewear · E-commerce · 2022–2023', 'LIVO Eyewear · E-commerce · 2022–2023')}
      title={t('Entre escolher e comprar, a jornada estava perdendo pessoas.', 'Between choosing and buying, the journey was losing people.', 'Entre elegir y comprar, el recorrido estaba perdiendo personas.')}
      subtitle={t(
        'A queda de faturamento levou o time a olhar para o fluxo de compra. Mesmo atuando em Marketing, propus uma investigação de UX: combinei dados da VTEX, análise heurística e testes com usuários para redesenhar a jornada até o pagamento.',
        'The drop in revenue led the team to look at the purchase flow. Even though I worked in Marketing, I proposed a UX investigation: I combined VTEX data, heuristic analysis and user tests to redesign the journey up to payment.',
        'La caída de la facturación llevó al equipo a mirar el flujo de compra. Aunque trabajaba en Marketing, propuse una investigación de UX: combiné datos de VTEX, análisis heurístico y pruebas con usuarios para rediseñar el recorrido hasta el pago.',
      )}
      highlights={<CaseHighlights items={[
        ['42% → 20%', t('Abandono de carrinho · acompanhamento de 2 meses', 'Cart abandonment · 2-month follow-up', 'Abandono de carrito · seguimiento de 2 meses')],
        [t('12 testes', '12 tests', '12 pruebas'), t('7 assistidos e 5 não assistidos · colaboradores internos', '7 moderated and 5 unmoderated · internal employees', '7 asistidas y 5 no asistidas · colaboradores internos')],
        [t('2 pontos de saída', '2 exit points', '2 puntos de salida'), t('Após adicionar ao carrinho e antes de finalizar o checkout', 'After adding to cart and before completing checkout', 'Después de agregar al carrito y antes de finalizar el checkout')],
      ]}/>}
      visual={<div className="lv-hero-art" aria-label={t('Telas redesenhadas do e-commerce LIVO em dispositivos móveis', 'Redesigned screens of the LIVO e-commerce on mobile devices', 'Pantallas rediseñadas del e-commerce de LIVO en dispositivos móviles')}>
          <span className="lv-hero-art-label">{t('A jornada redesenhada', 'The redesigned journey', 'El recorrido rediseñado')}</span>
          <div className="lv-hero-phone lv-hero-phone-back"><AndroidStatus /><img src={`${media}catalogo.png`} alt={t('Página de produtos redesenhada', 'Redesigned products page', 'Página de productos rediseñada')} /></div>
          <div className="lv-hero-phone lv-hero-phone-front"><AndroidStatus /><img src={`${media}carrinho.png`} alt={t('Carrinho de compra redesenhado', 'Redesigned shopping cart', 'Carrito de compras rediseñado')} /></div>
          <div className="lv-hero-stamp"><strong>42% <span>→</span> 20%</strong><span>{t('abandono de carrinho em 2 meses', 'cart abandonment in 2 months', 'abandono de carrito en 2 meses')}</span></div>
        </div>}/>
    <CaseOverview facts={[
        [t('Meu papel formal', 'My formal role', 'Mi rol formal'), t('Assistente de Arte · Marketing', 'Art Assistant · Marketing', 'Asistente de Arte · Marketing')],
        [t('Período', 'Period', 'Período'), '2022–2023'],
        [t('Plataforma', 'Platform', 'Plataforma'), t('Web · desktop e mobile', 'Web · desktop and mobile', 'Web · escritorio y móvil')],
        [t('Escopo', 'Scope', 'Alcance'), t('Auditoria de UX, testes e redesign', 'UX audit, testing and redesign', 'Auditoría de UX, pruebas y rediseño')],
      ]}
      challenge={t('Entender onde a jornada de compra deixava de orientar as pessoas e contribuía para o abandono do carrinho.', 'Understand where the purchase journey stopped guiding people and contributed to cart abandonment.', 'Entender dónde el recorrido de compra dejaba de orientar a las personas y contribuía al abandono del carrito.')}
      contribution={t('Propus a frente de UX, cruzei dados da VTEX com análise heurística e testes internos e acompanhei o redesenho das telas até a implementação.', 'I proposed the UX workstream, cross-referenced VTEX data with heuristic analysis and internal tests, and followed the screen redesign through to implementation.', 'Propuse el frente de UX, crucé datos de VTEX con análisis heurístico y pruebas internas, y acompañé el rediseño de las pantallas hasta la implementación.')}
      approach={t('Investigar o fluxo completo antes de redesenhar, priorizando navegação, categorias, cores, SKUs e clareza até o pagamento.', 'Investigate the full flow before redesigning, prioritizing navigation, categories, colors, SKUs and clarity all the way to payment.', 'Investigar el flujo completo antes de rediseñar, priorizando navegación, categorías, colores, SKUs y claridad hasta el pago.')}/>
    <CaseReading chapters={chapters}>

    <LivoProblem/>

    <section id="livo-investigacao" className="lv-section lv-research"><div className="wrap"><div className="lv-section-intro"><Reveal><Title>{t('Antes de redesenhar telas, encontrei as fricções.', 'Before redesigning screens, I found the friction.', 'Antes de rediseñar pantallas, encontré las fricciones.')}</Title></Reveal><Reveal><p>{t('Propus a frente de UX por iniciativa própria. Cruzei os sinais quantitativos do e-commerce com uma auditoria baseada nas heurísticas de Nielsen e testes com quem precisava percorrer o site sem conhecer seus atalhos.', 'I proposed the UX workstream on my own initiative. I cross-referenced the e-commerce quantitative signals with an audit based on Nielsen’s heuristics and with tests involving people who had to go through the site without knowing its shortcuts.', 'Propuse el frente de UX por iniciativa propia. Crucé las señales cuantitativas del e-commerce con una auditoría basada en las heurísticas de Nielsen y con pruebas con personas que debían recorrer el sitio sin conocer sus atajos.')}</p></Reveal></div>
      <div className="lv-evidence-grid"><Evidence number="01" label={t('Relatórios da VTEX', 'VTEX reports', 'Informes de VTEX')} title={t('Localizar a saída', 'Locate the exit', 'Localizar la salida')} text={t('Os dados indicaram onde a compra perdia continuidade. Eles orientaram quais trechos da jornada observar com mais atenção.', 'The data showed where the purchase lost continuity. It guided which parts of the journey to observe more closely.', 'Los datos indicaron dónde la compra perdía continuidad. Orientaron qué tramos del recorrido observar con más atención.')} /><Evidence number="02" label={t('Análise heurística', 'Heuristic analysis', 'Análisis heurístico')} title={t('Nomear o problema', 'Name the problem', 'Nombrar el problema')} text={t('Registrei tela, problema, heurística, criticidade e solução proposta. Os achados foram além do visual: navegação, estados, filtros e consistência.', 'I recorded the screen, problem, heuristic, severity and proposed solution. The findings went beyond the visual: navigation, states, filters and consistency.', 'Registré pantalla, problema, heurística, criticidad y solución propuesta. Los hallazgos fueron más allá de lo visual: navegación, estados, filtros y consistencia.')} /><Evidence number="03" label={t('12 testes internos', '12 internal tests', '12 pruebas internas')} title={t('Ver o uso real', 'See real use', 'Ver el uso real')} text={t('Sete testes assistidos e cinco não assistidos, com funcionários de suporte, facilities, estoque e outros perfis pouco habituados ao site.', 'Seven moderated and five unmoderated tests, with employees from support, facilities, inventory and other profiles unfamiliar with the site.', 'Siete pruebas asistidas y cinco no asistidas, con empleados de soporte, facilities, stock y otros perfiles poco habituados al sitio.')} /></div>
      <div className="lv-audit-details lv-audit-open"><h3>{t('Outros achados da auditoria', 'Other audit findings', 'Otros hallazgos de la auditoría')}</h3><div>{auditFindings.map(([area, found, direction], index) => <div key={index}><strong>{area}</strong><p>{found}</p><span>{direction}</span></div>)}</div></div>
      <p className="lv-research-note">{t('Os participantes eram colaboradores da LIVO, não uma amostra representativa de todos os compradores. A auditoria orientou decisões; as telas antigas mostradas abaixo são recortes, não o relatório completo.', 'The participants were LIVO employees, not a representative sample of all shoppers. The audit informed decisions; the old screens shown below are crops, not the full report.', 'Los participantes eran colaboradores de LIVO, no una muestra representativa de todos los compradores. La auditoría orientó decisiones; las pantallas anteriores que se muestran abajo son recortes, no el informe completo.')}</p>
    </div></section>

    <section className="lv-thesis" aria-labelledby="livo-redesign-principle"><div className="wrap"><p>{t('Critério para o redesign', 'Criterion for the redesign', 'Criterio para el rediseño')}</p><h2 id="livo-redesign-principle">{t(
      <>Em cada etapa, a pessoa precisava <em>entender o que escolheu</em>, <em>o que aconteceria depois</em> e <em>como continuar sem dúvida</em> desnecessária.</>,
      <>At every step, people needed to <em>understand what they had chosen</em>, <em>what would happen next</em> and <em>how to continue without unnecessary doubt</em>.</>,
      <>En cada etapa, la persona necesitaba <em>entender qué eligió</em>, <em>qué pasaría después</em> y <em>cómo continuar sin dudas</em> innecesarias.</>,
    )}</h2></div></section>

    <section className="lv-section wrap lv-home"><div className="lv-section-intro lv-home-intro-card"><Reveal><Title>{t('Dar uma ordem melhor à Home.', 'Giving the Home a better order.', 'Darle un mejor orden a la Home.')}</Title></Reveal><Reveal><p>{t('Óculos de grau, óculos de sol, campanhas sazonais e outlet competiam pela mesma atenção. Reorganizei as seções para separar categorias permanentes da comunicação de campanha e ajustar a copy ao que estava ativo.', 'Prescription glasses, sunglasses, seasonal campaigns and the outlet competed for the same attention. I reorganized the sections to separate permanent categories from campaign messaging and to adjust the copy to what was active.', 'Anteojos recetados, anteojos de sol, campañas estacionales y outlet competían por la misma atención. Reorganicé las secciones para separar las categorías permanentes de la comunicación de campaña y ajustar el copy a lo que estaba activo.')}</p><p className="lv-small">{t('A imagem mostra a tela redesenhada. Os recortes antigos disponíveis não equivalem à Home inteira; por isso esta seção não faz uma comparação direta.', 'The image shows the redesigned screen. The old crops available do not cover the entire Home, so this section does not make a direct comparison.', 'La imagen muestra la pantalla rediseñada. Los recortes anteriores disponibles no equivalen a la Home completa; por eso esta sección no hace una comparación directa.')}</p></Reveal></div><div className="lv-home-stage"><div><span>{t('O princípio', 'The principle', 'El principio')}</span><strong>{t('Categoria para encontrar. Campanha para descobrir.', 'Category to find. Campaign to discover.', 'Categoría para encontrar. Campaña para descubrir.')}</strong><p>{t('A página passou a oferecer caminhos de entrada mais claros antes de levar a pessoa ao catálogo.', 'The page began to offer clearer entry paths before taking people to the catalog.', 'La página pasó a ofrecer caminos de entrada más claros antes de llevar a la persona al catálogo.')}</p></div><div className="lv-android-gallery">{galleryScreens.map(screen => <figure className="lv-android" key={screen.file}><div className="lv-android-screen"><AndroidStatus /><img src={`${media}${screen.file}`} alt={screen.alt} loading="lazy" /></div><figcaption>{screen.label}</figcaption></figure>)}</div></div></section>

    <section id="livo-catalogo" className="lv-section wrap"><div className="lv-section-intro"><Reveal><Title>{t('Encontrar o produto certo precisava ser mais simples.', 'Finding the right product needed to be simpler.', 'Encontrar el producto correcto tenía que ser más simple.')}</Title></Reveal><Reveal><p>{t('Na página de produtos, filtros, imagens e variações exigiam leitura demais. A solução deu mais destaque ao filtro e tornou os cards e as cores visíveis no contexto de cada produto.', 'On the products page, filters, images and variations demanded too much reading. The solution gave the filter more prominence and made the cards and colors visible in the context of each product.', 'En la página de productos, los filtros, las imágenes y las variaciones exigían demasiada lectura. La solución dio más protagonismo al filtro e hizo que las tarjetas y los colores fueran visibles en el contexto de cada producto.')}</p></Reveal></div>
      <Pair before="legado-catalogo.png" after="catalogo.png" beforeAlt={t('Recorte da listagem antiga, com filtros e muitos elementos concorrendo pela atenção', 'Crop of the old listing, with filters and many elements competing for attention', 'Recorte del listado anterior, con filtros y muchos elementos compitiendo por la atención')} afterAlt={t('Página de produtos redesenhada com cards mais legíveis e filtro destacado', 'Redesigned products page with more legible cards and a highlighted filter', 'Página de productos rediseñada con tarjetas más legibles y filtro destacado')} beforeText={t('Filtros e catálogo disputavam espaço; as opções de cor não ajudavam a decidir rapidamente.', 'Filters and catalog competed for space; the color options did not help people decide quickly.', 'Los filtros y el catálogo se disputaban el espacio; las opciones de color no ayudaban a decidir rápidamente.')} afterText={t('Hierarquia mais direta, filtro reconhecível e variantes junto ao item.', 'More direct hierarchy, a recognizable filter and variants next to the item.', 'Jerarquía más directa, filtro reconocible y variantes junto al ítem.')} kind="lv-pair-catalog" />
      <div className="lv-decision-line"><span>{t('Decisão', 'Decision', 'Decisión')}</span><p>{t('Deixar a escolha mais legível no momento da comparação, sem exigir que a pessoa abra cada produto para entender as variantes.', 'Make the choice more legible at the moment of comparison, without requiring people to open each product to understand the variants.', 'Hacer la elección más legible en el momento de la comparación, sin exigir que la persona abra cada producto para entender las variantes.')}</p></div>
    </section>

    <section id="livo-cores" className="lv-section lv-colors"><div className="wrap"><div className="lv-section-intro"><Reveal><Title>{t('Uma cor selecionada podia mostrar outra imagem.', 'A selected color could show a different image.', 'Un color seleccionado podía mostrar otra imagen.')}</Title></Reveal><Reveal><p>{t('Aqui a fricção não terminava na interface. Nomes como “Azul”, “Azul Cristal” e “Turtle Azul” podiam ser interpretados parcialmente pela lógica do catálogo. O filtro, a variante escolhida e a imagem inicial nem sempre correspondiam.', 'Here the friction did not end at the interface. Names such as “Azul”, “Azul Cristal” and “Turtle Azul” (real catalog labels) could be partially interpreted by the catalog logic. The filter, the chosen variant and the initial image did not always match.', 'Aquí la fricción no terminaba en la interfaz. Nombres como “Azul”, “Azul Cristal” y “Turtle Azul” (etiquetas reales del catálogo) podían ser interpretados parcialmente por la lógica del catálogo. El filtro, la variante elegida y la imagen inicial no siempre coincidían.')}</p><p>{t('Investiguei o comportamento, levei o diagnóstico para discussão com a pessoa responsável pelos produtos e conversei com a equipe técnica da VTEX. A reorganização dos dados de cadastro ficou com as áreas responsáveis.', 'I investigated the behavior, brought the diagnosis to the person responsible for the products and talked with VTEX’s technical team. Reorganizing the registration data was left to the responsible teams.', 'Investigué el comportamiento, llevé el diagnóstico a discusión con la persona responsable de los productos y conversé con el equipo técnico de VTEX. La reorganización de los datos de registro quedó a cargo de las áreas responsables.')}</p></Reveal></div>
      <div className="lv-color-story"><div className="lv-color-legacy"><span>{t('Antes · recortes da auditoria', 'Before · audit crops', 'Antes · recortes de la auditoría')}</span><img src={`${media}legado-cores.png`} alt={t('Recorte antigo da seleção de cores', 'Old crop of the color selection', 'Recorte anterior de la selección de colores')} loading="lazy" /><img src={`${media}legado-variantes.png`} alt={t('Recorte antigo das variantes', 'Old crop of the variants', 'Recorte anterior de las variantes')} loading="lazy" /></div><div className="lv-color-new"><span>{t('Depois · tela redesenhada', 'After · redesigned screen', 'Después · pantalla rediseñada')}</span><Screen src="produto.png" alt={t('Página de produto redesenhada, com seleção de cor e informações de compra', 'Redesigned product page, with color selection and purchase information', 'Página de producto rediseñada, con selección de color e información de compra')} full /></div></div>
      <div className="lv-color-decisions"><div><Check size={19}/><span>{t('Separar cores disponíveis e indisponíveis', 'Separate available and unavailable colors', 'Separar colores disponibles y no disponibles')}</span></div><div><Check size={19}/><span>{t('Aproximar variante, imagem e nome do produto', 'Bring variant, image and product name closer together', 'Acercar variante, imagen y nombre del producto')}</span></div><div><Check size={19}/><span>{t('Tratar a inconsistência também como lógica de catálogo', 'Treat the inconsistency as catalog logic as well', 'Tratar la inconsistencia también como lógica de catálogo')}</span></div></div>
    </div></section>

    <section id="livo-carrinho" className="lv-section wrap"><div className="lv-section-intro"><Reveal><Title>{t('Revisar a escolha antes de pedir a compra.', 'Reviewing the choice before asking for the purchase.', 'Revisar la elección antes de pedir la compra.')}</Title></Reveal><Reveal><p>{t('O carrinho anterior trazia itens, subtotal, descontos e o caminho para o checkout, mas oferecia pouca orientação sobre frete e próximos passos. O redesign reuniu informação do item, quantidade, cor, preço, cálculo de frete e resumo financeiro.', 'The previous cart showed items, subtotal, discounts and the path to checkout, but offered little guidance on shipping and next steps. The redesign brought together item information, quantity, color, price, shipping calculation and financial summary.', 'El carrito anterior mostraba ítems, subtotal, descuentos y el camino hacia el checkout, pero ofrecía poca orientación sobre el envío y los próximos pasos. El rediseño reunió información del ítem, cantidad, color, precio, cálculo de envío y resumen financiero.')}</p></Reveal></div>
      <Pair before="legado-carrinho.png" after="carrinho.png" beforeAlt={t('Carrinho anterior com listagem simples de itens e subtotal', 'Previous cart with a simple list of items and subtotal', 'Carrito anterior con un listado simple de ítems y subtotal')} afterAlt={t('Carrinho redesenhado com produto, frete, resumo financeiro e ações de compra', 'Redesigned cart with product, shipping, financial summary and purchase actions', 'Carrito rediseñado con producto, envío, resumen financiero y acciones de compra')} beforeText={t('O resumo confirmava pouco e deixava dúvidas antes do checkout.', 'The summary confirmed little and left doubts before checkout.', 'El resumen confirmaba poco y dejaba dudas antes del checkout.')} afterText={t('A pessoa vê a escolha, consulta frete e escolhe entre continuar ou finalizar.', 'People see their choice, check shipping and choose between continuing or completing the purchase.', 'La persona ve su elección, consulta el envío y elige entre continuar o finalizar.')} kind="lv-pair-cart" />
      <div className="lv-checkout"><div><p className="lv-section-index">{t('A etapa seguinte', 'The next step', 'La etapa siguiente')}</p><h3>{t('O checkout manteve o contexto até pagar.', 'The checkout kept the context until payment.', 'El checkout mantuvo el contexto hasta el pago.')}</h3><p>{t('Organizei entrega, pagamento e resumo da compra para que preço, frete, desconto, parcelamento e total aparecessem antes da ação final. A tela de login também foi redesenhada, especialmente para a jornada de quem ainda não estava logado.', 'I organized delivery, payment and order summary so that price, shipping, discount, installments and total appeared before the final action. The login screen was also redesigned, especially for the journey of people who were not yet logged in.', 'Organicé entrega, pago y resumen de la compra para que precio, envío, descuento, cuotas y total aparecieran antes de la acción final. La pantalla de inicio de sesión también fue rediseñada, especialmente para el recorrido de quien aún no había iniciado sesión.')}</p><p className="lv-small">{t('Não há uma captura antiga equivalente de checkout ou login para fazer comparação direta.', 'There is no equivalent old capture of the checkout or login for a direct comparison.', 'No hay una captura anterior equivalente del checkout o del inicio de sesión para hacer una comparación directa.')}</p></div><div className="lv-checkout-shots"><Screen src="checkout.png" alt={t('Checkout redesenhado com entrega, pagamento e resumo', 'Redesigned checkout with delivery, payment and summary', 'Checkout rediseñado con entrega, pago y resumen')} full /><Screen src="login.png" alt={t('Tela de login redesenhada', 'Redesigned login screen', 'Pantalla de inicio de sesión rediseñada')} full /></div></div>
    </section>

    <section id="livo-resultado" className="lv-section lv-result"><div className="wrap"><div className="lv-result-top"><Reveal><Title>{t('O abandono caiu no período seguinte.', 'Abandonment dropped in the following period.', 'El abandono cayó en el período siguiente.')}</Title></Reveal><p>{t(
      <>Após a implementação das melhorias, a taxa de abandono de carrinho acompanhada pelo time passou de <strong>42% para 20%</strong> em dois meses: uma diferença de 22 pontos percentuais.</>,
      <>After the improvements were implemented, the cart abandonment rate tracked by the team went from <strong>42% to 20%</strong> in two months: a difference of 22 percentage points.</>,
      <>Tras la implementación de las mejoras, la tasa de abandono de carrito monitoreada por el equipo pasó de <strong>42% a 20%</strong> en dos meses: una diferencia de 22 puntos porcentuales.</>,
    )}</p></div><div className="lv-result-numbers" aria-label={t('Taxa de abandono de carrinho antes e depois', 'Cart abandonment rate before and after', 'Tasa de abandono de carrito antes y después')}><div><span>{t('Antes', 'Before', 'Antes')}</span><strong>42%</strong></div><ArrowRight aria-hidden="true"/><div><span>{t('Após 2 meses', 'After 2 months', 'Después de 2 meses')}</span><strong>20%</strong></div></div><p className="lv-causality">{t('No mesmo período houve ações comerciais pontuais, como e-mail marketing e pequenos descontos. O resultado acompanha as melhorias de experiência, mas não permite atribuir toda a variação apenas ao redesign.', 'In the same period there were one-off commercial actions, such as email marketing and small discounts. The result accompanies the experience improvements, but it does not allow attributing the entire variation to the redesign alone.', 'En el mismo período hubo acciones comerciales puntuales, como e-mail marketing y pequeños descuentos. El resultado acompaña las mejoras de experiencia, pero no permite atribuir toda la variación únicamente al rediseño.')}</p></div></section>

    <section className="lv-section wrap lv-closing"><div><p className="lv-section-index">{t('O que levo deste projeto', 'What I take from this project', 'Lo que me llevo de este proyecto')}</p><Title>{t('Foi o trabalho que antecipou minha transição para Produto.', 'This was the work that anticipated my transition to Product.', 'Fue el trabajo que anticipó mi transición hacia Producto.')}</Title></div><div><p>{t('Eu estava em Marketing quando vi o problema de negócio, propus a investigação e acompanhei o redesenho até ir ao ar. Foi aqui que percebi que investigar era tão importante para mim quanto desenhar a tela.', 'I was in Marketing when I saw the business problem, proposed the investigation, and followed the redesign through to launch. That was when I realized researching was just as important to me as designing screens.', 'Estaba en Marketing cuando vi el problema de negocio, propuse la investigación y acompañé el rediseño hasta el lanzamiento. Fue aquí donde me di cuenta de que investigar era tan importante para mí como diseñar la pantalla.')}</p><a href="/projetos" className="pill primary">{t('Explorar outros projetos', 'Explore other projects', 'Explorar otros proyectos')} <ArrowUpRight size={18}/></a></div></section>
    <div className="lv-next wrap"><a href="/projetos/sicredi">{t('Próximo case · Sicredi', 'Next case · Sicredi', 'Próximo caso · Sicredi')} <ArrowUpRight size={18}/></a><a href="/projetos">{t('Todos os projetos', 'All projects', 'Todos los proyectos')} <ChevronDown size={17}/></a></div>
    </CaseReading>
  </main>;
}
