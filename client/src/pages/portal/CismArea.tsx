import {
  ArrowUpRight,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { DocumentDownload } from "@/components/portal/DocumentsManager";
import { Notice, PageHeading } from "@/components/portal/Common";
import { trpc } from "@/lib/trpc";

export default function CismArea() {
  const auth = useAuth();
  const access = trpc.portal.documentsAccessStatus.useQuery(undefined, {
    enabled: !!auth.user,
    retry: false,
  });
  const canRead = !!access.data?.canReadCismDocuments;
  const docs = trpc.portal.documentsCismList.useQuery(undefined, {
    enabled: !!auth.user && canRead,
    retry: false,
  });

  if (auth.loading || (auth.user && access.isLoading)) {
    return (
      <div className="content-page">
        <div className="loading-line">Verificando acesso reservado…</div>
      </div>
    );
  }

  return (
    <div className="content-page cism-area-page">
      <PageHeading
        title="Área dos membros da CISM"
        description="Espaço de leitura restrito para documentos que foram aprovados e publicados especificamente para a comissão."
      />
      <div className="cism-access-banner">
        <span className="cism-access-icon">
          <LockKeyhole size={22} />
        </span>
        <div>
          <strong>Conteúdo reservado — acesso controlado no servidor</strong>
          <p>
            O login, por si só, não concede acesso. Um administrador precisa
            atribuir manualmente o papel CISM; esta permissão não permite editar
            registros, gerir usuários ou publicar documentos.
          </p>
        </div>
      </div>

      {!auth.user ? (
        <div className="auth-panel cism-login-panel">
          <Users size={35} />
          <h2>Entre para verificar sua autorização</h2>
          <p>
            Use sua conta Manus. Se a conta ainda não estiver habilitada,
            solicite ao administrador do observatório a confirmação da sua
            participação e a atribuição do papel CISM.
          </p>
          <button
            className="button button-primary"
            onClick={() => startLogin()}
          >
            <ShieldCheck size={16} /> Entrar com Manus
          </button>
        </div>
      ) : access.error ? (
        <Notice title="Não foi possível verificar a permissão">
          O serviço de autorização não respondeu. Nenhum documento é exibido até
          que o acesso possa ser confirmado.
        </Notice>
      ) : !canRead ? (
        <div className="text-panel cism-denied-panel" role="status">
          <LockKeyhole size={25} />
          <h2>Acesso ainda não autorizado</h2>
          <p>
            Sua sessão está autenticada, mas esta conta não tem o papel CISM.
            Peça ao administrador que confirme sua participação e faça a
            atribuição manual no painel “Permissões e auditoria”. A composição
            oficial da comissão continua sujeita a validação institucional.
          </p>
          <Link href="/comissao" className="text-link">
            Ver informações públicas da comissão <ArrowUpRight size={15} />
          </Link>
        </div>
      ) : (
        <>
          <div className="cism-member-status">
            <ShieldCheck size={17} /> Permissão de leitura CISM confirmada pelo
            servidor.
          </div>
          {docs.error ? (
            <Notice title="A lista reservada está indisponível">
              A autorização desta sessão continua limitada à área CISM; nenhum
              documento público ou administrativo adicional é carregado aqui.
            </Notice>
          ) : docs.isLoading ? (
            <div className="loading-line">
              Carregando documentos autorizados…
            </div>
          ) : docs.data?.length ? (
            <div className="cism-doc-grid">
              {docs.data.map(document => (
                <article className="cism-document-card" key={document.id}>
                  <FileText size={23} />
                  <div>
                    <h2>{document.title}</h2>
                    <p>
                      {document.mime} · {(document.sizeBytes / 1024).toFixed(1)}{" "}
                      KB · disponibilizado em{" "}
                      {new Date(document.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                    <span>Publicado para membros CISM</span>
                  </div>
                  <DocumentDownload id={document.id} />
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state cism-empty-state">
              <FileText size={27} />
              <h2>Nenhum documento foi publicado nesta área</h2>
              <p>
                Arquivos em rascunho, revisão ou aprovação não aparecem aqui. A
                biblioteca pública também permanece separada.
              </p>
            </div>
          )}
          <Notice title="Trate os documentos reservados com cuidado">
            Não reencaminhe documentos fora dos canais autorizados. Não use este
            espaço para prontuários, diagnósticos ou dados clínicos
            identificáveis; correções de acesso devem ser encaminhadas à
            administração do portal.
          </Notice>
        </>
      )}
    </div>
  );
}
