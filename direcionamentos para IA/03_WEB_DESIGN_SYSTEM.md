# Mari Mou — Web Design System

**Objetivo:** orientar construção de websites, interfaces e sistemas coerentes com a identidade Mari Mou. **Fonte:** Figma `Site Mari Mou 2`, seis frames em `Page 1`; validação com site publicado pendente. **Natureza:** especificação inicial, com dados observados separados de recomendações de engenharia.

## 1. Inventário de telas (identificação por conteúdo, não por URL)
| ID Figma | Dimensões aproximadas | Identificação por conteúdo |
|---|---|---|
| `8:2` | 1521 × 4280 px | Home: apresentação, projetos, processo, recomendações, header/footer |
| `8:460` | 1521 × 11595 px | Case Sicredi Centro-Norte |
| `8:1329` | 1521 × 1873 px | Lista de projetos |
| `8:1548` | 1521 × 4850 px | Case LWSA |
| `8:1869` | 1521 × 9946 px | Case LIVO Eyewear |
| `8:2454` | 1521 × 4276 px | Trajetória / sobre |

Essas classificações derivam dos textos encontrados nos frames. **Não são URLs confirmadas** nem prova de seis rotas publicadas.

## 2. Fundação visual observada
- Fontes: **Alexandria** (display e títulos), **Inter** (corpo e utilitários).
- Preenchimentos recorrentes: `#F2F1E8`, `#BDDB42`, `#AEB39D`, `#1B1D15`, `#23271C`, `#303625`.
- Texto hero desktop (home): Alexandria ExtraBold 800, 170/170 px, tracking -14,45 px.
- Títulos de seções (home): Alexandria Medium 500, 42/49,56 px, tracking -2,31 px.
- Três cards de projetos na home: frames de 411 × 346 px com **border radius 20 px**.
- Links estilo pílula: raios observados de **100 px** e **999 px**, com alturas como 41, 44, 47 e 53 px conforme variação.
- Header no frame inicial: 1521 × 66 px, margem horizontal observada de ~90,4 px; navegação com gap de 28 px.
- Footer no frame inicial: 1521 × 406 px, layout vertical.
- Botões e ícones de controle: alternar tema claro e retomar motions; presença visual confirmada, mas comportamento não verificado.

## 3. Arquitetura de componentes recomendada
Este modelo de componentes é uma **formalização sugerida** sobre padrões de frames, não uma biblioteca nativa encontrada no Figma (nenhum COMPONENT/INSTANCE formal registrado):

- `SiteHeader`: marca, navegação principal, CTA, controles de aparência/movimento.
- `SiteFooter`: navegação, contato e redes.
- `PillLink` / `PillButton`: CTAs com ícone opcional e variantes de contraste.
- `ProjectCard`: imagem/graphic, cliente, categoria, título, link.
- `ProjectGrid`: grade responsiva de trabalhos.
- `CaseStudyHero`, `CaseStudySection`, `CaseStudyMetrics`, `CaseStudyNavigation`: estruturas para estudos de caso.
- `RecommendationCarousel`: depoimentos/recomendações com controles anterior/próximo.
- `ThemeToggle`, `MotionToggle`: controles explícitos e acessíveis.

## 4. Regras para desenvolvimento por IA
1. **Prioridade:** usar tokens confirmados, depois componentes observados, depois propostas explicitamente rotuladas.
2. **Preservar a direção tipográfica:** Alexandria para display, Inter para corpo; evitar substituir sem justificativa.
3. **Aproveitar a paleta existente:** não inventar novos acentos globais. Cores específicas de cases pertencem aos próprios projetos.
4. **Composição:** manter hierarquia editorial e espaços de respiro, evitando interfaces excessivamente genéricas.
5. **Responsividade:** criar definições mobile/tablet a partir de testes, não reduzir uniformemente o desktop; valores mobile ainda não auditados.
6. **Interação:** implementar estados default/hover/focus-visible/active/disabled/loading com contraste adequado; estes estados são recomendações técnicas enquanto não inspecionados no produto.
7. **Acessibilidade:** navegação por teclado, rótulos, semântica HTML, preferências `prefers-reduced-motion`, contraste e alvo de toque adequados.
8. **Animações:** não inventar transições que contrariem o produto; respeitar pausa/redução de movimento.
9. **Não usar o avatar/memoji em materiais fora do site.**
10. **Não apresentar valores estimados como dados medidos.** Sinalizar sempre `observed`, `proposed`, ou `unverified`.

## 4.1 Padrões definidos pela Mariana durante a evolução do case Sicredi
Regras explícitas da Mariana (status: `approved-by-user`, aplicadas primeiro no case Sicredi):
- **Badges seletoras e seletores de conteúdo** (navegação de capítulos, abas de campanha, passos numerados) seguem o mesmo padrão da navegação de capítulos: formato pílula (ou círculo, para números), contorno verde-lima a ~58% de opacidade, texto `muted`; hover/foco com texto e contorno lima; estado ativo preenchido em lima com texto escuro e peso 700.
- **Mockups desktop** usam sempre a mesma moldura escura estilo Safari (`BrowserFrame`), sem variantes claras.
- **Títulos e subtítulos de seção** ocupam, no máximo, a largura do container de texto.
- **Seletores redundantes** (por exemplo, alternar desktop/mobile quando ambos já aparecem) devem ser evitados.

## 5. Tokens e implementação

### Direção das páginas de projetos · 04/11/2026

Consultar [Padrão visual das páginas de projetos](../docs/padrao-visual-cases.md). Mariana definiu abertura e fechamento consistentes, com narrativa interna adaptada a cada trabalho: hero com título, subtítulo, três highlights à esquerda e mockup/foto; ficha objetiva; resumo em Desafio / Minha contribuição / Caminho escolhido; navegação de capítulos e atalhos laterais; fundo mais escuro sem quadriculado a partir das tabs; fechamento “O que levo deste projeto”. O documento registra espaçamentos, critérios para cenas de uma viewport e contrato de dados para próximos projetos. Aplicação local concluída em Sicredi, LIVO, LWSA e no template de cadastrados via componentes compartilhados; publicação é uma etapa separada. Mockups ilustrativos são autorizados enquanto faltarem assets, com legenda explícita e sem atribuir essas aplicações ao trabalho entregue.
Consultar `02_DESIGN_TOKENS.json`. É um arquivo inicial com valores observados e nomes semânticos **propostos**, não um espelho de variáveis Figma. Ao implementar, converter os tokens para CSS custom properties e criar camada de componentes; não mapear `observedDesktop.heroFontSize` diretamente para todas as larguras.

## 6. Pendências para versão de produção
- Verificar o website publicado e rotas reais.
- Auditar CSS/DOM real e diferenças com o Figma.
- Capturar variantes mobile e tablet; definir breakpoints.
- Auditar contrastes específicos em contexto, hover/focus, estados de formulário e animações.
- Catalogar assets, logos, SVGs, fontes hospedadas, componentes de interação e comportamento do avatar.
- Definir tokens semânticos para tema claro/escuro e estados de erro/sucesso/alerta.

**Critério de qualidade:** antes de entregar novas páginas, comparar com frames de referência e registrar qualquer novo padrão adicionado ao sistema.
