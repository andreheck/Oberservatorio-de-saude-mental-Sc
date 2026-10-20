import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Search as SearchIcon } from "lucide-react";
import { modules, PortalRecord } from "@shared/portal";
import { trpc } from "@/lib/trpc";
import {
  Empty,
  Filters,
  PageHeading,
  RecordCard,
} from "@/components/portal/Common";
export default function Search() {
  const [query, setQuery] = useState(
    new URLSearchParams(window.location.search).get("q") || ""
  );
  const q = trpc.portal.list.useQuery({ search: query });
  const norm = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const matching = modules.filter(m =>
    norm(m.title + " " + m.description).includes(norm(query))
  );
  const records = (q.data || []) as PortalRecord[];
  return (
    <div className="content-page">
      <PageHeading
        title="Busca no observatório"
        description="Pesquise módulos, documentos e registros autorizados para consulta pública."
      />
      <Filters search={query} onSearch={setQuery} />
      <h2 style={{ fontSize: 18, margin: "25px 0 15px" }}>
        Explore os módulos
      </h2>
      <div className="cards-grid">
        {matching.map(m => (
          <Link href={m.path} className="record-card" key={m.key}>
            <h3>
              {m.title}
              <ArrowUpRight size={17} />
            </h3>
            <p>{m.description}</p>
          </Link>
        ))}
      </div>
      <h2 style={{ fontSize: 18, margin: "30px 0 15px" }}>
        Registros públicos
      </h2>
      {records.length ? (
        <div className="cards-grid">
          {records.map(r => (
            <RecordCard record={r} key={r.id} />
          ))}
        </div>
      ) : (
        <Empty
          title="Nenhum registro público encontrado"
          text="A busca não expõe documentos internos nem conteúdos em revisão."
        />
      )}
    </div>
  );
}
