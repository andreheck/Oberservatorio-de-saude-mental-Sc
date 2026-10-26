/// <reference types="@types/google.maps" />
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Crosshair,
  Info,
  MapPin,
  Navigation,
  Search,
} from "lucide-react";
import { MapView } from "@/components/Map";
import { Notice, PageHeading, SourceNote } from "@/components/portal/Common";
import { trpc } from "@/lib/trpc";
import {
  cnesCatalogUrl,
  cnesDownloadUrl,
  distanceKm,
  locationSnapshotDate,
  municipalityDirectoryUrl,
  verifiedHealthFacilities,
  type Coordinates,
  type HealthFacilityKind,
} from "@shared/localHealthFacilities";

type Location = {
  id: string;
  name: string;
  kind: HealthFacilityKind;
  address: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  cnesCode?: string;
  note?: string;
};

const itajaiCenter = { lat: -26.91, lng: -48.69 };

function formatDistance(km: number) {
  if (km < 1) return `${Math.round(km * 1000)} m em linha reta`;
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(km)} km em linha reta`;
}

function classifyKind(text: string): HealthFacilityKind {
  const normalized = text.toUpperCase();
  if (normalized.includes("CAPS")) return "CAPS";
  if (normalized.includes("UPA")) return "UPA";
  if (normalized.includes("HOSPITAL")) return "Hospital";
  if (normalized.includes("UBS") || normalized.includes("UNIDADE DE SAÚDE"))
    return "UBS";
  if (normalized.includes("CIS")) return "CIS";
  if (normalized.includes("ACOLHIMENTO")) return "Acolhimento";
  return "Outro";
}

function toLocation(record: any): Location | null {
  const data = record.data || {};
  const latitude = Number(data.latitude);
  const longitude = Number(data.longitude);
  const verified =
    data.addressVerified === true ||
    data.locationVerified === true ||
    data.verified === true;
  if (
    !record.verifiedAt ||
    !verified ||
    !data.address ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -27.1 ||
    latitude > -26.8 ||
    longitude < -48.9 ||
    longitude > -48.55
  )
    return null;
  const kindText = `${data.modality || ""} ${record.title}`.toUpperCase();
  return {
    id: `portal-${record.id}`,
    name: record.title,
    kind: classifyKind(kindText),
    address: String(data.address),
    neighborhood: String(data.neighborhood || "Bairro não informado"),
    latitude,
    longitude,
    cnesCode: data.cnesCode ? String(data.cnesCode) : undefined,
    note: "Registro publicado após revisão; confira a fonte e a data na ficha pública.",
  };
}

export default function RapsMap() {
  const publicServices = trpc.portal.list.useQuery({ module: "services" });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [origin, setOrigin] = useState<Coordinates | null>(null);
  const [locationState, setLocationState] = useState<
    "idle" | "loading" | "ready" | "denied" | "error"
  >("idle");
  const [mapError, setMapError] = useState("");
  const [kindFilter, setKindFilter] = useState("all");
  const [neighborhoodFilter, setNeighborhoodFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const markers = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const userMarker = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const infoWindow = useRef<google.maps.InfoWindow | null>(null);

  const locations = useMemo<Location[]>(() => {
    const base: Location[] = verifiedHealthFacilities.map(item => ({
      id: item.id,
      name: item.name,
      kind: item.kind,
      address: item.address,
      neighborhood: item.neighborhood,
      latitude: item.latitude,
      longitude: item.longitude,
      cnesCode: item.cnesCode,
      note: item.locationNote,
    }));
    const codes = new Set(base.map(item => item.cnesCode).filter(Boolean));
    const coordinateKeys = new Set(
      base.map(
        item => `${item.latitude.toFixed(4)},${item.longitude.toFixed(4)}`
      )
    );
    const published = ((publicServices.data || []) as any[])
      .map(toLocation)
      .filter((item): item is Location => !!item)
      .filter(
        item =>
          !codes.has(item.cnesCode) &&
          !coordinateKeys.has(
            `${item.latitude.toFixed(4)},${item.longitude.toFixed(4)}`
          )
      );
    return [...base, ...published];
  }, [publicServices.data]);

  const neighborhoods = useMemo(
    () =>
      [...new Set(locations.map(item => item.neighborhood))].sort((a, b) =>
        a.localeCompare(b, "pt-BR")
      ),
    [locations]
  );
  const kinds = useMemo(
    () =>
      [...new Set(locations.map(item => item.kind))].sort((a, b) =>
        a.localeCompare(b, "pt-BR")
      ),
    [locations]
  );
  const visibleLocations = useMemo(() => {
    const normalized = search.trim().toLocaleLowerCase("pt-BR");
    return locations
      .filter(item => kindFilter === "all" || item.kind === kindFilter)
      .filter(
        item =>
          neighborhoodFilter === "all" ||
          item.neighborhood === neighborhoodFilter
      )
      .filter(
        item =>
          !normalized ||
          `${item.name} ${item.address} ${item.neighborhood}`
            .toLocaleLowerCase("pt-BR")
            .includes(normalized)
      )
      .map(item => ({
        ...item,
        distance: origin
          ? distanceKm(origin, {
              latitude: item.latitude,
              longitude: item.longitude,
            })
          : null,
      }))
      .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
  }, [locations, kindFilter, neighborhoodFilter, search, origin]);

  useEffect(() => {
    if (!map) return;
    markers.current.forEach(marker => (marker.map = null));
    markers.current = [];
    infoWindow.current?.close();
    const popup = infoWindow.current || new window.google!.maps.InfoWindow();
    infoWindow.current = popup;
    const bounds = new window.google!.maps.LatLngBounds();
    if (origin) bounds.extend({ lat: origin.latitude, lng: origin.longitude });
    for (const item of visibleLocations) {
      const position = { lat: item.latitude, lng: item.longitude };
      bounds.extend(position);
      const marker = new window.google!.maps.marker.AdvancedMarkerElement({
        map,
        position,
        title: `${item.name} — ponto cadastral; funcionamento atual não verificado`,
      });
      marker.addListener("click", () => {
        const content = document.createElement("div");
        content.className = "map-popup";
        const title = document.createElement("strong");
        title.textContent = item.name;
        const address = document.createElement("p");
        address.textContent = item.address;
        const status = document.createElement("small");
        status.textContent =
          item.note ||
          "Endereço municipal cruzado com coordenada CNES; funcionamento atual não confirmado.";
        content.append(title, address, status);
        popup.setContent(content);
        popup.open({ map, anchor: marker });
        setSelectedId(item.id);
      });
      markers.current.push(marker);
    }
    if (visibleLocations.length + (origin ? 1 : 0) > 1)
      map.fitBounds(bounds, 44);
    else if (visibleLocations.length === 1) {
      map.setCenter({
        lat: visibleLocations[0]!.latitude,
        lng: visibleLocations[0]!.longitude,
      });
      map.setZoom(15);
    } else {
      map.setCenter(itajaiCenter);
      map.setZoom(12);
    }
    if (origin) {
      if (userMarker.current) userMarker.current.map = null;
      const dot = document.createElement("span");
      dot.className = "map-user-dot";
      dot.setAttribute("aria-hidden", "true");
      userMarker.current = new window.google!.maps.marker.AdvancedMarkerElement(
        {
          map,
          position: { lat: origin.latitude, lng: origin.longitude },
          title: "Sua posição, calculada apenas nesta sessão",
          content: dot,
        }
      );
    } else if (userMarker.current) {
      userMarker.current.map = null;
      userMarker.current = null;
    }
    return () => {
      markers.current.forEach(marker => (marker.map = null));
      markers.current = [];
      if (userMarker.current) userMarker.current.map = null;
    };
  }, [map, visibleLocations, origin]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationState("error");
      return;
    }
    setLocationState("loading");
    navigator.geolocation.getCurrentPosition(
      position => {
        setOrigin({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationState("ready");
      },
      error =>
        setLocationState(
          error.code === error.PERMISSION_DENIED ? "denied" : "error"
        ),
      { enableHighAccuracy: false, maximumAge: 30000, timeout: 12000 }
    );
  };

  const addressMatchedUbs = verifiedHealthFacilities.filter(
    item => item.kind === "UBS"
  ).length;
  return (
    <div className="content-page raps-page">
      <PageHeading
        title="Mapa da rede de cuidado"
        description="Explore pontos cadastrais de saúde em Itajaí, consulte o endereço e, se quiser, calcule no seu dispositivo a distância aproximada até cada local."
      />
      <Notice title="Localização do aparelho só com a sua autorização">
        A posição é solicitada apenas quando você aciona “Usar minha
        localização”. As coordenadas ficam em memória nesta página e as
        distâncias são calculadas localmente em linha reta; não são enviadas ao
        portal nem guardadas. O funcionamento, horário e oferta de cada unidade
        ainda precisam de confirmação recente.
      </Notice>
      <div className="raps-summary-row">
        <div className="raps-summary-card">
          <strong>{addressMatchedUbs} / 32</strong>
          <span>UBS listadas com endereço e ponto CNES cruzados</span>
        </div>
        <div className="raps-summary-card">
          <strong>1</strong>
          <span>CAPS II com bairro divergente entre fontes</span>
        </div>
        <div className="raps-summary-card">
          <strong>{locations.length}</strong>
          <span>
            pontos exibidos; número de pontos não mede cobertura nem capacidade
          </span>
        </div>
      </div>
      <section className="raps-map-section" aria-labelledby="mapa-titulo">
        <div className="raps-map-controls">
          <div>
            <div className="eyebrow" id="mapa-titulo">
              CAMADAS DO MAPA
            </div>
            <div
              className="raps-layer-switch"
              role="group"
              aria-label="Camadas geográficas"
            >
              <button type="button" className="selected" aria-pressed="true">
                Pontos corroborados
              </button>
              <button
                type="button"
                disabled
                aria-describedby="heatmap-limitation"
              >
                Mapa de calor
              </button>
            </div>
          </div>
          <button
            className="button button-secondary"
            type="button"
            onClick={requestLocation}
            disabled={locationState === "loading"}
          >
            <Crosshair size={16} />
            {locationState === "loading"
              ? "Aguardando permissão…"
              : locationState === "ready"
                ? "Atualizar minha localização"
                : "Usar minha localização"}
          </button>
        </div>
        <p className="map-layer-explanation" id="heatmap-limitation">
          O mapa de calor de saúde mental está desativado: a publicação municipal
          de 17/09/2026 apresenta totais por serviço para maio a agosto, sem
          distribuição por bairro ou denominadores territoriais, portanto não
          permite atribuir registros a áreas do mapa.{" "}
          <a
            href="https://itajai.sc.gov.br/noticias/37613/setembro-amarelo-reune-acoes-de-saude-mental-em-itajai"
            target="_blank"
            rel="noreferrer"
          >
            Consulte a publicação municipal
          </a>
          . Não usamos endereços de pessoas, casos individuais ou dados clínicos.
        </p>
        {locationState === "denied" && (
          <p className="inline-state" role="status">
            Permissão de localização negada. O mapa, a busca e os endereços
            continuam disponíveis sem GPS.
          </p>
        )}
        {locationState === "error" && (
          <p className="inline-state" role="status">
            Não foi possível obter a localização neste navegador. Você pode
            continuar usando o diretório e abrir o destino por endereço.
          </p>
        )}
        {locationState === "ready" && (
          <p className="inline-state" role="status">
            Posição ativa apenas nesta página. Distâncias aproximadas em linha
            reta; não equivalem a trajeto viário.
          </p>
        )}
        <div className="raps-filter-bar">
          <label className="filter-search">
            <Search size={15} />
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Buscar unidade, rua ou bairro"
              aria-label="Buscar unidade, rua ou bairro"
            />
          </label>
          <label className="filter-control">
            Tipo
            <select
              value={kindFilter}
              onChange={event => setKindFilter(event.target.value)}
              aria-label="Filtrar por tipo de serviço"
            >
              <option value="all">Todos os pontos</option>
              {kinds.map(kind => (
                <option key={kind} value={kind}>
                  {kind === "UBS" ? "UBS / atenção primária" : kind}
                </option>
              ))}
            </select>
          </label>
          <label className="filter-control">
            Bairro
            <select
              value={neighborhoodFilter}
              onChange={event => setNeighborhoodFilter(event.target.value)}
              aria-label="Filtrar por bairro"
            >
              <option value="all">Todos os bairros</option>
              {neighborhoods.map(neighborhood => (
                <option key={neighborhood}>{neighborhood}</option>
              ))}
            </select>
          </label>
        </div>
        <div
          className="raps-map-frame"
          role="region"
          aria-label="Mapa Google de pontos de saúde corroborados em Itajaí"
        >
          {mapError ? (
            <div className="map-load-error" role="status">
              O mapa interativo não está disponível agora. Use a lista acessível
              abaixo para consultar os endereços. {mapError}
            </div>
          ) : (
            <MapView
              initialCenter={itajaiCenter}
              initialZoom={12}
              className="raps-map-canvas"
              onMapReady={setMap}
              onMapError={error => setMapError(error.message)}
            />
          )}
        </div>
        <div className="map-caption">
          <MapPin size={16} />
          <span>
            {visibleLocations.length} ponto(s) nesta seleção · Coordenadas do
            CNES consultadas em {locationSnapshotDate}.
          </span>
        </div>
      </section>
      <section className="raps-directory-section" id="locais">
        <div className="section-heading">
          <div>
            <span className="section-number">01</span>
            <h2>Endereços e distância</h2>
            <p>
              Selecione “Usar minha localização” para ver a distância aproximada
              calculada no aparelho.
            </p>
          </div>
        </div>
        {visibleLocations.length ? (
          <div className="facility-card-grid">
            {visibleLocations.map(item => {
              const distance = origin
                ? distanceKm(origin, {
                    latitude: item.latitude,
                    longitude: item.longitude,
                  })
                : null;
              const directions = `https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}&travelmode=walking`;
              return (
                <article
                  className={`facility-card ${selectedId === item.id ? "is-selected" : ""}`}
                  key={item.id}
                  id={`facility-${item.id}`}
                >
                  <div className="facility-card-top">
                    <span
                      className={`facility-kind ${item.kind === "CAPS" ? "is-caps" : ""}`}
                    >
                      {item.kind}
                    </span>
                    <span className="facility-status">
                      {item.cnesCode
                        ? `CNES ${item.cnesCode}`
                        : "Registro do portal"}
                    </span>
                  </div>
                  <h3>{item.name}</h3>
                  <p className="facility-address">
                    <MapPin size={15} />
                    {item.address}
                  </p>
                  <p className="facility-neighborhood">
                    Bairro: {item.neighborhood}
                  </p>
                  {item.note && (
                    <p className="facility-location-note">
                      <Info size={14} />
                      {item.note}
                    </p>
                  )}
                  <div className="facility-distance">
                    {distance !== null ? (
                      <>
                        <Navigation size={15} />
                        {formatDistance(distance)}
                      </>
                    ) : (
                      "Distância não calculada — localização não ativada."
                    )}
                  </div>
                  <a
                    className="text-link"
                    href={directions}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir destino no Google Maps <ArrowUpRight size={14} />
                  </a>
                  <small className="external-map-note">
                    Ao abrir o serviço externo, o Google poderá receber dados de
                    navegação ou localização conforme as suas definições.
                  </small>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Nenhum local nesta busca</h3>
            <p>Altere os filtros para consultar os endereços disponíveis.</p>
          </div>
        )}
      </section>
      <section
        className="raps-pending-grid"
        aria-label="Localizações que precisam de confirmação"
      >
        <article className="pending-location-card">
          <span className="status-chip status-amber">
            Localização divergente
          </span>
          <h3>CAPSi</h3>
          <p>
            O diretório municipal sem data editorial e o CNES ainda exibem Rua
            Alfredo Trompowsky, 405. Notícia municipal de abril de 2025 informa
            mudança para Rua Umbelino Damásio de Brito, 192. A localização atual
            precisa de confirmação recente; nenhum marcador ou rota é mostrado.
          </p>
          <a
            href="https://itajai.sc.gov.br/noticias/33646/capsi-tem-novo-endereco-a-partir-desta-quarta-feira-09"
            target="_blank"
            rel="noreferrer"
          >
            Ler aviso municipal de mudança <ArrowUpRight size={14} />
          </a>
        </article>
        <article className="pending-location-card">
          <span className="status-chip status-amber">
            Localização divergente
          </span>
          <h3>CAPS AD</h3>
          <p>
            O CNES baixado em 20/10/2026 informa Rua Alberto Werner, 645;
            notícia municipal de março de 2024 relata mudança para Rua Silva,
            628. É preciso confirmar o endereço vigente antes de mostrar uma
            rota.
          </p>
          <a
            href="https://saude.itajai.sc.gov.br/noticia/31774/caps-ad-estara-fechado-nesta-quinta-07-sexta-08-e-segunda-feira-11-para-mudanca"
            target="_blank"
            rel="noreferrer"
          >
            Ler aviso municipal de mudança <ArrowUpRight size={14} />
          </a>
        </article>
        <article className="pending-location-card">
          <span className="status-chip status-teal">
            Obra reportada em 2026
          </span>
          <h3>CAPS AD III — São Vicente</h3>
          <p>
            Notícia municipal de 18/05/2026 informa obra em andamento com
            recursos do PAC Federal. É um projeto reportado, não um serviço
            aberto; por isso não há marcador de unidade ativa.
          </p>
          <a
            href="https://itajai.sc.gov.br/noticias/36589/semana-da-luta-antimanicomial-mobiliza-rede-de-saude-mental-de-itajai"
            target="_blank"
            rel="noreferrer"
          >
            Consultar a fonte municipal <ArrowUpRight size={14} />
          </a>
        </article>
      </section>
      <Notice title="O mapa não mede cobertura, fila ou qualidade do atendimento">
        Os 17 endereços de UBS são correspondências por logradouro/número entre
        o diretório municipal e o arquivo CNES; a Prefeitura lista 32 UBS, então
        os demais endereços não são tratados como ausentes. Um ponto no mapa não
        confirma funcionamento, capacidade, acessibilidade ou adequação da
        unidade para cada necessidade.
      </Notice>
      <SourceNote
        source="Prefeitura de Itajaí — Unidades de Atendimento à População; Ministério da Saúde/DATASUS — CNES, arquivo de estabelecimentos"
        period="Diretório municipal consultado em 20/10/2026 (sem data de edição exposta); arquivo CNES atualizado na data da extração"
        date="20/10/2026"
      />
      <div className="source-box">
        Fontes:{" "}
        <a href={municipalityDirectoryUrl} target="_blank" rel="noreferrer">
          Diretório municipal de unidades
        </a>{" "}
        ·{" "}
        <a href={cnesCatalogUrl} target="_blank" rel="noreferrer">
          Catálogo oficial do CNES
        </a>{" "}
        ·{" "}
        <a href={cnesDownloadUrl} target="_blank" rel="noreferrer">
          Arquivo CNES usado no cruzamento
        </a>
        . Coordenadas e endereços permanecem sujeitos a correção pela fonte
        responsável.
      </div>
    </div>
  );
}
