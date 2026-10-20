import {
  ArrowDownToLine,
  ArrowUpRight,
  Database,
  ExternalLink,
  Info,
} from "lucide-react";
import {
  buildPopulationAgeCsv,
  cityDataConsultedAt,
  cityIndicators,
  ibgeSources,
  populationByAge,
  populationTotal,
  transparencySnapshot,
  transparencySources,
} from "@shared/cityData";
import {
  Notice,
  PageHeading,
  SectionTitle,
  SourceNote,
} from "@/components/portal/Common";

function downloadAgeCsv() {
  const blob = new Blob(["\uFEFF", buildPopulationAgeCsv()], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "itajai-populacao-faixa-etaria-censo-2022.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function CityData() {
  const maxPopulation = Math.max(...populationByAge.map(item => item.count));

  return (
    <div className="content-page">
      <PageHeading
        eyebrow="CENTRO DE DADOS · FONTES OFICIAIS"
        title="Itajaí em dados"
        description="Um ponto de partida para compreender o território, a saúde pública e os recursos do município — com origem, período e limites de cada informação à vista."
      >
        <button className="button button-secondary" onClick={downloadAgeCsv}>
          <ArrowDownToLine size={16} /> Exportar população por idade
        </button>
      </PageHeading>

      <Notice title="Contexto não é diagnóstico nem retrato da saúde mental">
        Os indicadores demográficos e de saúde geral ajudam a contextualizar a
        cidade; não medem, por si só, necessidades de saúde mental, cobertura da
        RAPS ou desempenho dos serviços. Cada número mantém seu próprio período
        e conceito.
      </Notice>

      <section aria-labelledby="perfil-itajai">
        <SectionTitle
          number="01"
          title="Perfil municipal"
          subtitle="Indicadores oficiais com anos de referência diferentes."
        />
        <div className="metric-grid city-indicator-grid" id="perfil-itajai">
          {cityIndicators.map(indicator => (
            <article
              className="metric-card city-indicator"
              key={indicator.label}
            >
              <div className="metric-top">
                <span className="city-domain">{indicator.domain}</span>
                <a
                  href={indicator.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir fonte: ${indicator.sourceName}`}
                >
                  <ExternalLink size={16} />
                </a>
              </div>
              <div className="city-indicator-value">{indicator.value}</div>
              <h3>{indicator.label}</h3>
              <p>{indicator.unit}</p>
              <div className="city-indicator-meta">
                <strong>Referência: {indicator.period}</strong>
                <span>{indicator.note}</span>
                <a href={indicator.sourceUrl} target="_blank" rel="noreferrer">
                  {indicator.sourceName} <ArrowUpRight size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <SourceNote
          source="IBGE Cidades e Estados; IBGE Cidades@; IBGE SIDRA"
          period="Conforme indicado em cada cartão"
          date={`Consulta das fontes: ${cityDataConsultedAt}`}
        />
      </section>

      <section className="two-columns city-data-columns">
        <div className="panel city-age-panel">
          <div className="city-panel-heading">
            <div>
              <span className="eyebrow">
                CENSO DEMOGRÁFICO 2022 · SIDRA 9514
              </span>
              <h2>População por faixa etária</h2>
              <p>
                Distribuição em grupos de cinco anos; total reconciliado com o
                Censo.
              </p>
            </div>
            <span className="city-total">
              {populationTotal.toLocaleString("pt-BR")} pessoas
            </span>
          </div>
          <div className="city-age-legend" aria-hidden="true">
            <span>Faixa etária</span>
            <span>Escala relativa</span>
            <span>Pessoas</span>
            <span>Parte do total</span>
          </div>
          <ol
            className="city-age-list"
            aria-label="População residente por faixa etária, Censo 2022"
          >
            {populationByAge.map(({ label, count }) => {
              const percent = (count / populationTotal) * 100;
              const percentLabel =
                percent < 0.1 && percent > 0
                  ? percent.toFixed(3)
                  : percent.toFixed(1);
              return (
                <li className="city-age-row" key={label}>
                  <span>{label}</span>
                  <span
                    className="city-age-track"
                    role="img"
                    aria-label={`${count.toLocaleString("pt-BR")} pessoas; ${percent.toFixed(2).replace(".", ",")}% do total`}
                  >
                    <span
                      style={{ width: `${(count / maxPopulation) * 100}%` }}
                    />
                  </span>
                  <strong>{count.toLocaleString("pt-BR")}</strong>
                  <span>{percentLabel.replace(".", ",")}%</span>
                </li>
              );
            })}
          </ol>
          <SourceNote
            source="IBGE SIDRA · agregado 9514, variável 93, sexo total, idade (grupos de nível 1)"
            period="2022 · Município 4208203 · Pessoas"
            date={`Consulta: ${cityDataConsultedAt}`}
          />
          <a
            className="text-link"
            href={ibgeSources.sidraAge}
            target="_blank"
            rel="noreferrer"
          >
            Abrir consulta bruta no SIDRA <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="panel city-health-panel">
          <div className="city-panel-heading">
            <div>
              <span className="eyebrow">TRANSPARÊNCIA MUNICIPAL</span>
              <h2>Transparência municipal · Saúde</h2>
              <p>
                Totais do painel municipal e um indicador separado do resumo
                oficial.
              </p>
            </div>
            <Database size={22} aria-hidden="true" />
          </div>
          <div className="city-finance-list">
            <div>
              <span>Arrecadação total</span>
              <strong>{transparencySnapshot.revenue}</strong>
            </div>
            <div>
              <span>Despesas liquidadas</span>
              <strong>{transparencySnapshot.liquidatedExpenses}</strong>
            </div>
          </div>
          <div className="city-health-highlight">
            <span>Cartão “Despesas com Saúde”, exatamente como exibido</span>
            <strong>{transparencySnapshot.healthExpenseAsDisplayed}</strong>
            <small>
              Percentual exibido pelo portal:{" "}
              {transparencySnapshot.healthShareAsDisplayed} · referência
              exibida: {transparencySnapshot.minimumShareAsDisplayed}.
              Denominador não confirmado.
            </small>
          </div>
          <p className="city-caveat">
            Período exibido: {transparencySnapshot.period}. O painel não informa
            a composição, a etapa financeira ou o denominador dos{" "}
            {transparencySnapshot.healthShareAsDisplayed}; esse percentual não
            deve ser interpretado como fração das despesas liquidadas acima. O
            cartão também não é valor pago, gasto específico em saúde mental ou
            base para comparar programas. Consulte a despesa detalhada antes de
            qualquer conclusão.
          </p>
          <SourceNote
            source="Portal da Transparência de Itajaí · painel inicial"
            period={transparencySnapshot.period}
            date={`Painel informado em ${transparencySnapshot.sourceUpdatedAt}; consulta ${transparencySnapshot.collectedAt}`}
          />
          <div className="city-source-links">
            <a href={transparencySources.home} target="_blank" rel="noreferrer">
              Abrir Portal da Transparência <ArrowUpRight size={14} />
            </a>
            <a
              href={transparencySources.detailedExpenses}
              target="_blank"
              rel="noreferrer"
            >
              Consultar despesa detalhada <ArrowUpRight size={14} />
            </a>
            <a
              href={transparencySources.expenseOpenData}
              target="_blank"
              rel="noreferrer"
            >
              Ver documentação dos dados abertos <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="two-columns city-data-columns">
        <div className="panel city-plan-panel">
          <span className="eyebrow">PLANEJAMENTO DO SUS</span>
          <h2>Metas e previsões — PAS 2026</h2>
          <p>
            As metas, indicadores e previsões anuais serão adicionados após
            conferência do documento oficial legível. Nesta versão, os valores
            planejados não estão carregados; nenhum número foi inferido.
          </p>
          <div className="city-plan-status">
            <Info size={17} />
            <div>
              <strong>Em levantamento documental</strong>
              <span>Meta prevista: não informada · Realizado: não apurado</span>
            </div>
          </div>
          <p className="city-plan-footnote">
            Quando validada, a página distinguirá meta anual, previsão,
            indicador, unidade, período e evidência de realização.
          </p>
          <a
            className="text-link"
            href={transparencySources.home}
            target="_blank"
            rel="noreferrer"
          >
            Consultar fontes oficiais municipais <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="panel city-method-panel">
          <span className="eyebrow">COMO LER ESTES DADOS</span>
          <h2>Períodos diferentes, perguntas diferentes</h2>
          <ul>
            <li>
              O Censo descreve residentes em 2022; a estimativa IBGE 2026 tem
              referência em 01/07/2026 e não deve ser misturada à distribuição
              etária do Censo. Área, economia e saúde têm referências próprias.
            </li>
            <li>
              O painel municipal é uma fotografia de outubro de 2026; não é uma
              série histórica nem uma atualização automática.
            </li>
            <li>
              Uma despesa do Fundo Municipal de Saúde não é automaticamente
              despesa de saúde mental.
            </li>
            <li>
              Ausência de indicador publicado significa “não informado”, não
              zero nem ausência de serviço.
            </li>
          </ul>
          <a className="text-link" href="/metodologia">
            Ler metodologia e limites <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <section className="city-data-sources" aria-labelledby="fontes-primarias">
        <SectionTitle
          number="02"
          title="Fontes primárias"
          subtitle="Links para conferência, atualização e aprofundamento dos conjuntos apresentados."
        />
        <div className="city-source-grid" id="fontes-primarias">
          <a href={ibgeSources.panorama} target="_blank" rel="noreferrer">
            <span>IBGE · Panorama de Itajaí</span>
            <small>Perfil municipal e indicadores por tema.</small>
            <ArrowUpRight size={15} />
          </a>
          <a
            href={ibgeSources.populationEstimateDou}
            target="_blank"
            rel="noreferrer"
          >
            <span>IBGE · Estimativa populacional 2026 (DOU)</span>
            <small>
              302.247 pessoas · referência 01/07/2026 · estimativa, não contagem
              censitária.
            </small>
            <ArrowUpRight size={15} />
          </a>
          <a href={ibgeSources.sidraDocs} target="_blank" rel="noreferrer">
            <span>IBGE · API de dados agregados</span>
            <small>Documentação técnica das consultas SIDRA.</small>
            <ArrowUpRight size={15} />
          </a>
          <a
            href={transparencySources.expenseOpenData}
            target="_blank"
            rel="noreferrer"
          >
            <span>Prefeitura · dados abertos de execução</span>
            <small>
              Documentação oficial dos parâmetros de período, unidade e
              paginação.
            </small>
            <ArrowUpRight size={15} />
          </a>
        </div>
        <p className="city-data-disclaimer">
          A API aberta da despesa pode incluir dados de favorecidos em seus
          registros. Este portal não replica esses dados pessoais: publica
          apenas indicadores agregados e fontes, após validação.
        </p>
      </section>
    </div>
  );
}
