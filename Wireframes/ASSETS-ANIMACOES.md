# Assets para as animações da home

Este registro orienta os arquivos que Mariana pode preparar no Illustrator. O [wireframe da home](wireframe-home-product-portfolio.html) já simula posição, queda, arraste, retorno e virada do crachá. O movimento final será refinado quando as peças vetoriais estiverem disponíveis; não é uma alteração do site publicado.

## Memoji

- **Atual:** `Assets/memoji/Center..png` é usado na hero e, após ela sair da tela, no lançador do chat. O hover da Hero 1 simula uma reação com inclinação e deslocamento em CSS; ainda não há piscar ou sorriso real.
- **Para piscar/sorrir:** versão neutra, olhos fechados e sorriso, todas com a mesma área de desenho, escala, enquadramento e fundo transparente. Se os traços vierem em camadas independentes, enviar olhos e boca separados facilita transições mais naturais.
- **Tamanho e corte:** manter a cabeça inteira dentro da mesma margem em todas as poses; indicar o ponto central do rosto. Evitar alterar cabelo e contorno entre variantes, para não parecer que a personagem “salta”.

## Ícones das ferramentas na Hero 1

- **Protótipo atual:** Claude e Figma são placeholders em CSS. Ao passar o mouse na Memoji, eles surgem com volume e movimento leves. Ao passar o mouse ou focar cada ícone, uma frase explica seu uso perto do cursor.
- **Para cada ferramenta:** enviar um ícone isolado com fundo transparente, preferencialmente PNG ou WebP de pelo menos 512 × 512 px, e o SVG vetorizado quando aprovado. Todos devem compartilhar perspectiva, iluminação, margem de respiro e escala visual. Não incluir texto ou sombra projetada fora do ícone; rótulo, sombra e animação ficam no HTML/CSS.
- **Para movimento simples:** basta uma pose de cada ícone; a entrada, flutuação e resposta ao hover podem ser feitas em CSS. Se a intenção for um giro 3D completo, fornecer também outras vistas consistentes ou um modelo 3D otimizado (GLB).
- **Para a Memoji reagir de fato:** poses alinhadas neutra, piscando e sorrindo, ou camadas separadas de olhos e boca. O movimento CSS atual não substitui esses assets.
- **Conteúdo:** confirmar a lista final de programas e uma frase verdadeira sobre o uso de cada um. Por enquanto: Claude — ideação e estudo de problemas; Figma — criação e organização de componentes.

## Crachá em SVG: arquivos separados

| Peça | O que entregar |
| --- | --- |
| Cartão frontal | Fundo, cantos, furo e áreas de conteúdo em um SVG. Texto e retrato podem permanecer como camadas separadas para edição no HTML. |
| Verso do cartão frontal | Mesmo tamanho e contorno da frente; aparece quando o cartão levanta e gira para cima. |
| Cartão inferior | Peça independente, com espaço quadrado de alto contraste para o QR do WhatsApp e texto de apoio. |
| Cordão | Duas partes ou uma faixa longa, com largura, ponto de suspensão superior e ponto de conexão com a argola marcados. Precisa deformar e oscilar independentemente dos cartões. |
| Presilha e argola | Arquivos separados para que o giro do cartão não mova a fixação como se fosse uma peça rígida. |
| Retrato, adesivos e ícones | PNG/SVG transparentes, separados do fundo do cartão. |

Enviar também **uma imagem de referência com tudo montado**. Essa referência define ordem de camadas, proporção, cores e a posição exata do ponto onde cordão e cartão se conectam. Os SVGs devem compartilhar um `viewBox` coerente, ter nomes de camadas claros, evitar imagens externas vinculadas e preservar elementos editáveis quando possível. Se uma fonte não puder ser distribuída, indicar seu nome ou converter apenas o lettering final em curvas.

## Comportamento previsto

1. O crachá entra de cima quando a seção aparece, passa um pouco da posição final e retorna com amortecimento. Ao descer, a queda começa após 0,5 segundo; ao subir de volta à seção, ela se repete.
2. A pessoa puxa o cartão; o cordão oscila e se estende ligeiramente, enquanto a argola acompanha o movimento. Ao soltar, gravidade e mola levam as peças de volta, com oscilação que perde força. O wireframe agora simula também a oscilação do cordão na queda.
3. Depois de **duas puxadas intencionais**, o cartão da frente levanta em 3D pelo topo e revela o cartão inferior com o QR do WhatsApp. Um controle permite fechá-lo para repetir a interação.
4. Enter e redução de movimento oferecem alternativas ao arraste. O contato também deve ter um link direto ao lado do QR na versão final, especialmente para quem acessa pelo celular.

Para uma física convincente, além dos SVGs, precisamos decidir: onde fica o **pivô**, comprimento aparente do cordão, limite de deslocamento, peso percebido do cartão, intensidade da mola, amortecimento e se o verso deve girar em 3D com perspectiva. O wireframe usa CSS e eventos de ponteiro como aproximação; a implementação final pode usar uma simulação de mola/gravidade.

## Pendências editoriais

- Confirmar texto e conteúdo visual do verso do cartão frontal e do cartão inferior.
- Receber o link ou número do WhatsApp para gerar um QR **real e testável**. O QR no wireframe atual é apenas um placeholder visual, conforme decidido com Mariana.
- Revisar traduções completas de PT, EN e ES; no wireframe, o seletor traduz navegação e textos centrais para demonstrar a interação.
