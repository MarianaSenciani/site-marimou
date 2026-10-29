# Mari Mou — portfólio interativo

Portfólio de Mariana Senciani em React, TypeScript e Vite. Este diretório é o repositório Git usado pela publicação na Vercel. Na máquina de desenvolvimento original, ele fica dentro de `Site Marimou/upstream`; a pasta externa contém uma cópia de trabalho e não é necessária para instalar ou publicar o site em outra máquina.

## Executar

O site reúne a home, as páginas de projetos (Sicredi, LWSA e LIVO), a página Sobre, o crachá com os SVGs fornecidos e animações discretas. Consulte [a documentação de integração](docs/site-final-motion.md) para assets, limitações e testes.

```sh
npm ci
npm run dev
```

Prévia: http://localhost:3000. Painel: http://localhost:3000/admin.

O projeto está conectado à Vercel. Cada push para `main` inicia um novo build de produção usando `vercel.json`: `npm run build:web`, com saída em `dist/`. Para validar localmente:

```sh
npm run typecheck
npm run build:web
```

Checagem das rotas e assets de produção (após o build): `node scripts/verify-production.mjs`. Usa temporariamente a porta 3100 (ou TEST_PORT) e encerra o processo que criou.

O servidor de desenvolvimento usa a porta 3000 (ou `PORT`). `npm run build` e `npm start` também estão disponíveis para testar o servidor de produção local.

## O que está implementado

- Hero principal “Oi, sou a Mari”; o seletor temporário de heros foi removido do header.
- Tema claro/escuro, menu responsivo, contato e seletor PT/EN/ES.
- Memoji estático com movimento de hover, ferramentas ao redor e explicações no ponteiro/foco/toque.
- Modelos OBJ/MTL de Claude e GitHub; imagens existentes de Figma e Cursor.
- Títulos WordPullUp, hover BubbleText, faixas contínuas e entradas suaves ao rolar.
- Crachá único com frente e verso e cordão móvel.
- Chat guiado com StreamingText; a conversa pública ainda não usa um modelo de IA.
- Sicredi, LWSA e LIVO em cards e páginas individuais, com assets dos cases em `public/assets/cases/`.
- Página Sobre com trajetória, currículo e galeria arrastável nos dois sentidos.
- Pausa global e respeito à preferência de movimento reduzido.
- Painel local de currículo e projetos preservado; ainda não integrado à edição dos três cases curados.

## Limites desta prévia

O painel é um editor **local**, disponível somente em desenvolvimento. Projetos e dados do currículo são gravados pelo servidor em `.local-data/`; o navegador mantém uma cópia de apoio em `localStorage`. O PDF escolhido para download na prévia fica em `.local-data/curriculo.pdf`. Essa pasta não entra no Git ou no build. Uma sessão local substitui as credenciais fixas expostas no código antigo; ela não é autenticação para hospedagem. O painel e as APIs de edição ficam desativados no build de produção. Para um CMS publicado será preciso autenticação no servidor, armazenamento durável para conteúdo e arquivos, e autorização.

Os três cases destacados usam o conteúdo discutido com Mariana. Relatórios completos de comprovação não são publicados. O chat público é guiado por respostas locais. A tradução abrange interface, hero e chat; narrativas longas e linha do tempo ainda precisam de tradução editorial.

Na prévia local, o botão de currículo usa o PDF original até que outro seja enviado ou gerado e atualizado pelo painel. Editar os campos não substitui o PDF automaticamente. O exportador visual preservado rasteriza o currículo; para candidaturas com ATS, prefira enviar um PDF pronto com texto selecionável. O build de produção continua usando `public/Mariana-Senciani.pdf`.

Importação e tradução por Gemini são opcionais: configure `GEMINI_API_KEY` em `.env`. Sem a chave, edição manual continua funcionando. Tradução automática exige ativar a opção no painel; importação envia o PDF ao Gemini quando acionada. Nunca inclua `.env` no repositório.

## Arquivos principais

- `src/portfolio/PortfolioExperience.tsx`: composição das páginas, preferências e motion.
- `src/portfolio/experience.css`: visual e responsividade.
- `src/portfolio/case-studies.ts`: dados públicos dos três cases.
- `src/components/ui/`: componentes reutilizáveis de motion.
- `src/components/streaming-text/`: componente MIT de Bruno Delorence, adaptado ao chat.
- `src/portfolio/ProjectContext.jsx`, `src/context/CVContext.jsx` e `src/admin/`: editor local.
- `Wireframes/`: propostas HTML preservadas.
- `Assets/`: arquivos originais de imagem, vídeo e vetor para futuras edições; as versões servidas pelo site estão em `public/`.
- `docs/site-final-motion.md`: decisões, assets, limites e validação.

Verificações: `npm run typecheck`, `npm run build` e `node scripts/verify-experience.mjs` (com a prévia rodando).
