import { trpc } from "@/lib/trpc";
import { ArrowDownToLine, FileText } from "lucide-react";
import { toast } from "sonner";
import { Notice } from "./Common";
export function DocumentDownload({ id }: { id: number }) {
  const utils = trpc.useUtils();
  const download = async () => {
    try {
      const doc = await utils.portal.documentDownload.fetch({ id });
      const bytes = Uint8Array.from(atob(doc.base64), c => c.charCodeAt(0));
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([bytes], { type: doc.mime }));
      a.download =
        doc.title.replace(/[^a-zA-Z0-9à-úÀ-Ú _.-]/g, "_") +
        ({
          "application/pdf": ".pdf",
          "image/png": ".png",
          "image/jpeg": ".jpg",
          "text/plain": ".txt",
        }[doc.mime] || "");
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <button className="button button-secondary" onClick={download}>
      <ArrowDownToLine size={14} /> Baixar arquivo
    </button>
  );
}
export default function DocumentsManager({
  internal = false,
}: {
  internal?: boolean;
}) {
  const pub = trpc.portal.documentsList.useQuery(undefined, {
    enabled: !internal,
    retry: false,
  });
  const admin = trpc.portal.documentsAdminList.useQuery(undefined, {
    enabled: internal,
    retry: false,
  });
  const q = internal ? admin : pub;
  const change = trpc.portal.documentTransition.useMutation({
    onSuccess: () => {
      toast.success("Estado do documento atualizado.");
      admin.refetch();
      pub.refetch();
    },
    onError: e => toast.error(e.message),
  });
  const labels: Record<string, string> = {
    draft: "Rascunho privado",
    review: "Em revisão",
    approved: "Aprovado",
    published: "Publicado",
  };
  if (q.error)
    return internal ? (
      <Notice title="Permissão para documentos necessária">
        {q.error.message}
      </Notice>
    ) : null;
  const docs = q.data || [];
  return (
    <div style={{ marginTop: 24 }}>
      <h2 style={{ fontSize: 18, marginBottom: 18 }}>
        {internal
          ? "Originais armazenados com acesso restrito"
          : "Arquivos autorizados para consulta"}
      </h2>
      {docs.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Documento</th>
                <th>Formato / tamanho</th>
                <th>Acesso editorial</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {docs.map(d => (
                <tr key={d.id}>
                  <td>
                    <FileText
                      size={14}
                      style={{ display: "inline", marginRight: 6 }}
                    />
                    {d.title}
                    <br />
                    <small>
                      #{d.id} ·{" "}
                      {new Date(d.createdAt).toLocaleDateString("pt-BR")}
                    </small>
                  </td>
                  <td>
                    {d.mime}
                    <br />
                    {(d.sizeBytes / 1024).toFixed(1)} KB
                  </td>
                  <td>{labels[d.publication] || d.publication}</td>
                  <td>
                    <div className="admin-actions">
                      <DocumentDownload id={d.id} />
                      {internal && d.publication === "draft" && (
                        <button
                          className="button button-secondary"
                          onClick={() =>
                            change.mutate({ id: d.id, publication: "review" })
                          }
                        >
                          Enviar à revisão
                        </button>
                      )}
                      {internal && d.publication === "review" && (
                        <button
                          className="button button-secondary"
                          onClick={() =>
                            change.mutate({ id: d.id, publication: "approved" })
                          }
                        >
                          Aprovar
                        </button>
                      )}
                      {internal && d.publication === "approved" && (
                        <button
                          className="button button-primary"
                          onClick={() =>
                            change.mutate({
                              id: d.id,
                              publication: "published",
                            })
                          }
                        >
                          Publicar
                        </button>
                      )}
                      {internal && d.publication === "published" && (
                        <button
                          className="button button-secondary"
                          onClick={() => {
                            const reason = window.prompt(
                              "Justificativa obrigatória para despublicar:"
                            );
                            if (reason)
                              change.mutate({
                                id: d.id,
                                publication: "draft",
                                reason,
                              });
                          }}
                        >
                          Despublicar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ fontSize: 11, color: "#80967e" }}>
          Nenhum arquivo{" "}
          {internal ? "armazenado neste fluxo" : "autorizado para publicação"}.
        </p>
      )}
    </div>
  );
}
