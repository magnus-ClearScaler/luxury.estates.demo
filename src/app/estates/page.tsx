import type { Metadata } from "next";
import { EstateRow } from "@/components/EstateRow";
import { TextLink } from "@/components/TextLink";
import { copy, typo } from "@/lib/copy";
import { countWord, published } from "@/lib/estates";
import styles from "./estates.module.css";

export const metadata: Metadata = { title: copy.estates.title };

/** Keeps `Saint-Tropez` on one line so the heading never breaks at its hyphen. */
function keepPlaceNames(text: string) {
  const name = typo("Saint-Tropez");
  const at = text.indexOf(name);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className={styles.nowrap}>{name}</span>
      {text.slice(at + name.length)}
    </>
  );
}

/**
 * Estates index (brief 6.2). No hero image, no filter, no sort, no map, no
 * count. Owner round 2 (brief R2.1): one sequence in order of how beautiful
 * the house is, no region groups; the region moves into each row's eyebrow.
 * The zigzag alternates down the whole page.
 */
export default function EstatesPage() {
  const c = copy.estates;

  return (
    <div className={`container-x ${styles.page}`}>
      <h1 className="t-display">{c.title}</h1>

      <div className={styles.intro}>
        <h2 className="t-h2 w-300">{keepPlaceNames(c.intro(countWord()))}</h2>
        <p className={`t-lead ${styles.lead}`}>{c.lead}</p>
      </div>

      <p className={styles.centred}>
        <TextLink href={c.enquireLink.href}>{c.enquireLink.label}</TextLink>
      </p>

      <div className={styles.rows}>
        {published().map((estate, i) => (
          <EstateRow key={estate.slug} estate={estate} flip={i % 2 === 1} eager={i === 0} />
        ))}
      </div>

      <div className={styles.closing}>
        <p className="t-small c-umber">{c.closing}</p>
        <p className={styles.closingLink}>
          <TextLink href={c.closingLink.href}>{c.closingLink.label}</TextLink>
        </p>
      </div>
    </div>
  );
}
