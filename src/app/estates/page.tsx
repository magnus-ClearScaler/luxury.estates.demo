import type { Metadata } from "next";
import { EstateRow } from "@/components/EstateRow";
import { TextLink } from "@/components/TextLink";
import { copy, typo } from "@/lib/copy";
import { countWord, groups } from "@/lib/estates";
import styles from "./estates.module.css";

export const metadata: Metadata = { title: copy.estates.title };

/**
 * Estates index (brief 6.2). No hero image, no filter, no sort, no map, no
 * count. Two headed groups; the zigzag alternates across the whole page.
 */
/** Keeps `Cap-d'Ail` on one line so the heading never breaks at its hyphen. */
function keepPlaceNames(text: string) {
  const name = typo("Cap-d'Ail");
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

export default function EstatesPage() {
  const c = copy.estates;
  // Index of each group's first house across the whole page, so the zigzag
  // keeps alternating from one group into the next.
  const sections = groups().reduce<{ group: ReturnType<typeof groups>[number]; start: number }[]>(
    (acc, group) => {
      const prev = acc[acc.length - 1];
      acc.push({ group, start: prev ? prev.start + prev.group.estates.length : 0 });
      return acc;
    },
    [],
  );

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

      {sections.map(({ group, start }) => (
        <section key={group.region} className={styles.group} aria-labelledby={`group-${group.region}`}>
          <h2 id={`group-${group.region}`} className="t-h2">
            {group.label}
          </h2>
          <hr className={`hairline ${styles.groupRule}`} />
          <div className={styles.rows}>
            {group.estates.map((estate, j) => (
              <EstateRow key={estate.slug} estate={estate} flip={(start + j) % 2 === 1} eager={start + j === 0} />
            ))}
          </div>
        </section>
      ))}

      <div className={styles.closing}>
        <p className="t-small c-umber">{c.closing}</p>
        <p className={styles.closingLink}>
          <TextLink href={c.closingLink.href}>{c.closingLink.label}</TextLink>
        </p>
      </div>
    </div>
  );
}
