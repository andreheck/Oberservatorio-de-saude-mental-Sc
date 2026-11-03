import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  FileText,
  Info,
  Target,
} from "lucide-react";
import { PageHeading, SourceNote } from "@/components/portal/Common";
import {
  allHealthPlanGoals,
  allMonitoringPriorities,
  healthPlanGoalGroups,
  healthPlanSource,
  type HealthPlanGoalGroupId,
} from "@shared/healthPlanGoals";

const pasSecondQuadrimesterUrl =
  "https://itajai.sc.gov.br/noticias/37647/saude-de-itajai-presta-contas-do-2%C2%BA-quadrimestre-de-2026";
const pasOverallStatus = [
  { value: "124", label: "Metas alcançadas", tone: "reported" },
  { value: "94", label: "Metas parcialmente alcançadas", tone: "partial" },
  {
    value: "132",
    label: "Não alcançadas ou ainda em análise",
    tone: "pending",
  },
] as const;

type GoalFilter = HealthPlanGoalGroupId | "todas";

const goalFilters: {
  id: GoalFilter;
  label: string;
  count: number;
}[] = [
  {
    id: "todas",
    label: "Todas as frentes",
    count: allHealthPlanGoals.length + allMonitoringPriorities.length,
  },
  ...healthPlanGoalGroups.map(group => ({
    id: group.id,
    label: group.title,
    count: group.goals.length + (group.priorities?.length ?? 0),
  })),
];

export default function HealthPlan() {
  const [activeGroup, setActiveGroup] = useState<GoalFilter>("todas");
  const visibleGroups = healthPlanGoalGroups.filter(
    group => activeGroup === "todas" || group.id === activeGroup
  );
  const visibleGoalCount = visibleGroups.reduce(
    (total, group) => total + group.goals.length,
    0
  );
  const visiblePriorityCount = visibleGroups.reduce(
    (total, group) => total + (group.priorities?.length ?? 0),
    0
  );

  useEffect(() => {
    document.title = "Metas 2026–2029 | Observatório de Saúde Mental (Sul do Brasil)";
  }, []);

  return (
    <div className="content-page health-plan-page">
      <PageHeading
        eyebrow="PROGRAMAÇÃO MUNICIPAL · RECORTE DE SAÚDE MENTAL"
        title="Quatro frentes para acompanhar"
        description="As metas transcritas da PAS ficam separadas das prioridades de monitoramento que ainda precisam de fonte, definição e período confirmados."
      />

      <aside className="plan-source-caveat" aria-label="Limites da fonte da programação">
        <div className="plan-source-caveat-icon" aria-hidden="true">
          <FileText size={21} />
        </div>
        <div>
          <strong>Metas planejadas; execução ainda não informada</strong>
          <p>
            As 18 fichas PAS desta página foram transcritas do DOCX organizado
            enviado pelo usuário em 21/10/2026. O documento indica como fonte
            primária a PAS de Itajaí no DigiSUS Gestor e cita páginas do PDF de
            origem. A equipe ainda não conferiu diretamente esse PDF de 49
            páginas. Nenhum resultado realizado foi incluído.
          </p>
          <a
            href={healthPlanSource.sourceIndexUrl}
            target="_blank"
            rel="noreferrer"
          >
            Consultar o painel do DigiSUS <ArrowUpRight size={14} />
          </a>
        </div>
      </aside>

      <section className="plan-overview" aria-label="Escopo do recorte apresentado">
        <article>
          <strong>{healthPlanSource.representedGoalCount}</strong>
          <span>fichas PAS transcritas, sem resultados realizados</span>
        </article>
        <article>
          <strong>04</strong>
          <span>frentes prioritárias de acompanhamento</span>
        </article>
        <article>
          <strong>—</strong>
          <span>resultados de execução não constam nesta fonte</span>
        </article>
      </section>
      <p className="plan-scope-note">
        O recorte contém 16 metas do objetivo 1.3 e duas metas do objetivo 2.1.
        Não representa as 41 metas de saúde mental do objetivo 1.3 na íntegra.
        As prioridades complementares foram indicadas pelo usuário e não são
        apresentadas como metas oficiais da PAS sem validação documental.
        Os contadores dos filtros somam fichas PAS e prioridades de
        monitoramento; não correspondem ao número de metas oficiais.
      </p>

      <div className="plan-filter-wrap">
        <div
          className="plan-goal-filters"
          role="group"
          aria-label="Filtrar metas e prioridades por frente"
        >
          {goalFilters.map(filter => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeGroup === filter.id}
              className={activeGroup === filter.id ? "selected" : ""}
              onClick={() => setActiveGroup(filter.id)}
            >
              {filter.label}
              <span>{filter.count}</span>
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {visibleGoalCount} fichas PAS e {visiblePriorityCount} prioridades de
          monitoramento exibidas.
        </p>
      </div>

      <div className="plan-timeline-key">
        <Target size={18} aria-hidden="true" />
        <p>
          Os marcos mostram a base de 2025, a meta de 2026 e o alvo do plano
          2026–2029; a posição indica tempo, não progresso realizado. Não foram
          estimados valores para 2027 ou 2028.
        </p>
      </div>

      {visibleGroups.map(group => (
        <section
          className="plan-goal-group"
          key={group.id}
          aria-labelledby={`plan-group-${group.id}`}
        >
          <div className="plan-goal-group-heading">
            <div>
              <span className="eyebrow">
                {String(group.goals.length).padStart(2, "0")} FICHAS PAS ·{" "}
                {String(group.priorities?.length ?? 0).padStart(2, "0")} PRIORIDADES
              </span>
              <h2 id={`plan-group-${group.id}`}>{group.title}</h2>
              <p>{group.description}</p>
            </div>
          </div>

          {group.goals.length > 0 ? (
          <div className="plan-goal-grid">
            {group.goals.map((goal, index) => (
              <article
                className="plan-goal-card"
                key={goal.code}
                style={{ animationDelay: `${index * 45}ms` }}
              >
                <div className="plan-goal-card-topline">
                  <span className="plan-goal-code">{goal.code}</span>
                  <span className="plan-goal-objective">
                    Objetivo {goal.objective}
                  </span>
                </div>
                <h3>{goal.title}</h3>
                <p className="plan-goal-description">{goal.description}</p>

                <div className="plan-goal-indicator">
                  <span className="eyebrow">INDICADOR</span>
                  <p>{goal.indicator}</p>
                  <span className="plan-goal-unit">Unidade: {goal.unitLabel}</span>
                </div>

                <ol
                  className="plan-goal-timeline"
                  aria-label={`Marcos planejados para ${goal.code}: ${goal.title}`}
                >
                  <li>
                    <span className="plan-timeline-year">Base 2025</span>
                    <strong>{goal.baseline2025}</strong>
                  </li>
                  <li className="plan-timeline-current">
                    <span className="plan-timeline-year">Meta 2026</span>
                    <strong>{goal.target2026}</strong>
                  </li>
                  <li>
                    <span className="plan-timeline-year">Plano 2026–2029</span>
                    <strong>{goal.plan2026to2029}</strong>
                  </li>
                </ol>

                <div className="plan-goal-realized">
                  <span>Realizado</span>
                  <strong>Não informado nesta fonte</strong>
                </div>

                <details className="plan-goal-details">
                  <summary>Ações e referência da fonte</summary>
                  <ul>
                    {goal.actions.map((action, actionIndex) => (
                      <li key={`${goal.code}-${actionIndex}`}>{action}</li>
                    ))}
                  </ul>
                  <p>
                    Responsável institucional: não informado neste recorte.
                    <br />
                    Referência indicada: {goal.sourcePages}.
                  </p>
                  <p>
                    Transcrição do DOCX organizado fornecido em
                    {" "}{healthPlanSource.structuredDocumentReceivedAt}; a
                    conferência direta do PDF original continua pendente.
                  </p>
                  <a
                    href={healthPlanSource.sourceIndexUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir painel público do DigiSUS <ArrowUpRight size={13} />
                  </a>
                </details>
              </article>
            ))}
          </div>
          ) : (
            <p className="plan-no-goals">
              Esta frente ainda não tem ficha PAS transcrita. As prioridades
              abaixo não possuem meta quantitativa ou execução confirmada.
            </p>
          )}

          {(group.priorities?.length ?? 0) > 0 && (
            <div
              className="plan-priority-section"
              aria-label={`Prioridades complementares da frente ${group.title}`}
            >
              <div className="plan-priority-heading">
                <span className="eyebrow">MONITORAMENTO A ESTRUTURAR</span>
                <p>
                  Itens indicados pelo usuário. Fonte, definição, período,
                  responsável e situação precisam ser confirmados antes de
                  publicar resultados.
                </p>
              </div>
              <div className="plan-priority-grid">
                {group.priorities?.map((priority, index) => (
                  <article
                    className="plan-priority-card"
                    key={priority.id}
                    style={{ animationDelay: `${index * 45}ms` }}
                  >
                    <div className="plan-priority-topline">
                      <span>PRIORIDADE DE ACOMPANHAMENTO</span>
                      {priority.code && <strong>{priority.code}</strong>}
                    </div>
                    <h3>{priority.title}</h3>
                    <p>{priority.detail}</p>
                    {priority.userReportedTarget && (
                      <p className="plan-priority-target">
                        <strong>Referência informada:</strong>{" "}
                        {priority.userReportedTarget}
                      </p>
                    )}
                    <p className="plan-priority-source">{priority.sourceNote}</p>
                    <span className="plan-priority-status">
                      Não informado · aguardando fonte, definição e período
                    </span>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      <section className="plan-pas-summary" aria-labelledby="pas-geral-titulo">
        <div className="plan-pas-summary-heading">
          <div>
            <span className="eyebrow">PRESTAÇÃO DE CONTAS · 2º QUADRIMESTRE DE 2026</span>
            <h2 id="pas-geral-titulo">
              Panorama geral da Saúde — não é o recorte de saúde mental
            </h2>
            <p>
              A Prefeitura informou estes totais para o conjunto da PAS 2026,
              com referência ao período de maio a agosto. Eles não identificam
              metas de saúde mental.
            </p>
          </div>
          <a href={pasSecondQuadrimesterUrl} target="_blank" rel="noreferrer">
            Fonte oficial <ArrowUpRight size={15} />
          </a>
        </div>
        <div
          className="plan-pas-status-grid"
          role="group"
          aria-label="Situação geral das metas da PAS 2026 reportada pela Prefeitura"
        >
          {pasOverallStatus.map(item => (
            <article
              className={`plan-pas-status-card ${item.tone}`}
              key={item.label}
            >
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
        <p className="plan-pas-summary-note">
          A fonte descreve 132 metas como “não alcançadas ou ainda em análise”.
          Esta prestação de contas geral é apenas contexto e não valida a
          execução das 18 metas de saúde mental acima.
        </p>
      </section>

      <section className="plan-official-actions">
        <div className="eyebrow">
          CONTEXTO DOCUMENTADO — NÃO EQUIVALE A META PAS
        </div>
        <h2>Uma iniciativa reportada pela Prefeitura em maio de 2026</h2>
        <p>
          A publicação municipal de 18/05/2026 informa que a unidade CAPS AD III
          estava em construção no bairro São Vicente, com recursos do PAC
          Federal. O portal registra isso como informação de uma notícia com
          data própria, sem inferir percentual de execução, entrega, valor ou
          meta anual.
        </p>
        <a
          href="https://itajai.sc.gov.br/noticias/36589/semana-da-luta-antimanicomial-mobiliza-rede-de-saude-mental-de-itajai"
          target="_blank"
          rel="noreferrer"
        >
          Consultar a notícia oficial <ArrowUpRight size={15} />
        </a>
      </section>

      <aside className="plan-execution-request">
        <Info size={18} aria-hidden="true" />
        <p>
          Para acompanhar a execução, é necessário um relatório oficial com
          período, valor realizado, unidade, responsável e evidência. Esses
          campos permanecem sem preenchimento até a publicação de fonte própria.
        </p>
      </aside>

      <SourceNote
        source="Metas PAS: DOCX organizado enviado pelo usuário, com DigiSUS Gestor indicado como fonte primária; PDF original ainda não conferido diretamente. Prioridades adicionais: mensagem do usuário, sem conferência documental."
        period="PAS 2026–2029 · linha de base 2025, meta 2026 e alvo do plano"
        date="Documento organizado em 20/10/2026; recebido em 21/10/2026"
      />
    </div>
  );
}
