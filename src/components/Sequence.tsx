import { Frame } from "./Frame";
import { srcOf, type Estate, type Photo } from "@/lib/estates";
import styles from "./Sequence.module.css";

type Block =
  | { kind: "wide"; photo: Photo }
  | { kind: "diptych"; photos: [Photo, Photo] }
  | { kind: "detail"; photo: Photo };

/**
 * Brief 6.3.3. Groups the gallery after the hero into blocks by each entry's
 * own `frame` (never by position): a wide runs the full container, two
 * consecutive portraits sit side by side as a diptych, a detail is a 4:5 print
 * 440px wide on open paper. 7.1 only lists portraits in pairs; a stray single
 * portrait would throw, so a gallery edit cannot silently leave one alone.
 */
function blocksOf(photos: Photo[]): Block[] {
  const out: Block[] = [];
  for (let i = 0; i < photos.length; i++) {
    const p = photos[i];
    if (p.frame === "portrait") {
      const partner = photos[i + 1];
      if (partner?.frame !== "portrait") {
        throw new Error(`Portrait ${p.file} has no diptych partner`);
      }
      out.push({ kind: "diptych", photos: [p, partner] });
      i++;
    } else if (p.frame === "detail") {
      out.push({ kind: "detail", photo: p });
    } else {
      out.push({ kind: "wide", photo: p });
    }
  }
  return out;
}

/** The estate sequence: photographs only, no captions. */
export function Sequence({ estate, photos }: { estate: Estate; photos: Photo[] }) {
  return (
    <div className={`container-x ${styles.sequence}`}>
      {blocksOf(photos).map((b) => {
        if (b.kind === "diptych") {
          return (
            <div key={b.photos[0].file} className={styles.diptych}>
              {b.photos.map((p) => (
                <Frame
                  key={p.file}
                  src={srcOf(estate, p)}
                  alt={p.alt}
                  focal={p.focal}
                  ratio="portrait"
                  sizes="50vw"
                />
              ))}
            </div>
          );
        }
        if (b.kind === "detail") {
          return (
            <div key={b.photo.file} className={styles.detail}>
              <Frame
                src={srcOf(estate, b.photo)}
                alt={b.photo.alt}
                focal={b.photo.focal}
                ratio="detail"
                sizes="(min-width:1024px) 440px, 100vw"
              />
            </div>
          );
        }
        return (
          <Frame
            key={b.photo.file}
            src={srcOf(estate, b.photo)}
            alt={b.photo.alt}
            focal={b.photo.focal}
            ratio="wide"
            sizes="100vw"
          />
        );
      })}
    </div>
  );
}
