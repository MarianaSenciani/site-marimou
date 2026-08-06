import { GoogleGenAI, Type, Schema } from "@google/genai";
import fs from "fs";

const key = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: key });

const resumeText = `Mariana Senciani UX/UI - Direção de Arte
marianasenciani@gmail.com São Paulo, SP (11) 94810-5940 Linkedin Portfólio
RESUMO
Desde 2020 presente no mercado criativo, com foco em UX/UI, branding e direção de arte.
Atuei com grandes marcas como Adobe Brasil, Sicredi, LWSA e AIG Seguros. Além de passar por varejo e
agências de publicidade e performance digital.
Durante esses anos me aprimorei em pesquisas e análises de UX, além de diretrizes WCAG para
criação de interfaces mobile, websites e landing pages. Além de habilidades avançadas no Adobe
Creative Suite, edição de vídeo e uso de inteligências artificiais generativas para texto, imagem e
vídeo. Atuei também na direção criativa de campanhas e eventos, materiais on/off e mídia focada em
performance para Meta e PMAX.
EXPERIÊNCIA PROFISSIONAL
Pryon Cash, UX/UI Designer Pleno - freelancer 12/2024 – presente
•Planejamento e condução de testes de usabilidade para validação das soluções;
•Execução de análises competitivas (benchmarking);
•Desenvolvimento de personas e mapas da jornada;
•Definição da arquitetura da informação e fluxos de navegação;
•Desenvolvimento de wireframes de baixa, média e alta fidelidade, além de protótipos navegáveis;
•Criação e manutenção de Style Guide e Design System;
•Análise de feedback de usuários e métricas de produto para propor melhorias;
•Colaboração com equipes de desenvolvimento para garantir a implementação do design;
•Apresentação e argumentação das decisões de design para clientes e stakeholders.
Sioux Serviços de Informática Ltda, Diretora de arte Pleno 12/2024 – 07/2025
•Criação e desenvolvimento de sites com abordagem mobile first, com foco em usabilidade e
performance;
•Monitoramento de métricas e comportamento do usuário por meio de ferramentas como mapas de
calor (Clarity) e análise de relatórios de usabilidade;
•Estudos de personas e análises comportamentais para embasar decisões de design e experiência
do usuário;
•Edição de vídeos e motion design para sites, redes sociais, campanhas institucionais e mídia paga
(Meta e PMAX);
•Manipulação e tratamento de imagens e vídeos, além da diagramação de materiais offline, como
folders, outdoors e cartazes;
•Uso de inteligências artificiais generativas (Sora, ChatGPT, Adobe Firefly, Runway e Google Veo)
para otimização de tempo e resultados;
•Participação em alinhamentos com clientes e defesa de propostas visuais e conceitos criativos.
LWSA S/A, Designer Gráfica Pleno 02/2023 – 09/2024
•Participação no planejamento e execução de ações, campanhas e eventos internos, com foco em
engajamento e cultura organizacional;
•Direção criativa de campanhas internas e externas, alinhando estratégias visuais aos objetivos de
cada projeto;
•Desenvolvimento de identidades visuais para programas corporativos e eventos internos,
incluindo a criação da marca LWSA e atualização da identidade visual da sede;
•Diagramação e produção de materiais digitais e físicos, como wallpapers institucionais, totens,
logotipos em 3D para ambientes, apresentações, papéis de parede e capas para LinkedIn;
•Diagramação do relatório de sustentabilidade (ESG) referente ao ano de 2022;
•Análise heurística e reformulação de newsletters digitais, além da criação de peças para mídia
on/off, edição de vídeos, diagramação de e-books e apresentações;
•Apoio criativo ao marketing da LWSA e demais empresas da holding, atuando na criação de
campanhas e materiais institucionais diversos;
•Mentoria e suporte ao assistente de criação, oferecendo feedbacks e orientações para
desenvolvimento técnico e criativo.
LIVO Eyewear | Olímpia Importação, Distribuição e
Comercialização, Assistente de Arte
10/2022 – 02/2023
•Análise de usabilidade do e-commerce, com foco em identificar melhorias na experiência do
usuário e desenvolvimento de novos layouts para o site;
•Criação de landing pages para campanhas e ações corporativas, alinhadas às estratégias de
marketing e conversão;
•Adaptação e desdobramento de peças criativas com base em key visuals desenvolvidos pela
direção de arte;
•Desenvolvimento de anúncios para campanhas de mídia paga, com foco em performance nas
plataformas Meta e Google;
•Apoio na criação de peças de comunicação interna, atendendo às demandas de diferentes
departamentos da empresa;
•Participação ativa em brainstorms e alinhamentos estratégicos, colaborando no desenvolvimento
de campanhas e ações comerciais junto à equipe de marketing.
VEX Painéis LTDA, Assistente de Arte 07/2021 – 09/2022
•Implementação da metodologia Kanban, utilizando o framework Trello, para otimização dos fluxos
de trabalho nas áreas de planejamento estratégico, comercial e marketing;
•Apoio na gestão de redes sociais em parceria com o Head de Marketing, incluindo a criação de
conteúdos e organização do cronograma de postagens;
•Criação de layouts em grandes formatos para painéis rodoviários e digitais, com foco em impacto
visual e clareza de mensagem;
•Desenvolvimento de apresentações comerciais estratégicas, incluindo o estudo e análise de
métricas para a criação de planos de mídia voltados ao segmento de rodovias.
RABBIT PATNERSHIP, Assistente de Arte 11/2020 – 07/2021
•Co-liderança da equipe de criação, com foco no desenvolvimento e gestão de campanhas de
marketing para instituições de ensino em todo o Brasil;
•Planejamento e gestão de conteúdos em colaboração com a equipe de redação, garantindo
alinhamento estratégico e criativo;
•Criação de peças para mídia on e off, incluindo diagramação de e-books, design de uniformes
escolares, adesivos, apresentações e desdobramentos de key visuals.
FORMAÇÃO
Pós Graduação em User Experience (UX) & User Interface
(UI), UNIVERSIDADE UNYLEYA
01/2022 – 10/2022 | São Paulo, Brasil
Superior Técnico em Design Gráfico,
UNIVERSIDADE PAULISTA (UNIP)
02/2020 – 12/2021 | São Paulo, Brasil
CURSOS EXTRACURRICULARES
Pesquisas em UX: Métodos e Aplicações Bootcamp UX Design
Web Design | HTML, CSS & JAVASCRIPT Adobe Photoshop avançado
Adobe Illustrator para design gráfico Adobe InDesign do zero ao avançado
Front End & UX/UI Design EF SET Certificate | C1 Advanced
COMPETÊNCIAS
Photoshop: Avançado Illustrator: Avançado InDesign: Avançado Premiere-Pro: Avançado
After-Effects: Intermediário Figma: Intermediário Wordpress com Elementor: Avançado
HTML, CSS e JavaScript: Intermediário Corel Draw: Avançado
IA's generativas de texto, imagem e vídeo: Avançado (Sora, ChatGPT, Adobe Firefly, Runway,
Midjourney, Leonardo Ai e Google Veo 3)
IDIOMAS
Inglês (Avançado) Português (Nativo)`;

async function run() {
  const schema = {
    type: Type.OBJECT,
    properties: {
      pt: {
        type: Type.OBJECT,
        properties: {
          personal: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, role: { type: Type.STRING }, email: { type: Type.STRING }, phone: { type: Type.STRING }, location: { type: Type.STRING }, linkedin: { type: Type.STRING }, portfolio: { type: Type.STRING } } },
          summary: { type: Type.STRING },
          experience: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { company: { type: Type.STRING }, role: { type: Type.STRING }, period: { type: Type.STRING }, activities: { type: Type.ARRAY, items: { type: Type.STRING } } } } },
          education: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { institution: { type: Type.STRING }, degree: { type: Type.STRING }, period: { type: Type.STRING } } } },
          courses: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, category: { type: Type.STRING }, institution: { type: Type.STRING }, duration: { type: Type.STRING }, year: { type: Type.STRING } } } },
          skills: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, items: { type: Type.ARRAY, items: { type: Type.STRING } } } } },
          languages: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, level: { type: Type.STRING } } } },
          keywords: { type: Type.STRING }
        }
      },
      en: {
        type: Type.OBJECT,
        properties: {
          personal: { type: Type.OBJECT, description: "Translate roles/fields, leave proper nouns intact" },
          summary: { type: Type.STRING },
          experience: { type: Type.ARRAY, items: { type: Type.OBJECT } },
          education: { type: Type.ARRAY, items: { type: Type.OBJECT } },
          courses: { type: Type.ARRAY, items: { type: Type.OBJECT } },
          skills: { type: Type.ARRAY, items: { type: Type.OBJECT } },
          languages: { type: Type.ARRAY, items: { type: Type.OBJECT } },
          keywords: { type: Type.STRING },
        }
      },
      es: {
        type: Type.OBJECT,
        properties: {
          personal: { type: Type.OBJECT, description: "Translate roles/fields, leave proper nouns intact" },
          summary: { type: Type.STRING },
          experience: { type: Type.ARRAY, items: { type: Type.OBJECT } },
          education: { type: Type.ARRAY, items: { type: Type.OBJECT } },
          courses: { type: Type.ARRAY, items: { type: Type.OBJECT } },
          skills: { type: Type.ARRAY, items: { type: Type.OBJECT } },
          languages: { type: Type.ARRAY, items: { type: Type.OBJECT } },
          keywords: { type: Type.STRING },
        }
      }
    },
    required: ["pt", "en", "es"]
  };

  const prompt = `Parse this resume into Portuguese (pt), and also translate everything to English (en) and Spanish (es).
CRITICAL CONSTRAINT: Do NOT translate proper nouns (e.g., city names like "São Paulo", "Rio de Janeiro", company names, or people's names). Keep them in their native language exactly as provided.
Resume Text:
${resumeText}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema as Schema,
      temperature: 0.1,
    }
  });

  fs.writeFileSync("cvData.json", response.text || "{}");
}

run();
