// 맛집 데이터. 아래 항목은 화면 확인용 샘플이에요(sample: true).
// 실제 조사한 맛집으로 바꿀 때는 sample을 빼고 같은 형식으로 채우면 돼요.

export type Category = "korean" | "snack" | "bbq" | "noodle" | "cafe" | "bar";

export type Tag = "englishMenu" | "card" | "solo" | "vegetarian" | "spicy" | "lateNight";

export type Text = { en: string; ko: string };

export type MenuItem = { name: Text; priceKrw: number };

export type Restaurant = {
  id: string;
  name: Text;
  category: Category;
  area: Text;
  lat: number;
  lng: number;
  /** 1 = ~10,000원, 2 = ~20,000원, 3 = 30,000원 이상 (1인 기준) */
  price: 1 | 2 | 3;
  hours: Text;
  menu: MenuItem[];
  tip: Text;
  tags: Tag[];
  /** 정보를 마지막으로 확인한 날짜 (YYYY-MM-DD) */
  checkedAt: string;
  sample?: boolean;
};

export const restaurants: Restaurant[] = [
  {
    id: "sample-kimbap",
    name: { en: "Sample Kimbap House", ko: "샘플 김밥집" },
    category: "snack",
    area: { en: "Hyochang-dong", ko: "효창동" },
    lat: 37.5405,
    lng: 126.963,
    price: 1,
    hours: { en: "08:00–21:00 daily", ko: "매일 08:00–21:00" },
    menu: [
      { name: { en: "Classic kimbap", ko: "기본 김밥" }, priceKrw: 4000 },
      { name: { en: "Tteokbokki (spicy rice cakes)", ko: "떡볶이" }, priceKrw: 5000 },
    ],
    tip: {
      en: "Order at the counter and point at the photo menu. Kimbap is easy to take away.",
      ko: "카운터에서 사진 메뉴를 가리켜 주문하면 돼요. 김밥은 포장하기 좋아요.",
    },
    tags: ["englishMenu", "card", "solo"],
    checkedAt: "2026-11-14",
    sample: true,
  },
  {
    id: "sample-gukbap",
    name: { en: "Sample Gukbap", ko: "샘플 국밥" },
    category: "korean",
    area: { en: "Yongmun Market", ko: "용문시장" },
    lat: 37.5372,
    lng: 126.9605,
    price: 1,
    hours: { en: "07:00–22:00, closed Mondays", ko: "07:00–22:00, 월요일 휴무" },
    menu: [
      { name: { en: "Pork rice soup", ko: "돼지국밥" }, priceKrw: 10000 },
      { name: { en: "Boiled pork slices", ko: "수육" }, priceKrw: 18000 },
    ],
    tip: {
      en: "Add salt and chives to taste. Free refills on side dishes.",
      ko: "소금과 부추로 간을 맞춰 드세요. 반찬은 리필돼요.",
    },
    tags: ["card", "solo"],
    checkedAt: "2026-11-14",
    sample: true,
  },
  {
    id: "sample-bbq",
    name: { en: "Sample Pork BBQ", ko: "샘플 고깃집" },
    category: "bbq",
    area: { en: "Wonhyo-ro", ko: "원효로" },
    lat: 37.536,
    lng: 126.964,
    price: 2,
    hours: { en: "17:00–24:00 daily", ko: "매일 17:00–24:00" },
    menu: [
      { name: { en: "Pork belly (200g)", ko: "삼겹살 (200g)" }, priceKrw: 17000 },
      { name: { en: "Soybean paste stew", ko: "된장찌개" }, priceKrw: 3000 },
    ],
    tip: {
      en: "Minimum order is usually 2 servings. Staff will grill the meat for you.",
      ko: "보통 2인분부터 주문할 수 있어요. 직원이 고기를 구워줘요.",
    },
    tags: ["englishMenu", "card", "lateNight"],
    checkedAt: "2026-11-14",
    sample: true,
  },
  {
    id: "sample-noodle",
    name: { en: "Sample Kalguksu", ko: "샘플 칼국수" },
    category: "noodle",
    area: { en: "Hyochang Park", ko: "효창공원" },
    lat: 37.5418,
    lng: 126.959,
    price: 1,
    hours: { en: "11:00–20:00, closed Sundays", ko: "11:00–20:00, 일요일 휴무" },
    menu: [
      { name: { en: "Knife-cut noodle soup", ko: "칼국수" }, priceKrw: 9000 },
      { name: { en: "Vegetable dumplings", ko: "야채만두" }, priceKrw: 7000 },
    ],
    tip: {
      en: "Ask for no anchovy broth if you are vegetarian. Kimchi is self-serve.",
      ko: "채식이면 멸치 육수를 빼달라고 하세요. 김치는 셀프예요.",
    },
    tags: ["solo", "vegetarian"],
    checkedAt: "2026-11-14",
    sample: true,
  },
  {
    id: "sample-cafe",
    name: { en: "Sample Bingsu Cafe", ko: "샘플 빙수 카페" },
    category: "cafe",
    area: { en: "Hyochang-dong", ko: "효창동" },
    lat: 37.542,
    lng: 126.964,
    price: 2,
    hours: { en: "12:00–22:00 daily", ko: "매일 12:00–22:00" },
    menu: [
      { name: { en: "Red bean bingsu (shaved ice)", ko: "팥빙수" }, priceKrw: 12000 },
      { name: { en: "Injeolmi rice cake toast", ko: "인절미 토스트" }, priceKrw: 8000 },
    ],
    tip: {
      en: "One bingsu is big enough for two people.",
      ko: "빙수 하나면 두 명이 먹기 충분해요.",
    },
    tags: ["englishMenu", "card", "vegetarian"],
    checkedAt: "2026-11-14",
    sample: true,
  },
  {
    id: "sample-pocha",
    name: { en: "Sample Pocha", ko: "샘플 포차" },
    category: "bar",
    area: { en: "Wonhyo-ro", ko: "원효로" },
    lat: 37.5378,
    lng: 126.9665,
    price: 2,
    hours: { en: "18:00–02:00 daily", ko: "매일 18:00–02:00" },
    menu: [
      { name: { en: "Makgeolli (rice wine)", ko: "막걸리" }, priceKrw: 6000 },
      { name: { en: "Kimchi pancake", ko: "김치전" }, priceKrw: 15000 },
    ],
    tip: {
      en: "Order at least one food dish per table. Bring ID — staff may check your age.",
      ko: "테이블당 안주 하나는 주문해야 해요. 나이 확인을 할 수 있으니 신분증을 챙기세요.",
    },
    tags: ["englishMenu", "card", "spicy", "lateNight"],
    checkedAt: "2026-11-14",
    sample: true,
  },
];
