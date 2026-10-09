import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Frame } from "@/components/Frame";
import { atmosphere } from "@/data/atmosphere";
import { copy } from "@/lib/copy";
import { published } from "@/lib/estates";
import { pageMeta } from "@/lib/seo";
import styles from "./enquire.module.css";

export const metadata: Metadata = pageMeta({ path: "/enquire", ...copy.meta.enquire });

/**
 * Enquire (brief 6.5). `?house=slug` preselects the house; the form reads it
 * in the browser, so this page is static (fast first byte, no cold start).
 */
export default function EnquirePage() {
  const houses = published().map(({ slug, name }) => ({ slug, name }));
  const image = atmosphere.enquire;
  const c = copy.enquire;

  return (
    <div className={`container-x ${styles.page}`}>
      <header className={styles.intro}>
        <h1 className="t-display">{c.title}</h1>
        <p className={`t-lead ${styles.lead}`}>{c.lead}</p>
      </header>

      <div className={styles.grid}>
        <EnquiryForm houses={houses} houseFromQuery />
        <div className={styles.image}>
          <Frame
            src={image.src}
            alt={image.alt}
            focal={image.focal}
            ratio="portrait"
            sizes="(min-width:1024px) 40vw, 100vw"
            eager
          />
        </div>
      </div>
    </div>
  );
}
