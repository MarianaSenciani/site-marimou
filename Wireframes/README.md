# Wireframes do portfólio

Protótipos de média fidelidade para discutir estrutura, conteúdo e interações. **Não são páginas publicadas do site.**

| Página | Arquivo |
| --- | --- |
| Home | [wireframe-home-product-portfolio.html](wireframe-home-product-portfolio.html) |
| Projetos | [wireframe-projetos-product-portfolio.html](wireframe-projetos-product-portfolio.html) |
| Case Sicredi | [wireframe-case-sicredi.html](wireframe-case-sicredi.html) |
| Case LWSA | [wireframe-case-lwsa.html](wireframe-case-lwsa.html) |
| Case LIVO | [wireframe-case-livo.html](wireframe-case-livo.html) |
| Sobre mim | [wireframe-sobre-product-portfolio.html](wireframe-sobre-product-portfolio.html) |

Os arquivos HTML têm links relativos entre si e podem ser abertos a partir desta pasta. A Home contém um seletor temporário no header para comparar três propostas de hero: editorial, decisões de produto e perfil rápido. O índice apresenta três cards; cada um abre somente o seu case. O contexto e as decisões de conteúdo estão em [ideacao-reposicionamento-portfolio.md](../docs/ideacao-reposicionamento-portfolio.md). Os recortes e perguntas para completar os três cases estão em [estrutura-cases-portfolio.md](../docs/estrutura-cases-portfolio.md). Estes wireframes são propostas de layout, não conteúdo publicado.

Os arquivos vetoriais necessários para as interações da home estão listados em [ASSETS-ANIMACOES.md](ASSETS-ANIMACOES.md). Cinco prompts para explorar o layout do crachá antes da vetorização estão em [PROMPTS-CRACHA.md](PROMPTS-CRACHA.md). No wireframe, duas puxadas levantam o cartão frontal e revelam o espaço reservado ao QR do WhatsApp; o código ainda é ilustrativo.

Na Home, faixas animadas fazem a passagem entre a hero e os projetos, exibindo etapas do processo e marcas da trajetória. As linhas divisórias retas visíveis nos demais trechos servem apenas para separar blocos neste wireframe: **não fazem parte da direção visual desejada para o site final**.

## Ajustes do site — 11/10/2026

As decisões abaixo substituem as propostas anteriores de interação na Home do site:

- Faixas removidas por enquanto; cada gesto vertical avança uma seção. Seções longas preservam a leitura do conteúdo, e gestos horizontais dos cards e o scroll do chat continuam independentes.
- Brilho menor e preso à posição do cursor, sem mola; linhas do grid iluminadas ao redor dele.
- Hero 1 mantém “Oi, sou a Mari” e a personagem central. Textos laterais mais baixos, sem os rótulos introdutórios; ferramentas distribuídas ao redor da personagem.
- Títulos recebem sublinhado verde no hover; “decisões” ganha cor e movimento. CTAs principais usam botão verde com texto em bold, sem animação por letra.
- Processo sem números: wireframe montado por partes; barras surgem antes da linha ascendente; linhas conectam os cards conforme o hover ou foco avança.
- Crachá revela o QR com uma puxada. Cordão vetorial verde, com estrelas verde-escuras, alongado para vir de fora da viewport. Removidos o painel interno com texto, o aviso visual de QR provisório e o botão de repetir. O QR continua ilustrativo até receber o link definitivo.
- “Pergunte à Mari”: o próprio círculo se expande e mostra o texto à direita do retrato; conversa abre ao clicar. Superfícies translúcidas com glassmorphism discreto.
- Logo da empresa junto à foto do autor da recomendação. Fundo e organização do footer mantidos.

Atualização do crachá: os novos SVGs de Assets/Cracha substituem as artes anteriores. Há um único cartão com frente e verso; puxar e soltar alterna as faces com giro de 180° no eixo vertical. A presilha e o cordão continuam conectados. O espaço do verso mantém o QR ilustrativo até receber o link definitivo. As margens das exportações são ajustadas apenas nas cópias públicas, sem alterar os originais.
