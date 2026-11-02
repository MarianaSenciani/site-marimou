# Mari Mou — Guidelines para Figma Make

## 1. Objetivo e hierarquia de referências
Este projeto deve manter a identidade Mari Mou ao **evoluir interfaces existentes** ou construir novas páginas e sistemas relacionados.

- **Fonte principal para mudanças em telas existentes:** implementação e tela atual do próprio Figma Make, comparadas com o frame correspondente anexado do Figma Design.
- **Regras de UI e desenvolvimento:** `03_WEB_DESIGN_SYSTEM.md`, quando disponível no contexto do projeto.
- **Identidade de marca e direção de arte:** `01_BRAND_STYLE_GUIDE.md`, quando disponível.
- **Valores medidos e tokens:** `02_DESIGN_TOKENS.json`, quando disponível. Os valores semânticos marcados como propostas não são decisões oficiais.
- Em caso de divergência entre referências, **não harmonize silenciosamente**: informe qual conflito encontrou e solicite uma decisão se isso impedir a alteração. Não invente um componente ou token oficial.

## 2. Identidade visual observada no Figma
- Tipografia de títulos e display: **Alexandria**; textos corridos, UI e utilitários: **Inter**. Preserve a hierarquia tipográfica. Se uma fonte não estiver disponível no ambiente, sinalize a limitação, utilize fallback temporário apenas quando necessário e não declare que a substituição é oficial.
- Cores recorrentes observadas: off-white `#F2F1E8`; verde-lima `#BDDB42`; sálvia `#AEB39D`; escuro `#1B1D15`; verde-escuro `#23271C`; oliva `#303625`.
- As atribuições semânticas dessas cores ainda são propostas. Não aplique automaticamente cores específicas de cases de portfólio à identidade geral da Mari Mou.
- Estilo: composição editorial, títulos expressivos, contraste de escalas, espaços de respiro, fundos claros/escuros e acentos verde-lima.
- Padrões observados em um frame desktop: cards de projetos com raio de `20px`; CTAs em formato pílula; hero de 170px na home. **Não generalize medidas desktop para mobile.**
- A personagem/memoji pertence exclusivamente ao **website**. Não reutilize em apresentações, peças de redes sociais ou banners externos.

## 3. Regras para cada edição
1. **Altere somente o escopo solicitado.** Não redesenhe outras seções, não reformule a identidade e não substitua componentes ou assets sem necessidade.
2. Priorize reutilizar estilos, componentes e funções já presentes no código do projeto. Antes de duplicar, procure algo equivalente.
3. Preserve conteúdo, navegação, interações e comportamento atual, exceto quando a mudança solicitar explicitamente alterações.
4. Faça modificações pequenas e rastreáveis. Não refatore toda a aplicação para resolver um ajuste visual local.
5. Para novas telas, estenda o sistema existente, com consistência visual e estrutural. Identifique o que é novo e precisa de validação.
6. Utilize layout responsivo, HTML semântico, navegação por teclado, estados de foco visíveis e respeito a `prefers-reduced-motion`.
7. Não trate padrões não auditados (mobile, breakpoints, animações, estados de formulário e tokens semânticos) como decisões oficiais da marca.

## 4. Processo de entrega
Ao concluir um pedido:
- Informe **quais páginas/componentes/arquivos foram alterados**.
- Descreva brevemente o resultado e se houve impacto em versões mobile ou desktop.
- Avise sobre conflitos, fontes ausentes, diferenças do frame Figma e novas decisões visuais propostas.
- Não altere essas guidelines apenas porque uma modificação pontual foi implementada. Atualize regras globais somente quando o usuário aprovar uma mudança permanente.

## 5. Como interpretar os prompts
Cada prompt novo conterá: **alvo**, **alteração desejada**, **o que preservar** e **critérios de aceitação**. Use este escopo para orientar a execução. Se o pedido for pontual, não reconstrua a tela inteira.

## 6. Status desta documentação
Primeira auditoria de seis frames desktop do arquivo Figma "Site Mari Mou 2". A validação contra o website publicado, os estados reais de interface e a responsividade ainda não foi concluída. Os valores acima são observações, não uma biblioteca nativa de variáveis do Figma.
