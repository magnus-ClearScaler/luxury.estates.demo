import Link from "next/link";
import { bySlug, photoSrc } from "@/lib/estates";
import { Frame } from "./Frame";
import { TextLink } from "./TextLink";
import s from "./EstateCards.module.css";

export type EstateCard = {
  slug: string;
  file: string;
  focal: readonly [number, number];
  name: string;
  town: string;
};

/**
 * Home estates row (brief 6.1.5): an eyebrow above three portraits (0.76:1,
 * gap 37px). Each card is one link: the image, then the name in h3 on the left
 * and the town in eyebrow style on the right of the same line. A right aligned
 * text link closes the row. Alt text comes from the house's gallery entry.
 */
export function EstateCards({
  eyebrow,
  cards,
  link,
}: {
  eyebrow: string;
  cards: readonly EstateCard[];
  link: { label: string; href: string };
}) {
  return (
    <div>
      <h2 className={`t-eyebrow c-taupe ${s.eyebrow}`}>{eyebrow}</h2>
      <ul className={s.row}>
        {cards.map((c) => {
          const estate = bySlug(c.slug);
          if (!estate) throw new Error(`Home card for an unpublished house: ${c.slug}`);
          const alt = estate.gallery.find((p) => p.file === c.file)?.alt ?? "";
          return (
            <li key={c.slug}>
              <Link href={`/estates/${c.slug}`} className={s.card}>
                <Frame
                  src={photoSrc(c.slug, c.file)}
                  alt={alt}
                  focal={c.focal}
                  ratio="portrait"
                  sizes="(min-width:1024px) 30vw, (min-width:768px) 32vw, 100vw"
                />
                <div className={s.caption}>
                  <h3 className={`t-h3 ${s.name}`}>{c.name}</h3>
                  <span className={`t-eyebrow c-taupe ${s.town}`}>{c.town}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className={s.more}>
        <TextLink href={link.href}>{link.label}</TextLink>
      </p>
    </div>
  );
}
