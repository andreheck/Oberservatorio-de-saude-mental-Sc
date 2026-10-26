import { useEffect } from "react";
import { ArrowRight, ArrowUpRight, Activity } from "lucide-react";
import { Link } from "wouter";

export default function Welcome() {
  useEffect(() => {
    document.title = "Observatório de Saúde Mental (Sul do Brasil)";
  }, []);

  return (
    <div className="welcome-screen">
      <header className="welcome-header">
        <div className="welcome-brand" aria-label="Observatório de Saúde Mental (Sul do Brasil)">
          <span className="welcome-brand-mark" aria-hidden="true">
            <img src="/images/logo-observatorio-sul.png" alt="" />
          </span>
          <span className="welcome-brand-wordmark">
            <strong>
              observatório<span>.</span>
            </strong>
            <small>SAÚDE MENTAL · SUL DO BRASIL</small>
          </span>
        </div>
        <span className="welcome-header-note">TRANSPARÊNCIA · PARTICIPAÇÃO · CUIDADO</span>
      </header>

      <main className="welcome-main">
        <section className="welcome-copy" aria-labelledby="welcome-title">
          <span className="welcome-kicker">
            <Activity size={15} aria-hidden="true" />
            DADOS MUNICIPAIS · ITAJAÍ, SANTA CATARINA
          </span>
          <h1 id="welcome-title">
            Informação pública.
            <span>Cuidado coletivo.</span>
          </h1>
          <p className="welcome-description">
            Um espaço para acompanhar dados, políticas públicas e participação
            social em saúde mental — com fontes, limites e evidências à vista.
          </p>
          <div className="welcome-actions">
            <Link href="/inicio" className="welcome-enter">
              Acessar o observatório <ArrowRight size={18} />
            </Link>
            <Link href="/metodologia" className="welcome-method-link">
              Conhecer fontes e metodologia <ArrowUpRight size={15} />
            </Link>
          </div>
          <p className="welcome-project-note">
            Iniciativa de acompanhamento relacionada à atuação da Comissão
            Intersetorial de Saúde Mental (CISM) no Conselho Municipal de Saúde
            de Itajaí (COMUSA). O recorte de dados disponível nesta etapa é
            municipal, de Itajaí/SC; não representa oficialmente o COMUSA.
          </p>
        </section>

        <div className="welcome-collage" aria-hidden="true">
          <div className="welcome-collage-orbit" />
          <div className="welcome-collage-sun" />
          <div className="welcome-paper-card">
            <span className="welcome-paper-label">RECORTE MUNICIPAL · ITAJAÍ/SC</span>
            <div className="welcome-paper-rule" />
            <span className="welcome-paper-line line-one" />
            <span className="welcome-paper-line line-two" />
            <span className="welcome-paper-line line-three" />
            <div className="welcome-paper-stamp">
              <Activity size={20} />
            </div>
          </div>
          <div className="welcome-collage-caption">
            <span>Dados</span>
            <i />
            <span>Território</span>
            <i />
            <span>Participação</span>
          </div>
          <div className="welcome-collage-index">OBSERVATÓRIO · SC</div>
        </div>
      </main>

      <footer className="welcome-footer">
        <span>Informação pública. Cuidado coletivo.</span>
        <Link href="/inicio">Entrar no portal <ArrowRight size={14} /></Link>
      </footer>
    </div>
  );
}
