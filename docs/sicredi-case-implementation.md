# Sicredi Centro-Norte — página final

Implementação local em `/projetos/sicredi`, a partir do wireframe V5 e do prompt fornecidos por Mariana em 13/10/2026.

## Fonte de verdade

- Wireframe preservado em `Wireframes/sicredi_case_wireframe_v5.html`.
- Página: `src/portfolio/SicrediCase.tsx`; estilos isolados: `src/portfolio/sicredi-case.css`.
- Narrativa: hipótese inicial → entrevistas → mudança de canal → arquitetura → quatro campanhas → acompanhamento → continuidade de uso → reflexão.
- Papel: Product Designer. Trabalho original: 2024, três meses.
- Os três highlights são +260 mil sessões, aproximadamente 96% de acessos mobile e 592 sessões com ação de contato. São dados posteriores de jan–jun/2025 para PJ, Agro e Cuiabá, sem deduplicação entre URLs. Não equivalem a usuários únicos, contas abertas ou uma conversão atribuída ao trabalho de 2024.
- O comparativo de fluxos é uma decisão de experiência; não é apresentado como experimento A/B formal.

## Assets públicos

`public/assets/cases/sicredi/` contém somente os seis vídeos e seis screenshots indicados pela usuária. Os originais permanecem no Drive local. Relatórios, PDFs de Clarity e documentos completos de pesquisa não foram copiados nem expostos.

- PJ: screenshots e gravações desktop/mobile.
- Agro: screenshots e gravações desktop/mobile. O PNG mobile fornecido é um recorte; o vídeo representa a navegação completa.
- Cuiabá: screenshots e gravações desktop/mobile. A captura mobile contém áreas em branco; a gravação é priorizada nas molduras.
- Amazonas: asset pendente, identificado no código e na galeria. Não substituir pela interface de outra campanha.
- Janice Souza e João Carlos: personas sintetizadas conforme o wireframe; retratos pendentes, representados por iniciais. Não associar fotos de pessoas reais das campanhas às personas sem definição da usuária.
- Moldura de smartphone: construída em CSS porque não foi fornecido um frame PNG. Vídeo sem corte e sem deformação.

## Comportamento

- Hero com três highlights à esquerda, screenshot desktop e vídeos mobile em camadas à direita; ordem texto → highlights → visual no mobile.
- Roadmap de três meses: linha avança e fase ativa muda conforme scroll; seleção também disponível por botão.
- Anatomia conceitual da landing page: sticky no desktop com quatro fases. No mobile ou com redução de movimento, todo o texto permanece visível sem pinagem.
- Galeria: seleção da campanha, troca desktop/mobile, enquadramento do screenshot acompanhando o scroll, opção de gravação desktop e screenshot completo expansível.
- Mídia carrega próximo do viewport. Vídeos são muted, loop e playsinline, pausando fora do viewport, na pausa de motion ou com aba oculta.
- Framer Motion e padrões de texto já existentes foram reutilizados. Não foram adicionadas bibliotecas de animação.
- Estilos usam fontes, grid, tokens, containers e CTA do site. Fundo, header e footer preservados.

## Compatibilidade

Tailwind e Vite foram alinhados à configuração já existente do repositório (Tailwind 3 / Vite 5), corrigindo o conflito causado pelas versões 4 / 8 instaladas. Sem migração de identidade visual ou configuração de estilos.

O case mantém a copy aprovada em português; os controles gerais do site continuam com seus idiomas existentes. Não foi criada uma tradução automática da narrativa.
