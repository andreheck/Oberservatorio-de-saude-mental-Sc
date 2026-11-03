/// <reference types="@types/google.maps" />

import { useEffect, useRef } from "react";
import { usePersistFn } from "@/hooks/usePersistFn";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    google?: typeof google;
  }
}

let mapsScriptPromise: Promise<void> | null = null;

function loadMapScript(): Promise<void> {
  if (typeof window === "undefined")
    return Promise.reject(new Error("O mapa só pode ser aberto no navegador."));
  if (window.google?.maps) return Promise.resolve();
  const config = window.__MANUS_CONFIG__;
  if (!config?.apiUrl || !config.apiBrowserKey)
    return Promise.reject(
      new Error("A integração de mapas não está configurada.")
    );
  if (mapsScriptPromise) return mapsScriptPromise;

  const key = encodeURIComponent(config.apiBrowserKey);
  const proxy = `${config.apiUrl.replace(/\/$/, "")}/v1/maps/proxy`;
  mapsScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${proxy}/maps/api/js?key=${key}&v=weekly&libraries=marker,places,geocoding,geometry`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.manusMaps = "true";
    script.onload = () => {
      if (window.google?.maps) resolve();
      else {
        mapsScriptPromise = null;
        reject(new Error("O serviço de mapas não inicializou."));
      }
    };
    script.onerror = () => {
      mapsScriptPromise = null;
      script.remove();
      reject(
        new Error(
          "Falha ao carregar o serviço de mapas. A lista de endereços continua disponível."
        )
      );
    };
    document.head.appendChild(script);
  });
  return mapsScriptPromise;
}

interface MapViewProps {
  className?: string;
  initialCenter?: google.maps.LatLngLiteral;
  initialZoom?: number;
  onMapReady?: (map: google.maps.Map) => void;
  onMapError?: (error: Error) => void;
}

export function MapView({
  className,
  initialCenter = { lat: -26.91, lng: -48.69 },
  initialZoom = 12,
  onMapReady,
  onMapError,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);

  const init = usePersistFn(async () => {
    try {
      await loadMapScript();
      if (!mapContainer.current) return;
      map.current = new window.google!.maps.Map(mapContainer.current, {
        zoom: initialZoom,
        center: initialCenter,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
        streetViewControl: false,
        mapId: "DEMO_MAP_ID",
      });
      onMapReady?.(map.current);
    } catch (error) {
      onMapError?.(
        error instanceof Error
          ? error
          : new Error("Falha ao inicializar o mapa.")
      );
    }
  });

  useEffect(() => {
    void init();
    return () => {
      map.current = null;
    };
  }, [init]);

  return (
    <div ref={mapContainer} className={cn("w-full h-[500px]", className)} />
  );
}
