import { AndroidStatus } from './AndroidStatus';
import { LivoProblem } from './LivoProblem';
import { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { Reveal } from '@/components/ui/reveal';
import { useMotionPaused } from '@/components/ui/motion-context';
import './livo-case.css';
import { CaseHero, CaseHighlights, CaseOverview, CaseReading } from './CaseLayout';

const media = '/assets/cases/livo/';

const chapters = [
  ['O problema', 'livo-problema'],
  ['Investigação', 'livo-investigacao'],
  ['Catálogo', 'livo-catalogo'],
  ['Cores', 'livo-cores'],
  ['Carrinho', 'livo-carrinho'],
  ['Resultado', 'livo-resultado'],
] as const;

const journey = [
  ['Home', 'Descobrir'],
  ['Catálogo', 'Encontrar'],
  ['Produto', 'Escolher'],
  ['Carrinho', 'Revisar'],
  ['Checkout', 'Pagar'],
  ['Compra', 'Concluir'],
] as const;

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
  return <div className={`lv-pair ${kind}`}>
    <figure className="lv-pair-card lv-pair-before"><figcaption><span>Antes · evidência da auditoria</span><p>{beforeText}</p><p className="lv-small">Recortes de diferentes partes da interface antiga, reunidos na auditoria.</p></figcaption><Screen src={before} alt={beforeAlt} full /></figure>
    <span className="lv-pair-arrow" aria-hidden="true"><ArrowRight size={24} /></span>
    <figure className="lv-pair-card lv-pair-after"><figcaption><span>Depois · tela redesenhada</span><p>{afterText}</p></figcaption><Screen src={after} alt={afterAlt} /></figure>
  </div>;
}

function Evidence({ number, label, title, text }: { number: string; label: string; title: string; text: string }) {
  return <Reveal className="lv-evidence"><span className="lv-evidence-number">{number}</span><small>{label}</small><h3>{title}</h3><p>{text}</p></Reveal>;
}

export function LivoCase() {
  const paused = useMotionPaused();
  useEffect(() => { document.title = 'LIVO · fluxo de compra e análise heurística — Mari Mou'; }, []);
  return <main id="main-content" lang="pt-BR" className={`livo-case project-case ${paused ? 'lv-motion-paused' : ''}`}>
    <CaseHero name="LIVO Eyewear · E-commerce · 2022–2023"
      title="Entre escolher e comprar, a jornada estava perdendo pessoas."
      subtitle="A queda de faturamento levou o time a olhar para o fluxo de compra. Mesmo atuando em Marketing, propus uma investigação de UX: combinei dados da VTEX, análise heurística e testes com usuários para redesenhar a jornada até o pagamento."
      highlights={<CaseHighlights items={[[ '42% → 20%', 'Abandono de carrinho · acompanhamento de 2 meses' ], [ '12 testes', '7 assistidos e 5 não assistidos · colaboradores internos' ], [ '2 pontos de saída', 'Após adicionar ao carrinho e antes de finalizar o checkout' ]]}/>}
      visual={<div className="lv-hero-art" aria-label="Telas redesenhadas do e-commerce LIVO em dispositivos móveis">
          <span className="lv-hero-art-label">A jornada redesenhada</span>
          <div className="lv-hero-phone lv-hero-phone-back"><AndroidStatus /><img src={`${media}catalogo.png`} alt="Página de produtos redesenhada" /></div>
          <div className="lv-hero-phone lv-hero-phone-front"><AndroidStatus /><img src={`${media}carrinho.png`} alt="Carrinho de compra redesenhado" /></div>
          <div className="lv-hero-stamp"><strong>42% <span>→</span> 20%</strong><span>abandono de carrinho em 2 meses</span></div>
        </div>}/>
    <CaseOverview facts={[[ 'Meu papel formal', 'Assistente de Arte · Marketing' ], [ 'Período', '2022–2023' ], [ 'Plataforma', 'Web · desktop e mobile' ], [ 'Escopo', 'Auditoria de UX, testes e redesign' ]]}
      challenge="Entender onde a jornada de compra deixava de orientar as pessoas e contribuía para o abandono do carrinho."
      contribution="Propus a frente de UX, cruzei dados da VTEX com análise heurística e testes internos e acompanhei o redesenho das telas até a implementação."
      approach="Investigar o fluxo completo antes de redesenhar, priorizando navegação, categorias, cores, SKUs e clareza até o pagamento."/>
    <CaseReading chapters={chapters}>

    <LivoProblem/>

    <section id="livo-investigacao" className="lv-section lv-research"><div className="wrap"><div className="lv-section-intro"><Reveal><Title>Antes de redesenhar telas, encontrei as fricções.</Title></Reveal><Reveal><p>Propus a frente de UX por iniciativa própria. Cruzei os sinais quantitativos do e-commerce com uma auditoria baseada nas heurísticas de Nielsen e testes com quem precisava percorrer o site sem conhecer seus atalhos.</p></Reveal></div>
      <div className="lv-evidence-grid"><Evidence number="01" label="Relatórios da VTEX" title="Localizar a saída" text="Os dados indicaram onde a compra perdia continuidade. Eles orientaram quais trechos da jornada observar com mais atenção." /><Evidence number="02" label="Análise heurística" title="Nomear o problema" text="Registrei tela, problema, heurística, criticidade e solução proposta. Os achados foram além do visual: navegação, estados, filtros e consistência." /><Evidence number="03" label="12 testes internos" title="Ver o uso real" text="Sete testes assistidos e cinco não assistidos, com funcionários de suporte, facilities, estoque e outros perfis pouco habituados ao site." /></div>
      <div className="lv-audit-details lv-audit-open"><h3>Outros achados da auditoria</h3><div>{[
        ['Navegação', 'Alguns links de menu e ajuda levavam ao destino errado ou exigiam outra busca.', 'Levar cada item diretamente ao conteúdo esperado.'],
        ['Busca', 'Depois do clique, o campo não recebia foco e pedia uma interação extra.', 'Deixar a digitação pronta assim que a busca abre.'],
        ['Pós-compra', 'A página de acompanhar pedido abria sem exibir o conteúdo imediatamente.', 'Mostrar o pedido sem exigir um segundo passo.'],
      ].map(([area, found, direction]) => <div key={area}><strong>{area}</strong><p>{found}</p><span>{direction}</span></div>)}</div></div>
      <p className="lv-research-note">Os participantes eram colaboradores da LIVO, não uma amostra representativa de todos os compradores. A auditoria orientou decisões; as telas antigas mostradas abaixo são recortes, não o relatório completo.</p>
    </div></section>

    <section className="lv-thesis" aria-labelledby="livo-redesign-principle"><div className="wrap"><p>Critério para o redesign</p><h2 id="livo-redesign-principle">Em cada etapa, a pessoa precisava <em>entender o que escolheu</em>, <em>o que aconteceria depois</em> e <em>como continuar sem dúvida</em> desnecessária.</h2></div></section>

    <section className="lv-section wrap lv-home"><div className="lv-section-intro lv-home-intro-card"><Reveal><Title>Dar uma ordem melhor à Home.</Title></Reveal><Reveal><p>Óculos de grau, óculos de sol, campanhas sazonais e outlet competiam pela mesma atenção. Reorganizei as seções para separar categorias permanentes da comunicação de campanha e ajustar a copy ao que estava ativo.</p><p className="lv-small">A imagem mostra a tela redesenhada. Os recortes antigos disponíveis não equivalem à Home inteira; por isso esta seção não faz uma comparação direta.</p></Reveal></div><div className="lv-home-stage"><div><span>O princípio</span><strong>Categoria para encontrar. Campanha para descobrir.</strong><p>A página passou a oferecer caminhos de entrada mais claros antes de levar a pessoa ao catálogo.</p></div><div className="lv-android-gallery">{[{file: "home.png", label: "Home"}, {file: "produto.png", label: "Produto"}, {file: "checkout.png", label: "Checkout"}].map(screen => <figure className="lv-android" key={screen.file}><div className="lv-android-screen"><AndroidStatus /><img src={`${media}${screen.file}`} alt={`${screen.label} mobile da LIVO`} loading="lazy" /></div><figcaption>{screen.label}</figcaption></figure>)}</div></div></section>

    <section id="livo-catalogo" className="lv-section wrap"><div className="lv-section-intro"><Reveal><Title>Encontrar o produto certo precisava ser mais simples.</Title></Reveal><Reveal><p>Na página de produtos, filtros, imagens e variações exigiam leitura demais. A solução deu mais destaque ao filtro e tornou os cards e as cores visíveis no contexto de cada produto.</p></Reveal></div>
      <Pair before="legado-catalogo.png" after="catalogo.png" beforeAlt="Recorte da listagem antiga, com filtros e muitos elementos concorrendo pela atenção" afterAlt="Página de produtos redesenhada com cards mais legíveis e filtro destacado" beforeText="Filtros e catálogo disputavam espaço; as opções de cor não ajudavam a decidir rapidamente." afterText="Hierarquia mais direta, filtro reconhecível e variantes junto ao item." kind="lv-pair-catalog" />
      <div className="lv-decision-line"><span>Decisão</span><p>Deixar a escolha mais legível no momento da comparação, sem exigir que a pessoa abra cada produto para entender as variantes.</p></div>
    </section>

    <section id="livo-cores" className="lv-section lv-colors"><div className="wrap"><div className="lv-section-intro"><Reveal><Title>Uma cor selecionada podia mostrar outra imagem.</Title></Reveal><Reveal><p>Aqui a fricção não terminava na interface. Nomes como “Azul”, “Azul Cristal” e “Turtle Azul” podiam ser interpretados parcialmente pela lógica do catálogo. O filtro, a variante escolhida e a imagem inicial nem sempre correspondiam.</p><p>Investiguei o comportamento, levei o diagnóstico para discussão com a pessoa responsável pelos produtos e conversei com a equipe técnica da VTEX. A reorganização dos dados de cadastro ficou com as áreas responsáveis.</p></Reveal></div>
      <div className="lv-color-story"><div className="lv-color-legacy"><span>Antes · recortes da auditoria</span><img src={`${media}legado-cores.png`} alt="Recorte antigo da seleção de cores" loading="lazy" /><img src={`${media}legado-variantes.png`} alt="Recorte antigo das variantes" loading="lazy" /></div><div className="lv-color-new"><span>Depois · tela redesenhada</span><Screen src="produto.png" alt="Página de produto redesenhada, com seleção de cor e informações de compra" full /></div></div>
      <div className="lv-color-decisions"><div><Check size={19}/><span>Separar cores disponíveis e indisponíveis</span></div><div><Check size={19}/><span>Aproximar variante, imagem e nome do produto</span></div><div><Check size={19}/><span>Tratar a inconsistência também como lógica de catálogo</span></div></div>
    </div></section>

    <section id="livo-carrinho" className="lv-section wrap"><div className="lv-section-intro"><Reveal><Title>Revisar a escolha antes de pedir a compra.</Title></Reveal><Reveal><p>O carrinho anterior trazia itens, subtotal, descontos e o caminho para o checkout, mas oferecia pouca orientação sobre frete e próximos passos. O redesign reuniu informação do item, quantidade, cor, preço, cálculo de frete e resumo financeiro.</p></Reveal></div>
      <Pair before="legado-carrinho.png" after="carrinho.png" beforeAlt="Carrinho anterior com listagem simples de itens e subtotal" afterAlt="Carrinho redesenhado com produto, frete, resumo financeiro e ações de compra" beforeText="O resumo confirmava pouco e deixava dúvidas antes do checkout." afterText="A pessoa vê a escolha, consulta frete e escolhe entre continuar ou finalizar." kind="lv-pair-cart" />
      <div className="lv-checkout"><div><p className="lv-section-index">A etapa seguinte</p><h3>O checkout manteve o contexto até pagar.</h3><p>Organizei entrega, pagamento e resumo da compra para que preço, frete, desconto, parcelamento e total aparecessem antes da ação final. A tela de login também foi redesenhada, especialmente para a jornada de quem ainda não estava logado.</p><p className="lv-small">Não há uma captura antiga equivalente de checkout ou login para fazer comparação direta.</p></div><div className="lv-checkout-shots"><Screen src="checkout.png" alt="Checkout redesenhado com entrega, pagamento e resumo" full /><Screen src="login.png" alt="Tela de login redesenhada" full /></div></div>
    </section>

    <section id="livo-resultado" className="lv-section lv-result"><div className="wrap"><div className="lv-result-top"><Reveal><Title>O abandono caiu no período seguinte.</Title></Reveal><p>Após a implementação das melhorias, a taxa de abandono de carrinho acompanhada pelo time passou de <strong>42% para 20%</strong> em dois meses: uma diferença de 22 pontos percentuais.</p></div><div className="lv-result-numbers" aria-label="Taxa de abandono de carrinho antes e depois"><div><span>Antes</span><strong>42%</strong></div><ArrowRight aria-hidden="true"/><div><span>Após 2 meses</span><strong>20%</strong></div></div><p className="lv-causality">No mesmo período houve ações comerciais pontuais, como e-mail marketing e pequenos descontos. O resultado acompanha as melhorias de experiência, mas não permite atribuir toda a variação apenas ao redesign.</p></div></section>

    <section className="lv-section wrap lv-closing"><div><p className="lv-section-index">O que levo deste projeto</p><Title>Foi o trabalho que antecipou minha transição para Produto.</Title></div><div><p>Eu estava formalmente em Marketing quando identifiquei um problema de negócio, propus a investigação e acompanhei o redesenho até a implementação. Foi uma das primeiras experiências em que conectei dados, comportamento, interface e uma restrição técnica real para melhorar uma jornada completa.</p><a href="/projetos" className="pill primary">Explorar outros projetos <ArrowUpRight size={18}/></a></div></section>
    <div className="lv-next wrap"><a href="/projetos/sicredi">Próximo case · Sicredi <ArrowUpRight size={18}/></a><a href="/projetos">Todos os projetos <ChevronDown size={17}/></a></div>
    </CaseReading>
  </main>;
}




