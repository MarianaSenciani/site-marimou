# Site final · integração dos wireframes

Atualizado em 10/10/2026. Implementação local, sem publicação.

## Estrutura

React + Vite, Tailwind e TypeScript convivem com os módulos JSX existentes. `tsconfig.json` e Vite resolvem `@/` para `src/`. `components.json` configura o shadcn para `src/components/ui`: é a pasta de componentes reutilizáveis, separada das páginas do portfólio. Não é necessário recriar o projeto pelo CLI.

- `src/portfolio/PortfolioExperience.tsx`: composição, rotas, preferências, movimento reduzido.
- `HeroExperience.tsx`: três alternativas de hero e ferramentas interativas.
- `BadgeExperience.tsx`: cordão, queda, arraste e abertura após duas puxadas.
- `HomeSections.tsx`, `AboutExperience.tsx`, `PublicProjects.tsx`: páginas públicas.
- `case-studies.ts`: narrativa pública dos três cases, sem relatórios privados.
- `experience.css`: aplicação do estilo e responsividade.
- `src/components/ui/word-pull-up.tsx`: títulos revelados palavra a palavra ao entrar na tela.
- `src/components/ui/bubble-text.tsx`: peso e deslocamento suave de letras no hover.

O seletor temporário **Hero 1/3** permanece no header. As opções Editorial, Decisões e Perfil possuem composição e texto próprios. Tema e idioma são guardados no navegador. A primeira hero é a opção inicial a cada abertura da home; o seletor permite comparar as três opções durante a visita.

## Movimento e controles

- As entradas de títulos e blocos recomeçam quando entram na tela, sem bloquear a rolagem.
- Memoji: imagem original estática com inclinação suave no hover/toque; ainda não contém animação facial de piscar ou sorrir.
- Ferramentas: GitHub usa o modelo OBJ/MTL fornecido. Claude, Figma, Creative Cloud e Cursor usam imagens provisórias até a chegada dos assets definitivos. O modelo é carregado sob demanda e para fora da tela. Textos de uso aparecem no ponteiro, foco ou toque.
- Faixas animadas mostram processo e empresas; não há divisórias horizontais entre seções.
- Crachá: SVGs originais em camadas, cordão com curva acompanhando o arraste e retorno por mola. A entrada se repete após sair e voltar à seção, com espera de 500 ms ao descer. Duas puxadas viram a frente para cima. Enter/Espaço oferecem uma alternativa ao arraste. O comportamento é uma aproximação física por molas, não uma simulação 3D rígida completa.
- Fotos: arraste horizontal em ambos os sentidos; setas do teclado também funcionam quando o cartão está em foco.
- Chat: aparece quando a hero sai da tela, abre por hover ou clique/toque e fecha com Escape. Possui quatro grupos (Geral, Cases, Currículo e Redes), com dez perguntas por grupo. Mostra três sugestões por vez e permite alternar pelo controle “Outras perguntas”. Desktop permite redimensionar e ampliar.
- Movimento reduzido do sistema e controle de pausa desativam animações decorativas. Nenhuma informação depende delas.

## Componente externo

Instalado pelo shadcn a partir de `https://brunodelorence.com/r/streaming-text.json`. Código em `src/components/streaming-text/`; licença MIT original preservada em `LICENSE` nessa pasta. Adaptado às cores/fontes do site, React 18, textos de controles PT/EN/ES, streaming sob demanda e pausa. Usado nas respostas do chat, sem execução automática em loop.

## Assets e pendências explícitas

Os originais em `Assets/` foram preservados. Cópias servidas pelo site ficam em `public/assets/badge/`, `public/assets/tools-3d/` e `public/assets/memoji-neutral.png`.

- QR continua ilustrativo, sem número de WhatsApp; o link do rodapé é genérico, conforme combinado.
- Chat usa respostas locais guiadas, não uma IA conectada às fontes. Não envia conversas para um serviço externo.
- Banners dos cases ainda são composições tipográficas provisórias, prontas para receber capas definitivas.
- A galeria tem um retrato real e cartões editoriais para os capítulos restantes, aguardando fotos escolhidas pela Mariana.
- Interface, heros e chat têm PT/EN/ES. A narrativa longa dos cases e os registros da linha do tempo permanecem em português e precisam de tradução editorial antes de anunciar o site como inteiramente trilíngue.
- Os três cases curados vivem no código. O painel local continua separado; sua edição ainda não controla esse novo conteúdo curado. Integração com CMS/admin publicado fica para etapa posterior.

## Verificação e prévia

```sh
npm install
npm run dev
npm run typecheck
npm run build
node scripts/verify-experience.mjs
node scripts/verify-production.mjs
```

Prévia: `http://localhost:3000/`. Os testes de interação usam Microsoft Edge local (ou Chromium instalado pelo Playwright) e salvam capturas em `tmp/experience-qa/`, ignorada pelo Git. Cobrem três heros, carregamento dos modelos, tooltips, tema/idioma, crachá, chat, fotos, rotas, larguras de 390/320 px e movimento reduzido.

A biblioteca Three.js fica em chunk separado e só é solicitada na exploração das ferramentas. O build pode emitir aviso de tamanho desse chunk; nenhuma biblioteca 3D bloqueia o primeiro carregamento da hero.

## Revisão de fidelidade aos wireframes · 10/10/2026

Fonte de verdade para hierarquia, sequência e agrupamento: os HTMLs em `Wireframes/`. A identidade visual continua sendo a do site: fundo quadriculado escuro, verde da marca e rodapé verde. A ordem dos estilos foi corrigida para evitar que regras antigas sobrescrevam os componentes novos.

- Home: três heros, faixas, três cards completos, link para todos os projetos, três etapas com seis detalhes do processo, crachá, duas recomendações reservadas e convite para conversar.
- Projetos: índice com cards e páginas individuais. Cada case contém resumo, três highlights, banner, ficha técnica, capítulos específicos, artefatos em curadoria e resultados explicados.
- Sobre: trajetória cronológica com contexto, tags e cards ligados aos cases; galeria arrastável nos dois sentidos.
- Footer: marca e frase à esquerda, navegação e contatos à direita, links sem CTA duplicado.
- Modelos 3D: mantidos em memória após a primeira abertura, sem recriar o WebGL a cada hover; renderização suspensa quando inativos.
- Chat: clicar no lançador mantém a conversa aberta mesmo se o hover já tiver iniciado a abertura.

Verificação desta revisão: TypeScript passou. Conferência visual realizada no navegador local em desktop e mobile. A nova execução do build encontrou EPERM no realpath do Windows; a execução elevada dos testes foi bloqueada por limite de uso da revisão automática de aprovação. Esses dois checks precisam ser repetidos quando a execução estiver disponível; os resultados antigos não validam esta revisão.

## Ajustes da hero e dos projetos · 11/10/2026

A primeira hero volta a ser a abertura padrão, com a saudação “Oi, sou a Mari”, texto de atuação e convite lateral para ver projetos. O título usa revelação palavra a palavra. Retiramos as legendas sob o Memoji. O controle “Continue explorando” conduz às faixas de marcas e etapas; elas se deslocam em velocidades opostas durante a rolagem e vêm antes dos cards.

Os cards de destaque e do índice agora são links por inteiro, com categoria em português, título, um highlight e indicação de entrada no case. A interação de hover eleva levemente o card e adiciona sombra. O link “Veja todos os meus projetos” recebeu aparência de ação para ficar mais reconhecível. O header ganhou mais espaço interno e menos margem lateral.

A órbita contém Claude, Figma, Creative Cloud, GitHub e Cursor. O modelo 3D de Claude foi retirado porque estava quebrado; usa uma imagem provisória existente até Mariana enviar os ícones definitivos. Os demais assets provisórios não devem ser tratados como versão aprovada da marca de cada ferramenta.
