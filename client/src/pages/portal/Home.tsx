import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  HeartHandshake,
  Info,
  Map,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import {
  Empty,
  RecordCard,
  SectionTitle,
  SourceNote,
} from "@/components/portal/Common";
export default function Home() {
  const records = trpc.portal.list.useQuery({});
  const settings = trpc.portal.settings.useQuery();
  const counts = [
    {
      icon: MapPin,
      title: "Serviços da RAPS",
      label: "Rede de cuidado documentada",
      href: "/mapa-raps",
    },
    {
      icon: SendIcon,
      title: "Solicitações em acompanhamento",
      label: "Ofícios, respostas e providências",
      href: "/solicitacoes",
    },
    {
      icon: ClipboardCheck,
      title: "Fiscalizações e inspeções",
      label: "Visitas e evidências registradas",
      href: "/fiscalizacoes",
    },
    {
      icon: BarChart3,
      title: "Orçamento da saúde mental",
      label: "Recursos e execução financeira",
      href: "/dados-orcamento",
    },
  ];
  return (
    <div className="home-page">
      <div className="home-intro">
        <div className="eyebrow">
          <span className="live-dot" /> OBSERVATÓRIO DA SAÚDE MENTAL DE ITAJAÍ
        </div>
        <span className="edition-tag">TRANSPARÊNCIA · CONTROLE SOCIAL</span>
      </div>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            Informação pública.
            <br />
            <span>Cuidado coletivo.</span>
          </h1>
          <p>
            {settings.data?.subtitle ||
              "Transparência, participação social e monitoramento das políticas públicas de saúde mental em Itajaí."}
          </p>
          <div className="hero-buttons">
            <Link href="/dados-orcamento" className="button button-primary">
              Explorar os dados <ArrowRight size={17} />
            </Link>
            <Link href="/comissao" className="button button-text">
              Conheça a iniciativa <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="hero-trust">
            <ShieldCheck size={15} />
            <span>
              Fontes verificáveis. Respeito às pessoas. Compromisso com o SUS.
            </span>
          </div>
        </div>
        <Link href="/guia-caps" className="hero-guide">
          <div className="guide-top">
            <span className="guide-icon">
              <HeartHandshake size={28} />
            </span>
            <span className="guide-badge">GUIA DE ACESSO</span>
          </div>
          <h2>
            Preciso de ajuda.
            <br />
            Por onde começo?
          </h2>
          <p>
            Entenda os CAPS e os caminhos para buscar cuidado em saúde mental.
          </p>
          <div className="guide-bottom">
            Conhecer o guia dos CAPS{" "}
            <span>
              <ArrowUpRight size={20} />
            </span>
          </div>
        </Link>
      </section>
      <div className="data-banner">
        <span className="amber-dot" />
        <div>
          <strong>Um observatório construído com evidências.</strong>
          <span>
            {" "}
            Os dados municipais estão em levantamento e validação. Nenhum valor
            é estimado para preencher este portal.
          </span>
        </div>
        <Link href="/metodologia">
          Nossa metodologia <ArrowUpRight size={14} />
        </Link>
      </div>
      <section className="overview">
        <SectionTitle
          number="01"
          title="O que estamos acompanhando"
          subtitle="Um panorama da informação documentada, não uma estimativa da realidade municipal."
        />
        <div className="metric-grid">
          {counts.map((c, i) => (
            <Link href={c.href} className="metric-card" key={c.title}>
              <div className="metric-top">
                <c.icon size={20} />
                <ArrowUpRight size={16} />
              </div>
              <div className="metric-value">
                {(() => {
                  const key = ["services", "requests", "inspections", "budget"][
                    i
                  ];
                  const items = (records.data || []).filter(
                    r => r.module === key
                  );
                  return items.length ? (
                    <>
                      {items.length}
                      <span>Registros públicos</span>
                    </>
                  ) : (
                    <>
                      — <span>Em levantamento</span>
                    </>
                  );
                })()}
              </div>
              <h3>{c.title}</h3>
              <p>{c.label}</p>
              <div className="metric-bottom">
                <span className="small-dot" /> Aguardando dados validados
              </div>
            </Link>
          ))}
        </div>
        <SourceNote source="Bases municipais ainda não validadas" />
      </section>
      <section className="home-middle">
        <div className="panel map-preview">
          <SectionTitle
            number="02"
            title="O cuidado no território"
            subtitle="Explore a Rede de Atenção Psicossocial em Itajaí."
            href="/mapa-raps"
            link="Abrir mapa"
          />
          <div className="territory-preview">
            <iframe
              title="Mapa geográfico de Itajaí — sem marcadores de serviços não confirmados"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-48.733%2C-26.96%2C-48.608%2C-26.856&layer=mapnik"
            />
            <div className="map-overlay">
              <MapPin size={18} />
              <div>
                <strong>Itajaí · Santa Catarina</strong>
                <span>Serviços aguardando verificação documental</span>
              </div>
            </div>
          </div>
          <div className="map-caption">
            <Info size={14} />
            <span>
              Ausência de informação não significa ausência de atendimento.
            </span>
          </div>
        </div>
        <div className="panel monitoring-panel">
          <SectionTitle
            number="03"
            title="Transparência em movimento"
            subtitle="Acompanhe da solicitação à evidência."
          />
          <div className="monitor-links">
            <Link href="/solicitacoes">
              <span className="round-icon teal">
                <Clock3 size={21} />
              </span>
              <div>
                <h3>Solicitações e respostas</h3>
                <p>Protocolos e histórico de acompanhamento</p>
              </div>
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/fiscalizacoes">
              <span className="round-icon blue">
                <ClipboardCheck size={21} />
              </span>
              <div>
                <h3>Fiscalizações da rede</h3>
                <p>Relatórios, recomendações e providências</p>
              </div>
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/acoes-executivo">
              <span className="round-icon amber">
                <CheckCircle2 size={21} />
              </span>
              <div>
                <h3>Compromissos públicos</h3>
                <p>Anúncios e execução comprovada</p>
              </div>
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="monitor-note">
            <ShieldCheck size={18} />
            <p>
              Cada registro publicado deve ter fonte, período e revisão.
              Acompanhe os fatos, não suposições.
            </p>
          </div>
        </div>
      </section>
      <section className="home-bottom">
        <div>
          <SectionTitle
            number="04"
            title="Últimas atualizações"
            href="/timeline"
            link="Ver linha do tempo"
          />
          {(records.data?.length || 0) > 0 ? (
            <div style={{ display: "grid", gap: 12 }}>
              {records.data!.slice(0, 3).map(r => (
                <RecordCard key={r.id} record={r as any} />
              ))}
            </div>
          ) : (
            <div className="panel compact-empty">
              <CalendarDays size={25} />
              <h3>A memória começa com registros.</h3>
              <p>
                Reuniões, documentos e ações aparecerão aqui após revisão e
                publicação.
              </p>
              <Link href="/timeline" className="text-link">
                Acompanhar a jornada <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
        <div>
          <SectionTitle
            title="Biblioteca pública"
            href="/documentos"
            link="Consultar biblioteca"
          />
          <div className="panel library-feature">
            <BookOpen size={28} />
            <h3>
              A evidência faz parte
              <br />
              da informação.
            </h3>
            <p>
              Consulte ofícios, atas, relatórios e fontes autorizadas.
              Documentos internos nunca são publicados automaticamente.
            </p>
            <Link className="text-link" href="/documentos">
              Explorar documentos <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      <div className="participation-strip">
        <Users size={26} />
        <div>
          <h2>O controle social se faz com participação.</h2>
          <p>
            Conheça a iniciativa, os critérios de monitoramento e como
            contribuir com informações verificáveis.
          </p>
        </div>
        <Link href="/metodologia#contato" className="button button-secondary">
          Saiba como participar <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
function SendIcon(props: any) {
  return <FileText {...props} />;
}
