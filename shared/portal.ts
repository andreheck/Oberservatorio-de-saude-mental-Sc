export const modules = [
  {
    key: "budget",
    path: "/dados-orcamento",
    title: "Dados e orçamento",
    short: "Orçamento",
    icon: "chart",
    description:
      "Acompanhe o financiamento e cada etapa da execução dos recursos públicos.",
  },
  {
    key: "services",
    path: "/mapa-raps",
    title: "Mapa da RAPS",
    short: "Mapa da RAPS",
    icon: "map",
    description:
      "Conheça os serviços documentados da Rede de Atenção Psicossocial.",
  },
  {
    key: "workforce",
    path: "/profissionais",
    title: "Profissionais",
    short: "Profissionais",
    icon: "users",
    description:
      "Distribuição da força de trabalho, vínculos e carga horária, em dados agregados.",
  },
  {
    key: "inspections",
    path: "/fiscalizacoes",
    title: "Fiscalizações",
    short: "Fiscalizações",
    icon: "clipboard",
    description:
      "Visitas técnicas, inspeções, recomendações e providências documentadas.",
  },
  {
    key: "requests",
    path: "/solicitacoes",
    title: "Solicitações e prazos",
    short: "Solicitações e prazos",
    icon: "send",
    description:
      "Ofícios, respostas e encaminhamentos: acompanhe cada movimentação.",
  },
  {
    key: "actions",
    path: "/acoes-executivo",
    title: "Ações do Executivo",
    short: "Ações do Executivo",
    icon: "building",
    description:
      "Diferenciamos anúncios, implementação e resultados comprovados.",
  },
  {
    key: "communities",
    path: "/comunidades-terapeuticas",
    title: "Comunidades terapêuticas",
    short: "Comunidades terapêuticas",
    icon: "handshake",
    description:
      "Instrumentos de parceria, objetos e recursos públicos identificados.",
  },
  {
    key: "timeline",
    path: "/timeline",
    title: "Linha do tempo",
    short: "Linha do tempo",
    icon: "clock",
    description:
      "Memória da mobilização pela saúde mental em Itajaí, sustentada por evidências.",
  },
  {
    key: "neighborhoods",
    path: "/bairros",
    title: "Ações por bairro",
    short: "Bairros",
    icon: "pin",
    description:
      "Serviços, demandas, ações e lacunas de informação por território.",
  },
  {
    key: "members",
    path: "/comissao",
    title: "A comissão",
    short: "Comissão",
    icon: "users",
    description: "Conheça o contexto da CISM e sua relação com o COMUSA.",
  },
  {
    key: "documents",
    path: "/documentos",
    title: "Biblioteca de documentos",
    short: "Documentos",
    icon: "files",
    description:
      "Fontes originais, relatórios e documentos autorizados para consulta pública.",
  },
  {
    key: "publications",
    path: "/publicacoes",
    title: "Publicações",
    short: "Publicações",
    icon: "book",
    description:
      "Informes, materiais educativos e atualizações do observatório.",
  },
] as const;
export const nationalSource =
  "https://www.gov.br/saude/pt-br/composicao/saes/desmad/raps/caps";
export const consultationDate = "19/10/2026";
export type PortalRecord = {
  id: number;
  module: string;
  title: string;
  description: string;
  status: string;
  publication: string;
  sourceName: string;
  sourceUrl: string;
  referencePeriod: string;
  verifiedAt: string | Date | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  data: Record<string, any>;
};
export const capsTypes = [
  {
    slug: "caps-i",
    name: "CAPS I",
    caption: "Cuidado psicossocial",
    text: "Serviço de cuidado para pessoas com sofrimento psíquico intenso. A organização do público e do território deve ser confirmada com a rede local.",
    tag: "Cuidado comunitário",
  },
  {
    slug: "caps-ii",
    name: "CAPS II",
    caption: "Acompanhamento especializado",
    text: "Acompanha pessoas com sofrimento psíquico intenso que precisam de cuidado psicossocial especializado. A faixa etária e os critérios do serviço local precisam ser confirmados.",
    tag: "Cuidado continuado",
  },
  {
    slug: "caps-iii",
    name: "CAPS III",
    caption: "Cuidado contínuo, 24 horas",
    text: "Modalidade com funcionamento 24 horas, inclusive fins de semana e feriados, e acolhimento noturno. Isso não confirma que exista uma unidade em funcionamento em Itajaí.",
    tag: "Funcionamento 24h",
  },
  {
    slug: "caps-ad",
    name: "CAPS AD",
    caption: "Álcool e outras drogas",
    text: "Acolhe pessoas com necessidades relacionadas ao uso prejudicial de álcool e outras drogas, com cuidado em saúde, respeito aos direitos e estratégias de redução de danos.",
    tag: "Sem estigmatização",
  },
  {
    slug: "caps-ad-iii",
    name: "CAPS AD III",
    caption: "Álcool e outras drogas, 24 horas",
    text: "Oferece cuidado relacionado ao uso prejudicial de álcool e outras drogas com funcionamento contínuo e acolhimento noturno. A existência e a operação em Itajaí aguardam confirmação.",
    tag: "Funcionamento 24h",
  },
  {
    slug: "capsi",
    name: "CAPSi",
    caption: "Infância e adolescência",
    text: "Voltado a crianças e adolescentes com sofrimento psíquico intenso ou necessidades complexas de saúde mental, inclusive relacionadas ao uso de álcool e outras drogas. Não substitui automaticamente todo atendimento psicológico infantil.",
    tag: "Cuidado infantojuvenil",
  },
];
