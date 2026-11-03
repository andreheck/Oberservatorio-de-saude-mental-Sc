import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Building2,
  CalendarClock,
  ChevronRight,
  ClipboardCheck,
  Database,
  FileText,
  Handshake,
  Home,
  Info,
  MapPin,
  Map,
  Menu,
  Search,
  Send,
  ShieldCheck,
  Users,
  X,
  HeartHandshake,
} from "lucide-react";
import { modules } from "@shared/portal";
import { trpc } from "@/lib/trpc";
export const icons: Record<string, any> = {
  chart: BarChart3,
  map: Map,
  users: Users,
  clipboard: ClipboardCheck,
  send: Send,
  building: Building2,
  handshake: Handshake,
  clock: CalendarClock,
  pin: MapPin,
  files: FileText,
  book: BookOpen,
};
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/inicio"
      className="brand"
      aria-label="Observatório de Saúde Mental (Sul do Brasil), início"
    >
      <span className="brand-mark">
          <img src="/images/logo-observatorio-sul.png" alt="" />
      </span>
      <span>
        <b>
          observatório<span className="brand-dot">.</span>
        </b>
        {!compact && <small>SAÚDE MENTAL · SUL DO BRASIL</small>}
      </span>
    </Link>
  );
}
export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const settings = trpc.portal.settings.useQuery();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location]);
  const title =
    modules.find(m => m.path === location)?.title ??
    (location.startsWith("/guia-caps")
      ? "Guia de acesso aos CAPS"
      : location === "/dados-da-cidade"
        ? "Dados da cidade"
        : location === "/metas-saude"
          ? "Metas da saúde mental"
          : location === "/atualizacoes-normativas"
            ? "Atualizações normativas"
          : location === "/cism"
            ? "Área dos membros CISM"
            : location === "/metodologia"
              ? "Metodologia e contato"
              : location === "/admin"
                ? "Área de gestão"
                : "Panorama da saúde mental");
  useEffect(() => {
    document.title = `${title} | Observatório de Saúde Mental (Sul do Brasil)`;
  }, [title]);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      {open && (
        <button
          className="menu-scrim"
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
        />
      )}
      <aside className={`sidebar ${open ? "is-open" : ""}`}>
        <div className="side-brand">
          <Brand />
          <button
            className="mobile-only icon-button"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            <X />
          </button>
        </div>
        <div className="side-label">ACOMPANHE O OBSERVATÓRIO</div>
        <nav aria-label="Navegação principal">
          <Link
            href="/inicio"
            className={`nav-item ${location === "/inicio" ? "active" : ""}`}
          >
            <Home size={18} />
            <span>Início</span>
            {location === "/inicio" && <ChevronRight size={15} />}
          </Link>
          <Link
            href="/dados-da-cidade"
            className={`nav-item ${location === "/dados-da-cidade" ? "active" : ""}`}
          >
            <Database size={18} />
            <span>Dados da cidade</span>
          </Link>
          <Link
            href="/metas-saude"
            className={`nav-item ${location === "/metas-saude" ? "active" : ""}`}
          >
            <BarChart3 size={18} />
            <span>Metas de saúde 2026–2029</span>
          </Link>
          {modules.slice(0, 9).map(m => {
            const Icon = icons[m.icon];
            return (
              <Link
                key={m.key}
                href={m.path}
                className={`nav-item ${location === m.path ? "active" : ""}`}
              >
                <Icon size={18} />
                <span>{m.short}</span>
              </Link>
            );
          })}
          <div className="nav-divider" />
          {modules.slice(9).map(m => {
            const Icon = icons[m.icon];
            return (
              <Link
                key={m.key}
                href={m.path}
                className={`nav-item ${location === m.path ? "active" : ""}`}
              >
                <Icon size={18} />
                <span>{m.short}</span>
              </Link>
            );
          })}
          <Link
            href="/atualizacoes-normativas"
            className={`nav-item ${location === "/atualizacoes-normativas" ? "active" : ""}`}
          >
            <BookOpen size={18} />
            <span>Atualizações normativas</span>
          </Link>
          <Link
            href="/cism"
            className={`nav-item ${location === "/cism" ? "active" : ""}`}
          >
            <ShieldCheck size={18} />
            <span>Área dos membros CISM</span>
          </Link>
          <Link
            href="/metodologia"
            className={`nav-item ${location === "/metodologia" ? "active" : ""}`}
          >
            <Info size={18} />
            <span>Metodologia e contato</span>
          </Link>
        </nav>
        <div className="side-bottom">
          <Link className="side-help" href="/guia-caps">
            <HeartHandshake size={20} />
            <span>
              Precisa de ajuda?<small>Conheça o guia dos CAPS</small>
            </span>
            <ArrowUpRight size={16} />
          </Link>
          <Link href="/admin" className="admin-link">
            <ShieldCheck size={15} /> Área de gestão
          </Link>
          <div className="side-note">
            Transparência e participação social.
            <br />
            Informação para cuidar melhor.
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-only icon-button"
              onClick={() => setOpen(true)}
              aria-label="Abrir navegação"
              aria-expanded={open}
            >
              <Menu />
            </button>
            <span className="topbar-place">
              <MapPin size={14} /> Dados: Itajaí/SC
            </span>
            <span className="topbar-separator">/</span>
            <span className="topbar-title">{title}</span>
          </div>
          <form action="/busca" className="global-search">
            <Search size={17} />
            <input
              name="q"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar no observatório"
              aria-label="Buscar no observatório"
            />
            <button type="submit" aria-label="Pesquisar">
              <ChevronRight size={17} />
            </button>
          </form>
        </header>
        <main id="conteudo" tabIndex={-1}>
          {children}
        </main>
        <footer className="footer">
          <div>
            <strong>
              {settings.data?.name || "Observatório de Saúde Mental (Sul do Brasil)"}
            </strong>
            <p>
              {settings.data?.signature ||
                "Iniciativa de acompanhamento relacionada à atuação da CISM no COMUSA."}
              <br />
              Não constitui representação oficial do conselho sem autorização
              expressa.
            </p>
          </div>
          <div>
            <Link href="/metodologia">Fontes e metodologia</Link>
            <Link href="/metodologia#privacidade">Privacidade e correções</Link>
            <span>Informação pública. Cuidado coletivo.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
