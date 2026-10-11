# Mari Mou — portfólio interativo

Implementação em React + Vite do novo portfólio de Mariana Senciani, a partir da referência visual enviada. Código recuperado de https://github.com/MarianaSenciani/site-marimou. A cópia original, preservada em `upstream/`, não faz parte do build.

## Executar

A versão atual integra os wireframes ao site: três heros selecionáveis no header, crachá com os SVGs fornecidos, ferramentas 3D e animações discretas. Consulte [a documentação de integração](docs/site-final-motion.md) para controles, assets, limitações e testes.

```sh
npm install
npm run dev
```

Prévia: http://localhost:3000. Painel: http://localhost:3000/admin.

Para configurar deploy automático na Hostinger, veja `docs/deploy-hostinger.md`. O build público estático usa `npm run build:web` e publica `dist/`.

```sh
npm run build
npm start
```

Checagem das rotas e assets de produção (após o build): `node scripts/verify-production.mjs`. Usa temporariamente a porta 3100 (ou TEST_PORT) e encerra o processo que criou.

O servidor usa a porta 3000 (ou `PORT`) e escuta em `127.0.0.1`. `npm start` serve o build de produção. Este trabalho não foi publicado nem enviado ao GitHub.

## O que está implementado

- Três heros: Editorial, Decisões e Perfil, com seletor temporário no header.
- Tema claro/escuro, menu responsivo, contato e seletor PT/EN/ES.
- Memoji estático com movimento de hover, ferramentas ao redor e explicações no ponteiro/foco/toque.
- Modelos OBJ/MTL de Claude e GitHub; imagens existentes de Figma e Cursor.
- Títulos WordPullUp, hover BubbleText, faixas contínuas e entradas suaves ao rolar.
- Crachá com cordão móvel, queda ao entrar na seção e abertura 3D após duas puxadas.
- Chat local guiado com StreamingText, dez perguntas por grupo e redimensionamento no desktop.
- Sicredi, LWSA e LIVO em cards verticais e páginas individuais.
- Página Sobre com trajetória, currículo e galeria arrastável nos dois sentidos.
- Pausa global e respeito à preferência de movimento reduzido.
- Painel local de currículo e projetos preservado; ainda não integrado à edição dos três cases curados.

## Limites desta prévia

O painel é um editor **local**, disponível somente em desenvolvimento. Projetos e dados do currículo são gravados pelo servidor em `.local-data/`; o navegador mantém uma cópia de apoio em `localStorage`. O PDF escolhido para download na prévia fica em `.local-data/curriculo.pdf`. Essa pasta não entra no Git ou no build. Uma sessão local substitui as credenciais fixas expostas no código antigo; ela não é autenticação para hospedagem. O painel e as APIs de edição ficam desativados no build de produção. Para um CMS publicado será preciso autenticação no servidor, armazenamento durável para conteúdo e arquivos, e autorização.

Os três cases destacados usam o conteúdo discutido com Mariana. Relatórios de comprovação não são publicados. Capas são composições tipográficas provisórias; QR e WhatsApp ainda aguardam o contato definitivo. Chat é uma simulação local. A tradução abrange interface, heros e chat; narrativas longas e linha do tempo ainda precisam de tradução editorial.

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
- `docs/site-final-motion.md`: decisões, assets, limites e validação.

Verificações: `npm run typecheck`, `npm run build` e `node scripts/verify-experience.mjs` (com a prévia rodando).
