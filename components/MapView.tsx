"use client";

import { useEffect, useRef, useState } from "react";
import type * as L from "leaflet";
import type { Restaurant } from "@/data/restaurants";
import type { Locale } from "@/lib/i18n";
import { categoryColors, utilityCategories } from "@/lib/categories";
import { MARKET, SERVICE_RADIUS_M, STATION, STAY } from "@/lib/area";

type Props = {
  lang: Locale;
  items: Restaurant[];
  selectedId: string | null;
  userPos: { lat: number; lng: number } | null;
  onSelect: (id: string) => void;
};

type MapState = { leaflet: typeof L; map: L.Map; pins: L.LayerGroup; me: L.LayerGroup; stay: L.LayerGroup };

export default function MapView({ lang, items, selectedId, userPos, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<MapState | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // 지도는 브라우저에서만 만들 수 있어서 Leaflet을 여기서 불러와요.
  useEffect(() => {
    let cancelled = false;
    let created: L.Map | null = null;
    import("leaflet").then((mod) => {
      const leaflet = ((mod as { default?: typeof L }).default ?? mod) as typeof L;
      if (cancelled || !containerRef.current) return;
      // 첫 화면에 숙소·역·용문시장이 모두 보이게 맞춰요.
      const map = leaflet.map(containerRef.current, { zoomControl: false }).fitBounds(
        [
          [STAY.lat, STAY.lng],
          [STATION.lat, STATION.lng],
          [MARKET.lat, MARKET.lng],
        ],
        // 숙소 이름표가 오른쪽으로 펼쳐져서 오른쪽 여백을 더 줘요.
        { paddingTopLeft: [70, 40], paddingBottomRight: [160, 30], maxZoom: 16 },
      );
      leaflet.control.zoom({ position: "bottomright" }).addTo(map);
      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(map);
      // 서비스 범위(숙소에서 600m)를 옅은 원으로 표시
      leaflet
        .circle([STAY.lat, STAY.lng], {
          radius: SERVICE_RADIUS_M,
          color: "#0f172a",
          weight: 1,
          opacity: 0.25,
          fillOpacity: 0.03,
          interactive: false,
        })
        .addTo(map);
      leaflet
        .marker([STATION.lat, STATION.lng], {
          icon: leaflet.divIcon({ className: "", html: '<span class="station-pin">M</span>', iconSize: [26, 26], iconAnchor: [13, 13] }),
          keyboard: false,
          interactive: false,
          zIndexOffset: -100,
        })
        .addTo(map);
      created = map;
      setState({
        leaflet,
        map,
        pins: leaflet.layerGroup().addTo(map),
        me: leaflet.layerGroup().addTo(map),
        stay: leaflet.layerGroup().addTo(map),
      });
    });
    return () => {
      cancelled = true;
      created?.remove();
    };
  }, []);

  // 숙소 표시: 점 위에 숙소 이름표(언어에 따라 바뀜)
  useEffect(() => {
    if (!state) return;
    const { leaflet, stay } = state;
    stay.clearLayers();
    const name = STAY.name[lang];
    leaflet
      .marker([STAY.lat, STAY.lng], {
        icon: leaflet.divIcon({
          className: "",
          html: `<span class="stay-pin"><span aria-hidden="true">🏠</span> ${name}</span>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        }),
        title: name,
        keyboard: false,
        interactive: false,
        zIndexOffset: 500,
      })
      .addTo(stay);
    // 용문시장 표시: 길거리 음식이 모인 전통시장(지도 길잡이)
    leaflet
      .marker([MARKET.lat, MARKET.lng], {
        icon: leaflet.divIcon({
          className: "",
          html: `<span class="market-pin"><span aria-hidden="true">🧺</span> ${MARKET.name[lang]}</span>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        }),
        title: MARKET.name[lang],
        keyboard: false,
        interactive: false,
        zIndexOffset: -50,
      })
      .addTo(stay);
  }, [state, lang]);

  // 맛집 핀 그리기
  useEffect(() => {
    if (!state) return;
    const { leaflet, pins } = state;
    pins.clearLayers();
    for (const r of items) {
      const selected = r.id === selectedId;
      // 편의점은 맛집보다 작고 네모난 핀으로 보여줘요.
      const utility = utilityCategories.includes(r.category);
      const size = selected ? 30 : utility ? 16 : 22;
      const icon = leaflet.divIcon({
        className: "",
        html: `<span class="pin${utility ? " pin-utility" : ""}${selected ? " pin-selected" : ""}" style="--pin:${categoryColors[r.category]}"></span>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
      leaflet
        .marker([r.lat, r.lng], { icon, title: r.name[lang], zIndexOffset: selected ? 1000 : utility ? -10 : 0 })
        .on("click", () => onSelectRef.current(r.id))
        .addTo(pins);
    }
  }, [state, items, selectedId, lang]);

  // 선택한 가게로 지도 이동
  useEffect(() => {
    const r = items.find((item) => item.id === selectedId);
    if (state && r) state.map.flyTo([r.lat, r.lng], Math.max(state.map.getZoom(), 16), { duration: 0.5 });
  }, [state, selectedId, items]);

  // 내 위치 표시
  useEffect(() => {
    if (!state) return;
    state.me.clearLayers();
    if (!userPos) return;
    state.leaflet
      .circleMarker([userPos.lat, userPos.lng], {
        radius: 8,
        color: "#ffffff",
        weight: 3,
        fillColor: "#2563eb",
        fillOpacity: 1,
      })
      .addTo(state.me);
    state.map.flyTo([userPos.lat, userPos.lng], 15, { duration: 0.5 });
  }, [state, userPos]);

  return <div ref={containerRef} className="h-full w-full" role="region" aria-label="Map" />;
}
