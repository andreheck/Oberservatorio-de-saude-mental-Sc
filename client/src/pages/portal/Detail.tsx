import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowUpRight, Copy, Printer } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Empty, Notice, PageHeading } from "@/components/portal/Common";
import { modules } from "@shared/portal";
import { toast } from "sonner";
import { DocumentDownload } from "@/components/portal/DocumentsManager";
const labels: Record<string, string> = {
  address: "Endereço institucional",
  neighborhood: "Bairro",
  phone: "Telefone institucional",
  hours: "Horário documentado",
  audience: "Público atendido",
  access: "Como acessar",
  modality: "Modalidade",
  sphere: "Esfera de gestão",
  org: "Órgão responsável",
  sentAt: "Data de envio",
  responseAt: "Data de resposta",
  deadlineAt: "Prazo documentado",
  deadlineBasis: "Base do prazo",
  evidenceUrl: "Evidência de execução",
  scope: "Escopo da inspeção",
  methodology: "Metodologia",
  recommendations: "Recomendações",
  objective: "Objetivo",
  category: "Categoria",
  year: "Ano de referência",
  stage: "Etapa financeira",
  amount: "Valor documentado",
};
export default function Detail() {
  const [, params] = useRoute("/registro/:id");
  const id = Number(params?.id);
  const q = trpc.portal.detail.useQuery(
    { id },
    { enabled: Number.isInteger(id) && id > 0, retry: false }
  );
  const r: any = q.data;
  const rec = r?.record ?? r;
  if (q.isLoading)
    return (
      <div className="content-page">
        <div className="loading-line">Consultando registro autorizado...</div>
      </div>
    );
  if (!rec || q.error)
    return (
      <div className="content-page">
        <Empty
          title="Registro não disponível publicamente"
          text="O registro pode não existir, estar em revisão ou ter acesso restrito. Documentos internos não são expostos."
        />
        <Link
          href="/inicio"
          className="button button-secondary"
          style={{ marginTop: 20 }}
        >
          Voltar ao início
        </Link>
      </div>
    );
  const m = modules.find(m => m.key === rec.module);
  const events = r.events || [];
  return (
    <div className="content-page">
      <Link href={m?.path || "/inicio"} className="back-link">
        <ArrowLeft size={14} /> Voltar para {m?.title || "o panorama"}
      </Link>
      <PageHeading
        title={rec.title}
        description={rec.description}
        eyebrow={m?.title.toUpperCase()}
      >
        <div className="admin-actions">
          <button
            className="button button-secondary"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copiado.");
              } catch {
                toast.error(
                  "Não foi possível copiar. Use a barra de endereços."
                );
              }
            }}
          >
            <Copy size={14} /> Compartilhar
          </button>
          <button
            className="button button-secondary"
            onClick={() => window.print()}
          >
            <Printer size={14} /> PDF / imprimir
          </button>
        </div>
      </PageHeading>
      <span className="status-pill">{rec.status}</span>
      <div className="detail-meta">
        <span>Registro #{rec.id}</span>
        <span>Referência: {rec.referencePeriod}</span>
        <span>
          Atualizado em {new Date(rec.updatedAt).toLocaleDateString("pt-BR")}
        </span>
      </div>
      <div className="text-panel">
        <h2>Informações documentadas</h2>
        {rec.data?.documentId && (
          <DocumentDownload id={Number(rec.data.documentId)} />
        )}
        {Object.entries(rec.data || {})
          .filter(
            ([k, v]) => labels[k] && v !== "" && v !== null && v !== undefined
          )
          .map(([k, v]) => (
            <div className="capacity-row" key={k}>
              <span>{labels[k]}</span>
              <strong>
                {typeof v === "boolean" ? (v ? "Sim" : "Não") : String(v)}
              </strong>
            </div>
          ))}
        {Object.keys(rec.data || {}).length === 0 && (
          <p>Não há campos complementares publicados neste registro.</p>
        )}
      </div>
      {rec.module === "requests" && (
        <Notice title="Tempo e prazos">
          {r?.requestTime?.elapsedDays !== null &&
          r?.requestTime?.elapsedDays !== undefined
            ? `Tempo desde o envio: ${r.requestTime.elapsedDays} dia(s) civil(is). `
            : ""}
          {r?.requestTime?.daysRemaining !== null &&
          r?.requestTime?.daysRemaining !== undefined
            ? r.requestTime.daysRemaining >= 0
              ? `${r.requestTime.daysRemaining} dia(s) até o prazo documentado. `
              : `Prazo documentado transcorrido há ${Math.abs(r.requestTime.daysRemaining)} dia(s); a situação de resposta precisa ser verificada. `
            : ""}
          {rec.data?.sentAt
            ? `Enviado em ${rec.data.sentAt}. `
            : "Data de envio não informada. "}
          {rec.data?.deadlineVerified &&
          rec.data?.deadlineBasis &&
          rec.data?.deadlineAt
            ? `Prazo documentado: ${rec.data.deadlineAt}. Base: ${rec.data.deadlineBasis}.`
            : "Não há prazo aplicável verificado no portal. Não classificamos atraso legal."}
          {!rec.data?.responseAt &&
            " Sem resposta registrada no portal não significa ausência de comunicação externa."}
        </Notice>
      )}
      <div className="text-panel" style={{ marginTop: 24 }}>
        <h2>Histórico de acompanhamento</h2>
        {events.length ? (
          <div className="event-list">
            {events.map((e: any) => (
              <div className="event-item" key={e.id}>
                <strong>
                  {new Date(e.occurredAt || e.createdAt).toLocaleDateString(
                    "pt-BR"
                  )}
                </strong>
                <p>{e.description}</p>
                <p>
                  {e.authorName ||
                    e.responsible ||
                    "Responsável institucional registrado na auditoria"}
                </p>
                {e.documentId && <DocumentDownload id={e.documentId} />}
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma movimentação pública adicional registrada.</p>
        )}
      </div>
      <div className="source-box">
        <strong>Fonte e verificação</strong>
        <br />
        <a href={rec.sourceUrl} target="_blank" rel="noreferrer">
          {rec.sourceName}{" "}
          <ArrowUpRight size={12} style={{ display: "inline" }} />
        </a>
        <br />
        Período: {rec.referencePeriod} · Verificação:{" "}
        {rec.verifiedAt
          ? new Date(rec.verifiedAt).toLocaleDateString("pt-BR")
          : "Não informada"}
        <br />
        As fontes sustentam as informações documentadas; não implicam
        representação oficial do observatório.
      </div>
    </div>
  );
}
