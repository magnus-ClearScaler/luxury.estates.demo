import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bySlug, published } from "@/lib/estates";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return published().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = bySlug(slug);
  if (!e) return {};
  return { title: e.name, description: e.short };
}

// STUB (foundation): Estate detail, brief 6.3.
export default async function EstatePage({ params }: Props) {
  const { slug } = await params;
  const e = bySlug(slug);
  if (!e) notFound();
  return (
    <div className="container-x section">
      <h1 className="t-display">{e.name}</h1>
    </div>
  );
}
