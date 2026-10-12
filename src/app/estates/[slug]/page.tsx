import type { Metadata } from "next";
import Link from "@/components/SiteLink";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Frame } from "@/components/Frame";
import { JsonLd } from "@/components/JsonLd";
import { Particulars } from "@/components/Particulars";
import { Sequence } from "@/components/Sequence";
import { TextLink } from "@/components/TextLink";
import { copy } from "@/lib/copy";
import {
  bySlug,
  heroOf,
  metaDescription,
  next,
  placeLine,
  priceDisplay,
  published,
  sequenceOf,
  specLine,
  srcOf,
} from "@/lib/estates";
import { estateJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import styles from "./estate.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return published().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = bySlug(slug);
  if (!e) return {};
  return pageMeta({
    path: `/estates/${e.slug}`,
    title: copy.meta.estateTitle(e.name, e.town),
    description: metaDescription(e),
    ownImage: true,
  });
}

/**
 * Brief 6.3. Opening image, intro, the sequence, the prose in the right half,
 * Particulars on linen, the enquiry panel on chalk, a line to the next house
 * and the credit. No sub-nav, tabs, lightbox, carousel, map, agent card or
 * similar properties.
 */
export default async function EstatePage({ params }: Props) {
  const { slug } = await params;
  const e = bySlug(slug);
  if (!e) notFound();

  const t = copy.estate;
  const hero = heroOf(e);
  const following = next(e.slug);
  // Published houses always carry a reference; held ones are never routed.
  const reference = e.reference ?? "";

  return (
    <article>
      <div className={`container-x ${styles.opening}`}>
        <Frame
          src={srcOf(e, hero)}
          alt={hero.alt}
          focal={hero.focal}
          ratio="wide"
          mobileRatio="detail"
          sizes="100vw"
          quality={90}
          preload
        />
      </div>

      <header className={`container-x ${styles.intro}`}>
        <p className={`t-eyebrow c-taupe ${styles.eyebrow}`}>{placeLine(e)}</p>
        <h1 className="t-display">{e.name}</h1>
        <p className={`t-lead ${styles.lead}`}>{e.short}</p>
        <p className={`t-small c-umber ${styles.spec}`}>
          {specLine(e)}
          <br />
          {priceDisplay(e, "index")}
        </p>
        <p className={styles.link}>
          <TextLink href={t.viewingLink.href}>{t.viewingLink.label}</TextLink>
        </p>
      </header>

      <Sequence estate={e} photos={sequenceOf(e)} />

      <div className={`container-x ${styles.prose}`}>
        <p className="t-body">{e.long}</p>
      </div>

      <Particulars estate={e} />

      <section
        id="enquire"
        className={`container-x ${styles.enquiry}`}
        aria-labelledby="enquire-title"
      >
        <div className={styles.panel}>
          <div className={styles.panelInner}>
            <h2 id="enquire-title" className="t-h2">
              {t.enquiryTitle}
            </h2>
            <p className={`t-small c-umber ${styles.panelLine}`}>{t.enquiryLine}</p>
            <EnquiryForm
              houses={published().map((h) => ({ slug: h.slug, name: h.name }))}
              house={e.slug}
              message={t.enquiryMessage(e.name, reference)}
            />
          </div>
        </div>
      </section>

      <div className={`container-x ${styles.close}`}>
        <hr className="hairline" />
        <p className={`t-small ${styles.next}`}>
          <Link href={`/estates/${following.slug}`} className="inline-link">
            {t.next(following.name)}
          </Link>
        </p>
        <p className={`t-small c-taupe ${styles.credit}`}>{t.credit}</p>
      </div>
      <JsonLd data={estateJsonLd(e)} />
    </article>
  );
}
