import { useMemo, useState } from "react";
import { ArrowDownToLine, BarChart3, Printer } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { PortalRecord } from "@shared/portal";
import { filterFinancialRecords, sumFinancialStage } from "@shared/portalData";
import {
  Empty,
  ExportButton,
  Filters,
  Notice,
  PageHeading,
  SourceNote,
} from "@/components/portal/Common";
const stages = [
  ["announced", "Valor anunciado"],
  ["initial", "Dotação inicial"],
  ["authorized", "Orçamento autorizado"],
  ["transferred", "Valor transferido"],
  ["committed", "Valor empenhado"],
  ["liquidated", "Valor liquidado"],
  ["paid", "Valor efetivamente pago"],
  ["payables", "Restos a pagar"],
  ["municipal", "Contrapartida municipal"],
];
export default function Budget() {
  const [search, setSearch] = useState(""),
    [year, setYear] = useState("2026"),
    [sphere, setSphere] = useState(""),
    [tab, setTab] = useState("Panorama");
  const q = trpc.portal.list.useQuery({ module: "budget", search });
  const records = (q.data || []) as PortalRecord[];
  const filtered = useMemo(
    () => filterFinancialRecords(records, year, sphere),
    [records, year, sphere]
  );
  return (
    <div className="content-page">
      <PageHeading
        title="Dados e orçamento"
        description="Financiamento da saúde mental, com origem dos recursos e cada etapa da execução orçamentária em separado."
      >
        <div className="admin-actions">
          <ExportButton
            records={filtered}
            filename={`orcamento-saude-mental-${year}.csv`}
          />
          <button
            className="button button-secondary"
            onClick={() => window.print()}
          >
            <Printer size={15} /> Relatório / PDF
          </button>
        </div>
      </PageHeading>
      <Notice title="Nenhum valor sem fonte verificável">
        Os dados financeiros específicos da saúde mental de Itajaí estão em
        levantamento. Despesas gerais da saúde não são automaticamente
        classificadas como investimento em saúde mental.
      </Notice>
      {records.some(r => !r.data.year) && (
        <Notice title="Registros sem exercício definido">
          Lançamentos sem ano documentado não entram no exercício selecionado
          nem em seus totais.
        </Notice>
      )}
      <Filters
        search={search}
        onSearch={setSearch}
        extra={
          <>
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              aria-label="Ano de referência"
            >
              {["2026", "2025", "2024", "2023", "2022"].map(y => (
                <option key={y}>{y}</option>
              ))}
            </select>
            <select
              value={sphere}
              onChange={e => setSphere(e.target.value)}
              aria-label="Esfera governamental"
            >
              <option value="">Todas as esferas</option>
              <option>Municipal</option>
              <option>Estadual</option>
              <option>Federal</option>
            </select>
          </>
        }
      />
      <div className="tabs" role="tablist" aria-label="Visualização financeira">
        {[
          "Panorama",
          "Série histórica",
          "Transferências",
          "Registros detalhados",
        ].map(t => (
          <button
            role="tab"
            aria-selected={tab === t}
            key={t}
            className={tab === t ? "selected" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Panorama" ? (
        <>
          <div className="budget-cards">
            {stages.map(([key, label]) => {
              const data = filtered.filter(
                r => r.data.stage === key && typeof r.data.amount === "number"
              );
              const value = sumFinancialStage(filtered, key);
              return (
                <div className="budget-metric" key={key}>
                  <span>{label}</span>
                  <strong>
                    {value === null
                      ? "—"
                      : value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                  </strong>
                  <small>
                    {value === null
                      ? data.length
                        ? "Agregação indisponível: conferir identificadores"
                        : "Dados em levantamento"
                      : `Soma de ${data.length} registro(s) identificado(s) · ${year}`}
                  </small>
                </div>
              );
            })}
          </div>
          <div className="two-columns">
            <div className="panel">
              <h2 style={{ fontSize: 17 }}>Evolução da execução</h2>
              <div className="chart-empty">
                <BarChart3 size={29} />
                <strong>Base comparável ainda não validada</strong>
                <span>Não exibimos séries estimadas.</span>
              </div>
              <SourceNote period={year} />
            </div>
            <div className="panel">
              <h2 style={{ fontSize: 17 }}>Composição das despesas</h2>
              <div className="chart-empty">
                <BarChart3 size={29} />
                <strong>Classificação em levantamento</strong>
                <span>Despesa específica de saúde mental.</span>
              </div>
              <SourceNote period={year} />
            </div>
          </div>
        </>
      ) : tab === "Registros detalhados" || tab === "Transferências" ? (
        filtered.filter(
          r => tab !== "Transferências" || r.data.stage === "transferred"
        ).length ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Etapa</th>
                  <th>Valor documentado</th>
                  <th>Fonte</th>
                </tr>
              </thead>
              <tbody>
                {filtered
                  .filter(
                    r =>
                      tab !== "Transferências" || r.data.stage === "transferred"
                  )
                  .map(r => (
                    <tr key={r.id}>
                      <td>{r.title}</td>
                      <td>
                        {stages.find(s => s[0] === r.data.stage)?.[1] ||
                          "Não classificado"}
                      </td>
                      <td>
                        {typeof r.data.amount === "number"
                          ? r.data.amount.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "Não informado"}
                      </td>
                      <td>
                        <a href={r.sourceUrl} target="_blank" rel="noreferrer">
                          {r.sourceName}
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty
            title="Nenhum registro financeiro publicado"
            text="As importações entram como rascunho e precisam de validação antes de aparecer aqui."
          />
        )
      ) : (
        <Empty
          title="Série histórica em levantamento"
          text="A comparação entre exercícios requer bases e definições compatíveis. Não interpolamos valores ausentes."
        />
      )}
      <SourceNote period={year} />
      <div className="text-panel" style={{ marginTop: 20 }}>
        <h2>Orçamento não é despesa paga.</h2>
        <p>
          Valor anunciado é uma comunicação pública; orçamento autorizado é a
          previsão vigente; transferência é ingresso de recurso. Empenho
          registra o compromisso, liquidação confirma o direito ao pagamento e
          pagamento registra a saída financeira. São etapas diferentes, não
          despesas independentes.
        </p>
        <p>
          Não somamos transferências recebidas com a despesa que elas
          financiaram. Sem classificação e identificadores compatíveis, nenhum
          total financeiro deve ser interpretado como o investimento integral em
          saúde mental.
        </p>
      </div>
    </div>
  );
}
