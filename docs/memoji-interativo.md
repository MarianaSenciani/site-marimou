# Estado atual: memoji estático

A pedido da Mariana, a hero usa somente `public/assets/memoji/center-portrait.png`, sem acompanhamento do mouse ou animação. A implementação de rotas anterior foi guardada em `.local-data/InteractiveHead-video-routes-before-static.jsx` para eventual retomada. Os vídeos e PNGs de origem continuam em `Assets/memoji`.

## Histórico da experiência de rotas

### Rotas com frames reais — 02/10/2026

A versão anterior extraía e percorria frames dos vídeos fornecidos. Um canvas transparente desenhava frames previamente decodificados, controlados pelo cursor dentro da hero.

## Insumos e preparação

Os sete vídeos foram inspecionados e seus 1.680 frames extraídos para `.local-data/memoji-video-frames`, em JPEG de qualidade 96. Os MP4 originais permanecem intactos. O inventário inclui FPS, duração e quantidade de frames por gravação.

Foram selecionados 205 frames para oito rotas, distribuídos em 11 páginas WebP transparentes. O arquivo `public/assets/memoji/routes/routes.json` registra o vídeo, índice e tempo de origem de cada frame. O fundo preto conectado à borda é removido; regiões escuras internas, como pupilas, são preservadas. O enquadramento permanece fixo ao longo de cada trecho.

| Rota na tela | Fonte | Trecho, segundos |
| --- | --- | --- |
| Cima | center-top.mp4 | 1,85 → 3,35 |
| Cima/direita | center-top-right.mp4 | 0,55 → 1,65 |
| Direita | gerenal.mp4 | 5,625 → 6,18 |
| Baixo/direita | Center bottom right, left center.mp4 | 2,67 → 3,30 |
| Baixo | Center-bottom.mp4 | 5,50 → 4,50 (reverso) |
| Baixo/esquerda | gerenal.mp4 | 4,25 → 5,15 |
| Esquerda | Center bottom left..mp4 | 1,80 → 3,75 |
| Cima/esquerda | gerenal.mp4 | 1,125 → 1,70 |

O vídeo `center-top-left.mp4` também foi extraído e inspecionado. Seu trecho testado foi descartado por conter uma piscada na posição intermediária.

Regeneração:

```powershell
$env:PYTHONPATH = (Join-Path $PWD '.tools')
python scripts/prepare-memoji-routes.py
```

## Interação

- O ângulo seleciona a rota, com histerese de aproximadamente 5°. A distância seleciona a intensidade, com uma zona neutra de 3,5%.
- Um único RAF percorre um grafo de frames consecutivos nos dois sentidos. Retargeting durante uma transição preserva a mistura atual e pode inverter o caminho imediatamente.
- Mudanças grandes aceleram a travessia da rota, sem iniciar uma reprodução independente do cursor. Ao chegar ao alvo, a pose fica parada.
- Ao cruzar setores com intensidade acima de 8%, a troca usa um fade direto de 160 ms para a nova pose, sem obrigar uma passagem pelo centro. Entrada a partir do neutro e retorno continuam usando as rotas gravadas.
- Há fade temporal de saída com constante de 40 ms e acomodação final em até 200 ms. As pontes entre gravações usam 160 ms com smoothstep, independentemente da aceleração. Frames temporais têm duração mínima de 18 ms. Não há deformação de olhos, boca ou cabelo.
- Ao sair da hero ou perder foco, a personagem retorna ao neutro. Continua visível o tempo todo.
- Em dispositivos de toque e com movimento reduzido/pausado, somente o frame neutro é usado. Falhas de carregamento também mantêm esse frame.
- As páginas de frames são liberadas ao desmontar o componente. Nada é baixado por movimento do mouse.

## Limites

Esta é uma aproximação 2D construída a partir de movimentos gravados, não um modelo 3D. Não há cobertura contínua de todos os ângulos nem graus fisicamente calibrados. Existem pequenas diferenças de expressão e enquadramento entre gravações. O fade entre poses distantes pode apresentar sobreposição breve de contornos; ele reduz cortes, mas não cria a geometria de um giro 3D. Não foram gerados novos ângulos por IA.

## Verificação

`node scripts/verify-frame-routes.mjs` verifica conectividade, arestas reversíveis, parada no alvo, retorno neutro e retargeting em 60, 90, 120 e 144 Hz. `node scripts/verify-production.mjs` verifica as rotas da aplicação e a disponibilidade dos arquivos de animação no build. A avaliação visual no localhost continua sendo necessária para julgar a naturalidade.

O experimento anterior com PNGs foi preservado em `.local-data/InteractiveHead-mesh-experiment.jsx` e `.local-data/memoji-mesh-poses`. A versão aprovada dos olhos está em `.local-data/InteractiveHead-approved-eyes.jsx`.
