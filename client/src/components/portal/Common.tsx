import { ReactNode } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Database,
  FileSearch,
  Info,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "wouter";
import { PortalRecord } from "@shared/portal";
import { buildPortalCSV } from "@shared/portalData";
export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">
          {eyebrow || "TRANSPARÊNCIA E MONITORAMENTO"}
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
export function Notice({
  children,
  title = "Informação em construção",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="notice">
      <Info size={18} />
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}
export function Empty({
  title = "Dados em levantamento",
  text = "Os registros serão apresentados após conferência das fontes e autorização de publicação.",
  icon = "data",
}: {
  title?: string;
  text?: string;
  icon?: string;
}) {
  return (
    <div className="empty-state">
      {icon === "file" ? <FileSearch size={27} /> : <Database size={27} />}
      <h3>{title}</h3>
      <p>{text}</p>
      <Link href="/metodologia" className="text-link">
        Entenda como validamos os dados <ArrowUpRight size={15} />
      </Link>
    </div>
  );
}
export function SourceNote({
  source = "Registros do observatório",
  period = "Aguardando definição",
  date = "Sem dados validados",
}: {
  source?: string;
  period?: string;
  date?: string;
}) {
  return (
    <div className="source-note">
      <span>Fonte: {source}</span>
      <span>Período: {period}</span>
      <span>Atualização: {date}</span>
    </div>
  );
}
export function SectionTitle({
  number,
  title,
  subtitle,
  href,
  link = "Ver todos",
}: {
  number?: string;
  title: string;
  subtitle?: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>
          {number && <span className="section-number">{number}</span>}
          {title}
        </h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="text-link">
          {link}
          <ArrowUpRight size={15} />
        </Link>
      )}
    </div>
  );
}
export function Filters({
  search,
  onSearch,
  status,
  onStatus,
  options,
  extra,
}: {
  search: string;
  onSearch: (v: string) => void;
  status?: string;
  onStatus?: (v: string) => void;
  options?: string[];
  extra?: ReactNode;
}) {
  return (
    <div className="filter-bar">
      <div className="filter-search">
        <Search size={17} />
        <input
          aria-label="Pesquisar registros"
          placeholder="Pesquisar por palavra-chave..."
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      {onStatus && (
        <select
          aria-label="Filtrar por situação"
          value={status}
          onChange={e => onStatus(e.target.value)}
        >
          <option value="">Todas as situações</option>
          {options?.map(o => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )}
      {extra}
      <span className="filter-indicator">
        <SlidersHorizontal size={16} /> Filtros
      </span>
    </div>
  );
}
export function RecordCard({ record }: { record: PortalRecord }) {
  return (
    <Link href={`/registro/${record.id}`} className="record-card">
      <div className="record-top">
        <span className="status-pill">{record.status || "Verificado"}</span>
        <span>{record.referencePeriod}</span>
      </div>
      <h3>
        {record.title}
        <ArrowUpRight size={17} />
      </h3>
      <p>{record.description}</p>
      <div className="record-meta">
        Fonte: {record.sourceName} · Atualizado em{" "}
        {record.updatedAt
          ? new Date(record.updatedAt).toLocaleDateString("pt-BR")
          : "Não informado"}
      </div>
    </Link>
  );
}
export function exportCSV(records: PortalRecord[], filename: string) {
  const csv = buildPortalCSV(records);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8" })
  );
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
export function ExportButton({
  records,
  filename,
}: {
  records: PortalRecord[];
  filename: string;
}) {
  return (
    <button
      className="button button-secondary"
      onClick={() => exportCSV(records, filename)}
    >
      <ArrowDownToLine size={16} /> Exportar CSV
    </button>
  );
}
