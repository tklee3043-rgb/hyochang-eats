import { notFound } from "next/navigation";
import Explorer from "@/components/Explorer";
import { isLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Explorer lang={lang} />;
}
