import type { Category, Tag } from "@/data/restaurants";

export const locales = ["en", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const en = {
  siteTitle: "Hyochang Eats",
  siteTagline: "Local Korean food, cafes and bars within an 8-minute walk of Hyochang Park Stay.",
  switchLabel: "한국어",
  all: "All",
  categories: {
    korean: "Korean",
    snack: "Bunsik (snacks)",
    bbq: "BBQ",
    noodle: "Noodles & soup",
    cafe: "Cafe & dessert",
    bar: "Bars (pocha)",
  } satisfies Record<Category, string>,
  tags: {
    englishMenu: "English menu",
    card: "Card OK",
    solo: "Solo friendly",
    vegetarian: "Vegetarian option",
    spicy: "Spicy",
    lateNight: "Open late",
  } satisfies Record<Tag, string>,
  nearMe: "Near me",
  locating: "Finding you…",
  locationDenied: "Location is off. Showing all places.",
  results: (n: number) => `${n} ${n === 1 ? "place" : "places"}`,
  empty: "No places match these filters.",
  comingSoon: "We're visiting places around the stay right now. Our picks will appear here soon!",
  price: "Price",
  hours: "Hours",
  menu: "Popular menu",
  howToOrder: "How to order",
  directions: "Directions",
  naverMap: "Naver Map",
  googleMap: "Google Maps",
  close: "Close",
  checked: (date: string) => `Info checked ${date}`,
  sample: "Sample",
  away: (m: number) => (m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(1)} km`),
  fromStay: (m: number) => `${Math.round(m / 10) * 10} m from the stay`,
};

export type Dictionary = typeof en;

const ko: Dictionary = {
  siteTitle: "효창 맛집",
  siteTagline: "효창공원 스테이에서 걸어서 8분 안, 외국인도 편하게 즐기는 한식·카페·술집.",
  switchLabel: "English",
  all: "전체",
  categories: {
    korean: "한식",
    snack: "분식",
    bbq: "고깃집",
    noodle: "국수·탕",
    cafe: "카페·디저트",
    bar: "술집·포차",
  },
  tags: {
    englishMenu: "영어 메뉴",
    card: "카드 결제",
    solo: "1인 주문",
    vegetarian: "채식 옵션",
    spicy: "매운 음식",
    lateNight: "늦게까지 영업",
  },
  nearMe: "내 주변",
  locating: "위치 찾는 중…",
  locationDenied: "위치 권한이 꺼져 있어요. 전체 목록을 보여드려요.",
  results: (n: number) => `${n}곳`,
  empty: "조건에 맞는 곳이 없어요.",
  comingSoon: "지금 숙소 주변 맛집을 직접 다녀보고 있어요. 곧 여기에 추천 맛집이 올라와요!",
  price: "가격",
  hours: "영업시간",
  menu: "대표 메뉴",
  howToOrder: "주문 팁",
  directions: "길찾기",
  naverMap: "네이버 지도",
  googleMap: "구글 지도",
  close: "닫기",
  checked: (date: string) => `${date} 확인한 정보`,
  sample: "샘플",
  away: (m: number) => (m < 1000 ? `${Math.round(m / 10) * 10}m` : `${(m / 1000).toFixed(1)}km`),
  fromStay: (m: number) => `숙소에서 ${Math.round(m / 10) * 10}m`,
};

export const dictionaries: Record<Locale, Dictionary> = { en, ko };
