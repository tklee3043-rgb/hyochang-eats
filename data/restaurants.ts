// 맛집 데이터. 직접 가서 확인한 곳만 넣어요(docs/research-template.md 참고).
// 숙소(lib/area.ts의 STAY)에서 직선 600m 안의 가게만 다뤄요.

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
  // 여기에 조사한 맛집을 추가해요. 형식은 docs/research-template.md의 예시를 보세요.
];
