import type { Metadata } from "next";
import { Frame } from "@/components/Frame";
import { TextLink } from "@/components/TextLink";
import { atmosphere } from "@/data/atmosphere";
import { copy } from "@/lib/copy";
import { countWord } from "@/lib/estates";
import styles from "./house.module.css";

export const metadata: Metadata = { title: copy.house.title };

/** The House (brief 6.4). No portraits, names, founding year or team. */
export default function HousePage() {
  const c = copy.house;
  const wide = atmosphere.houseWide;
  const portrait = atmosphere.housePortrait;
  const detail = atmosphere.houseDetail;

  return (
    <>
      <header className={`container-x ${styles.intro}`}>
        <h1 className="t-display">{c.title}</h1>
        <p className={`t-lead ${styles.lead}`}>{c.lead}</p>
      </header>

      <div className={`container-x ${styles.wide}`}>
        <Frame src={wide.src} alt={wide.alt} focal={wide.focal} ratio="wide" sizes="100vw" eager />
      </div>

      <div className={`container-x ${styles.pair}`}>
        <div>
          <Frame
            src={portrait.src}
            alt={portrait.alt}
            focal={portrait.focal}
            ratio="portrait"
            sizes="(min-width:1024px) 30vw, 100vw"
          />
        </div>
        <div className={styles.blocks}>
          {c.blocks(countWord()).map((b) => (
            <div key={b.title} className={styles.block}>
              <h2 className="t-h3">{b.title}</h2>
              <p className={`t-body ${styles.blockBody}`}>{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-x">
        <div className={styles.detail}>
          <Frame
            src={detail.src}
            alt={detail.alt}
            focal={detail.focal}
            ratio="detail"
            sizes="(min-width:1024px) 440px, 100vw"
          />
        </div>
      </div>

      <div className={`container-x ${styles.close}`}>
        <p className="t-small c-umber">{c.office}</p>
        <p className={styles.closeLink}>
          <TextLink href={c.link.href}>{c.link.label}</TextLink>
        </p>
      </div>
    </>
  );
}
