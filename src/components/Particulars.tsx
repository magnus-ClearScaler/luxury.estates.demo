import { copy } from "@/lib/copy";
import { particulars, type Estate } from "@/lib/estates";
import styles from "./Particulars.module.css";

/**
 * Brief 6.3.5. The linen band: h2, a `dl` in two columns on desktop (terms in
 * label style umber, values in small ink, a hairline between rows), null rows
 * already dropped by `particulars()`. Then `Features`, one item per line as
 * written in data: no bullets, no commas joining them.
 */
export function Particulars({ estate }: { estate: Estate }) {
  const rows = particulars(estate);
  const perColumn = Math.ceil(rows.length / 2);
  const t = copy.estate;
  return (
    <section className="band" aria-labelledby="particulars-title">
      <div className={`container-x ${styles.grid}`}>
        <h2 id="particulars-title" className={`t-h2 ${styles.title}`}>
          {t.particularsTitle}
        </h2>
        <div className={styles.body}>
          <dl
            className={`${styles.list} ${rows.length % 2 ? styles.odd : ""}`}
            style={{ "--rows": perColumn } as React.CSSProperties}
          >
            {rows.map((r, i) => (
              <div
                key={r.term}
                className={`${styles.row} ${i === 0 ? styles.listStart : ""} ${i === perColumn ? styles.colStart : ""}`}
              >
                <dt className={`t-label c-umber ${styles.term}`}>{r.term}</dt>
                <dd className={`t-small ${styles.value}`}>{r.value}</dd>
              </div>
            ))}
          </dl>
          {estate.features.length > 0 ? (
            <div className={styles.features}>
              <h3 className={`t-label c-umber ${styles.featuresLabel}`}>{t.featuresLabel}</h3>
              <ul className={styles.featureList}>
                {estate.features.map((f) => (
                  <li key={f} className="t-small">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
