import { Band } from "@/components/Band";
import { EstateCards } from "@/components/EstateCards";
import { FeaturePair } from "@/components/FeaturePair";
import { Frame } from "@/components/Frame";
import { HeroFilm } from "@/components/HeroFilm";
import { TextLink } from "@/components/TextLink";
import { atmosphere } from "@/data/atmosphere";
import { copy } from "@/lib/copy";
import s from "./page.module.css";

/**
 * Home (brief 6.1): the film, one line under it, the feature pair, the
 * statement and its 21:9, three houses, the linen band. Nothing written on a
 * photograph, nothing moves on scroll. Main content stays under 120 words.
 */
export default function Home() {
  const h = copy.home;
  const w = h.featureWide;

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

      <section className="container-x section">
        <FeaturePair
          wide={{
            image: { src: w.image, alt: w.alt, focal: w.focal },
            eyebrow: w.eyebrow,
            title: w.title,
            body: w.body,
            link: w.link,
          }}
          portrait={{ image: atmosphere.homeFeature, ...h.featurePortrait }}
        />
      </section>

      <section className="container-x section">
        <p className={`t-statement ${s.statement}`}>{h.statement}</p>
        <Frame
          src={atmosphere.homeStatement.src}
          alt={atmosphere.homeStatement.alt}
          focal={atmosphere.homeStatement.focal}
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
        <Band image={atmosphere.homeBand} {...h.band} />
      </div>
    </>
  );
}
