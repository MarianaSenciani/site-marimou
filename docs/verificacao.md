# Verificação da prévia

Revisão inicial em 18/09/2026; painel revisto em 30/09/2026.

- Build de produção concluído; JavaScript principal ~194 KB / 62 KB gzip, painel excluído do bundle público.
- Navegação: home, Sobre mim, Projetos, filtro Design gráfico e detalhe Forma.
- Quatro abas de processo: título correspondente e abertura da segunda etapa em cada serviço.
- Teclado: seta direita muda a aba selecionada.
- Rolagem: cena 01 → 02 → 03 observada no navegador, seguida pelo acesso aos processos.
- Memoji: transformação perspectiva/rotação registrada após mover o ponteiro.
- Pausa: animação dos carrosséis e flutuação interrompidas; seção com cenas acessível sem pin.
- Mobile de 390 × 844: menu, navegação, processos, sem imagens quebradas ou overflow horizontal da página.
- Admin: abertura do painel, editor de CV e status de salvamento. Projeto Fluxo renomeado temporariamente, recarregado e encontrado pelo rótulo de edição persistido; nome original restaurado.
- Painel revisado: projeto temporário criado, gravado em `.local-data/projects.json`, recarregado, editado e excluído; o arquivo voltou a quatro projetos. Currículo carregado e salvo em `.local-data/cv.json`; PDF local servido com status 200 e tipo `application/pdf`.
- Capas: PNG local carregado e exibido na prévia de um projeto temporário, depois removido junto com o projeto. Ordenação testada e restaurada. Cargo do currículo alterado temporariamente, refletido na página Sobre mim e restaurado.
- Console da home: sem erros ou warnings na recarga final verificada.
- Rotas e assets de produção: 200 para home, Sobre, Projetos e detalhe; imagens, favicon e PDF original válidos. APIs de edição retornam 403 em produção.

Não foram testadas as integrações Gemini: nenhuma chave foi configurada nem dados enviados para esse serviço. A preferência de movimento reduzido tem implementação em CSS e React; a revisão manual testou o controle de pausa equivalente, sem alterar a preferência do sistema.
