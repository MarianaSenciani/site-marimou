# Hospedagem na Vercel

## Configuração preparada

- Repositório: `MarianaSenciani/site-marimou`.
- Branch de produção: `main`.
- Diretório raiz na Vercel: raiz do repositório. A pasta `upstream` existe apenas na organização local; não preencher esse nome na Vercel.
- Framework: Vite.
- Build: `npm run build:web`.
- Diretório de saída: `dist`.
- `vercel.json` preserva o acesso direto às rotas, incluindo `/sobre`, `/projetos` e `/projetos/sicredi`.
- Portfólio público estático; painel, servidor Express e APIs de edição permanecem locais, conforme os controles de produção existentes.
- Nenhuma chave de API é necessária para o portfólio público atual.

## Ativação na conta

1. Entrar na Vercel e importar `MarianaSenciani/site-marimou` pelo GitHub.
2. Se for necessário autorizar a integração GitHub, selecionar somente este repositório.
3. Confirmar as configurações acima e o plano escolhido, sem ativar recursos pagos automaticamente.
4. Publicar e conferir home, páginas internas, imagens e vídeos pela URL do deployment.
5. Confirmar em Git que `main` é a branch de produção e os deployments automáticos estão habilitados.

Depois da conexão, push em `main` dispara um novo build e, se aprovado, atualiza a produção. Branches de trabalho podem gerar previews, conforme as opções da conta.

## Estado

Configuração preparada localmente. Login e conexão com a conta ainda pendentes; não há URL publicada nem integração automática confirmada.

O plano Hobby é destinado a uso pessoal não comercial. A escolha de seguir com Vercel não autoriza contratação de plano pago. Não aceitar upgrade, inserir cartão ou iniciar cobrança sem instrução específica.

Referências:
- https://vercel.com/docs/frameworks/frontend/vite
- https://vercel.com/docs/git
- https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage
