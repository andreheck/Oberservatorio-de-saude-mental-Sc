import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { modules } from "@shared/portal";
import { Notice, PageHeading } from "@/components/portal/Common";
import { ShieldCheck, Plus, Save, Upload, LogOut } from "lucide-react";
import { toast } from "sonner";
import { statuses } from "./ModulePage";
import DocumentsManager from "@/components/portal/DocumentsManager";
const baseForm = {
  id: undefined as number | undefined,
  module: "requests",
  title: "",
  description: "",
  status: "Em elaboração",
  sourceName: "",
  sourceUrl: "",
  referencePeriod: "",
  verifiedAt: "",
  data: {} as Record<string, any>,
};
const moduleFields: Record<string, [string, string, string?][]> = {
  services: [
    ["modality", "Modalidade"],
    ["address", "Endereço institucional"],
    ["neighborhood", "Bairro"],
    ["phone", "Contato institucional"],
    ["hours", "Horário confirmado"],
    ["audience", "Público atendido"],
    ["access", "Como acessar"],
    ["latitude", "Latitude", "number"],
    ["longitude", "Longitude", "number"],
  ],
  requests: [
    ["org", "Órgão destinatário"],
    ["officialNumber", "Número oficial do ofício"],
    ["sentAt", "Data de envio", "date"],
    ["responseAt", "Data de resposta", "date"],
    ["deadlineAt", "Vencimento documentado", "date"],
    ["deadlineBasis", "Fundamento e termo inicial do prazo"],
  ],
  inspections: [
    ["inspectedAt", "Data da inspeção", "date"],
    ["address", "Local institucional"],
    ["neighborhood", "Bairro"],
    ["objective", "Objetivo"],
    ["scope", "Escopo"],
    ["methodology", "Metodologia"],
    ["observedFacts", "Fatos observados"],
    ["recommendations", "Recomendações"],
  ],
  budget: [
    ["year", "Ano", "number"],
    [
      "stage",
      "Etapa financeira: announced, initial, authorized, transferred, committed, liquidated, paid, payables, municipal",
    ],
    ["amount", "Valor documentado (R$)", "number"],
    ["sphere", "Esfera governamental"],
    ["financialIdentifier", "Identificador único do lançamento"],
  ],
  actions: [
    ["org", "Órgão responsável"],
    ["neighborhood", "Território"],
    ["announcedAt", "Data do anúncio", "date"],
    ["evidenceUrl", "URL da evidência de execução"],
  ],
  members: [
    ["representation", "Representação institucional"],
    ["position", "Função na comissão"],
    ["biography", "Biografia factual revisada"],
    ["authorization", "Referência da autorização de divulgação"],
  ],
  documents: [
    ["category", "Categoria"],
    ["origin", "Órgão de origem"],
    ["documentId", "ID do arquivo original armazenado", "number"],
  ],
  workforce: [
    ["profession", "Categoria profissional"],
    ["count", "Quantidade documentada", "number"],
    ["unit", "Unidade de lotação"],
    ["bond", "Tipo de vínculo"],
    ["weeklyHours", "Carga horária documentada", "number"],
  ],
  communities: [
    ["org", "Entidade institucional"],
    ["cnpj", "CNPJ institucional"],
    ["instrument", "Instrumento jurídico"],
    ["object", "Objeto da parceria"],
    ["stage", "Etapa financeira"],
    ["amount", "Valor documentado", "number"],
  ],
  neighborhoods: [
    ["neighborhood", "Bairro"],
    ["coverage", "Cobertura e referência documentadas"],
  ],
  timeline: [
    ["occurredAt", "Data do evento", "date"],
    ["category", "Categoria"],
  ],
  publications: [
    ["category", "Categoria"],
    ["authorInstitution", "Autoria institucional"],
  ],
};
export default function Admin() {
  const auth = useAuth();
  const [tab, setTab] = useState("Registros");
  const [module, setModule] = useState("requests");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...baseForm });
  const utils = trpc.useUtils();
  const settings = trpc.portal.settings.useQuery();
  const rolesQuery = trpc.portal.myRoles.useQuery(undefined, {
    enabled: !!auth.user,
    retry: false,
  });
  const roles = rolesQuery.data || [];
  const canReview = roles.includes("admin") || roles.includes("reviewer");
  const hasPortalManagementRole = roles.some(role => role !== "cism_member");
  const canReadPrivateDocuments = roles.some(role =>
    ["admin", "editor", "documents", "reviewer", "reader"].includes(role)
  );
  const canUploadPrivateDocuments = roles.some(role =>
    ["admin", "editor", "documents"].includes(role)
  );
  const canEdit =
    roles.includes("admin") ||
    roles.includes("editor") ||
    (roles.includes("finance") && ["budget", "communities"].includes(module)) ||
    (roles.includes("inspections") &&
      ["requests", "inspections"].includes(module)) ||
    (roles.includes("documents") && module === "documents");
  const list = trpc.portal.adminList.useQuery(
    { module },
    { enabled: !!auth.user, retry: false }
  );
  const save = trpc.portal.save.useMutation({
    onSuccess: () => {
      toast.success("Rascunho salvo na base de dados.");
      setEditing(false);
      utils.portal.adminList.invalidate();
    },
    onError: e => toast.error(e.message),
  });
  const transition = trpc.portal.transition.useMutation({
    onSuccess: () => {
      toast.success("Situação editorial atualizada e registrada.");
      utils.portal.adminList.invalidate();
      utils.portal.list.invalidate();
    },
    onError: e => toast.error(e.message),
  });
  const updateSettings = trpc.portal.updateSettings.useMutation({
    onSuccess: () => {
      toast.success("Identidade institucional atualizada.");
      utils.portal.settings.invalidate();
    },
    onError: e => toast.error(e.message),
  });
  const addEvent = trpc.portal.addEvent.useMutation({
    onSuccess: () => {
      toast.success("Movimentação registrada.");
      utils.portal.adminList.invalidate();
    },
    onError: e => toast.error(e.message),
  });
  const [identity, setIdentity] = useState<Record<string, string> | null>(null);
  const [event, setEvent] = useState({
    id: 0,
    description: "",
    occurredAt: "",
  });
  const doTransition = (
    id: number,
    publication: "draft" | "review" | "approved" | "published"
  ) => {
    const reason =
      publication === "draft"
        ? window.prompt(
            "Justificativa para retirar da revisão ou despublicar (obrigatória):"
          ) || ""
        : undefined;
    if (publication === "draft" && !reason) return;
    transition.mutate({ id, publication, reason });
  };
  if (auth.loading)
    return (
      <div className="content-page">
        <div className="loading-line">Verificando sua sessão...</div>
      </div>
    );
  if (!auth.user)
    return (
      <div className="content-page">
        <PageHeading
          title="Área de gestão"
          description="Acesso restrito para cadastro, revisão, aprovação e atualização de informações."
        />
        <div className="auth-panel">
          <ShieldCheck size={37} />
          <h2>Informação confiável começa com gestão responsável.</h2>
          <p>
            Entre com sua conta Manus. O acesso editorial depende de uma
            permissão atribuída pela administração; o login não concede
            autorização de publicação.
          </p>
          <button
            className="button button-primary"
            onClick={() => startLogin()}
          >
            Entrar com Manus <ShieldCheck size={16} />
          </button>
        </div>
      </div>
    );
  if (rolesQuery.isLoading)
    return (
      <div className="content-page">
        <div className="loading-line">Verificando permissões do portal…</div>
      </div>
    );
  if (!hasPortalManagementRole)
    return (
      <div className="content-page">
        <PageHeading
          title="Área de gestão restrita"
          description="Este espaço não concede acesso a membros da CISM; utilize a área reservada própria."
        />
        <Notice title="Permissão editorial não atribuída">
          O login não concede permissões de administração. Para documentos da
          comissão, acesse <a href="/cism">Área dos membros CISM</a>.
        </Notice>
      </div>
    );
  return (
    <div className="content-page">
      <PageHeading
        title="Área de gestão"
        description="Registros persistentes, fontes documentadas e revisão antes de qualquer publicação."
      />
      <div className="login-row">
        <span>
          Sessão autenticada: <strong>{auth.user.name || "Usuário"}</strong> ·{" "}
          {auth.user.role === "admin"
            ? "Administrador"
            : "Permissões atribuídas no servidor"}
        </span>
        <button
          className="button button-secondary"
          onClick={() => auth.logout()}
        >
          <LogOut size={14} /> Sair
        </button>
      </div>
      <Notice title="Não cadastre dados clínicos ou pessoais sensíveis">
        Registre somente fatos institucionais e informações publicáveis. Todo
        novo registro é um rascunho. Fluxo: Rascunho → Em revisão → Aprovado →
        Publicado. As permissões são verificadas no servidor.
      </Notice>
      <Notice title="O papel CISM é de leitura restrita">
        A atribuição é manual por administrador e substitui a permissão de
        portal anterior. O membro CISM só pode consultar documentos publicados
        para esse público; não edita, aprova, administra contas nem acessa os
        demais documentos privados.
      </Notice>
      <div className="tabs">
        {[
          "Registros",
          "Identidade do portal",
          "Importação CSV",
          ...(canReadPrivateDocuments ? ["Documentos privados"] : []),
          ...(roles.includes("admin") ? ["Permissões e auditoria"] : []),
        ].map(t => (
          <button
            key={t}
            className={tab === t ? "selected" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Registros" && (
        <>
          <div className="filter-bar">
            <select
              aria-label="Módulo de gestão"
              value={module}
              onChange={e => {
                setModule(e.target.value);
                setEditing(false);
              }}
            >
              {modules.map(m => (
                <option key={m.key} value={m.key}>
                  {m.title}
                </option>
              ))}
            </select>
            <button
              disabled={!canEdit}
              className="button button-primary"
              onClick={() => {
                setForm({
                  ...baseForm,
                  module,
                  status: statuses[module]?.[0] || "Em elaboração",
                });
                setEditing(true);
              }}
            >
              <Plus size={15} /> Novo registro
            </button>
          </div>
          {list.error ? (
            <Notice title="Permissão necessária ou base indisponível">
              {list.error.message} Nenhum conteúdo interno é mostrado sem
              autorização válida.
            </Notice>
          ) : null}
          {editing && (
            <form
              className="text-panel admin-form"
              onSubmit={e => {
                e.preventDefault();
                save.mutate({
                  ...form,
                  verifiedAt: form.verifiedAt || undefined,
                });
              }}
            >
              <h2>
                {form.id ? `Editar registro #${form.id}` : "Novo rascunho"}
              </h2>
              <div className="form-grid">
                <label>
                  Título *
                  <input
                    required
                    maxLength={240}
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                  />
                </label>
                <label>
                  Situação do acompanhamento
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                  >
                    {[
                      ...new Set([
                        form.status,
                        ...(statuses[module] || [
                          "Em elaboração",
                          "Verificado",
                          "Em acompanhamento",
                          "Concluída",
                        ]),
                      ]),
                    ].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Descrição objetiva *
                <textarea
                  required
                  value={form.description}
                  onChange={e =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </label>
              <div className="form-grid">
                <label>
                  Nome da fonte
                  <input
                    value={form.sourceName}
                    onChange={e =>
                      setForm({ ...form, sourceName: e.target.value })
                    }
                  />
                </label>
                <label>
                  URL documental da fonte
                  <input
                    type="url"
                    value={form.sourceUrl}
                    onChange={e =>
                      setForm({ ...form, sourceUrl: e.target.value })
                    }
                  />
                </label>
                <label>
                  Período de referência
                  <input
                    placeholder="Ex.: janeiro a março de 2026"
                    value={form.referencePeriod}
                    onChange={e =>
                      setForm({ ...form, referencePeriod: e.target.value })
                    }
                  />
                </label>
                <label>
                  Data da verificação
                  <input
                    type="date"
                    value={form.verifiedAt}
                    onChange={e =>
                      setForm({ ...form, verifiedAt: e.target.value })
                    }
                  />
                </label>
              </div>
              <h3 style={{ marginBottom: 0 }}>Campos do módulo</h3>
              <div className="form-grid">
                {(moduleFields[form.module] || []).map(([key, label, type]) => (
                  <label key={key}>
                    {label}
                    <input
                      type={type || "text"}
                      value={form.data[key] ?? ""}
                      step={type === "number" ? "any" : undefined}
                      onChange={e =>
                        setForm({
                          ...form,
                          data: {
                            ...form.data,
                            [key]:
                              type === "number" && e.target.value !== ""
                                ? Number(e.target.value)
                                : e.target.value,
                          },
                        })
                      }
                    />
                  </label>
                ))}
              </div>
              {form.module === "services" && (
                <label style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    style={{ width: 18 }}
                    checked={!!form.data.addressVerified}
                    onChange={e =>
                      setForm({
                        ...form,
                        data: {
                          ...form.data,
                          addressVerified: e.target.checked,
                        },
                      })
                    }
                  />{" "}
                  Endereço, localização e funcionamento verificados
                  documentalmente
                </label>
              )}
              {form.module === "requests" && (
                <label style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{ width: 18 }}
                    type="checkbox"
                    checked={!!form.data.deadlineVerified}
                    onChange={e =>
                      setForm({
                        ...form,
                        data: {
                          ...form.data,
                          deadlineVerified: e.target.checked,
                        },
                      })
                    }
                  />{" "}
                  Prazo, termo inicial e situação de resposta verificados
                  documentalmente
                </label>
              )}
              <div className="admin-actions">
                <button
                  disabled={save.isPending}
                  type="submit"
                  className="button button-primary"
                >
                  <Save size={15} />
                  {save.isPending ? "Salvando..." : "Salvar rascunho"}
                </button>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setEditing(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
          <div style={{ marginTop: 22 }}>
            {((list.data as any[]) || []).map(r => (
              <div className="admin-record" key={r.id}>
                <div>
                  <h3>{r.title}</h3>
                  <p>
                    #{r.id} · {r.status} ·{" "}
                    <strong>
                      {(
                        {
                          draft: "Rascunho",
                          review: "Em revisão",
                          approved: "Aprovado",
                          published: "Publicado",
                        } as any
                      )[r.publication] || r.publication}
                    </strong>
                  </p>
                </div>
                <div className="admin-actions">
                  <button
                    disabled={!canEdit || r.publication === "published"}
                    className="button button-secondary"
                    onClick={() => {
                      setForm({
                        ...r,
                        verifiedAt: r.verifiedAt
                          ? new Date(r.verifiedAt).toISOString().slice(0, 10)
                          : "",
                        data: r.data || {},
                      });
                      setEditing(true);
                    }}
                  >
                    Editar
                  </button>
                  {r.publication === "draft" && canEdit && (
                    <button
                      className="button button-secondary"
                      onClick={() => doTransition(r.id, "review")}
                    >
                      Enviar à revisão
                    </button>
                  )}
                  {r.publication === "review" && canReview && (
                    <button
                      className="button button-secondary"
                      onClick={() => doTransition(r.id, "approved")}
                    >
                      Aprovar
                    </button>
                  )}
                  {r.publication === "approved" && canReview && (
                    <button
                      className="button button-primary"
                      onClick={() => doTransition(r.id, "published")}
                    >
                      Publicar
                    </button>
                  )}
                  {r.publication === "published" && canReview && (
                    <button
                      className="button button-secondary"
                      onClick={() => doTransition(r.id, "draft")}
                    >
                      Despublicar / retornar
                    </button>
                  )}
                  <button
                    disabled={
                      !(canEdit || canReview) || r.publication === "published"
                    }
                    className="button button-secondary"
                    onClick={() =>
                      setEvent({
                        id: r.id,
                        description: "",
                        occurredAt: new Date().toISOString().slice(0, 10),
                      })
                    }
                  >
                    Registrar evento
                  </button>
                </div>
              </div>
            ))}
            {list.data?.length === 0 && (
              <div className="empty-state">
                <h3>Nenhum cadastro neste módulo.</h3>
                <p>
                  Comece por um rascunho com fonte documental; não use exemplos
                  fictícios como dados reais.
                </p>
              </div>
            )}
          </div>
          {event.id > 0 && (
            <form
              className="text-panel admin-form"
              onSubmit={e => {
                e.preventDefault();
                addEvent.mutate(event);
                setEvent({ id: 0, description: "", occurredAt: "" });
              }}
            >
              <h2>Nova movimentação — registro #{event.id}</h2>
              <label>
                Data
                <input
                  type="date"
                  required
                  value={event.occurredAt}
                  onChange={e =>
                    setEvent({ ...event, occurredAt: e.target.value })
                  }
                />
              </label>
              <label>
                Descrição institucional
                <textarea
                  required
                  value={event.description}
                  onChange={e =>
                    setEvent({ ...event, description: e.target.value })
                  }
                />
              </label>
              <div className="admin-actions">
                <button className="button button-primary" type="submit">
                  Registrar no histórico
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() =>
                    setEvent({ id: 0, description: "", occurredAt: "" })
                  }
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </>
      )}
      {tab === "Identidade do portal" && (
        <form
          className="text-panel admin-form"
          onSubmit={e => {
            e.preventDefault();
            updateSettings.mutate((identity || settings.data) as any);
          }}
        >
          <h2>Identidade e contato institucional</h2>
          {(["name", "subtitle", "signature", "contactEmail"] as const).map(
            k => (
              <label key={k}>
                {
                  {
                    name: "Nome do observatório",
                    subtitle: "Subtítulo",
                    signature: "Assinatura descritiva",
                    contactEmail: "E-mail institucional para correções",
                  }[k]
                }
                <input
                  type={k === "contactEmail" ? "email" : "text"}
                  value={identity?.[k] ?? settings.data?.[k] ?? ""}
                  onChange={e =>
                    setIdentity({
                      ...settings.data,
                      ...identity,
                      [k]: e.target.value,
                    } as any)
                  }
                />
              </label>
            )
          )}
          <button
            className="button button-primary"
            type="submit"
            disabled={updateSettings.isPending}
          >
            Salvar configuração
          </button>
        </form>
      )}
      {tab === "Importação CSV" && <CsvImport module={module} />}
      {tab === "Documentos privados" && (
        <>
          {canUploadPrivateDocuments && <DocumentUpload />}
          <DocumentsManager
            internal
            canSubmit={canUploadPrivateDocuments}
            canReview={canReview}
          />
        </>
      )}
      {tab === "Permissões e auditoria" && <Permissions />}
    </div>
  );
}
function parseCSV(text: string) {
  const rows: string[][] = [];
  let row: string[] = [],
    cell = "",
    quote = false;
  const sep = text.split("\n")[0].includes(";") ? ";" : ",";
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quote && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else quote = !quote;
    } else if (c === sep && !quote) {
      row.push(cell);
      cell = "";
    } else if ((c === "\n" || c === "\r") && !quote) {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  row.push(cell);
  if (row.some(Boolean)) rows.push(row);
  if (quote) throw Error("Aspas não fechadas no CSV.");
  return rows;
}
function CsvImport({ module }: { module: string }) {
  const [rows, setRows] = useState<any[]>([]),
    [busy, setBusy] = useState(false);
  const save = trpc.portal.save.useMutation();
  const utils = trpc.useUtils();
  return (
    <div className="text-panel admin-form">
      <h2>Importação manual com revisão</h2>
      <p>
        CSV UTF-8, até 100 registros. Cabeçalhos: title, description,
        sourceName, sourceUrl, referencePeriod, status, verifiedAt, module,
        data. O campo data pode conter JSON estruturado. Nenhum registro é
        publicado automaticamente.
      </p>
      <input
        type="file"
        accept=".csv,text/csv"
        aria-label="Escolher arquivo CSV"
        onChange={async e => {
          try {
            const file = e.target.files?.[0];
            if (!file) return;
            if (file.size > 1024 * 1024)
              throw Error("Limite de 1 MiB por CSV.");
            const parsed = parseCSV((await file.text()).replace(/^\uFEFF/, ""));
            const headers = parsed.shift() || [];
            if (!headers.includes("title") || !headers.includes("description"))
              throw Error("Cabeçalhos title e description são obrigatórios.");
            const data = parsed.map(row =>
              Object.fromEntries(
                headers.map((h, i) => [h.trim(), row[i] || ""])
              )
            );
            if (data.length > 100)
              throw Error("Limite de 100 registros por importação.");
            setRows(data);
            toast.success(
              `${data.length} linhas lidas; revise antes de importar.`
            );
          } catch (err) {
            toast.error((err as Error).message);
            setRows([]);
          }
        }}
      />
      {rows.length > 0 && (
        <>
          <p>
            {rows.length} linha(s) prontas para rascunho no módulo {module}.
            Fonte e período serão exigidos antes da publicação.
          </p>
          <button
            disabled={busy}
            className="button button-primary"
            onClick={async () => {
              setBusy(true);
              let done = 0;
              try {
                for (const r of rows) {
                  await save.mutateAsync({
                    module: r.module || module,
                    title: r.title,
                    description: r.description,
                    status: r.status || "Em elaboração",
                    sourceName: r.sourceName || "",
                    sourceUrl: r.sourceUrl || "",
                    referencePeriod: r.referencePeriod || "",
                    verifiedAt: r.verifiedAt || undefined,
                    data: r.data ? JSON.parse(r.data) : {},
                  });
                  done++;
                }
                toast.success(`${done} rascunhos persistidos.`);
                setRows([]);
                utils.portal.adminList.invalidate();
              } catch (err) {
                toast.error(
                  `${done} linhas importadas. Interrompido: ${(err as Error).message}`
                );
                setRows(rows.slice(done));
              } finally {
                setBusy(false);
              }
            }}
          >
            <Upload size={15} />
            {busy ? "Importando..." : "Importar como rascunhos"}
          </button>
        </>
      )}
    </div>
  );
}
function DocumentUpload() {
  const [title, setTitle] = useState(""),
    [file, setFile] = useState<File | null>(null);
  const [accessScope, setAccessScope] = useState<"public" | "cism">("public");
  const utils = trpc.useUtils();
  const upload = trpc.portal.documentsUpload.useMutation({
    onSuccess: () => {
      toast.success(
        "Documento salvo como rascunho privado. Ainda não foi publicado."
      );
      setFile(null);
      setTitle("");
      utils.portal.documentsAdminList.invalidate();
    },
    onError: e => toast.error(e.message),
  });
  return (
    <form
      className="text-panel admin-form"
      onSubmit={async e => {
        e.preventDefault();
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Limite de 5 MiB.");
          return;
        }
        const bytes = new Uint8Array(await file.arrayBuffer());
        let binary = "";
        bytes.forEach(b => (binary += String.fromCharCode(b)));
        const mime = file.type || "text/plain";
        if (
          ![
            "application/pdf",
            "image/png",
            "image/jpeg",
            "text/plain",
          ].includes(mime)
        ) {
          toast.error("Tipo de arquivo não permitido.");
          return;
        }
        upload.mutate({
          title,
          accessScope,
          mime: mime as
            | "application/pdf"
            | "image/png"
            | "image/jpeg"
            | "text/plain",
          base64: btoa(binary),
        });
      }}
    >
      <h2>Upload com acesso restrito</h2>
      <p>
        Arquivos PDF, PNG, JPEG ou TXT, até 5 MiB. Não envie prontuários,
        diagnósticos ou dados clínicos identificáveis. O documento fica privado
        na base, sem endereço de armazenamento público.
      </p>
      <label>
        Título do documento
        <input
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </label>
      <label>
        Público autorizado após publicação
        <select
          value={accessScope}
          onChange={e => setAccessScope(e.target.value as "public" | "cism")}
        >
          <option value="public">Biblioteca pública</option>
          <option value="cism">Somente membros CISM</option>
        </select>
      </label>
      <label>
        Arquivo
        <input
          required
          type="file"
          accept="application/pdf,image/png,image/jpeg,text/plain"
          onChange={e => setFile(e.target.files?.[0] || null)}
        />
      </label>
      <button
        className="button button-primary"
        disabled={!file || upload.isPending}
      >
        Guardar documento privado
      </button>
      <Notice title="Publicação de anexos">
        O upload guarda o original privado. O fluxo editorial mantém o rascunho
        e a revisão fora da consulta. “Somente membros CISM” continuará
        reservado mesmo depois de publicado; a seleção não altera permissões nem
        cria membros automaticamente.
      </Notice>
    </form>
  );
}
function Permissions() {
  const users = trpc.portal.users.useQuery(undefined, { retry: false });
  const audit = trpc.portal.audit.useQuery(undefined, { retry: false });
  const setRole = trpc.portal.setRole.useMutation({
    onSuccess: () => {
      toast.success("Permissão atualizada.");
      users.refetch();
    },
    onError: e => toast.error(e.message),
  });
  return (
    <>
      <div className="text-panel">
        <h2>Perfis de acesso</h2>
        <p>
          Somente o administrador atribui permissões. A autenticação não concede
          publicação. Editores não aprovam; responsáveis especializados ficam
          restritos ao seu domínio.
        </p>
        {users.error ? (
          <Notice title="Somente administradores">{users.error.message}</Notice>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Usuário autenticado</th>
                  <th>Permissão</th>
                  <th>Alterar papel</th>
                </tr>
              </thead>
              <tbody>
                {((users.data as any[]) || []).map(u => (
                  <tr key={u.id}>
                    <td>{u.name || `Usuário #${u.id}`}</td>
                    <td>
                      {u.role === "admin"
                        ? "Administrador"
                        : u.permissions
                            ?.map((role: string) => {
                              const labels: Record<string, string> = {
                                admin: "Administrador",
                                editor: "Editor",
                                finance: "Responsável financeiro",
                                inspections: "Fiscalizações",
                                documents: "Documentos",
                                reviewer: "Revisor institucional",
                                reader: "Leitor interno",
                                cism_member: "Membro CISM — leitura restrita",
                              };
                              return labels[role] || role;
                            })
                            .join(", ") || "Sem permissão editorial"}
                    </td>
                    <td>
                      <select
                        aria-label={`Atribuir papel a ${u.name || u.id}`}
                        defaultValue=""
                        onChange={e => {
                          if (e.target.value)
                            setRole.mutate({
                              userId: u.id,
                              role: e.target.value as any,
                            });
                        }}
                      >
                        <option value="">Selecionar papel</option>
                        {[
                          ["admin", "Administrador"],
                          ["editor", "Editor"],
                          ["finance", "Responsável financeiro"],
                          ["inspections", "Fiscalizações"],
                          ["documents", "Documentos"],
                          ["reviewer", "Revisor institucional"],
                          ["reader", "Leitor interno"],
                          ["cism_member", "Membro CISM — leitura restrita"],
                        ].map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="text-panel" style={{ marginTop: 20 }}>
        <h2>Histórico de alterações</h2>
        {audit.error ? (
          <p>Auditoria disponível apenas para administrador autorizado.</p>
        ) : (
          <div className="event-list">
            {((audit.data as any[]) || []).map(a => (
              <div className="event-item" key={a.id}>
                <strong>
                  {a.action} · Registro #
                  {a.recordId ?? a.entityId ?? "configuração"}
                </strong>
                <p>
                  {new Date(a.createdAt).toLocaleString("pt-BR")} · Usuário #
                  {a.userId ?? a.actorId}
                </p>
                <details>
                  <summary style={{ fontSize: 10, cursor: "pointer" }}>
                    Valores anteriores e novos
                  </summary>
                  <pre
                    style={{ fontSize: 10, overflow: "auto", maxHeight: 200 }}
                  >
                    {JSON.stringify(
                      {
                        anterior: a.oldValue ?? a.before,
                        novo: a.newValue ?? a.after,
                      },
                      null,
                      2
                    )}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
