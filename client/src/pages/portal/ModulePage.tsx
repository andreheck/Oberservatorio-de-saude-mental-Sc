import { useState } from "react";
import { Link } from "wouter";
import {
  Accessibility,
  ArrowUpRight,
  FileText,
  Info,
  Users,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import DocumentsManager from "@/components/portal/DocumentsManager";
import { modules, PortalRecord } from "@shared/portal";
import {
  Empty,
  ExportButton,
  Filters,
  Notice,
  PageHeading,
  RecordCard,
  SourceNote,
} from "@/components/portal/Common";
const statuses: Record<string, string[]> = {
  requests: [
    "Em elaboração",
    "Aguardando aprovação",
    "Enviada",
    "Recebimento não confirmado",
    "Aguardando resposta",
    "Respondida parcialmente",
    "Respondida",
    "Em análise pela comissão",
    "Providência em andamento",
    "Concluída",
    "Arquivada",
    "Reaberta",
  ],
  inspections: [
    "Planejada",
    "Agendada",
    "Realizada",
    "Relatório em elaboração",
    "Relatório publicado",
    "Encaminhamentos em acompanhamento",
    "Providências parcialmente realizadas",
    "Concluída",
    "Suspensa ou cancelada",
  ],
  actions: [
    "Anunciada",
    "Planejada",
    "Em implementação",
    "Em execução",
    "Parcialmente implementada",
    "Concluída com evidências",
    "Suspensa",
    "Sem atualização recente",
    "Não foi possível verificar",
  ],
};
export default function ModulePage({ module }: { module: string }) {
  const m = modules.find(x => x.key === module)!;
  const [search, setSearch] = useState(""),
    [status, setStatus] = useState("");
  const q = trpc.portal.list.useQuery({ module, search, status });
  const records = (q.data || []) as PortalRecord[];
  return (
    <div className="content-page">
      <PageHeading title={m.title} description={m.description}>
        <ExportButton
          records={records}
          filename={`${module}-observatorio.csv`}
        />
      </PageHeading>
      {module === "members" && (
        <>
          <div className="text-panel">
            <div className="eyebrow">PARTICIPAÇÃO SOCIAL NO SUS</div>
            <h2 style={{ marginTop: 14 }}>
              Comissão Intersetorial de Saúde Mental
            </h2>
            <p>
              Esta iniciativa acompanha e divulga registros relacionados à
              atuação da Comissão Intersetorial de Saúde Mental (CISM) no
              Conselho Municipal de Saúde de Itajaí (COMUSA). A formalização, as
              competências e a composição precisam ser confirmadas com os
              documentos institucionais atuais.
            </p>
            <p>
              O observatório não presume representar oficialmente o conselho.
              Não publicamos nomes, cargos, fotografias ou qualificações de
              membros sem cadastro, revisão e autorização adequados.
            </p>
          </div>
          <Notice title="Composição aguardando confirmação institucional">
            A lista oficial de membros ainda não foi cadastrada e validada. Os
            perfis podem ser preparados na área de gestão, com biografias
            factuais e fotografias autorizadas.
          </Notice>
          <figure className="commission-visual">
            <div className="commission-art" aria-hidden="true">
              <span className="commission-paper commission-paper-coral" />
              <span className="commission-paper commission-paper-yellow" />
              <span className="commission-paper commission-paper-teal" />
              <span className="commission-art-icon">
                <Users size={43} />
              </span>
              <span className="commission-art-icon commission-access-icon">
                <Accessibility size={35} />
              </span>
            </div>
            <figcaption>
              Composição abstrata sobre participação e acessibilidade; não
              retrata membros reais da comissão.
            </figcaption>
          </figure>
        </>
      )}
      {module === "requests" && (
        <>
          <div className="request-stats">
            {["Em acompanhamento", "Sem resposta registrada", "Concluídas"].map(
              (t, i) => (
                <div className="panel" key={t}>
                  <span style={{ fontSize: 10 }}>{t}</span>
                  <strong>
                    {records.length
                      ? records.filter(r =>
                          i === 0
                            ? !["Concluída", "Arquivada"].includes(r.status)
                            : i === 1
                              ? !!r.data.sentAt && !r.data.responseAt
                              : r.status === "Concluída"
                        ).length
                      : "—"}
                  </strong>
                  <p>
                    {records.length
                      ? "Registros nesta consulta"
                      : "Dados em levantamento"}
                  </p>
                </div>
              )
            )}
          </div>
          <Notice title="Prazos dependem de regras documentadas">
            “Sem resposta registrada no portal” não significa que o órgão não
            respondeu. Um prazo só é indicado como transcorrido quando sua base,
            termo inicial e situação de resposta estão verificados.
          </Notice>
        </>
      )}
      {module === "inspections" && (
        <Notice title="Evidências, não julgamentos antecipados">
          Os registros distinguem fatos observados, relatos, hipóteses e
          recomendações. Documentos e fotografias só são divulgados após
          revisão, sem identificar usuários da rede ou informações clínicas.
        </Notice>
      )}
      {module === "actions" && (
        <Notice title="Anúncio não é execução comprovada">
          Uma ação só pode ser considerada concluída com evidências documentais.
          O histórico das diferentes gestões deve ser preservado.
        </Notice>
      )}
      {module === "communities" && (
        <Notice title="Objetos, valores e resultados comprováveis">
          A existência de um repasse não presume irregularidade. Comunidades
          terapêuticas não são equivalentes a CAPS, serviços hospitalares ou
          outros equipamentos da RAPS.
        </Notice>
      )}
      {module === "workforce" && (
        <Notice title="Dados agregados, privacidade preservada">
          Vagas previstas, vínculos contratados e profissionais efetivamente
          disponíveis são informações diferentes. A distribuição de psicólogos,
          psiquiatras e outras categorias aguarda documentação atual.
        </Notice>
      )}
      {module === "documents" && (
        <Notice title="Documentos internos não são públicos automaticamente">
          A biblioteca exibe apenas registros revisados e autorizados. Origem,
          versão, data e nível de acesso acompanham os documentos quando
          disponíveis.
        </Notice>
      )}
      {module === "neighborhoods" && (
        <Notice title="Lacunas de informação não são prova de desassistência">
          A distribuição de equipamentos deve ser analisada junto aos fluxos de
          referência, cobertura regionalizada e acesso. Limites oficiais de
          bairros e indicadores populacionais ainda aguardam fonte validada.
        </Notice>
      )}
      <Filters
        search={search}
        onSearch={setSearch}
        status={status}
        onStatus={setStatus}
        options={
          statuses[module] || ["Verificado", "Em acompanhamento", "Concluída"]
        }
      />
      <div className="results-label">
        {records.length
          ? `${records.length} registro(s) público(s) nesta consulta`
          : "Nenhum registro público validado nesta consulta"}
      </div>
      {q.isLoading ? (
        <div className="loading-line">Consultando registros...</div>
      ) : q.error ? (
        <Notice title="Não foi possível consultar a base">
          A conexão com os registros está indisponível. Não substituímos essa
          falha por dados estimados. Tente novamente mais tarde.
        </Notice>
      ) : records.length ? (
        module === "timeline" ? (
          <div className="text-panel">
            <div className="event-list">
              {[...records]
                .sort(
                  (a, b) =>
                    new Date(b.data.occurredAt || b.updatedAt).getTime() -
                    new Date(a.data.occurredAt || a.updatedAt).getTime()
                )
                .map(r => (
                  <div className="event-item" key={r.id}>
                    <strong>
                      {new Date(
                        r.data.occurredAt || r.updatedAt
                      ).toLocaleDateString("pt-BR")}
                    </strong>
                    <RecordCard record={r} />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="cards-grid">
            {records.map(r => (
              <RecordCard key={r.id} record={r} />
            ))}
          </div>
        )
      ) : (
        <Empty
          title={
            module === "documents"
              ? "Biblioteca aguardando documentos autorizados"
              : module === "members"
                ? "Perfis aguardando cadastro e validação"
                : module === "timeline"
                  ? "História aguardando registros documentados"
                  : "Dados em levantamento"
          }
          text={
            module === "timeline"
              ? "Reuniões, ofícios, inspeções e conquistas aparecerão após cadastro e revisão. Não criamos eventos fictícios."
              : "Os registros serão exibidos após cadastro, validação das fontes e autorização de publicação."
          }
          icon={module === "documents" ? "file" : "data"}
        />
      )}
      {module === "documents" && <DocumentsManager />}
      <SourceNote
        source={
          records.length
            ? "Fontes documentais indicadas em cada ficha"
            : "Registros do observatório"
        }
        period={
          records.length
            ? "Períodos indicados em cada registro"
            : "Aguardando definição"
        }
        date={
          records.length
            ? new Date(records[0].updatedAt).toLocaleDateString("pt-BR")
            : "Sem dados validados"
        }
      />
      {module === "neighborhoods" && (
        <Link
          href="/mapa-raps"
          className="button button-secondary"
          style={{ marginTop: 15 }}
        >
          Consultar base territorial <ArrowUpRight size={15} />
        </Link>
      )}
    </div>
  );
}
export { statuses };
