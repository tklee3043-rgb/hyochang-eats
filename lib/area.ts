// 서비스 범위: 숙소(Hyochang Park Stay) 주변. 숙소 손님에게 공유하는 앱이에요.

/** 숙소: 서울 용산구 원효로1가 23-70 (도로명 백범로81길 7). 좌표 출처: 네이버 지도 (2026-11-15 확인) */
export const STAY = {
  lat: 37.5386661,
  lng: 126.9648324,
  name: { en: "Hyochang Park Stay", ko: "효창공원 스테이" },
};

/** 가까운 지하철역(6호선·경의중앙선). 지도에 길잡이로 표시해요. 좌표 출처: OpenStreetMap (2026-11-14 확인) */
export const STATION = {
  lat: 37.53934,
  lng: 126.96139,
  name: { en: "Hyochang Park Station", ko: "효창공원앞역" },
};

/** 용문시장(전통시장, 길거리 음식). 시장 골목(효창원로40·42길) 대략 중심. 좌표 출처: OpenStreetMap 버스정류장 '용문시장'과 시장 안 가게 위치로 어림 (2026-11-15) */
export const MARKET = {
  lat: 37.5366,
  lng: 126.9601,
  name: { en: "Yongmun Market", ko: "용문시장" },
};

/** 숙소에서 이 거리(미터) 안의 가게만 다뤄요. 직선 600m, 도보 약 8분. 용문시장까지 들어와요. */
export const SERVICE_RADIUS_M = 600;
