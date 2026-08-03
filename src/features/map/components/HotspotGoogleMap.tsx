"use client";

import { useEffect } from "react";
import { APIProvider, Map, Marker, Circle, Rectangle, useMap } from "@vis.gl/react-google-maps";
import type { HotspotListItem, GridHotspotItem } from "../types";

function KarnatakaBoundary() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    
    // Load GeoJSON for Karnataka state boundary
    map.data.loadGeoJson("https://raw.githubusercontent.com/inosaint/StatesOfIndia/master/karnataka.geojson");
    
    // Style the boundary
    map.data.setStyle({
      fillColor: "transparent",
      strokeWeight: 2.5,
      strokeColor: "#3b82f6", // brand bold blue
      strokeOpacity: 0.8,
      clickable: false,
    });

    // Cleanup features on unmount
    return () => {
      map.data.forEach((feature) => map.data.remove(feature));
    };
  }, [map]);

  return null;
}

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

// Sleek Slate/Navy Custom Dark Map style to fit Crime Lens premium look
const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#0b0f19" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0b0f19" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#1f2937" }] },
  { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#374151" }] },
  { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#374151" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#111827" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#111827" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#4b5563" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1f2937" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#111827" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#374151" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#111827" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#475569" }] }
];

function markerIcon(riskLevel: string | null, selected: boolean) {
  const color = RISK_MARKER_COLOR[riskLevel?.toUpperCase() ?? ""] ?? "#64748B";
  const radius = selected ? 10 : 7;
  const stroke = selected ? "#1E293B" : "#FFFFFF";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${radius * 2 + 4}" height="${radius * 2 + 4}" viewBox="0 0 ${radius * 2 + 4} ${radius * 2 + 4}">
    <circle cx="${radius + 2}" cy="${radius + 2}" r="${radius}" fill="${color}" stroke="${stroke}" stroke-width="2" />
  </svg>`;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: typeof window !== "undefined" && window.google ? new window.google.maps.Size(radius * 2 + 4, radius * 2 + 4) : undefined,
  };
}

function getGridColor(score: number) {
  if (score >= 80) return "#EF4444"; // CRITICAL
  if (score >= 50) return "#F97316"; // HIGH
  if (score >= 25) return "#F59E0B"; // MEDIUM
  return "#10B981";                  // LOW
}

interface HotspotGoogleMapProps {
  overlayType: "clusters" | "grid";
  hotspots: HotspotListItem[];
  gridHotspots: GridHotspotItem[];
  selectedId: string | null;
  onSelectHotspot: (id: string) => void;
  heightClass?: string;
}

export function HotspotGoogleMap({
  overlayType,
  hotspots,
  gridHotspots,
  selectedId,
  onSelectHotspot,
  heightClass,
}: Readonly<HotspotGoogleMapProps>) {
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
    <div className={`${containerHeight} w-full overflow-hidden rounded-xl border border-navy-200 shadow-inner bg-[#0b0f19]`}>
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
          styles={DARK_MAP_STYLE}
        >
          {/* Default Highlight Layer: Karnataka Border */}
          <KarnatakaBoundary />

          {/* Overlay Layer 1: DBSCAN Clusters */}
          {overlayType === "clusters" &&
            hotspots.map((hs) => {
              const color = RISK_MARKER_COLOR[hs.risk_level?.toUpperCase() ?? ""] ?? "#64748B";
              const isSelected = hs.id === selectedId;
              return (
                <div key={hs.id}>
                  {/* Center Dot Marker */}
                  <Marker
                    position={{ lat: hs.center_latitude, lng: hs.center_longitude }}
                    title={`${hs.district?.name ?? "Unknown district"} — ${hs.risk_level ?? "N/A"} (${hs.crime_count} crimes)`}
                    icon={markerIcon(hs.risk_level, isSelected)}
                    onClick={() => onSelectHotspot(hs.id)}
                  />
                  {/* Surrounding Cluster Circle */}
                  <Circle
                    center={{ lat: hs.center_latitude, lng: hs.center_longitude }}
                    radius={hs.radius_meters || 1000}
                    fillColor={color}
                    fillOpacity={isSelected ? 0.4 : 0.18}
                    strokeColor={color}
                    strokeWeight={isSelected ? 3 : 1}
                    strokeOpacity={isSelected ? 0.8 : 0.4}
                    clickable
                    onClick={() => onSelectHotspot(hs.id)}
                  />
                </div>
              );
            })}

          {/* Overlay Layer 2: Spatial Grid */}
          {overlayType === "grid" &&
            gridHotspots.map((ghs) => {
              const color = getGridColor(ghs.risk_score);
              const isSelected = ghs.hotspot_id === selectedId;
              // 0.01 degrees grid cell (~1.1 km size)
              const halfSize = 0.005;
              return (
                <div key={ghs.hotspot_id}>
                  {/* Cell Center Marker */}
                  <Marker
                    position={{ lat: ghs.center_latitude, lng: ghs.center_longitude }}
                    title={`${ghs.district_name} Grid Cell — Risk Score ${ghs.risk_score.toFixed(1)} (${ghs.crime_count} crimes)`}
                    icon={markerIcon(ghs.risk_score >= 80 ? "CRITICAL" : ghs.risk_score >= 50 ? "HIGH" : ghs.risk_score >= 25 ? "MEDIUM" : "LOW", isSelected)}
                    onClick={() => onSelectHotspot(ghs.hotspot_id)}
                  />
                  {/* Grid Rectangle Cell */}
                  <Rectangle
                    bounds={{
                      north: ghs.center_latitude + halfSize,
                      south: ghs.center_latitude - halfSize,
                      east: ghs.center_longitude + halfSize,
                      west: ghs.center_longitude - halfSize,
                    }}
                    fillColor={color}
                    fillOpacity={isSelected ? 0.45 : 0.22}
                    strokeColor={color}
                    strokeWeight={isSelected ? 2.5 : 0.75}
                    strokeOpacity={isSelected ? 0.9 : 0.4}
                    clickable
                    onClick={() => onSelectHotspot(ghs.hotspot_id)}
                  />
                </div>
              );
            })}
        </Map>
      </APIProvider>
    </div>
  );
}
