"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MapView from "@/components/MapView";
import { restaurants, type Category, type Restaurant, type Tag } from "@/data/restaurants";
import { dictionaries, type Locale } from "@/lib/i18n";
import { categoryColors, categoryOrder, distanceMeters, tagOrder, utilityCategories } from "@/lib/categories";
import { STAY } from "@/lib/area";

type Pos = { lat: number; lng: number };

const won = (n: number) => `₩${n.toLocaleString("en-US")}`;

export default function Explorer({ lang }: { lang: Locale }) {
  const t = dictionaries[lang];
  const otherLang: Locale = lang === "en" ? "ko" : "en";

  const [category, setCategory] = useState<Category | "all">("all");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userPos, setUserPos] = useState<Pos | null>(null);
  const [locStatus, setLocStatus] = useState<"idle" | "locating" | "denied">("idle");

  const items = useMemo(() => {
    const list = restaurants.filter(
      (r) => (category === "all" || r.category === category) && tags.every((tag) => r.tags.includes(tag)),
    );
    // 내 위치를 모르면 숙소에서 가까운 순으로 보여줘요.
    const origin = userPos ?? STAY;
    list.sort((a, b) => distanceMeters(origin, a) - distanceMeters(origin, b));
    return list;
  }, [category, tags, userPos]);

  // 편의점 같은 편의 시설은 "전체" 목록에서는 빼요(지도에는 작은 핀으로 보여요).
  const listItems = useMemo(
    () => (category === "all" ? items.filter((r) => !utilityCategories.includes(r.category)) : items),
    [category, items],
  );

  const selected = items.find((r) => r.id === selectedId) ?? null;

  const toggleTag = (tag: Tag) =>
    setTags((prev) => (prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]));

  const findMe = () => {
    if (!("geolocation" in navigator)) return setLocStatus("denied");
    setLocStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setUserPos({ lat: p.coords.latitude, lng: p.coords.longitude });
        setLocStatus("idle");
      },
      () => setLocStatus("denied"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <div className="flex h-dvh flex-col bg-white text-slate-900">
      <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-3">
        <div>
          <h1 className="text-xl font-bold">{t.siteTitle}</h1>
          <p className="text-sm text-slate-600">{t.siteTagline}</p>
        </div>
        <Link
          href={`/${otherLang}`}
          hrefLang={otherLang}
          className="shrink-0 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
        >
          {t.switchLabel}
        </Link>
      </header>

      <div className="flex flex-col gap-2 border-b border-slate-200 px-4 py-3">
        <div className="chip-row">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>
            {t.all}
          </Chip>
          {categoryOrder.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)} color={categoryColors[c]}>
              {t.categories[c]}
            </Chip>
          ))}
        </div>
        <div className="chip-row">
          <button
            type="button"
            onClick={findMe}
            className="shrink-0 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            {locStatus === "locating" ? t.locating : `◎ ${t.nearMe}`}
          </button>
          {tagOrder.map((tag) => (
            <Chip key={tag} active={tags.includes(tag)} onClick={() => toggleTag(tag)} small>
              {t.tags[tag]}
            </Chip>
          ))}
        </div>
        {locStatus === "denied" && <p className="text-xs text-amber-700">{t.locationDenied}</p>}
      </div>

      <main className="flex min-h-0 flex-1 flex-col md:flex-row">
        <div className="relative h-[42vh] shrink-0 md:h-auto md:flex-1">
          <MapView lang={lang} items={items} selectedId={selectedId} userPos={userPos} onSelect={setSelectedId} />
        </div>

        <aside className="min-h-0 flex-1 overflow-y-auto border-slate-200 md:w-96 md:flex-none md:border-l">
          <p className="px-4 pt-3 text-xs font-medium text-slate-500">{t.results(listItems.length)}</p>
          {listItems.length === 0 && (
            <p className="px-4 py-6 text-sm text-slate-600">{restaurants.length === 0 ? t.comingSoon : t.empty}</p>
          )}
          <ul>
            {listItems.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(r.id)}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 ${
                    r.id === selectedId ? "bg-slate-100" : ""
                  }`}
                >
                  <span
                    className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                    style={{ background: categoryColors[r.category] }}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate font-semibold">{r.name[lang]}</span>
                      {r.sample && <SampleBadge label={t.sample} />}
                    </span>
                    <span className="block text-sm text-slate-600">{r.serves[lang]}</span>
                    <span className="block text-xs text-slate-500">
                      {t.categories[r.category]} · {r.area[lang]}
                      {r.price ? ` · ${"₩".repeat(r.price)}` : ""}
                      {" · "}
                      {userPos ? t.away(distanceMeters(userPos, r)) : t.fromStay(distanceMeters(STAY, r))}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </main>

      {selected && <DetailCard r={selected} lang={lang} onClose={() => setSelectedId(null)} />}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  color,
  small,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 font-medium ${small ? "py-1 text-xs" : "py-1.5 text-sm"} ${
        active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
      }`}
    >
      {color && <span className="h-2 w-2 rounded-full" style={{ background: color }} aria-hidden />}
      {children}
    </button>
  );
}

function SampleBadge({ label }: { label: string }) {
  return (
    <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-800">
      {label}
    </span>
  );
}

function DetailCard({ r, lang, onClose }: { r: Restaurant; lang: Locale; onClose: () => void }) {
  const t = dictionaries[lang];
  const other: Locale = lang === "en" ? "ko" : "en";
  // 이름만 검색하면 다른 지역 가게가 나올 수 있어서 "용산"을 붙여요.
  const naverUrl = `https://map.naver.com/p/search/${encodeURIComponent(`용산 ${r.name.ko}`)}`;
  const googleUrl = `https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`;

  return (
    <section
      aria-label={r.name[lang]}
      className="fixed inset-x-0 bottom-0 z-[1000] max-h-[70dvh] overflow-y-auto rounded-t-2xl border-t border-slate-200 bg-white p-5 shadow-2xl md:inset-x-auto md:bottom-4 md:left-4 md:w-[380px] md:rounded-2xl md:border"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold" style={{ color: categoryColors[r.category] }}>
            {t.categories[r.category]} · {r.area[lang]}
          </p>
          <h2 className="mt-0.5 flex items-center gap-2 text-lg font-bold">
            {r.name[lang]}
            {r.sample && <SampleBadge label={t.sample} />}
          </h2>
          {/* 상대 언어 이름도 같이 보여주면 현지에서 간판을 찾기 쉬워요 */}
          <p className="text-sm text-slate-500">{r.name[other]}</p>
          <p className="mt-1 text-sm text-slate-700">{r.serves[lang]}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100"
        >
          ✕
        </button>
      </div>

      {r.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {r.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
              {t.tags[tag]}
            </span>
          ))}
        </div>
      )}

      {(r.hours || r.price) && (
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          {r.hours && (
            <>
              <dt className="text-slate-500">{t.hours}</dt>
              <dd>{r.hours[lang]}</dd>
            </>
          )}
          {r.price && (
            <>
              <dt className="text-slate-500">{t.price}</dt>
              <dd>{"₩".repeat(r.price)}</dd>
            </>
          )}
        </dl>
      )}

      {r.menu && r.menu.length > 0 && (
        <>
          <h3 className="mt-4 text-sm font-semibold">{t.menu}</h3>
          <ul className="mt-1 divide-y divide-slate-100 text-sm">
            {r.menu.map((m, i) => (
              <li key={`${i}-${m.name.en}`} className="flex justify-between gap-3 py-1.5">
                <span>
                  {m.name[lang]} <span className="text-slate-500">· {m.name[other]}</span>
                </span>
                <span className="shrink-0 tabular-nums">{won(m.priceKrw)}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {r.tip && (
        <>
          <h3 className="mt-4 text-sm font-semibold">{t.howToOrder}</h3>
          <p className="mt-1 text-sm text-slate-700">{r.tip[lang]}</p>
        </>
      )}

      <h3 className="mt-4 text-sm font-semibold">{t.directions}</h3>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <a
          href={naverUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-green-700"
        >
          {t.naverMap}
        </a>
        <a
          href={googleUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-semibold hover:bg-slate-50"
        >
          {t.googleMap}
        </a>
      </div>

      {r.checkedAt && <p className="mt-4 text-xs text-slate-400">{t.checked(r.checkedAt)}</p>}
    </section>
  );
}
