import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import credits from "../../../data/atmosphere.json" with { type: "json" };
import videos from "../../../data/video.json" with { type: "json" };
import { atmosphereCredits, deployedAtmosphere, film } from "@/data/atmosphere";
import { copy } from "@/lib/copy";
import { published } from "@/lib/estates";
import styles from "./colophon.module.css";

export const metadata: Metadata = { title: copy.colophon.title };

type Credit = { file: string; photographer_url: string; licence: string };
type Video = { file: string; licence: string };

/** `Unsplash License (free commercial use, ...)` → `Unsplash License`. */
function licenceName(s: string): string {
  return s.replace(/\s*\(.*\)\s*$/, "");
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Atmosphere rows: every graded file actually in public/atmosphere, then the
 * one film. Photographer, photo page and licence come from data/*.json.
 */
function atmosphereRows() {
  const photos = deployedAtmosphere
    .filter((a) => existsSync(join(process.cwd(), "public", a.src)))
    .map((a) => {
      const row = atmosphereCredits.find((r) => r.file === `${a.name}.jpg`)!;
      const c = (credits as Credit[]).find((x) => x.file === a.src)!;
      return { ...row, photographerUrl: c.photographer_url, licence: licenceName(c.licence) };
    });
  const v = (videos as Video[]).find((x) => x.file === `/video/${film.credit.file}`)!;
  return [...photos, { ...film.credit, photographerUrl: null, licence: licenceName(v.licence) }];
}

export default function ColophonPage() {
  const c = copy.colophon;
  const [colName, colRef, colTown, colAgency, colAgencyRef, colListing] = c.estatesColumns;
  const [colFile, colPhotographer, colSource] = c.atmosphereColumns;

  return (
    <div className={`container-x ${styles.page}`}>
      <h1 className="t-display">{c.title}</h1>
      <p className={`t-body ${styles.body}`}>{c.body}</p>

      <section className={styles.part} aria-labelledby="colophon-estates">
        <h2 id="colophon-estates" className={`t-h2 ${styles.partTitle}`}>
          {c.estatesTitle}
        </h2>
        <table className={`t-small ${styles.table}`}>
          <thead>
            <tr>
              {c.estatesColumns.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {published().map((e) => (
              <tr key={e.slug}>
                <td data-label={colName}>{e.name}</td>
                <td data-label={colRef} className={styles.nowrap}>
                  {e.reference}
                </td>
                <td data-label={colTown}>{e.town}</td>
                <td data-label={colAgency}>{e.sourceAgency}</td>
                <td data-label={colAgencyRef} className={styles.nowrap}>
                  {e.agencyRef}
                </td>
                <td data-label={colListing}>
                  <a href={e.sourceUrl} className="inline-link" {...external}>
                    {c.sourceLink}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.part} aria-labelledby="colophon-atmosphere">
        <h2 id="colophon-atmosphere" className={`t-h2 ${styles.partTitle}`}>
          {c.atmosphereTitle}
        </h2>
        <table className={`t-small ${styles.table}`}>
          <thead>
            <tr>
              {c.atmosphereColumns.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {atmosphereRows().map((r) => (
              <tr key={r.file}>
                <td data-label={colFile}>{r.file}</td>
                <td data-label={colPhotographer}>
                  {r.photographerUrl ? (
                    <a href={r.photographerUrl} className="inline-link" {...external}>
                      {r.photographer}
                    </a>
                  ) : (
                    r.photographer
                  )}
                </td>
                <td data-label={colSource}>
                  <span>
                    <a href={r.sourceUrl} className="inline-link" {...external}>
                      {r.source}
                    </a>
                    {/* `Unsplash · Unsplash License` reads twice: the licence
                        is named only when it is not the source's own. */}
                    {r.licence.startsWith(r.source) ? null : (
                      <span className={styles.muted}> · {r.licence}</span>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.part} aria-labelledby="colophon-type">
        <h2 id="colophon-type" className={`t-h2 ${styles.partTitle}`}>
          {c.typeTitle}
        </h2>
        <p className={`t-body ${styles.typeLine}`}>{c.type}</p>
      </section>

      <p className={`t-small ${styles.madeBy}`}>
        {c.madeBy.before}
        <a href={c.madeBy.href} className="inline-link" {...external}>
          {c.madeBy.link}
        </a>
        {c.madeBy.after}
      </p>
    </div>
  );
}
