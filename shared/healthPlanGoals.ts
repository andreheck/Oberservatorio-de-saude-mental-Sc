export type HealthPlanGoalGroupId =
  | "expansao"
  | "territorio"
  | "inclusao"
  | "acesso"
  | "qualidade"
  | "informacao";

export interface HealthPlanMonitoringPriority {
  id: string;
  code?: string;
  title: string;
  detail: string;
  userReportedTarget?: string;
  sourceNote: string;
}

export interface HealthPlanGoal {
  code: string;
  objective: "1.3" | "2.1";
  title: string;
  description: string;
  indicator: string;
  unitLabel: string;
  baseline2025: string;
  target2026: string;
  plan2026to2029: string;
  sourcePages: string;
  actions: readonly string[];
  responsible: null;
  realized: null;
}

export interface HealthPlanGoalGroup {
  id: HealthPlanGoalGroupId;
  title: string;
  description: string;
  goals: readonly HealthPlanGoal[];
  priorities?: readonly HealthPlanMonitoringPriority[];
}

export const healthPlanSource = {
  title: "Programação Anual de Saúde de Itajaí 2026",
  primaryPublisher: "DigiSUS Gestor (fonte primária indicada no DOCX)",
  sourceIndexUrl:
    "https://digisusgmp.saude.gov.br/v1.5/transparencia/estados/sc/planos-saude",
  structuredDocument: "Itajai_PAS_2026_Dados_e_Metas_Organizados.docx",
  structuredDocumentOrganizedAt: "20/10/2026",
  structuredDocumentReceivedAt: "21/10/2026",
  sourcePdfName: "Programação Anual de Saúde - 2026 edit.pdf",
  sourcePdfPages: 49,
  sourcePdfVerifiedDirectly: false,
  planPeriod: "2026–2029",
  objective13MetaCount: 41,
  objective13Scheduled2026Count: 36,
  representedGoalCount: 18,
  representedObjective13Count: 16,
  representedObjective21Count: 2,
  executionDataAvailable: false,
} as const;

const transcribedGoalGroups: readonly HealthPlanGoalGroup[] = [
  {
    id: "expansao",
    title: "Expansão e ampliação de serviços",
    description:
      "Implantações e ampliação planejadas para a rede e para dispositivos de cuidado.",
    goals: [
      {
        code: "1.3.21",
        objective: "1.3",
        title: "Leitos de saúde mental em hospital geral",
        description:
          "Articular via CIR ou CIB a implantação de leitos de saúde mental em hospital geral, garantindo retaguarda assistencial para manejo de crises.",
        indicator: "Leitos de saúde mental em hospital geral implantados.",
        unitLabel: "leitos",
        baseline2025: "0",
        target2026: "4",
        plan2026to2029: "10",
        sourcePages: "PDF, página 12",
        actions: ["Articular CIR", "Pactuar CIB"],
        responsible: null,
        realized: null,
      },
      {
        code: "2.1.16",
        objective: "2.1",
        title: "Serviço de Residência Terapêutica (SRT)",
        description: "Implantar Serviço de Residência Terapêutica.",
        indicator: "SRT implantado.",
        unitLabel: "serviços",
        baseline2025: "0",
        target2026: "1",
        plan2026to2029: "2",
        sourcePages: "PDF, página 18",
        actions: [
          "Implantar o SRT, com definição do imóvel, adequação da estrutura física, composição de equipe e organização do cuidado para pessoas egressas de internações psiquiátricas de longa permanência.",
          "Instruir e formalizar o processo de habilitação e financiamento junto ao Ministério da Saúde, conforme critérios técnicos e integração com a RAPS.",
        ],
        responsible: null,
        realized: null,
      },
      {
        code: "2.1.17",
        objective: "2.1",
        title: "Unidade de Acolhimento Adulto AD",
        description: "Implantar Unidade de Acolhimento Adulto AD.",
        indicator: "UA implantada.",
        unitLabel: "unidades",
        baseline2025: "0",
        target2026: "1",
        plan2026to2029: "2",
        sourcePages: "PDF, página 18",
        actions: [
          "Implantar a Unidade de Acolhimento Adulto AD, com definição e adequação do imóvel, estrutura física, equipe de referência e organização do cuidado para acolhimento transitório de usuários de álcool e outras drogas.",
          "Instruir e formalizar o processo de habilitação e financiamento junto ao Ministério da Saúde, conforme critérios técnicos e integração com a RAPS.",
        ],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.32",
        objective: "1.3",
        title: "Centros de Convivência",
        description:
          "Implantar Centros de Convivência como dispositivos estratégicos da Rede de Atenção Psicossocial.",
        indicator:
          "Percentual de Centros de Convivência implantados conforme planejamento da RAPS.",
        unitLabel: "% dos centros previstos",
        baseline2025: "0%",
        target2026: "70%",
        plan2026to2029: "80%",
        sourcePages: "PDF, página 13",
        actions: [
          "Planejar e estruturar os Centros de Convivência.",
          "Implantar e integrar os Centros de Convivência à rede de saúde mental.",
          "Desenvolver atividades de inclusão social, cultura e promoção da saúde mental.",
        ],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.33",
        objective: "1.3",
        title: "Centros de avaliação diagnóstica multiprofissional",
        description:
          "Implantar centros para TDAH, TEA, deficiência intelectual e outras condições do neurodesenvolvimento.",
        indicator:
          "Percentual de centros de avaliação diagnóstica multiprofissional implantados conforme planejamento.",
        unitLabel: "% dos centros previstos",
        baseline2025: "0%",
        target2026: "25%",
        plan2026to2029: "100%",
        sourcePages: "PDF, página 13",
        actions: [
          "Planejar e estruturar os centros de avaliação diagnóstica.",
          "Realizar diagnóstico da demanda reprimida por avaliação.",
          "Implantar e operacionalizar os centros de avaliação.",
          "Integrar com APS, regulação e serviços de reabilitação para continuidade do cuidado.",
        ],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.38",
        objective: "1.3",
        title: "Serviços multiprofissionais infantojuvenis",
        description:
          "Criar serviços multiprofissionais específicos para atenção à saúde infantojuvenil.",
        indicator:
          "Percentual de serviços multiprofissionais infantojuvenis implantados conforme planejamento.",
        unitLabel: "% dos serviços previstos",
        baseline2025: "0%",
        target2026: "25%",
        plan2026to2029: "100%",
        sourcePages: "PDF, página 13",
        actions: [
          "Planejar e estruturar os serviços multiprofissionais infantojuvenis.",
          "Realizar diagnóstico da demanda.",
          "Implantar e integrar os serviços à rede de atenção à saúde.",
        ],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.41",
        objective: "1.3",
        title: "Unidade de Acolhimento Infantojuvenil",
        description:
          "Implantar Unidade de Acolhimento Infantojuvenil no âmbito da Rede de Atenção Psicossocial.",
        indicator:
          "Percentual de implantação da Unidade de Acolhimento Infantojuvenil.",
        unitLabel: "% da implantação prevista",
        baseline2025: "0%",
        target2026: "25%",
        plan2026to2029: "100%",
        sourcePages: "PDF, página 14",
        actions: [
          "Planejar e estruturar a Unidade de Acolhimento Infantojuvenil.",
          "Elaborar projeto técnico.",
          "Implantar e integrar a unidade à rede de saúde mental.",
        ],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.23",
        objective: "1.3",
        title: "Práticas Integrativas e Complementares (PICS)",
        description: "Ampliar e descentralizar as Práticas Integrativas e Complementares.",
        indicator: "Número de serviços com PICS.",
        unitLabel: "serviços",
        baseline2025: "1",
        target2026: "3",
        plan2026to2029: "7",
        sourcePages: "PDF, página 12",
        actions: ["Ampliar serviço.", "Capacitar equipes."],
        responsible: null,
        realized: null,
      },
    ],
  },
  {
    id: "territorio",
    title: "Cuidado territorial e continuidade",
    description:
      "Metas sobre acompanhamento no território, articulação entre serviços e qualificação do cuidado.",
    goals: [
      {
        code: "1.3.17",
        objective: "1.3",
        title: "Mortalidade por suicídio",
        description: "Reduzir a taxa de mortalidade por suicídio.",
        indicator: "Óbitos por suicídio por 100 mil habitantes.",
        unitLabel: "óbitos por 100 mil habitantes",
        baseline2025: "7,31",
        target2026: "7,00",
        plan2026to2029: "5,00",
        sourcePages: "PDF, página 12",
        actions: ["Realizar campanha.", "Capacitar equipes."],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.16",
        objective: "1.3",
        title: "Visitas domiciliares em saúde mental",
        description: "Ampliar a cobertura de visitas domiciliares em saúde mental.",
        indicator: "% de usuários acompanhados com visita domiciliar.",
        unitLabel: "% dos usuários acompanhados",
        baseline2025: "10,74%",
        target2026: "20%",
        plan2026to2029: "80%",
        sourcePages: "PDF, página 12",
        actions: [
          "Mapear território.",
          "Atualizar dados e avaliar casos prioritários.",
        ],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.28",
        objective: "1.3",
        title: "Matriciamento em saúde mental na Atenção Primária",
        description:
          "Ampliar o matriciamento em saúde mental entre CAPS e equipes da Atenção Primária.",
        indicator:
          "Percentual de equipes da Atenção Primária que recebem matriciamento em Saúde Mental.",
        unitLabel: "% das equipes da Atenção Primária",
        baseline2025: "40%",
        target2026: "50%",
        plan2026to2029: "80%",
        sourcePages: "PDF, página 12",
        actions: ["Realizar reuniões.", "Registrar ações."],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.29",
        objective: "1.3",
        title: "Acompanhamento territorial de egressos de internação psiquiátrica",
        description:
          "Promover a desinstitucionalização e a reinserção social, priorizando o cuidado em liberdade e no território.",
        indicator:
          "Percentual de usuários egressos de internação psiquiátrica acompanhados pela RAPS no território.",
        unitLabel: "% dos usuários egressos acompanhados",
        baseline2025: "40%",
        target2026: "50%",
        plan2026to2029: "80%",
        sourcePages: "PDF, página 12",
        actions: [
          "Identificar e acompanhar usuários com longa permanência em internação psiquiátrica.",
          "Elaborar e executar plano de alta articulado entre CAPS, APS e rede hospitalar.",
          "Fortalecer a reinserção social e a autonomia dos usuários no território.",
        ],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.1",
        objective: "1.3",
        title: "Supervisão clínico-institucional nos CAPS",
        description:
          "Garantir supervisão clínico-institucional permanente para todas as modalidades dos CAPS.",
        indicator: "% de CAPS com supervisão.",
        unitLabel: "% dos CAPS",
        baseline2025: "35%",
        target2026: "50%",
        plan2026to2029: "100%",
        sourcePages: "PDF, página 11",
        actions: ["Implantar supervisão clínica.", "Registrar encontros."],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.6",
        objective: "1.3",
        title: "Acolhimento ao sofrimento psíquico na Atenção Primária",
        description: "Capacitar a Atenção Primária em acolhimento ao sofrimento psíquico.",
        indicator: "% de profissionais capacitados.",
        unitLabel: "% dos profissionais da APS",
        baseline2025: "30%",
        target2026: "50%",
        plan2026to2029: "100%",
        sourcePages: "PDF, página 11",
        actions: ["Realizar capacitações.", "Avaliar participação."],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.9",
        objective: "1.3",
        title: "Capacitação em redução de danos",
        description: "Capacitar profissionais em redução de danos.",
        indicator: "% de profissionais capacitados.",
        unitLabel: "% dos profissionais",
        baseline2025: "20%",
        target2026: "50%",
        plan2026to2029: "100%",
        sourcePages: "PDF, página 11",
        actions: ["Implementar estratégias.", "Monitorar ações."],
        responsible: null,
        realized: null,
      },
    ],
  },
  {
    id: "inclusao",
    title: "Inclusão, trabalho e prevenção",
    description:
      "Iniciativas complementares previstas para suporte de pares, saúde do trabalhador e moradia.",
    goals: [
      {
        code: "1.3.25",
        objective: "1.3",
        title: "Programa de Suporte de Pares",
        description:
          "Implantar o Programa de Suporte de Pares com garantia de financiamento.",
        indicator: "Programa implantado.",
        unitLabel: "programa",
        baseline2025: "0",
        target2026: "1",
        plan2026to2029: "1",
        sourcePages: "PDF, página 12",
        actions: [
          "Elaborar projeto técnico.",
          "Definir critérios para seleção de pares apoiadores.",
          "Mapear serviços da RAPS que integrarão o programa.",
          "Instituir grupo de trabalho intersetorial.",
        ],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.34",
        objective: "1.3",
        title: "Saúde mental de trabalhadores",
        description:
          "Implantar políticas estruturadas de cuidado à saúde mental dos trabalhadores.",
        indicator:
          "Percentual de implantação das ações previstas na política de saúde mental do trabalhador.",
        unitLabel: "% das ações previstas",
        baseline2025: "0%",
        target2026: "20%",
        plan2026to2029: "80%",
        sourcePages: "PDF, página 13",
        actions: [
          "Elaborar e instituir a política municipal de saúde mental do trabalhador.",
          "Realizar diagnóstico das condições de saúde mental dos trabalhadores.",
          "Implantar ações de cuidado e promoção da saúde mental no trabalho.",
        ],
        responsible: null,
        realized: null,
      },
      {
        code: "1.3.40",
        objective: "1.3",
        title: "Estratégias de moradia para usuários da RAPS",
        description:
          "Articular políticas habitacionais para reabilitação psicossocial e inclusão social de usuários em situação de vulnerabilidade habitacional.",
        indicator:
          "Percentual de usuários da RAPS em vulnerabilidade habitacional inseridos em estratégias de moradia.",
        unitLabel: "% dos usuários elegíveis",
        baseline2025: "0%",
        target2026: "25%",
        plan2026to2029: "100%",
        sourcePages: "PDF, páginas 13–14",
        actions: [
          "Articular políticas intersetoriais de moradia para usuários da saúde mental.",
          "Pactuar fluxos e critérios de acesso intersetoriais.",
          "Acompanhar e apoiar usuários inseridos em estratégias de moradia.",
        ],
        responsible: null,
        realized: null,
      },
    ],
  },
] ;

const transcribedGoalsByCode = new Map(
  transcribedGoalGroups.flatMap(group =>
    group.goals.map(goal => [goal.code, goal] as const)
  )
);

function transcribedGoal(code: string): HealthPlanGoal {
  const goal = transcribedGoalsByCode.get(code);
  if (!goal) throw new Error(`Meta PAS não encontrada: ${code}`);
  return goal;
}

const userPriorityNote =
  "Prioridade indicada pelo usuário; fonte oficial, definição, período e situação aguardam validação.";

export const healthPlanGoalGroups: readonly HealthPlanGoalGroup[] = [
  {
    id: "expansao",
    title: "Expansão da rede",
    description:
      "Implantações e ampliação planejadas para serviços e dispositivos de cuidado.",
    goals: transcribedGoalGroups[0].goals,
    priorities: [],
  },
  {
    id: "acesso",
    title: "Acesso e continuidade",
    description:
      "Acompanhamento no território, transições de cuidado e acesso oportuno.",
    goals: [
      transcribedGoal("1.3.16"),
      transcribedGoal("1.3.28"),
      transcribedGoal("1.3.29"),
    ],
    priorities: [
      {
        id: "espera-primeiro-atendimento",
        title: "Espera pelo primeiro atendimento",
        detail:
          "Acompanhar o intervalo entre a procura e o primeiro acolhimento, após definir unidade de medida, período e método de cálculo.",
        sourceNote: userPriorityNote,
      },
      {
        id: "continuidade-alta-caps",
        title: "Continuidade do cuidado após alta dos CAPS",
        detail:
          "Acompanhar os encaminhamentos e a continuidade territorial após a alta, com critérios e denominador a validar.",
        sourceNote: userPriorityNote,
      },
    ],
  },
  {
    id: "qualidade",
    title: "Qualidade do cuidado, inclusão e prevenção",
    description:
      "Qualificação das práticas, cuidado em liberdade, inclusão social e prevenção.",
    goals: [
      transcribedGoal("1.3.17"),
      transcribedGoal("1.3.1"),
      transcribedGoal("1.3.6"),
      transcribedGoal("1.3.9"),
      ...transcribedGoalGroups[2].goals,
    ],
    priorities: [
      {
        id: "projetos-terapeuticos",
        title: "Projetos Terapêuticos Singulares (PTS)",
        detail:
          "Acompanhar a elaboração e revisão de PTS sem expor informação clínica ou identificável de pessoas usuárias.",
        sourceNote: userPriorityNote,
      },
      {
        id: "satisfacao-pessoas-usuarias",
        title: "Satisfação das pessoas usuárias",
        detail:
          "Definir instrumento, participação, periodicidade e forma agregada de publicação antes de apresentar resultados.",
        sourceNote: userPriorityNote,
      },
      {
        id: "protocolo-violencia-autoprovocada",
        code: "4.1.44",
        title: "Protocolo municipal de atendimento à violência autoprovocada",
        detail:
          "Escopo informado: protocolo que inclua automutilação e tentativas de suicídio. A referência recebida indica implantar um protocolo; base, período, página e meta final não foram informados.",
        userReportedTarget: "Implantar 1 protocolo (informado pelo usuário)",
        sourceNote:
          "Código e previsão fornecidos pelo usuário; não conferidos diretamente na PAS ou em outro documento oficial.",
      },
    ],
  },
  {
    id: "informacao",
    title: "Informação pública",
    description:
      "Transparência, comunicação pública e acompanhamento das iniciativas de informação.",
    goals: [],
    priorities: [
      {
        id: "implantacao-observatorio",
        title: "Implantação do Observatório",
        detail:
          "Acompanhar etapas, produtos e responsáveis após haver critérios e fonte documental aprovados.",
        sourceNote: userPriorityNote,
      },
      {
        id: "boletins-publicos",
        title: "Boletins públicos",
        detail:
          "Definir periodicidade, conteúdo, fontes, responsável editorial e evidências de publicação.",
        sourceNote: userPriorityNote,
      },
      {
        id: "painel-indicadores",
        title: "Painel de indicadores",
        detail:
          "Documentar indicadores, períodos, definições, fontes, responsáveis e atualização antes de reportar séries.",
        sourceNote: userPriorityNote,
      },
      {
        id: "colaboratorio",
        title: "Andamento do Colaboratório",
        detail:
          "Acompanhar o andamento quando forem confirmados objetivo, etapas, governança e registros públicos da iniciativa.",
        sourceNote: userPriorityNote,
      },
    ],
  },
];

export const allHealthPlanGoals = healthPlanGoalGroups.flatMap(
  group => group.goals
);

export const allMonitoringPriorities = healthPlanGoalGroups.flatMap(
  group => group.priorities ?? []
);
