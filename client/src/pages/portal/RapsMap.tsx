import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "wouter";
import { ArrowUpRight, List, Map as MapIcon, Navigation } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { PortalRecord } from "@shared/portal";
import {
  Empty,
  Filters,
  Notice,
  PageHeading,
  SourceNote,
} from "@/components/portal/Common";
function MapCanvas({ records }: { records: PortalRecord[] }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.LayerGroup | null>(null);
  useEffect(() => {
    if (!el.current) return;
    const instance = L.map(el.current, { scrollWheelZoom: false }).setView(
      [-26.907, -48.661],
      13
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      maxZoom: 19,
    }).addTo(instance);
    markers.current = L.layerGroup().addTo(instance);
    map.current = instance;
    const resize = new ResizeObserver(() => instance.invalidateSize());
    resize.observe(el.current);
    return () => {
      resize.disconnect();
      instance.remove();
      map.current = null;
    };
  }, []);
  useEffect(() => {
    markers.current?.clearLayers();
    records.forEach(r => {
      const lat = Number(r.data.latitude),
        lng = Number(r.data.longitude);
      if (
        !r.verifiedAt ||
        !r.data.address ||
        !Number.isFinite(lat) ||
        !Number.isFinite(lng) ||
        !r.data.latitude ||
        !r.data.longitude
      )
        return;
      const content = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = r.title;
      const address = document.createElement("p");
      address.textContent = String(r.data.address);
      const a = document.createElement("a");
      a.href = `/registro/${r.id}`;
      a.textContent = "Consultar ficha e fonte";
      content.append(title, address, a);
      L.marker([lat, lng], {
        icon: L.divIcon({
          className: "service-marker",
          html: '<span style="display:block;width:22px;height:22px;background:#177e76;border:4px solid white;border-radius:50%;box-shadow:0 2px 6px #0003"></span>',
          iconSize: [22, 22],
        }),
      })
        .bindPopup(content)
        .addTo(markers.current!);
    });
  }, [records]);
  return (
    <div
      ref={el}
      style={{ height: "100%", width: "100%", zIndex: 1 }}
      role="region"
      aria-label="Mapa interativo de Itajaí. Lista textual de serviços disponível abaixo."
    />
  );
}
export default function RapsMap() {
  const [search, setSearch] = useState(""),
    [modality, setModality] = useState(""),
    [neighborhood, setNeighborhood] = useState(""),
    [view, setView] = useState("Mapa");
  const q = trpc.portal.list.useQuery({ module: "services", search });
  const records = ((q.data || []) as PortalRecord[]).filter(
    r =>
      (!modality || r.data.modality === modality) &&
      (!neighborhood || r.data.neighborhood === neighborhood)
  );
  const neighborhoods = [
    ...new Set(
      ((q.data || []) as PortalRecord[])
        .map(r => String(r.data.neighborhood || ""))
        .filter(Boolean)
    ),
  ];
  return (
    <div className="content-page">
      <PageHeading
        title="Mapa da RAPS"
        description="A rede de cuidado no território: localização e informações dos serviços com verificação documental."
      >
        <Link href="/guia-caps" className="button button-primary">
          Conhecer o guia dos CAPS <ArrowUpRight size={15} />
        </Link>
      </PageHeading>
      <Notice title="Não mostramos serviços não confirmados">
        As unidades de Itajaí ainda aguardam confirmação cadastral e operacional
        atual. Os marcadores serão exibidos somente com endereço, coordenadas e
        informação verificada. Ausência de ponto não significa ausência de
        atendimento.
      </Notice>
      <Filters
        search={search}
        onSearch={setSearch}
        extra={
          <>
            <select
              aria-label="Modalidade de serviço"
              value={modality}
              onChange={e => setModality(e.target.value)}
            >
              <option value="">Todas as modalidades</option>
              {[
                "CAPS I",
                "CAPS II",
                "CAPS III",
                "CAPS AD",
                "CAPS AD III",
                "CAPSi",
                "UBS",
                "UPA",
                "Hospital",
                "Consultório na Rua",
                "CIS",
                "Unidade de Acolhimento",
                "Outro",
              ].map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select
              aria-label="Bairro"
              value={neighborhood}
              onChange={e => setNeighborhood(e.target.value)}
            >
              <option value="">Todos os bairros</option>
              {neighborhoods.map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </>
        }
      />
      <div className="tabs" role="tablist" aria-label="Modo de exibição">
        {["Mapa", "Lista acessível"].map(v => (
          <button
            key={v}
            role="tab"
            aria-selected={view === v}
            className={view === v ? "selected" : ""}
            onClick={() => setView(v)}
          >
            {v}
          </button>
        ))}
      </div>
      {view === "Mapa" && (
        <div className="map-full">
          <MapCanvas records={records} />
          <div className="map-overlay" style={{ zIndex: 400 }}>
            <MapIcon size={20} />
            <div>
              <strong>Base geográfica de Itajaí</strong>
              <span>
                {records.length
                  ? `${records.length} serviço(s) documentado(s)`
                  : "Sem marcadores: serviços aguardando validação"}
              </span>
            </div>
          </div>
        </div>
      )}
      <SourceNote
        source="Base cartográfica: OpenStreetMap; serviços: registros verificados"
        period="Diretório em levantamento"
        date="Serviços sem base atual validada"
      />
      <h2 style={{ fontSize: 18, margin: "25px 0 15px" }}>
        Serviços e fichas públicas
      </h2>
      {records.length ? (
        <div className="cards-grid">
          {records.map(r => (
            <div className="record-card" key={r.id}>
              <span className="status-pill">
                {r.data.modality || "Tipo não informado"}
              </span>
              <h3>{r.title}</h3>
              <p>{r.data.address || "Endereço não informado"}</p>
              <p>{r.data.neighborhood || "Bairro não informado"}</p>
              <p>{r.data.hours || "Horário não informado"}</p>
              <div className="admin-actions" style={{ marginTop: 17 }}>
                <Link
                  href={`/registro/${r.id}`}
                  className="button button-secondary"
                >
                  Ficha e evidências <ArrowUpRight size={14} />
                </Link>
                {r.verifiedAt && r.data.address && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(r.data.address + ", Itajaí SC")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="button button-secondary"
                  >
                    <Navigation size={14} /> Abrir rota
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          title="Diretório em levantamento"
          text="Endereços, horários, contatos e funcionamento serão apresentados após confirmação atual. Consulte sua UBS ou a Secretaria Municipal de Saúde para orientação local."
        />
      )}
    </div>
  );
}
