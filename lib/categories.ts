import type { Category, Tag } from "@/data/restaurants";

export const categoryOrder: Category[] = ["korean", "snack", "bbq", "noodle", "cafe", "bar"];

export const tagOrder: Tag[] = ["englishMenu", "card", "solo", "vegetarian", "spicy", "lateNight"];

// 지도 핀과 목록 점에 같이 쓰는 카테고리 색
export const categoryColors: Record<Category, string> = {
  korean: "#dc2626",
  snack: "#ea580c",
  bbq: "#92400e",
  noodle: "#0891b2",
  cafe: "#db2777",
  bar: "#7c3aed",
};

/** 두 지점 사이 거리 (미터) */
export function distanceMeters(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
