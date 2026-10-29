# Deploy automático na Hostinger

## Portfólio público (plano Business ou Cloud)

Este projeto pode ser publicado como site React/Vite estático. No hPanel, vá a **Websites → Add Website → Deploy Web App → Import Git Repository**, conecte o repositório `MarianaSenciani/site-marimou` e selecione a branch `main`. Na revisão das configurações, escolha React/Vite se necessário e configure:

- Comando de build: `npm run build:web`
- Diretório de saída: `dist`
- Node.js: uma versão suportada pela Hostinger, como 22.x

Depois do primeiro deploy, novos pushes na branch conectada iniciam builds automáticos. Verifique a URL pública, as rotas `/sobre` e `/projetos`, o download do PDF e o vídeo da hero. O código que está apenas na pasta local não chega à Hostinger até ser commitado e enviado ao repositório conectado.

## Limites da versão atual

O painel admin foi projetado para a prévia local. Ele e as APIs de edição não fazem parte do build público. Os projetos e dados do currículo salvos em `.local-data/` também não são publicados. O portfólio público usa o conteúdo versionado em `src/` e o PDF em `public/Mariana-Senciani.pdf`. Para editar projetos e currículo pelo navegador no site publicado, será necessário implementar autenticação, API e armazenamento persistente antes do deploy desse painel.

Não coloque `.env`, credenciais ou `.local-data/` no GitHub. Se a Hostinger apresentar o site como aplicativo Express em vez de Vite, ajuste manualmente o tipo e o comando de build antes de publicar.

## Outros planos

O recurso **Node.js Web App com build automático por GitHub** é oferecido pela Hostinger nos planos Business Web Hosting e Cloud. Em VPS, o deploy exige configuração do servidor ou uma automação própria (por exemplo, GitHub Actions). Em planos sem Node.js Web App, um site estático ainda pode ser hospedado, mas a forma de compilar e enviar `dist/` depende das ferramentas disponíveis no plano.

Fontes oficiais: [Node.js Web App](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/), [opções por plano](https://www.hostinger.com/support/node-js-hosting-options-at-hostinger/) e [deploy de React](https://www.hostinger.com/ca/tutorials/?p=145986).
