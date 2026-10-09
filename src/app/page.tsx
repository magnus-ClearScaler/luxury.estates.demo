import { Band } from "@/components/Band";
import { EstateCards } from "@/components/EstateCards";
import { FeaturePair } from "@/components/FeaturePair";
import { Frame } from "@/components/Frame";
import { HeroFilm } from "@/components/HeroFilm";
import { TextLink } from "@/components/TextLink";
import { copy } from "@/lib/copy";
import { bySlug, photoSrc } from "@/lib/estates";
import s from "./page.module.css";

/** An estate photograph for a Home slot: served path, focal, and the gallery alt. */
function housePhoto(slot: { estate: string; file: string; focal: readonly [number, number] }) {
  const e = bySlug(slot.estate);
  const photo = e?.gallery.find((p) => p.file === slot.file);
  if (!e || !photo) throw new Error(`Home photograph not in a published gallery: ${slot.estate}/${slot.file}`);
  return { src: photoSrc(e.slug, photo.file), alt: photo.alt, focal: slot.focal };
}

/**
 * Home (brief 6.1, owner rounds 1 and 2): the film, one line under it, the
 * feature pair, the statement and its 21:9, three houses, the linen band.
 * Round 2 (brief R2.4): seven stills, seven houses, every one a house seen
 * from outside in its setting; no atmosphere photograph. Nothing written on
 * a photograph, nothing moves on scroll. Main content stays under 120 words.
 */
export default function Home() {
  const h = copy.home;
  const w = h.featureWide;
  const p = h.featurePortrait;
  const b = h.band;

  return (
    <>
      <h1 className="sr-only">{h.srTitle}</h1>

      <HeroFilm />

      <section className={`container-x ${s.intro}`}>
        <div className={s.introInner}>
          <p className="t-eyebrow c-taupe">{h.intro.eyebrow}</p>
          <h2 className={`t-h2 ${s.introTitle}`}>{h.intro.title}</h2>
          <p className={s.introLink}>
            <TextLink href={h.intro.link.href}>{h.intro.link.label}</TextLink>
          </p>
        </div>
      </section>

      <section className={`container-x section ${s.afterIntro}`}>
        <FeaturePair
          wide={{ image: housePhoto(w), eyebrow: w.eyebrow, title: w.title, body: w.body, link: w.link }}
          portrait={{ image: housePhoto(p), eyebrow: p.eyebrow, title: p.title, body: p.body, link: p.link }}
        />
      </section>

      <section className="container-x section">
        <p className={`t-statement ${s.statement}`}>{h.statement}</p>
        <Frame
          {...housePhoto(h.statementImage)}
          ratio="pano"
          mobileRatio="wide"
          sizes="100vw"
          className={s.statementImage}
        />
      </section>

      <section className="container-x section">
        <EstateCards {...h.estatesRow} />
      </section>

      <div className={s.bandWrap}>
        <Band image={housePhoto(b)} eyebrow={b.eyebrow} title={b.title} body={b.body} link={b.link} />
      </div>
    </>
  );
}
