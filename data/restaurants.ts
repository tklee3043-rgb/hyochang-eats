// 맛집 데이터. 숙소(lib/area.ts의 STAY)에서 직선 600m 안의 가게만 다뤄요.
//
// 두 단계가 있어요.
// 1) 방문 전(visited: false): 이름·종류·위치·대표 음식(serves)만 있는 후보. 지도에 "아직 방문 전" 표시로 보여요.
// 2) 방문 후(visited: true): 직접 가서 확인한 가격·영업시간·메뉴·주문 팁·태그·확인 날짜를 채워요
//    (docs/research-template.md 참고). 사진과 글은 직접 찍고 쓴 것만 넣어요.

export type Category =
  | "korean"
  | "snack"
  | "bbq"
  | "chicken"
  | "chinese"
  | "noodle"
  | "bakery"
  | "cafe"
  | "bar"
  | "convenience";

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
  /** false면 매장에 자리가 없어 포장·배달만 돼요 */
  dineIn: boolean;
  /** 1 = ~10,000원, 2 = ~20,000원, 3 = 30,000원 이상 (1인 기준). 방문 후에 채워요 */
  price?: 1 | 2 | 3;
  hours?: Text;
  menu?: MenuItem[];
  /** 메뉴 가격의 기준 시점 (YYYY-MM). 없으면 MENU_AS_OF */
  menuAsOf?: string;
  tip?: Text;
  tags: Tag[];
  /** 정보를 마지막으로 확인한 날짜 (YYYY-MM-DD). 방문 후에 채워요 */
  checkedAt?: string;
  sample?: boolean;
};

// 아래 가게는 2026-11-15에 다이닝코드 후보 리스트에서 고른 곳이에요(편의점은 OpenStreetMap).
// 이름·위치·대표 음식만 넣었어요. 메뉴·가격·영업시간은 확인되면 채워요(화면에는 있는 것만 보여요).
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
  ["cheogajip-hyochang", "처갓집양념치킨 효창점", "Cheogajip Chicken", "chicken", "w1", 37.5391923, 126.9647726, "Sweet & spicy yangnyeom fried chicken", "양념치킨"],
  ["kkanbu-richensia", "깐부치킨 용산리첸시아점", "Kkanbu Chicken", "chicken", "w1", 37.5379536, 126.9677332, "Crispy fried chicken, roasted chicken", "크리스피치킨·전기구이"],
  ["kkokkoren", "꼬꼬렌", "Kkokkoren", "chicken", "w1", 37.5381312, 126.9679491, "Charcoal-grilled chicken and skewers with draft beer", "숯불통닭·닭꼬치·생맥주"],
  ["bbq-hyochang", "BBQ 효창중앙점", "BBQ Chicken", "chicken", "station", 37.5398425, 126.9605247, "Fried chicken chain (Golden Olive chicken)", "황금올리브치킨"],
  ["mexican-hyochang", "멕시칸치킨 효창중앙점", "Mexican Chicken", "chicken", "hyochang", 37.54145, 126.961664, "Classic fried and yangnyeom chicken, sweet crispy chicken bites", "후라이드·양념치킨·닭강정"],
  ["kyochon-yongmun", "교촌치킨 용문점", "Kyochon Chicken", "chicken", "yongmun", 37.5377959, 126.960009, "Honey and spicy chicken wings", "허니·레드 윙콤보"],
  ["goobne-yongmun", "굽네치킨 용산용문점", "Goobne Chicken", "chicken", "market", 37.536875, 126.9608799, "Oven-baked chicken (not fried)", "오븐에 구운 치킨"],
  ["wonjo-charcoal-chicken", "원조숯불통닭바베큐", "Wonjo Charcoal Chicken", "chicken", "market", 37.5373716, 126.9597707, "Charcoal-grilled whole chicken (salt or sauce)", "숯불통닭"],
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
  ["mammoth-hyochang", "매머드익스프레스 효창공원앞역점", "Mammoth Express Hyochang Park Stn.", "cafe", "station", 37.538821, 126.9640361, "Budget coffee chain (cheap iced americano)", "저렴한 커피 체인"],
  ["mega-richensia", "메가MGC커피 용산리첸시아점", "Mega Coffee Yongsan Richensia", "cafe", "w1", 37.5382067, 126.9669446, "Budget coffee chain (big, cheap drinks)", "저렴한 커피 체인"],
  // 체인 빵집
  ["parisbaguette-richensia", "파리바게뜨 용산리첸시아점", "Paris Baguette Yongsan Richensia", "bakery", "w1", 37.5380779, 126.9671444, "Bakery chain (bread, cakes, coffee)", "빵·케이크 체인"],
  ["touslesjours-richensia", "뚜레쥬르 용산리첸시아점", "Tous les Jours Yongsan Richensia", "bakery", "w1", 37.5381725, 126.9668959, "Bakery chain (bread, cakes)", "빵·케이크 체인"],
  // 술집
  ["pajeon-nara", "파전나라", "Pajeon Nara", "bar", "market", 37.537591, 126.960741, "Pajeon (scallion pancake) and makgeolli", "파전·막걸리"],
  ["yejeonjip", "예전집", "Yejeonjip", "bar", "market", 37.535672, 126.9610935, "Makgeolli and jeon (Korean pancakes)", "막걸리·전집"],
  ["notz", "노츠", "Notz", "bar", "w2", 37.538252, 126.9631984, "Whisky and cocktail bar", "위스키·칵테일 바"],
  // 편의점 (위치 출처: OpenStreetMap, 2026-11-15). 목록 "전체"에는 안 나오고 지도와 "편의점" 필터에서 보여요.
  ["cu-hyochang-stn", "CU 효창공원역점", "CU (Hyochang Park Stn.)", "convenience", "station", 37.538187, 126.963519, "Convenience store: snacks, drinks, ramen", "편의점"],
  ["gs25-wonhyo-a", "GS25", "GS25", "convenience", "w2", 37.537471, 126.965668, "Convenience store: snacks, drinks, ramen", "편의점"],
  ["gs25-centerforet", "GS25 효창센터포레", "GS25 (Centerforet)", "convenience", "station", 37.539302, 126.962948, "Convenience store: snacks, drinks, ramen", "편의점"],
  ["gs25-wonhyo-b", "GS25", "GS25", "convenience", "w2", 37.5369727, 126.9634154, "Convenience store: snacks, drinks, ramen", "편의점"],
  ["gs25-wonhyo-c", "GS25", "GS25", "convenience", "w1", 37.5399506, 126.9679195, "Convenience store: snacks, drinks, ramen", "편의점"],
  ["cu-hyochang-park", "CU 용산효창공원점", "CU (Yongsan Hyochang Park)", "convenience", "hyochang", 37.540992, 126.962945, "Convenience store: snacks, drinks, ramen", "편의점"],
  ["seveneleven-hyochang", "세븐일레븐", "7-Eleven", "convenience", "station", 37.53872, 126.960877, "Convenience store: snacks, drinks, ramen", "편의점"],
];

// 대표 메뉴와 가격 (가게별 2~4개). 출처: 다이닝코드 가게 페이지의 메뉴 정보, 2026-11-15 확인.
// 가격은 바뀔 수 있어서 화면에 "2026년 11월 기준" 안내를 함께 보여줘요.
// [한국어 이름, 영어 이름, 가격(원)]
export const MENU_AS_OF = "2026-11";
const menus: Record<string, [ko: string, en: string, priceKrw: number][]> = {
  jeulgeopso: [
    ["한우꽃등심", "Hanwoo beef ribeye", 60000],
    ["한우차돌", "Hanwoo beef brisket", 35000],
    ["한우육회", "Hanwoo beef tartare (yukhoe)", 35000],
    ["갈비탕", "Beef short rib soup", 17000],
  ],
  "uyeon-butcher-bbq": [
    ["한우 등심", "Hanwoo beef sirloin", 36000],
    ["한우 투뿔차돌박이", "Hanwoo 1++ beef brisket", 30000],
    ["차돌된장찌개", "Brisket soybean paste stew", 10000],
    ["후식 물냉면", "Cold noodles (after BBQ)", 6000],
  ],
  "yeoljeongdo-bbq": [
    ["두툼 삼겹살", "Thick-cut pork belly", 17000],
    ["두툼 뚱목살", "Thick-cut pork neck", 17000],
    ["고소한 항정살", "Pork jowl", 16000],
    ["된장술밥", "Soybean stew with rice", 8000],
  ],
  "sinhwal-beer": [
    ["앵그리버드", "Angry Bird fried chicken", 22000],
    ["앵그리버드 레드", "Angry Bird Red (spicy fried chicken)", 24000],
    ["바삭 황태 구이", "Crispy grilled dried pollack (beer snack)", 18000],
  ],
  "yongmun-haejangguk": [
    ["해장국 (오전반)", "Haejangguk – hangover soup (morning menu)", 12000],
    ["소뼈전골 (오후반)", "Beef bone hot pot (evening menu)", 38000],
    ["미나리한우육회", "Hanwoo beef tartare with water parsley", 20000],
  ],
  "imone-bindaetteok": [
    ["녹두빈대떡", "Mung bean pancake", 5000],
    ["부추전", "Chive pancake", 5000],
    ["모듬전", "Assorted Korean pancakes (jeon)", 10000],
  ],
  "starbucks-hyochang": [
    ["플랫 화이트", "Flat white", 5800],
    ["에그 클럽 샌드위치", "Egg club sandwich", 4500],
    ["찰떡콩떡 베이글", "Rice cake & bean bagel", 3900],
  ],
  "yongmun-galbi": [
    ["돼지갈비", "Marinated pork ribs", 22000],
    ["삼겹살", "Pork belly", 18000],
    ["소갈비", "Beef ribs", 52000],
    ["한우암소갈비", "Hanwoo beef ribs", 68000],
  ],
  "yongmun-tongdak": [
    ["옛날통닭 (대)", "Old-school whole fried chicken (large)", 10000],
    ["양념치킨", "Sweet & spicy fried chicken", 14000],
    ["크리스피치킨", "Crispy fried chicken", 13000],
  ],
  "cheogajip-hyochang": [
    ["슈프림 양념치킨", "Supreme yangnyeom chicken (sweet & spicy)", 25900],
    ["순살 후라이드치킨", "Boneless fried chicken", 24900],
    ["허니올리고당야채양념치킨", "Honey yangnyeom chicken with vegetables", 23900],
  ],
  "kkanbu-richensia": [
    ["크리스피치킨", "Crispy fried chicken", 22000],
    ["마늘간장순살치킨", "Boneless garlic soy chicken", 24000],
    ["전기구이", "Roasted chicken (not fried)", 19000],
  ],
  kkokkoren: [
    ["숯불통닭 (소금/양념/반반)", "Charcoal-grilled whole chicken (salt / sauce / half & half)", 22000],
    ["숯불닭꼬치 A세트", "Charcoal chicken skewer set A", 22000],
    ["모듬오뎅탕", "Fish cake hot pot", 15000],
  ],
  "bbq-hyochang": [
    ["황금올리브치킨", "Golden Olive fried chicken", 23000],
    ["필크런치", "Feel Crunch fried chicken", 27000],
  ],
  "mexican-hyochang": [
    ["후라이드치킨", "Fried chicken", 18000],
    ["양념치킨", "Yangnyeom chicken (sweet & spicy)", 18000],
    ["순살치킨", "Boneless fried chicken", 20000],
    ["닭강정", "Sweet crispy chicken bites", 21000],
  ],
  "kyochon-yongmun": [
    ["허니윙콤비 (하프윙+순살)", "Honey wing combo (wings + boneless)", 24000],
    ["레드윙콤비 (하프윙+순살)", "Red (spicy) wing combo", 24000],
    ["고르곤치즈볼 (6개)", "Gorgonzola cheese balls (6)", 6000],
  ],
  "goobne-yongmun": [
    ["New 오리지널", "Original oven-baked chicken", 17900],
    ["고추바사삭", "Gochu Basasak (crispy chili oven chicken)", 19900],
    ["양념히어로", "Yangnyeom Hero (sweet & spicy oven chicken)", 19900],
  ],
  "wonjo-charcoal-chicken": [
    ["숯불통닭 1마리 (양념/소금/반반)", "Charcoal-grilled whole chicken (sauce / salt / half & half)", 22000],
    ["숯불통닭 반마리", "Charcoal-grilled half chicken", 12000],
  ],
  yangjagang: [
    ["짜장면", "Jjajangmyeon (black bean noodles)", 7500],
    ["짬뽕", "Jjamppong (spicy seafood noodle soup)", 8500],
    ["미니탕수육", "Sweet & sour pork (small)", 12000],
    ["탕수육", "Sweet & sour pork", 26000],
  ],
  "hohwa-banjeom": [
    ["해물짜장정식", "Seafood jjajang set", 9500],
    ["열짬뽕", "Extra-spicy jjamppong", 9500],
    ["볶음짬뽕", "Stir-fried jjamppong noodles", 9500],
  ],
  "keunjip-dakhanmari": [
    ["닭한마리", "Dakhanmari (whole chicken hot pot, for 2)", 29000],
    ["사리 (칼국수)", "Extra noodles", 2000],
    ["닭볶음탕", "Spicy braised chicken", 31000],
    ["(평일) 점심칼국수", "Weekday lunch kalguksu", 9000],
  ],
  "gangwondo-kalguksu": [
    ["칼국수", "Knife-cut noodle soup", 9500],
    ["들깨칼국수", "Perilla-seed noodle soup", 12000],
  ],
  gangwonjeong: [
    ["삼계탕", "Samgyetang (ginseng chicken soup)", 18000],
    ["인삼주", "Ginseng liquor", 10000],
  ],
  "jeonju-kongnamul-gukbap": [
    ["콩나물국밥", "Bean sprout rice soup", 9000],
    ["순대국", "Sundae (Korean sausage) soup", 10000],
    ["해물파전", "Seafood scallion pancake", 15000],
  ],
  "gyeongjin-sikdang": [
    ["옛날청국장", "Cheonggukjang (fermented soybean stew)", 6000],
    ["김치찌개", "Kimchi stew", 6000],
    ["된장찌개", "Soybean paste stew", 6000],
  ],
  "bukchangdong-sundubu": [
    ["북창동순두부", "Soft tofu stew", 11000],
    ["햄치즈순두부", "Ham & cheese soft tofu stew", 11000],
    ["고등어구이 1인한상", "Grilled mackerel set (1 person)", 19900],
  ],
  "jeonju-sansu-bibimbap": [
    ["전주비빔밥", "Jeonju-style bibimbap", 10000],
    ["전주돌솥비빔밥", "Hot stone-pot bibimbap", 11000],
    ["소고기비빔밥", "Beef bibimbap", 11000],
  ],
  "jeomsuni-hotteok": [
    ["수수 꿀 호떡", "Hotteok with honey filling", 2000],
    ["수수 팥 호떡", "Hotteok with red bean filling", 2500],
  ],
  "yongmun-odeng": [
    ["오리지널 수제어묵", "Handmade fish cakes", 5000],
    ["쫄깃고소 치즈핫바", "Cheese fish-cake bar", 1500],
  ],
  "busan-eomuk": [
    ["찰순대 2인분", "Sundae (Korean sausage), for 2", 3000],
    ["고기만두", "Meat dumplings", 5000],
    ["오뎅 포장", "Fish cakes to go", 5000],
  ],
  "seori-gimbap": [
    ["서리김밥", "Classic gimbap", 3000],
    ["참치김밥", "Tuna gimbap", 5000],
    ["더블치즈김밥", "Double cheese gimbap", 5000],
  ],
  housblanc: [
    ["아메리카노", "Americano", 4800],
    ["카페라떼", "Cafe latte", 5500],
  ],
  "bakery-mui": [
    ["소금빵", "Salt bread", 3000],
    ["크림 크러핀", "Cream cruffin", 5000],
    ["메론 데니쉬", "Melon danish", 4000],
  ],
  "dagwa-sangsa": [
    ["카페라떼", "Cafe latte", 4500],
    ["잉글리쉬 브렉퍼스트", "English breakfast tea", 4300],
  ],
  tabata: [
    ["복숭아 얼그레이 산도", "Peach Earl Grey fruit sandwich", 12000],
    ["커스터드 푸딩", "Custard pudding", 7000],
    ["아메리카노", "Americano", 5000],
  ],
  "mammoth-hyochang": [["아메리카노", "Americano", 1600]],
  "mega-richensia": [
    ["아메리카노 (따뜻한)", "Americano (hot)", 1500],
    ["아이스 아메리카노", "Iced americano", 2000],
    ["딸기라떼", "Strawberry latte", 3700],
  ],
  "parisbaguette-richensia": [
    ["단팥 도넛", "Red bean donut", 2400],
    ["추억의 생도나스", "Old-fashioned sugar donut", 1900],
    ["밤식빵 (1/2)", "Chestnut bread (half loaf)", 3800],
  ],
  "touslesjours-richensia": [
    ["딸기 마카롱 도넛", "Strawberry macaron donut", 1600],
    ["피자덕", "Pizza bread", 3200],
  ],
  // 출처: 네이버 블로그 후기의 메뉴판(2026-04-02 기준)
  wondumak: [
    ["부대찌개", "Budae-jjigae (army stew)", 8000],
    ["고추장찌개", "Gochujang stew (spicy)", 8000],
    ["제육볶음", "Spicy stir-fried pork", 9000],
    ["고등어자반", "Salted grilled mackerel", 10000],
  ],
  // 출처: 네이버 플레이스 메뉴판 사진의 가격(2024-05 등록)
  notz: [
    ["나와 나타샤와 흰당나귀", "Signature cocktail \"Natasha and the White Donkey\"", 20000],
    ["헛간 불태우다", "Signature cocktail \"Barn Burning\"", 21000],
    ["김홍도 난로회", "Signature cocktail \"Kim Hong-do's Brazier Party\"", 22000],
    ["Bunnahabhain 12Y (한 잔)", "Bunnahabhain 12-year whisky (glass)", 18000],
    ["Laphroaig 10Y (한 잔)", "Laphroaig 10-year whisky (glass)", 18000],
  ],
  yejeonjip: [
    ["해물파전", "Seafood scallion pancake", 24000],
    ["녹두전", "Mung bean pancake", 20000],
    ["육전", "Pan-fried beef slices", 20000],
  ],
};

// 매장에 자리가 없어 포장·배달만 되는 곳 (숙소 운영자 확인, 2026-11-15)
// 기본 기준(MENU_AS_OF)과 다른 시점의 가격
const menuAsOfById: Record<string, string> = { wondumak: "2026-04", notz: "2024-05" };

const takeoutOnly = new Set(["cheogajip-hyochang", "goobne-yongmun", "bbq-hyochang", "yongmun-tongdak"]);

export const restaurants: Restaurant[] = seeds.map(([id, ko, en, category, areaKey, lat, lng, servesEn, servesKo]) => ({
  id,
  name: { en, ko },
  category,
  area: areas[areaKey],
  lat,
  lng,
  serves: { en: servesEn, ko: servesKo },
  visited: false,
  dineIn: !takeoutOnly.has(id),
  menu: (menus[id] ?? []).map(([mko, men, priceKrw]) => ({ name: { en: men, ko: mko }, priceKrw })),
  menuAsOf: menuAsOfById[id],
  tags: [],
}));
