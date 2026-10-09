import type { Metadata } from "next";
import { Frame } from "@/components/Frame";
import { TextLink } from "@/components/TextLink";
import { atmosphere } from "@/data/atmosphere";
import { copy } from "@/lib/copy";
import { pageMeta } from "@/lib/seo";
import styles from "../enquire.module.css";

export const metadata: Metadata = pageMeta({ path: "/enquire/sent", ...copy.meta.enquireSent, index: false });

/** Confirmation after an enquiry (brief 6.5). */
export default function SentPage() {
  const c = copy.enquire.sent;
  const image = atmosphere.enquireSent;

  return (
    <div className={`container-x ${styles.sent}`}>
      <div className={styles.sentText}>
        <h1 className="t-display">{c.title}</h1>
        <p className={`t-lead ${styles.sentLead}`}>{c.lead}</p>
        <p className={styles.sentLink}>
          <TextLink href={c.link.href}>{c.link.label}</TextLink>
        </p>
      </div>
      <div className={styles.sentImage}>
        <Frame src={image.src} alt={image.alt} focal={image.focal} ratio="wide" sizes="100vw" eager />
      </div>
    </div>
  );
}
