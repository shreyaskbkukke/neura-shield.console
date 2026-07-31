"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import type { HotspotListItem } from "../types";

const KARNATAKA_CENTER = { lat: 14.5204, lng: 75.7224 };
const KARNATAKA_BOUNDS = {
  north: 18.5,
  south: 11.5,
  west: 74.0,
  east: 78.5,
};

const RISK_MARKER_COLOR: Record<string, string> = {
  LOW: "#10B981",
  MEDIUM: "#F59E0B",
  HIGH: "#F97316",
  CRITICAL: "#EF4444",
};

function markerIcon(riskLevel: string | null, selected: boolean) {
  const color = RISK_MARKER_COLOR[riskLevel?.toUpperCase() ?? ""] ?? "#64748B";
  const radius = selected ? 10 : 7;
  const stroke = selected ? "#1E293B" : "#FFFFFF";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${radius * 2 + 4}" height="${radius * 2 + 4}">
    <circle cx="${radius + 2}" cy="${radius + 2}" r="${radius}" fill="${color}" stroke="${stroke}" stroke-width="2" />
  </svg>`;
  return {
    url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
  };
}

interface HotspotGoogleMapProps {
  hotspots: HotspotListItem[];
  selectedId: string | null;
  onSelectHotspot: (id: string) => void;
  heightClass?: string;
}

export function HotspotGoogleMap({ hotspots, selectedId, onSelectHotspot, heightClass }: Readonly<HotspotGoogleMapProps>) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  const containerHeight = heightClass ?? "h-[420px]";

  if (!apiKey) {
    return (
      <div className={`flex ${containerHeight} items-center justify-center rounded-xl border border-navy-200 bg-navy-50 text-sm text-navy-500`}>
        Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable the map view.
      </div>
    );
  }

  return (
    <div className={`${containerHeight} w-full overflow-hidden rounded-xl border border-navy-200`}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={KARNATAKA_CENTER}
          defaultZoom={7}
          minZoom={6}
          maxZoom={18}
          restriction={{ latLngBounds: KARNATAKA_BOUNDS, strictBounds: false }}
          gestureHandling="greedy"
          disableDefaultUI={false}
          mapTypeControl={false}
          streetViewControl={false}
        >
          {hotspots.map((hs) => (
            <Marker
              key={hs.id}
              position={{ lat: hs.center_latitude, lng: hs.center_longitude }}
              title={`${hs.district?.name ?? "Unknown district"} — ${hs.risk_level ?? "N/A"} (${hs.crime_count} crimes)`}
              icon={markerIcon(hs.risk_level, hs.id === selectedId)}
              onClick={() => onSelectHotspot(hs.id)}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
