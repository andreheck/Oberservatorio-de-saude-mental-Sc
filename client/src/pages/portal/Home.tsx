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
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { verifiedHealthFacilities } from "@shared/localHealthFacilities";
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
      title: "Pontos com localização cruzada",
      label: "Endereços cadastrados; funcionamento ainda não confirmado",
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
          <span className="live-dot" /> OBSERVATÓRIO DE SAÚDE MENTAL (SUL DO BRASIL)
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
            <Link href="/dados-da-cidade" className="button button-primary">
              Conhecer a cidade em dados <ArrowRight size={17} />
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
        <Link href="/guia-caps" className="hero-visual">
          <img
            src="/images/collage-conversation-reference.png"
            alt="Profissional negra em conversa acolhedora com um casal mais velho, diante de recortes geométricos coloridos."
            loading="eager"
            decoding="async"
          />
          <span className="hero-visual-label">Conversa e acolhimento</span>
          <span className="hero-visual-link">
            Conheça os caminhos de cuidado <ArrowUpRight size={16} />
          </span>
        </Link>
      </section>
      <Link href="/guia-caps" className="care-bridge">
        <span className="care-bridge-art">
          <img
            src="/manus-storage/async-images/h1k4ztjz912XRa9iklgDN7/image-3.webp"
            alt="Ilustração editorial de uma mulher negra em perfil diante de um caminho que segue em direção ao sol."
            loading="lazy"
            decoding="async"
          />
        </span>
        <div>
          <span className="eyebrow">CAMINHOS DE CUIDADO</span>
          <h2>Preciso de ajuda. Por onde começo?</h2>
          <p>
            Orientação pública sobre acolhimento, CAPS e serviços de urgência,
            sem substituir atendimento clínico.
          </p>
        </div>
        <span className="care-bridge-arrow">
          <ArrowRight size={19} />
        </span>
      </Link>
      <div className="data-banner">
        <span className="amber-dot" />
        <div>
          <strong>Um observatório construído com evidências.</strong>
          <span>
            {" "}
            O perfil IBGE, referências da transparência e um retrato municipal
            de atendimentos/procedimentos de saúde mental (maio a agosto de
            2026) estão publicados. Metas selecionadas da PAS mostram valores
            planejados, sem execução informada; recortes territoriais ainda
            aguardam base validada. Nenhum valor é estimado.
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
          {counts.map((c, i) => {
            const moduleKey =
              ["services", "requests", "inspections", "budget"][i] ??
              "services";
            const items = (records.data || []).filter(
              record => record.module === moduleKey
            );
            const count =
              moduleKey === "services"
                ? verifiedHealthFacilities.length
                : items.length;
            return (
              <Link href={c.href} className="metric-card" key={c.title}>
                <div className="metric-top">
                  <c.icon size={20} />
                  <ArrowUpRight size={16} />
                </div>
                <div className="metric-value">
                  {count ? (
                    <>
                      {count}
                      <span>
                        {moduleKey === "services"
                          ? "Pontos no mapa"
                          : "Registros públicos"}
                      </span>
                    </>
                  ) : (
                    <>
                      — <span>Em levantamento</span>
                    </>
                  )}
                </div>
                <h3>{c.title}</h3>
                <p>{c.label}</p>
                <div className="metric-bottom">
                  <span className="small-dot" />
                  {moduleKey === "services"
                    ? "Funcionamento ainda não confirmado"
                    : "Aguardando dados validados"}
                </div>
              </Link>
            );
          })}
        </div>
        <SourceNote
          source="Mapa: CNES e diretório municipal · demais módulos: registros públicos revisados"
          period="Conforme a fonte indicada em cada página"
        />
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
                <span>
                  Mapa de referência; consulte a página da rede para os pontos
                  cadastrados.
                </span>
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
            <Link href="/atualizacoes-normativas">
              <span className="round-icon blue">
                <BookOpen size={21} />
              </span>
              <div>
                <h3>Atualizações normativas</h3>
                <p>Contexto federal da RAPS, sem benefício local identificado</p>
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
        <img
          className="participation-illustration"
          src="/manus-storage/async-images/h1k4ztjz912XRa9iklgDN7/image-2.webp"
          alt="Ilustração editorial de conversa comunitária inclusiva entre uma mulher negra, um homem jovem e uma mulher idosa em cadeira de rodas."
          loading="lazy"
          decoding="async"
        />
        <div>
          <h2>A escuta entre gerações também é participação.</h2>
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
