import Link from "next/link";
import { Frame } from "./Frame";
import { TextLink } from "./TextLink";
import { copy } from "@/lib/copy";
import { heroOf, priceDisplay, specLine, srcOf, type Estate } from "@/lib/estates";
import styles from "./EstateRow.module.css";

/**
 * One zigzag row of the Estates index (brief 6.2.5). The house's hero, wide
 * (894 x 552 at 1440), and a 469px text column, top aligned: town, name, the
 * `short` sentence, the spec and price lines, and `VIEW THE HOUSE` pinned to
 * the bottom of the row above a hairline. `flip` puts the image on the right;
 * the alternation runs across the whole page, not per group. Stacked on
 * mobile, image first, at the same wide 1.62 ratio (round 2: a 4:5 crop of
 * a landscape agency photograph lost the house; 4:5 is kept for the detail
 * page heroes, whose focal points are chosen for it).
 *
 * The photograph also opens the house, but it is kept out of the tab order
 * and the accessibility tree so the row carries one link, not two.
 */
export function EstateRow({ estate, flip = false, eager = false }: { estate: Estate; flip?: boolean; eager?: boolean }) {
  const hero = heroOf(estate);
  const href = `/estates/${estate.slug}`;

  return (
    <article className={`${styles.row} ${flip ? styles.flip : ""}`}>
      <Link href={href} className={styles.media} tabIndex={-1} aria-hidden="true">
        <Frame
          src={srcOf(estate, hero)}
          alt={hero.alt}
          focal={hero.focal}
          ratio="wide"
          sizes="(min-width:1024px) 62vw, 100vw"
          eager={eager}
        />
      </Link>
      <div className={styles.text}>
        <p className={`t-eyebrow c-taupe ${styles.eyebrow}`}>{estate.town}</p>
        <h3 className="t-h3">{estate.name}</h3>
        <p className={`t-body ${styles.sentence}`}>{estate.short}</p>
        <p className={`t-small c-umber ${styles.spec}`}>
          {specLine(estate)}
          <br />
          {priceDisplay(estate, "index")}
        </p>
        <div className={styles.foot}>
          <TextLink href={href}>{copy.estates.rowLink}</TextLink>
          <hr className={`hairline ${styles.rule}`} />
        </div>
      </div>
    </article>
  );
}
