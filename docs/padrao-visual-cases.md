# Padrão visual das páginas de projetos

Registro: 04/11/2026. Fonte: direcionamento da Mariana nesta conversa.

## Status e prioridade

As regras de estrutura abaixo foram solicitadas pela Mariana e orientam Sicredi, LIVO, LWSA e próximos cases. A implementação local já adapta as três páginas e o template de projetos cadastrados, usando o Sicredi existente como referência, conforme a confirmação de Mariana: três highlights no lado esquerdo. Isso não significa publicação no site de produção.

Este registro atualiza a direção visual de abertura descrita em `estrutura-cases-portfolio.md`. Preserva suas regras de evidência, autoria, confidencialidade e narrativa própria de cada projeto. Não substitui Alexandria, Inter ou as cores existentes.

## O que todos os cases compartilham

1. **Hero:** identificação do projeto, um título principal na formatação da referência e um subtítulo. Exatamente três highlights no lado esquerdo, como no Sicredi atual, acompanhando um mockup ou fotografia de destaque abaixo do título/subtítulo. Usar assets reais relacionados ao trabalho; quando ausentes, Mariana autorizou mockups ilustrativos identificados como tal. A imagem não deve competir com a leitura nem depender de hover para ser compreendida.
2. **Ficha do projeto:** manter papel, período, plataforma e escopo como informações objetivas, quando disponíveis. Cargo formal e contribuição efetiva não são sinônimos.
3. **Resumo de leitura rápida:** três blocos, com os rótulos **Desafio**, **Minha contribuição** e **Caminho escolhido**. “Minha contribuição” substitui “Meu papel” neste resumo narrativo; a ficha pode manter o cargo. Os textos devem explicar contexto, atuação própria e decisão sem repetir a ficha.
4. **Entrada dos capítulos:** navegação em pílulas, com a mesma linguagem de estados, comportamento sticky, indicação de capítulo ativo e tratamento visual da referência Sicredi. A partir dessa navegação, o fundo fica mais escuro e liso, sem grid quadriculado, incluindo os espaços entre seções.
5. **Navegação lateral:** acesso aos capítulos durante a leitura, sem interromper o conteúdo. Os atalhos devem levar às mesmas âncoras das pílulas e indicar a posição atual.
6. **Fechamento editorial:** seção **O que levo deste projeto**, com reflexão específica sobre o trabalho. Pode vir depois dos resultados, antes da navegação para o próximo case.

Não acrescentar efeitos sonoros por interpretação da expressão “ali em cima”: confirmar qualquer solicitação de áudio. Reutilizar o comportamento existente da navegação.

## O que continua próprio de cada case

- Nomes e quantidade de capítulos, sequência, artefatos, comparações, fluxos, evidências e maneira de explicar decisões.
- Pesquisa, branding, campanhas, auditoria, entrega ou gestão aparecem quando ajudam a entender aquele projeto. Não aplicar uma sequência fixa de Research/UX/UI.
- Roadmaps são opcionais. Não inventar métricas nem acrescentar highlights apenas para preencher um espaço.
- Mockups mantêm a linguagem do site; seu conteúdo e composição respondem ao projeto. Fotografias e aplicações de marca também podem ocupar a abertura.
- Sicredi, LIVO e LWSA não devem ter o miolo reescrito como efeito colateral de padronizar a abertura.

## Ritmo e espaçamento — base proposta para implementação

Os valores abaixo são uma proposta de engenharia para tornar o ritmo consistente, não medidas oficiais extraídas do Figma. Ajustar após comparar com o print e verificar o conteúdo real.

| Relação | Desktop | Mobile |
| --- | --- | --- |
| Título → subtítulo | 24–32 px | 16–24 px |
| Subtítulo → composição visual | 40–64 px | 28–40 px |
| Mockup/foto → ficha | 48–64 px | 32–40 px |
| Ficha → resumo em três blocos | 40–48 px | 28–32 px |
| Título de seção → introdução | 20–24 px | 16–20 px |
| Introdução → artefato ou evidência | 32–48 px | 24–32 px |
| Elementos relacionados no mesmo bloco | 16–24 px | 16–20 px |
| Entre capítulos comuns | 80–112 px | 48–64 px |

- Usar o container e as margens laterais existentes; alinhar títulos, texto e artefatos à mesma estrutura.
- Preferir espaços em múltiplos de 8 px. Um valor fluido pode variar entre os limites da tabela.
- Limitar parágrafos de leitura longa a cerca de 60–70 caracteres por linha. Não alargar um texto só para acompanhar a largura de uma imagem.
- Distinguir espaçamento dentro de um grupo e entre capítulos. Evitar somar padding de seção, margem do filho e gap para a mesma separação.
- Não alternar espaços enormes e blocos apertados sem um motivo editorial.

## Quando usar uma viewport

- Reservar cenas de aproximadamente uma viewport para uma decisão central, resultado importante, imagem principal, comparação ou artefato que mereça pausa na leitura.
- Nem toda seção deve ocupar uma viewport. Blocos curtos e transições mantêm altura de conteúdo.
- Usar `min-height`, não altura fixa que corte conteúdo. Considerar header e navegação sticky ao calcular a área útil e o destino das âncoras.
- Uma cena precisa acomodar título, explicação e evidência sem esconder sua conclusão. Se isso não couber, permitir altura natural.
- No mobile, em zoom e com texto ampliado, priorizar conteúdo e rolagem natural. Não impor uma viewport a diagramas, tabelas ou imagens longas.
- Sticky e scroll narrativo só entram quando ajudam a explicar um artefato. Manter pausa/redução de movimento e nunca exigir scroll extra para destravar a leitura.

## Navegação e responsividade

- Uma única fonte de capítulos deve alimentar as pílulas, os atalhos laterais, as âncoras e o estado ativo.
- Evitar sobreposição com header, chat, texto ou mockups. Em telas estreitas, recolher os atalhos laterais e manter a navegação horizontal acessível.
- Usar links reais, foco visível, rótulos acessíveis e `aria-current` para a seção atual.
- Highlights passam a um fluxo de leitura abaixo do subtítulo no mobile, sem texto sobreposto à imagem.
- O fundo liso começa no início da navegação de capítulos e segue até o fim do case; não modificar o footer global para resolver o fundo interno.

## Checklist antes de adaptar um case

1. Conferir a referência visual e manter exatamente três highlights à esquerda no desktop.
2. Inventariar conteúdo existente e assets publicáveis, sem fabricar fatos ou resultados.
3. Reutilizar ou extrair componentes de abertura, resumo e navegação; preservar o conteúdo e interações específicos do case.
4. Conferir desktop, mobile, âncoras, capítulo ativo, contraste e redução de movimento.
5. Registrar no histórico quais páginas foram adaptadas e quais seguem pendentes.

## Histórico

- **04/11/2026:** registrado o padrão solicitado de hero, ficha, resumo, navegação, fundo liso e reflexão final. Documentadas faixas iniciais de espaçamento e critérios de viewport. Highlights confirmados: três à esquerda, como no Sicredi atual. Aplicação visual pendente da referência da hero. Nenhuma página alterada neste registro.
- **04/11/2026 · implementação local:** aplicados `CaseHero`, `CaseOverview` e `CaseReading` em Sicredi, LIVO e LWSA. Preservados mockups, capítulos e interações próprios de Sicredi e LIVO. LWSA recebe composição ilustrativa provisória de identidade; não é uma aplicação real da marca. O template de projetos cadastrados herda o mesmo enquadramento, com fallback ilustrativo para imagem ausente ou inválida. Verificados desktop/mobile, âncoras sem sobreposição, capítulo ativo, ausência de overflow e build.

## Como implementar novos projetos

- Componentes compartilhados: `src/portfolio/CaseLayout.tsx`.
- Estilos compartilhados: `src/portfolio/case-layout.css`.
- Página padrão para dados cadastrados: `src/portfolio/StandardProjectCase.tsx`, utilizada pelo roteamento de `PublicCase`.
- Um case com interação específica pode ter um componente próprio (como Sicredi e LIVO), mas deve reutilizar a abertura, o resumo e a área de leitura em vez de copiar os estilos.
- Campos existentes (`title`, `subtitle`, `category`, `year`, `tags`, `description`, `image`) continuam funcionando. Uma imagem cadastrada válida substitui automaticamente o placeholder.
- Dados editoriais opcionais podem ampliar o objeto do projeto: `role`, `platform`, `chapters` e `caseDetails`. A implementação aceita esses dados; o formulário de cadastro não ganhou novos campos neste ajuste.
- `chapters` é uma lista de trios `[rótulo da tab, título da seção, texto]`. As âncoras e os atalhos laterais são derivados dessa única lista.
- `caseDetails` aceita `highlights` (exatamente três pares de destaque/explicação), `challenge`, `contribution`, `approach` e `reflection`. Textos ausentes ficam explicitamente em curadoria; não completar com resultados ou atribuições inventados.
- Sem highlights específicos, a abertura usa informações cadastradas de categoria, período e plataforma/foco. São metadados, não métricas inventadas.
- O miolo de um novo case pode substituir o renderer padrão sem perder o enquadramento compartilhado. Não forçar todo projeto a usar os mesmos métodos ou número de capítulos.

### Medidas usadas na implementação

- Título da hero: `clamp(38px, 4.8vw, 72px)`, entrelinha 1,12; no mobile, `clamp(31px, 7.5vw, 45px)`.
- Highlights + visual: duas colunas de proporção 0,65 / 2 no desktop; fluxo vertical no mobile.
- Fundo de leitura: `#14170f`, opaco e sem grid. Texto usa a paleta escura do site mesmo quando a hero está no tema claro.
- Tabs sticky: 78 px abaixo do topo no desktop, 66 px no mobile; âncoras consideram também a altura das tabs.
- Seções comuns: `clamp(64px, 6vw, 96px)` de padding vertical no template. Os cases existentes preservam o ritmo interno e as cenas especiais já construídas.
- Resultados da LWSA recebem destaque em área útil de viewport no desktop; no mobile a altura é natural. Nenhum case passa a travar o scroll apenas para seguir esse padrão.

### Mockups de telefone — padrão Android
Todos os telefones usam proporção externa 9:19,5 (mais estreita, conforme revisão da Mariana), acabamento verde-escuro (#303625), contorno interno preto fino e câmera circular central superior. Usar o componente compartilhado `AndroidStatus` para horário, notificação, sinal, Wi-Fi e bateria; estilos em `android-device.css`. Aplicável também aos cards e à conversa da seção de contato. Recortes da interface antiga devem continuar identificados como evidências parciais, mesmo quando apresentados em moldura mobile.


O telefone de contato preserva as dimensões, o corpo de conversa e a barra superior do layout original, com câmera circular central de Android no lugar do recorte de iPhone.


## LWSA — imagens e aplicações (2026-11-09)
- Base sincronizada com origin/main: 3003fe1.
- Recepção (FAC_1007) em Referências e pesquisa; notebook em uso (FAC_0691) em Marca e sistema em uso.
- Carrossel: equipe na portaria (FAC_0513), letreiro institucional (FAC_0975), site + Instagram exploráveis por scroll e kit de onboarding ilustrativo.
- Removido slide de formas/detalhes. Prints digitais preservados, telefone Android com câmera central e status. Navegação por teclado e scroll contido.
- Fotos exportadas a 1920x1280 para o site, originais preservados. FAC_0965 disponível como entrance.jpg para futura curadoria.
- Mockup gerado com ferramenta nativa image_gen; arquivo public/assets/cases/lwsa/onboarding.png. Conceito ilustrativo, não registro fotográfico de entrega real.
- Prompt: fotografia editorial natural 3:2 de kit LWSA sobre mesa de carvalho, caderno azul-marinho com elástico, caneta preta, notebook Dell, mochila de tecido, cordão/crachá e caneca institucional; luz de janela, texturas reais, disposição cotidiana, sem aparência de render 3D.
- Validação: TypeScript, build web, desktop 1440px e mobile 390px; sem overflow horizontal.
