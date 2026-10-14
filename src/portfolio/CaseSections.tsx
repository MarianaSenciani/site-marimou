import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

export const caseOpenings: Record<string, { summary: string; highlights: string[][] }> = {
  sicredi: { summary: 'Trabalhando pela Sioux, participei da investigação com gerentes e públicos locais, da definição da abordagem junto a estratégia, redação e mídia e conduzi o design das páginas. O objetivo era explicar serviços e oferecer um próximo passo compreensível.', highlights: [['+260 mil', 'Sessões registradas nas três URLs · jan–jun/2025.'], ['≈96%', 'Acessos mobile nos dados posteriores.'], ['592', 'Sessões com ação de contato.']] },
  lwsa: { summary: 'Conduzi a direção visual da evolução de Locaweb Company para LWSA e as aprovações com as partes interessadas. Com Relações Públicas, pesquisei o posicionamento desejado e participei do benchmarking que orientou a marca.', highlights: [['Pesquisa com RP', 'Entendimento do posicionamento desejado para a nova fase.'], ['Direção visual', 'Desenvolvimento e aprovação com stakeholders.'], ['Repercussão pública', 'Mudança de marca noticiada por veículos de negócios.']] },
  livo: { summary: 'Analisei a jornada de compra, participei de testes assistidos e redesenhei telas ligadas aos problemas encontrados. As mudanças envolveram organização das categorias, nomenclatura de cores e clareza até a finalização.', highlights: [['42% → 20%', 'Abandono de carrinho: queda de 22 pontos percentuais.'], ['2 pontos de saída', 'Após adicionar ao carrinho e durante o checkout.'], ['Heurística + testes', 'Diagnóstico do fluxo antes das mudanças visuais.']] },
};

function Cards({ items }: { items: string[][] }) {
  return <div className="case-insight-grid">{items.map(([title, body], i) => <Reveal key={title} delay={i * .06}><article className="case-insight-card"><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></article></Reveal>)}</div>;
}

function Artifact({ title, caption }: { title: string; caption: string }) {
  return <div className="case-artifact-placeholder"><span aria-hidden="true">✳</span><strong>{title}</strong><p>{caption}</p><small>Artefato visual em curadoria</small></div>;
}

export function CaseSectionDetails({ id, chapter }: { id: string; chapter: number }) {
  if (id === 'sicredi') return <div className="case-section-details">
    {chapter === 0 && <Cards items={[
      ['Gerentes das agências', 'O que as pessoas perguntavam e como os serviços eram explicados no atendimento.'],
      ['Clientes e empreendedores', 'Hábitos, necessidades e linguagem de quem vive o contexto da região.'],
      ['Equipe multidisciplinar', 'Estratégia, redação, mídia e design conectando os achados à comunicação.'],
    ]}/>}
    {chapter === 1 && <Artifact title="Mapa de achados da pesquisa" caption="Sínteses anonimizadas e sua relação com as decisões de conteúdo. Os registros públicos ainda estão sendo selecionados."/>}
    {chapter === 2 && <><Cards items={[
      ['Aplicativo', 'Alternativa considerada no início da discussão.'],
      ['Landing pages', 'Canal escolhido para reunir informação e oferecer caminhos de ação.'],
      ['Posts e vídeos', 'Alternativas de distribuição, com limites para explicar o assunto inteiro.'],
    ]}/><div className="architecture-flow">{[['Primeira mensagem','Qual necessidade vem antes?'],['Explicação','Como apresentar os serviços?'],['Clareza e confiança','Quais dúvidas responder?'],['Próximo passo','Abertura de conta ou WhatsApp.']].map(([title, body], i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p><ArrowRight aria-hidden="true"/></article>)}</div><p className="case-curation-note">Esquema de leitura em validação; não representa uma reprodução da ordem final das campanhas.</p></>}
    {chapter === 3 && <Cards items={[
      ['Alcance', '257.417 sessões registradas nas duas landing pages; sessões não equivalem a pessoas únicas.'],
      ['Permanência', 'De 21 para 28 segundos de tempo médio. Esse indicador não é uma taxa de retenção.'],
      ['Aprendizado', 'Pesquisa, conteúdo, experiência e mídia atuaram juntos. A leitura dos números considera esse contexto.'],
    ]}/>}
  </div>;
  if (id === 'lwsa') return <div className="case-section-details">
    {chapter === 0 && <Artifact title="Mapa do ecossistema" caption="Marcas, públicos e relações que ajudam a entender o contexto de expansão. Composição pública em curadoria."/>}
    {chapter === 1 && <Cards items={[
      ['O que comunicar', 'Entender o posicionamento desejado no contexto de expansão.'],
      ['O que comparar', 'Pesquisa de benchmarking realizada em conjunto com Relações Públicas.'],
      ['O que aprovar', 'Alinhamento com as partes interessadas ao longo da direção visual.'],
    ]}/>}
    {chapter === 2 && <><Cards items={[
      ['Critério de marca', 'Conectar o posicionamento desejado às escolhas de identidade.'],
      ['Alinhamento', 'Conduzir a direção visual e as aprovações com stakeholders.'],
      ['Aplicações', 'Materiais corporativos e pontos de contato digitais. Exemplos autorizados em seleção.'],
    ]}/><Artifact title="Marca e sistema em uso" caption="Espaço para versões, composições e aplicações reais da identidade."/></>}
    {chapter === 3 && <Cards items={[
      ['Lançamento', 'A marca passou a representar publicamente o grupo em sua nova fase.'],
      ['Repercussão', 'A mudança foi noticiada em veículos de negócios, incluindo o InvestNews.'],
      ['Leitura do resultado', 'A repercussão da marca não implica atribuir resultados financeiros ao design.'],
    ]}/>}
  </div>;
  return <div className="case-section-details">
    {chapter === 0 && <div className="purchase-flow">{[['Home','Entrada e navegação'],['Coleções','Encontrar o item'],['Produto','Escolher variação'],['Carrinho','Primeiro ponto de saída'],['Checkout','Segundo ponto de saída'],['Compra','Objetivo da jornada']].map(([title, body], i)=><article className={i===3 || i===4 ? 'friction-step' : ''} key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p><ArrowRight aria-hidden="true"/></article>)}</div>}
    {chapter === 1 && <><Cards items={[
      ['Seções misturadas', 'Óculos de grau, sol, campanhas e outlet sem separação suficiente.'],
      ['Cores e SKUs', 'Nomes inconsistentes e variações que nem sempre correspondiam à escolha.'],
      ['Compra interrompida', 'Pontos da jornada em que compreensão e confiança caíam antes da conclusão.'],
    ]}/><Artifact title="Auditoria heurística anotada" caption="Problema → evidência observada → prioridade → tela afetada. Registros publicáveis em curadoria."/></>}
    {chapter === 2 && <div className="case-comparison">{[
      ['Antes / fricções', ['Produtos e campanhas misturados.','Rótulos de cores sem consistência.','Seleção que podia exibir outra cor.']],
      ['Depois / decisões', ['Seções de produto e campanha separadas.','Famílias de cor e labels organizados.','Interface e conteúdo ajustados à oferta.']],
    ].map(([title, items])=><article key={String(title)}><h3>{title}</h3><ul>{(items as string[]).map(text=><li key={text}>{text}</li>)}</ul></article>)}</div>}
    {chapter === 3 && <Cards items={[
      ['O indicador', 'Pessoas que adicionaram itens ao carrinho e não concluíram a compra.'],
      ['A variação', 'De 42% para 20%, uma queda de 22 pontos percentuais no abandono.'],
      ['O que o case explica', 'Como auditoria e testes orientaram mudanças no caminho até a compra.'],
    ]}/>}
  </div>;
}
