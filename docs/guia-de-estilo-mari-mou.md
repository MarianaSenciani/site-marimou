# Mari Mou — guia de identidade visual e estilos do site

**Versão 0.2 · 02/10/2026**
**Natureza:** registro da linguagem visual apresentada no portfólio, com recomendações para desenvolver a identidade de marca.
**Escopo:** estilo e expressão de marca, seguidos de um inventário dos valores e padrões de interface implementados no site público e no painel local. Os valores são um retrato da implementação atual; ainda não formam uma biblioteca de design system aprovada.

> **Como ler:** “Em uso” descreve algo verificável no site e em seus arquivos. “Diretriz sugerida” traduz esse repertório para outras peças da marca; ainda não é uma decisão oficial da Mariana. As imagens dos projetos têm identidades próprias e não definem a paleta da Mari Mou.

**Navegação:** a [Parte I](#1-a-ideia-visual-da-marca) reúne a linguagem de marca; a [Parte II](#parte-ii--inventário-de-estilos-implementados) documenta cores, tipografia, medidas, componentes e estados encontrados no CSS. O inventário registra o código como está, inclusive variações que ainda precisam ser consolidadas.

## 1. A ideia visual da marca

**Em uso:** a apresentação combina as frases “Design com intenção. E personalidade.”, “Transformo ideias em experiências que conectam pessoas e marcas” e “Estratégia + expressão”. A linguagem visual sustenta essa combinação: estrutura editorial precisa, presença humana e um acento cromático enérgico.

**Diretriz sugerida:** a Mari Mou pode ocupar o encontro entre **clareza estratégica** e **expressão autoral**. A marca deve transmitir competência sem parecer fria, criatividade sem perder foco e proximidade sem perder critério.

Palavras que descrevem a atmosfera atual: **curiosa, confiante, calorosa, contemporânea, gráfica, direta e um pouco irreverente**. A referência não é uma estética corporativa neutra nem uma composição ornamental excessiva. O impacto vem de poucos elementos fortes, bem organizados.

## 2. Assinatura e logotipo

**Em uso:** a assinatura principal é um *wordmark* textual em caixa baixa: **mari** em peso forte + **mou** em peso leve, sem espaço entre as palavras, seguido do símbolo **✳** em verde lima. A família é Alexandria. O contraste de pesos ajuda a leitura das duas partes do nome sem quebrar a unidade da assinatura.

- Grafia exibida: `marimou ✳`.
- Forma: letras arredondadas, contemporâneas e compactas; a assinatura permanece horizontal.
- Cor habitual: letras em marfim claro sobre fundo escuro; símbolo em lima.
- Personalidade do símbolo: estrela ou asterisco de oito pontas, com energia de ideia, faísca e expansão. Ele reaparece como detalhe gráfico em outras áreas.

**Diretriz sugerida:** manter a caixa baixa, a alternância de peso e o asterisco como características reconhecíveis. Preservar uma área livre em torno da assinatura; evitar aproximá-la de grafismos que disputem o papel do símbolo. Em reduções muito pequenas, avaliar uma versão simplificada em vez de comprimir os detalhes.

**Ponto a resolver antes de produzir arquivos oficiais:** o wordmark ainda é composto por fonte e caractere no site; não há, neste projeto, um arquivo vetorial final da assinatura com desenho, espaçamentos, área de proteção, tamanho mínimo e versões aprovadas. O [favicon atual](../public/favicon.svg) usa um **“m” geométrico em um quadrado lima**, diferente da assinatura `marimou ✳`. Essa diferença deve ser decidida no projeto de identidade, não tratada como uma equivalência automática.

## 3. Paleta cromática

### Núcleo da marca em uso

| Cor | Valor observado | Leitura visual e papel na identidade |
| --- | --- | --- |
| Verde quase preto | `#1B1D15` | Base escura, orgânica e editorial. Dá profundidade e faz os elementos claros respirarem. |
| Lima | `#BDDB42` | Acento de energia e reconhecimento. Aparece em títulos de grande impacto, símbolo, sinais e ênfases. |
| Marfim | `#F2F1E8` | Claro quente para letras e contraste; evita a dureza do branco puro. |
| Cinza oliva | `#A3A699` | Plano de apoio para textos e informações menos enfáticas. |

### Tons de apoio observados

| Cor | Valor observado | Uso visual percebido |
| --- | --- | --- |
| Verde escuro elevado | `#252B1B` | Variação de profundidade dentro da família do fundo. |
| Verde claro acinzentado | `#D0D7BD` | Clareza suave, próxima do marfim, com temperatura vegetal. |
| Lima mais claro | `#D0EC63` | Variação luminosa do acento principal. |

O sistema cromático é **quente apesar de escuro**: o preto tem verde, o branco tem marfim e os cinzas têm oliva. A cor lima funciona melhor quando há bastante área escura ou neutra em volta. O site também utiliza linhas verde oliva em baixa opacidade, que dão textura sem virar uma segunda cor dominante.

**Diretriz sugerida:** para peças novas, começar pela combinação verde quase preto + marfim e usar o lima para criar um ponto de atenção claro. Quando a peça pedir uma versão clara, inverter a relação com cuidado e testar a leitura; a versão clara ainda não está estabelecida como padrão da marca. Evitar substituir o núcleo por preto absoluto, branco azulado ou verde neon, pois isso muda a temperatura observada.

**Não confundir com a paleta da marca:** roxo, azul, amarelo, bege e outros tons fortes vistos nos mockups pertencem aos cases exibidos. O bordô do cabelo do memoji também pertence ao retrato da personagem. Eles podem coexistir com a Mari Mou como conteúdo visual, mas não estão definidos como cores institucionais.

## 4. Tipografia

**Em uso:** o site carrega [Alexandria](https://fonts.google.com/specimen/Alexandria) nos pesos 300 a 800 e [Inter](https://fonts.google.com/specimen/Inter) nos pesos 400 a 700. A primeira constrói a voz visual; a segunda sustenta a leitura longa e os detalhes informativos.

| Família | Função expressiva | Características observadas |
| --- | --- | --- |
| **Alexandria** | Assinatura, grandes chamadas e títulos | Geométrica e arredondada; pesos contrastantes; espaçamento entre letras apertado nos títulos para criar massa gráfica. |
| **Inter** | Texto de leitura, frases de apoio, rótulos e legendas | Desenho neutro e legível; oferece pausa visual à expressividade dos títulos. |

O título de abertura usa Alexandria em peso muito forte, caixa alta, escala ampla e letras próximas. Outros títulos usam pesos médios ou semipesados, também com espaçamento ligeiramente condensado. Textos corridos ganham entrelinha mais aberta. Pequenos rótulos aparecem em **caixa alta com letras espaçadas**, lembrando identificação editorial e créditos.

**Diretriz sugerida:** construir hierarquia por contraste de escala e peso, não por muitas fontes. Reservar a caixa alta compacta para mensagens curtas de alto impacto; usá-la em parágrafos longos enfraqueceria a leitura. Manter texto de apoio sereno e com espaço suficiente. Georgia aparece pontualmente em assinaturas de marcas exibidas no portfólio e **não** compõe a tipografia principal da Mari Mou.

## 5. Composição e espaço

**Em uso:** as páginas combinam uma estrutura de grid fino com intervenções expressivas: tipografia muito grande, imagem central sobreposta ao título, áreas vazias generosas, linhas divisórias discretas e blocos de informação bem alinhados. A composição mistura ordem com um pouco de surpresa.

O grid do fundo é regular e pouco contrastado. Ele sugere método, projeto e construção, sem competir com o conteúdo. Círculos, órbitas e contornos finos acrescentam uma camada de exploração. Fotografias e mockups ocupam áreas amplas; a página evita ornamentação em todas as partes ao mesmo tempo.

**Diretriz sugerida:** em outras mídias, preservar essa relação entre **estrutura e gesto**. Escolher um elemento dominante por peça — uma frase, uma imagem ou um sinal — e dar espaço ao redor. Permitir sobreposições deliberadas quando melhorarem a energia da composição, mas não sacrificar a legibilidade. Usar margens e alinhamentos consistentes como contrapeso para os elementos mais soltos.

## 6. Grafismos e iconografia

**Em uso:** o **✳** é o sinal gráfico mais característico. Há também linhas finas, divisórias, círculos orbitais, setas diagonais e ícones lineares. A linguagem evita ilustrações planas genéricas; prefere símbolos simples que parecem marcações de processo ou indicação de movimento.

**Diretriz sugerida:** usar o asterisco com parcimônia como assinatura ou ponto de energia. Linhas e órbitas podem sugerir conexão, pesquisa e descoberta, desde que permaneçam secundárias. Preservar traços simples e coerentes entre ícones. Não misturar indiscriminadamente emojis, ícones sólidos e ícones lineares em uma mesma peça de marca.

## 7. Retrato, fotografia e imagens

**Em uso:** o portfólio apresenta uma [fotografia recortada de Mariana](../public/assets/mariana.png) e um [memoji frontal de cabelos bordô](../public/assets/memoji/center-portrait.png). O memoji está **estático** na hero nesta versão. A coexistência dos dois registros cria uma marca pessoal que alterna presença real e expressão lúdica.

As imagens de processo usam mesa de trabalho, papéis, referências, telas, plantas, superfícies materiais e luz quente. Isso reforça a ideia de trabalho cuidadoso e exploratório. Os mockups de projetos mostram linguagens distintas para evidenciar variedade de atuação.

**Diretriz sugerida:** favorecer imagens com presença humana, materiais reconhecíveis, luz natural ou de estúdio suave e detalhes de criação. O memoji pode funcionar como personagem da marca, mas deve manter traços e proporções consistentes entre aplicações. Evitar representá-lo como se fosse uma fotografia documental.

**Limite importante:** as pranchas de [mockups de projetos](../public/assets/project-mockups.png) e [momentos de processo](../public/assets/process-moments.png) são imagens conceituais geradas para o site. Não comprovam entregas, clientes ou bastidores reais. Em uma identidade ou apresentação institucional, identificá-las como imagens ilustrativas quando houver risco de interpretação factual.

## 8. Linguagem verbal

**Em uso:** a voz se apresenta em primeira pessoa, com frases curtas e convites diretos. Exemplos do site: “Oi, sou a Mari”, “Vem ver meu trabalho”, “Vamos criar algo que importa?” e “Feito com intenção, curiosidade e café.” Há uma combinação de profissionalismo com informalidade humana.

**Diretriz sugerida:** escrever como uma pessoa que pensa junto e faz acontecer. Preferir verbos concretos, curiosidade e clareza. O tom pode ter leveza e personalidade, sem recorrer a jargão excessivo, promessas grandiosas ou frases abstratas sem evidência. Manter o nome profissional “Mariana Senciani” disponível em contextos formais; “Mari Mou” funciona como assinatura mais próxima.

## 9. Ritmo e movimento visual

**Em uso:** o site usa transições discretas, revelações e deslocamentos suaves em outras áreas. O memoji da hero está temporariamente estático. A sensação geral é viva, mas a identidade continua reconhecível em uma peça parada.

**Diretriz sugerida:** se a marca ganhar movimento em outras mídias, ele deve servir ao conteúdo: entradas simples, ritmo fluido, pausas legíveis e poucos focos simultâneos. Evitar movimentos abruptos, cintilações e efeitos que deixem o rosto ou a assinatura visual instáveis. Uma versão estática deve sempre funcionar sozinha.

## 10. Critérios para avaliar novas peças

Uma aplicação parece pertencer à Mari Mou quando:

1. Existe uma hierarquia clara entre uma mensagem forte e seus apoios.
2. Alexandria e Inter trabalham juntas, com personalidade no título e tranquilidade na leitura.
3. O verde quase preto, o marfim e o lima mantêm a temperatura da marca.
4. A composição tem ordem suficiente para transmitir método e liberdade suficiente para transmitir criação.
5. O asterisco e os grafismos aparecem com propósito, sem excesso.
6. Fotos, retratos e projetos são apresentados pelo que realmente são.
7. A voz soa próxima, segura e específica.

## 11. Decisões pendentes para um guia oficial

- Desenhar e aprovar arquivos vetoriais do logotipo e definir suas variações.
- Decidir a relação entre o wordmark com ✳ e o favicon com “m”.
- Validar paleta em aplicações impressas, versão clara e diferentes suportes.
- Definir usos e limites do memoji como personagem da marca.
- Aprovar exemplos reais de fotografia, tratamento de cor e enquadramento.
- Testar legibilidade e contraste das combinações em cada mídia.
- Formalizar regras de área de proteção e tamanho mínimo após finalizar o logotipo.

**Fontes deste registro:** [estilos do portfólio](../src/portfolio/portfolio.css), [estrutura e textos visíveis](../src/portfolio/PortfolioSite.jsx), [carregamento das fontes](../index.html), [favicon](../public/favicon.svg) e arquivos de imagem citados acima. O documento descreve o estado local do projeto em 02/10/2026; propostas de evolução estão identificadas como diretrizes sugeridas.

---

# Parte II — inventário de estilos implementados

Esta parte registra **valores reais do código** para apoiar um futuro design system. Há regras antigas, exceções locais e ajustes responsivos que se sobrepõem. Por isso, um valor abaixo deve ser entendido dentro do escopo e do seletor indicados. A folha [portfolio.css](../src/portfolio/portfolio.css) é a referência do site público; [admin.css](../src/admin/admin.css) acrescenta as regras do painel. A folha [index.css](../src/index.css) contém utilitários globais e propostas anteriores de fundo claro; sua mera presença no repositório não faz desses estilos o padrão visual atual do portfólio.

## 12. Cores como variáveis existentes

| Variável CSS | Valor | Alcance e função atuais |
| --- | --- | --- |
| `--lime` | `#bddb42` | Acento do site público; contraste, ênfase e estados ativos. |
| `--dark` | `#1b1d15` | Fundo principal e texto escuro sobre o lima. |
| `--ivory` | `#f2f1e8` | Texto principal no tema escuro. |
| `--muted` | `#a3a699` | Texto de apoio. |
| `--hairline` | `rgba(190, 211, 131, .17)` | Linhas divisórias discretas. |
| `--admin-line` | `rgba(189, 219, 66, .18)` | Linha de separação do painel local. |
| `--admin-muted` | `#a3a699` | Texto secundário do painel local. |

O portfólio usa outras cores **locais**, que não foram promovidas a variáveis globais:

| Contexto | Valor em uso | Observação |
| --- | --- | --- |
| Lima claro | `#d0ec63` | Variação mais clara em interação. |
| Fundo elevado | `#252b1b` e variações próximas | Superfícies internas, com valores diferentes conforme a área. |
| Texto escuro sobre lima | `#1b1d15` e `#4a591f` | O segundo tom aparece na chamada do rodapé. |
| Fundo dos campos do painel | `#151a13` | Contraste interno dentro do tema escuro. |
| Mensagem de erro no painel | fundo `#7a32242b`, borda `#ce766777`, texto `#ffc7bc` | Cor semântica local; ainda não há paleta semântica geral definida. |

**Inversão importante da identidade:** o rodapé é um campo amplo de `#bddb42` com texto escuro. Essa composição mostra que o lima pode ser protagonista de uma área inteira, além de funcionar como acento no tema escuro. Antes de converter as cores em tokens semânticos formais, testar contraste em cada par de texto e fundo.

## 13. Fontes e hierarquia tipográfica do site

O [carregamento de fontes](../index.html) solicita **Alexandria 300–800** e **Inter 400, 450, 500, 600 e 700** ao Google Fonts. No portfólio, Alexandria é a família dos títulos e do wordmark; Inter é a família-base da interface e do corpo. Se as fontes não carregarem, o CSS recorre a `sans-serif`.

| Estilo observado | Família e peso | Medidas no código |
| --- | --- | --- |
| Grande chamada da hero | Alexandria 800 | `clamp(44px, 12.2vw, 174px)` na regra fluida final; entrelinha `1.02`; entreletras `-.065em`; caixa alta. |
| Chamada de contato no rodapé | Alexandria 500 | `clamp(42px, 6.4vw, 92px)` antes dos ajustes móveis; entrelinha `1.13`; entreletras `-.07em`. |
| Títulos gerais | Alexandria 500 | Entrelinha `1.2`; entreletras `-.045em` como base do portfólio. Tamanhos variam por contexto. |
| Título de página interna | Alexandria | Em desktop, `clamp(42px, 5.3vw, 77px)` em páginas de conteúdo; outros contextos usam escalas próprias. |
| Chamada de introdução da hero | Alexandria 600 | `clamp(17px, 1.61vw, 22px)` na regra fluida. |
| Corpo base da hero | Inter | Variável local `--body-size: clamp(11px, .966vw, 13px)`; parágrafos do portfólio têm entrelinha padrão `1.65`. |
| Rótulo editorial | Inter 500 | Base de `10px/1.5`, caixa alta frequente, entreletras `.15em`. |
| Wordmark | Alexandria 700 + 300 | `mari` forte, `mou` leve, entreletras `-1.6px` na regra base; tamanho fluido `clamp(24px, 2.174vw, 30px)`. |

No painel, os títulos continuam em Alexandria com entreletras `-.055em` e entrelinha `1.12`, enquanto campos, ações e informações usam Inter. A página não possui uma escala tipográfica única e centralizada: há valores definidos por seletor, com revisões responsivas posteriores. Para o futuro design system, primeiro agrupar estilos equivalentes e resolver exceções; copiar todos os tamanhos como tokens independentes perpetuaria essa fragmentação.

## 14. Espaço, largura e escala fluida

Dentro de `.portfolio-site`, os valores abaixo são **variáveis CSS ativas**:

| Variável | Valor em desktop | Papel atual |
| --- | --- | --- |
| `--page-padding` | `clamp(20px, 4.51vw, 72px)` | Respiro lateral da página. |
| `--space-sm` | `clamp(10px, 1.05vw, 16px)` | Ajuste de espaçamento de pequena escala. |
| `--space-md` | `clamp(18px, 2.5vw, 36px)` | Espaçamento intermediário. |
| `--space-lg` | `clamp(28px, 3.18vw, 46px)` | Espaçamento amplo. |
| `--head-size` | `clamp(336px, 33.82vw, 450px)` | Tamanho visual do memoji na hero. |
| `--body-size` | `clamp(11px, .966vw, 13px)` | Texto de apoio da hero. |
| `--button-size` | `clamp(10px, .966vw, 13px)` | Texto de uma ação destacada na hero. |

A largura de leitura principal é `min(1280px, calc(100% - 2 * var(--page-padding)))`. Há composições mais estreitas dentro dela e exceções para carrosséis, fotografias e áreas imersivas. No mobile, a página redefine `--page-padding` para `clamp(20px, 4.51vw, 34px)` e `--head-size` para `clamp(270px, 70vw, 340px)`.

**Atenção ao escopo:** [index.css](../src/index.css) também declara `--space-xs` a `--space-3xl` com números fixos (`4, 8, 16, 24, 40, 64, 96px`). Algumas variáveis de mesmo nome são redefinidas dentro de `.portfolio-site`. Este guia registra as duas camadas porque ainda não existe uma única escala de espaço consolidada.

## 15. Grid, superfícies e profundidade

- **Fundo principal:** `#1b1d15`, com linhas horizontais e verticais em `rgba(161, 178, 94, .065)`. A grade original usa passo de `54px`; a regra fluida posterior ajusta para `clamp(40px, 4.35vw, 60px)`.
- **Painel local:** mesmo fundo escuro, grade em `rgba(161, 178, 94, .055)` e passo de `54px`.
- **Separadores:** linhas finas e translúcidas, normalmente em verde oliva. Não são faixas de alto contraste.
- **Superfícies elevadas:** verdes escuros próximos ao fundo, com borda oliva discreta; algumas usam transparência e desfoque de fundo.
- **Imagens de projeto:** preenchem áreas amplas e podem receber uma sombra escura degradê para a legenda continuar legível. O degradê atua sobre a imagem, não substitui a paleta da marca.
- **Rodapé:** inversão para lima pleno. Seu título é grande e escuro; o wordmark também fica escuro nessa superfície.

O fundo com grade comunica construção e método. Já os painéis e contornos não têm uma elevação padronizada: o site combina bordas, contraste de tom e sombras pontuais. Ao sistematizar, separar o que é **estrutura recorrente** do que é **composição específica de uma seção**.

## 16. Bordas, formas e sombras

| Padrão recorrente | Valores observados | Leitura visual |
| --- | --- | --- |
| Cápsula | `40px`, `50px`, `100px` ou `border-radius: 100px` conforme o caso | Elementos curtos e convidativos. |
| Círculo | `50%` | Sinais, setas e controles iconográficos. |
| Cartão compacto | `9px` a `14px` | Imagens e itens menores. |
| Painel amplo | `16px`, `18px` ou `24px` | Agrupamento de conteúdo sem rigidez excessiva. |
| Linha delicada | `1px solid` com oliva translúcido | Separa sem dividir visualmente a experiência. |

As sombras são discretas e não definem todas as superfícies. Em alguns momentos há `backdrop-filter: blur(...)`, que dá profundidade sobre fundos com conteúdo. Esses valores são **recorrências do CSS**, não uma escala oficial de raio ou elevação.

## 17. Tipos de ação e linguagem de botões

O padrão dominante é a **cápsula**: contorno muito arredondado, texto curto em Inter com peso aproximado de 600 e, muitas vezes, um ícone de seta ou download. O site público implementa estes tipos:

| Tipo em uso | Aparência | Contexto ilustrativo |
| --- | --- | --- |
| Ação preenchida `pill primary` | Fundo lima, texto verde quase preto. Base `15px 23px` de preenchimento, `12px` de texto, raio `100px`; o tamanho da hero recebe ajuste fluido. | Download do currículo e chamadas de destaque. |
| Ação contornada `pill outline` | Fundo transparente, borda oliva clara semitransparente, texto marfim. | Contato no cabeçalho e apresentação pessoal. |
| Link de texto `text-link` | Texto sem cápsula, seta ao lado; na hero pode receber uma linha inferior fina. | Navegação editorial e continuidade de leitura. |
| Controle circular `icon-button` | Círculo de `38px`, borda fina, fundo escuro e ícone lima. | Menu compacto e controle de movimento. |
| Seleção em cápsula | Contorno oliva em repouso; quando selecionada, fundo lima e texto escuro. | Filtros de projetos e abas de processo. |

O hover da cápsula desloca o elemento `3px` para cima; o preenchimento lima clareia para `#d0ec63`. O botão contornado recebe uma película lima translúcida. Links com seta deslocam o ícone `3px` para a direita e `2px` para cima. Essas interações são curtas e contidas. Botões não devem depender só da cor para explicar sua função: rótulo, forma e contexto continuam importantes.

No **painel local**, o mesmo vocabulário aparece em três variações: `admin-button-primary` preenchido, `admin-button-outline` contornado e `admin-button-text` textual. A base usa Inter 600 em `11px`, preenchimento `12px 17px` e raio `40px`. O painel reduz opacidade de ações desabilitadas para `.45`.

## 18. Outros padrões visuais de interface

| Padrão | Implementação observada |
| --- | --- |
| Navegação principal | Inter pequeno, espaçamento regular entre itens; hover e página atual recebem lima. |
| Tarjas e rótulos | Inter pequeno, caixa alta e espaçamento aberto entre letras. |
| Cartões de projeto | Imagem em destaque, cantos por volta de `13px` no desktop e `9px` no mobile, legenda sobre degradê escuro e seta circular. |
| Grade de projetos | Duas colunas com vão de `26px` em desktop; uma coluna no mobile. |
| Área de especialidades | Imagem ao fundo escurecida; títulos inativos em oliva esmaecido e título ativo em lima. |
| Lista de processo | Blocos verde escuro, borda sutil, números pequenos em círculos e expansão com imagem de processo. |
| Etiquetas | Texto pequeno em cápsulas com fundo ou contorno suave; não competem com o título. |
| Campos do painel | Fundo `#151a13`, borda oliva `#8a9d6570`, raio `9px`, texto marfim, Inter `11px`; borda lima no foco. |
| Mensagens do painel | Confirmação em verde suave; erro em tons terrosos avermelhados. |

Essa tabela é um **inventário do que existe**. O futuro design system ainda precisará definir quais padrões são compartilhados entre site público e painel, quais são variantes e quais são decisões locais de página.

## 19. Movimento, foco e legibilidade

- **Transições locais:** em geral de `.2s` a `.4s`, com alguns movimentos de imagens em `.7s` e mudança de cena em `.75s`.
- **Ritmo contínuo:** faixas de marcas e projetos se deslocam devagar; as faixas de projeto têm revisões posteriores de `180s` e `210s` por ciclo. As faixas de projeto pausam em hover ou foco dentro da área; a faixa de marcas pausa em hover.
- **Foco visível:** no site público, contorno lima de `2px` com afastamento de `6px` em links e botões; no painel local, o afastamento é `3px`.
- **Seleção de texto:** fundo lima com texto escuro.
- **Preferência por movimento reduzido:** as animações e transições do portfólio são desativadas por CSS, os carrosséis ficam acessíveis por rolagem e os controles de movimento são ocultos.
- **Ponteiro:** o desktop usa um cursor personalizado em lima com contorno escuro; ponteiros de toque mantêm o cursor padrão.
- **Personagem:** o memoji da hero está estático neste estado do projeto. Os arquivos de animação antigos foram preservados para estudo, sem compor a experiência ativa.

Movimento é um recurso de ritmo, não um requisito para reconhecer a marca. A composição deve permanecer compreensível em captura estática, toque e preferência por movimento reduzido.

## 20. Adaptação de layout observada

O CSS contém ajustes em `1100px` e `760px`, uma proteção adicional para telas de até `350px` e um ajuste de título a partir de `1600px`. A hero do desktop distribui texto, personagem e ação lateralmente; em até `760px`, empilha personagem, introdução e ação. A grade de trabalhos passa de duas colunas a uma, e tipografia, respiros e tamanho do personagem usam `clamp(...)` para variar de forma contínua.

Esses números descrevem o comportamento **do site atual**. Um futuro design system deve escolher breakpoints por necessidades reais de conteúdo e componentes, e não pressupor que cada valor de página se torne uma regra universal.

## 21. Pontos a consolidar antes de chamar isto de design system

1. Resolver a diferença entre os valores globais de [index.css](../src/index.css) e as variáveis locais de [portfolio.css](../src/portfolio/portfolio.css).
2. Transformar a paleta principal e os estados de erro/sucesso em nomes semânticos, após validar contraste.
3. Reduzir exceções de tamanho de fonte, raio e espaçamento sem perder a hierarquia expressiva.
4. Formalizar variantes das ações preenchidas, contornadas, textuais, circulares e de seleção.
5. Definir estados mínimos por variante: repouso, hover, foco, pressionado, desabilitado e carregamento quando aplicável.
6. Decidir se o painel local seguirá exatamente a mesma escala ou terá uma camada de densidade própria.
7. Produzir exemplos aprovados de uso correto e incorreto para logotipo, imagem e cores.
