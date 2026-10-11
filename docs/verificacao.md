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

## Memoji e hero — 02/10/2026

- Seis gravações novas inspecionadas; sete movimentos reais preparados em WebM com alfa. Mapeamento e preparação em `memoji-interativo.md`.
- Vídeos sempre montados, pausados e preloaded; nenhuma imagem PNG usada como pose.
- Browser: centro, deslocamento gradual para fora, pose intermediária parada, borda, reversão, sete direções, intensidade preservada na troca, pequenas oscilações na fronteira e saída da hero verificados.
- Na pose parada, `currentTime` permaneceu em 1,096316 s entre observações; ao sair, retornou ao frame neutro. Durante as trocas observadas, uma camada permaneceu visível e a largura do container ficou constante em 420,175 px na referência de 1242 px.
- Hero verificada em 1920, 1600, 1440, 1366, 1280, 1024, 834, 768, 600, 430, 390 e 375 px. Nenhum elemento da hero ultrapassou horizontalmente o viewport. Também inspecionada em 1242 × 668, com conteúdo acessível por scroll.
- Mobile usa composição empilhada; desktop mantém memoji central sobrepondo parcialmente o título, com espaço antes dos fatos.
- Build final passou. Rotas públicas, sete WebM, mockups e currículo retornaram 200; painel excluído do bundle e API de edição bloqueada em produção.
- Console da home sem erros ou warnings na revisão.
- Testado no navegador Chromium do preview. Não verificado nesta rodada em Safari/iOS físico; a compatibilidade de alfa VP9 nesse ambiente precisa de uma verificação própria.

### Complemento com gerenal.mp4 — 02/10/2026

- Novo MP4 de 10 segundos / 24 fps inspecionado em contato geral e amostras de 250 ms. Acrescentado o setor direito; cinco setores usam os movimentos mais contidos desse vídeo. Os demais tiveram os trechos extremos reduzidos.
- Oito WebM atualizados, todos com o mesmo frame neutro real incorporado ao início. A passagem entre camadas prontas dura 55 ms com a anterior opaca por baixo; o vídeo anterior segura a pose enquanto o próximo é preparado.
- Browser: direita progrediu de aproximadamente 0,985 s para 1,761 s, reverteu para 0,997 s e retornou ao neutro. Cursor parado manteve exatamente 0,985039 s entre observações. Oito direções e retorno ao centro verificados; largura permaneceu em 336 px no viewport padrão.
- Mobile de 390 × 844 preservou a composição, com oito vídeos montados e sem overflow horizontal da página. Console sem erros/warnings.
- Build passou; oito vídeos com query de versão retornaram 200 e `video/webm` na verificação de produção. A geometria e o CSS da hero não foram alterados neste complemento.
