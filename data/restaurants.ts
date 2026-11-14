// 맛집 데이터. 숙소(lib/area.ts의 STAY)에서 직선 600m 안의 가게만 다뤄요.
//
// 두 단계가 있어요.
// 1) 방문 전(visited: false): 이름·종류·위치·대표 음식(serves)만 있는 후보. 지도에 "아직 방문 전" 표시로 보여요.
// 2) 방문 후(visited: true): 직접 가서 확인한 가격·영업시간·메뉴·주문 팁·태그·확인 날짜를 채워요
//    (docs/research-template.md 참고). 사진과 글은 직접 찍고 쓴 것만 넣어요.

export type Category = "korean" | "snack" | "bbq" | "chicken" | "chinese" | "noodle" | "bakery" | "cafe" | "bar";

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
  /** 어떤 음식을 파는 곳인지 한 줄 (방문 전에도 보여줘요) */
  serves: Text;
  /** 직접 가서 확인했는지 */
  visited: boolean;
  /** 1 = ~10,000원, 2 = ~20,000원, 3 = 30,000원 이상 (1인 기준). 방문 후에 채워요 */
  price?: 1 | 2 | 3;
  hours?: Text;
  menu?: MenuItem[];
  tip?: Text;
  tags: Tag[];
  /** 정보를 마지막으로 확인한 날짜 (YYYY-MM-DD). 방문 후에 채워요 */
  checkedAt?: string;
  sample?: boolean;
};

// 아래 30곳은 2026-11-15에 고른 방문 예정 후보예요(아직 방문 전).
// 이름·위치는 공개된 가게 정보이고, 메뉴·가격·영업시간은 직접 다녀온 뒤 채워요.
type Seed = [id: string, ko: string, en: string, category: Category, areaKey: AreaKey, lat: number, lng: number, servesEn: string, servesKo: string];

type AreaKey = "hyochang" | "station" | "w1" | "w2" | "market" | "yongmun";
const areas: Record<AreaKey, Text> = {
  hyochang: { en: "Hyochang-dong", ko: "효창동" },
  station: { en: "Hyochang Park Stn.", ko: "효창공원앞역" },
  w1: { en: "Wonhyo-ro 1-ga", ko: "원효로1가" },
  w2: { en: "Wonhyo-ro 2-ga", ko: "원효로2가" },
  market: { en: "Yongmun Market", ko: "용문시장" },
  yongmun: { en: "Yongmun-dong", ko: "용문동" },
};

const seeds: Seed[] = [
  // 고기 (한우·소고기, 돼지)
  ["jeulgeopso", "즐겁소", "Jeulgeopso", "bbq", "hyochang", 37.5416207, 126.9624855, "Korean beef (hanwoo) BBQ", "한우·소고기 구이"],
  ["uyeon-butcher-bbq", "우연고깃집 정육식당", "Uyeon Butcher's BBQ", "bbq", "w2", 37.536165, 126.9642382, "Butcher-shop beef BBQ (hanwoo sirloin)", "정육식당 소고기 구이(한우 등심)"],
  ["yeoljeongdo-bbq", "열정도고깃집", "Yeoljeongdo BBQ", "bbq", "w1", 37.539471, 126.9677804, "Pork belly and neck BBQ", "삼겹살·목살 구이"],
  ["yongmun-galbi", "용문갈비", "Yongmun Galbi", "bbq", "market", 37.5362664, 126.9612538, "Marinated pork ribs, pork belly", "돼지갈비·삼겹살"],
  // 치킨
  ["sinhwal-beer", "생활맥주 효창공원앞역점", "Saenghwal Beer (Hyochang Park)", "chicken", "station", 37.5383703, 126.9642169, "Fried chicken and craft beer (chimaek)", "치킨과 수제맥주(치맥)"],
  ["yongmun-tongdak", "용문통닭", "Yongmun Tongdak", "chicken", "market", 37.5369455, 126.9597336, "Old-school whole fried chicken, sweet crispy chicken", "옛날통닭·닭강정"],
  // 중식
  ["yangjagang", "양자강", "Yangjagang", "chinese", "w2", 37.5382386, 126.9646674, "Jjajangmyeon, jjamppong (Korean-Chinese)", "짜장면·짬뽕"],
  ["hohwa-banjeom", "호화반점", "Hohwa Banjeom", "chinese", "w2", 37.5363978, 126.9637666, "Jjajangmyeon (Korean-Chinese)", "짜장면"],
  // 국수·국밥·탕
  ["keunjip-dakhanmari", "큰집 닭한마리", "Keunjip Dakhanmari", "noodle", "w1", 37.5407103, 126.9693422, "Dakhanmari (whole chicken hot pot) with knife-cut noodles", "닭한마리·닭칼국수"],
  ["gangwondo-kalguksu", "강원도칼국수곤드레밥", "Gangwon-do Kalguksu", "noodle", "w1", 37.5388034, 126.9670416, "Knife-cut noodle soup, gondre (wild greens) rice", "칼국수·곤드레밥"],
  ["gangwonjeong", "강원정", "Gangwonjeong", "noodle", "w1", 37.5404692, 126.9678692, "Samgyetang (ginseng chicken soup)", "삼계탕"],
  ["jeonju-kongnamul-gukbap", "전주콩나물국밥", "Jeonju Bean Sprout Soup", "noodle", "w2", 37.5377678, 126.9664885, "Bean sprout rice soup (mild)", "콩나물국밥"],
  ["yongmun-haejangguk", "용문해장국", "Yongmun Haejangguk", "noodle", "yongmun", 37.5379583, 126.9608625, "Haejangguk (hangover soup), beef bone hot pot", "선지해장국·소뼈전골"],
  // 한식
  ["gyeongjin-sikdang", "경진식당", "Gyeongjin Sikdang", "korean", "station", 37.5394854, 126.9616202, "Home-style Korean meals, cheonggukjang stew", "집밥·청국장"],
  ["bukchangdong-sundubu", "북창동순두부 용산경찰서점", "Bukchangdong Sundubu", "korean", "w1", 37.5406308, 126.9689496, "Soft tofu stew (sundubu-jjigae)", "순두부찌개"],
  ["jeonju-sansu-bibimbap", "전주산수비빔밥", "Jeonju Sansu Bibimbap", "korean", "w1", 37.5407175, 126.9681553, "Hot stone-pot bibimbap", "돌솥비빔밥"],
  ["wondumak", "원두막", "Wondumak", "korean", "w2", 37.535039, 126.9623318, "Budae-jjigae (army stew)", "부대찌개"],
  // 분식·길거리 음식
  ["jeomsuni-hotteok", "점순이호떡 용문시장점", "Jeomsuni Hotteok", "snack", "market", 37.5367776, 126.9593937, "Hotteok (sweet filled pancakes), seed hotteok", "호떡·씨앗호떡"],
  ["yongmun-odeng", "용문오뎅", "Yongmun Odeng", "snack", "market", 37.5359399, 126.9602917, "Fish cake skewers and tteokbokki", "어묵·오뎅떡볶이"],
  ["busan-eomuk", "부산어묵 용문시장", "Busan Eomuk", "snack", "market", 37.536864, 126.959801, "Tteokbokki and fish cakes", "떡볶이·어묵"],
  ["seori-gimbap", "서리김밥", "Seori Gimbap", "snack", "w2", 37.5377555, 126.9663134, "Gimbap (rice rolls) to go", "김밥·분식"],
  ["imone-bindaetteok", "용문시장 이모네빈대떡", "Imone Bindaetteok", "snack", "market", 37.5367799, 126.9596566, "Mung bean pancakes and assorted jeon", "빈대떡·모둠전"],
  // 빵집
  ["housblanc", "우스블랑", "Housblanc", "bakery", "hyochang", 37.5414403, 126.9623908, "French-style bakery", "빵집"],
  ["bakery-mui", "베이커리무이", "Bakery Mui", "bakery", "w1", 37.53965, 126.9669003, "Salt bread and bakery", "소금빵·베이커리"],
  // 카페
  ["dagwa-sangsa", "다과상사", "Dagwa Sangsa", "cafe", "station", 37.5393709, 126.961628, "Cafe with scones", "카페·스콘"],
  ["tabata", "타바타", "Tabata", "cafe", "w1", 37.5407635, 126.9677366, "Cafe with fruit sandwiches", "카페·후르츠산도"],
  ["starbucks-hyochang", "스타벅스 효창공원앞역점", "Starbucks Hyochang Park Stn.", "cafe", "station", 37.5389661, 126.9633936, "Coffee chain (familiar menu)", "스타벅스"],
  // 술집
  ["pajeon-nara", "파전나라", "Pajeon Nara", "bar", "market", 37.537591, 126.960741, "Pajeon (scallion pancake) and makgeolli", "파전·막걸리"],
  ["yejeonjip", "예전집", "Yejeonjip", "bar", "market", 37.535672, 126.9610935, "Makgeolli and jeon (Korean pancakes)", "막걸리·전집"],
  ["notz", "노츠", "Notz", "bar", "w2", 37.538252, 126.9631984, "Whisky and cocktail bar", "위스키·칵테일 바"],
];

export const restaurants: Restaurant[] = seeds.map(([id, ko, en, category, areaKey, lat, lng, servesEn, servesKo]) => ({
  id,
  name: { en, ko },
  category,
  area: areas[areaKey],
  lat,
  lng,
  serves: { en: servesEn, ko: servesKo },
  visited: false,
  tags: [],
}));
