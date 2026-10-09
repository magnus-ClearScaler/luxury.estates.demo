import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Frame } from "@/components/Frame";
import { atmosphere } from "@/data/atmosphere";
import { copy } from "@/lib/copy";
import { indexOrder, published } from "@/lib/estates";
import { OTHER_HOUSE } from "./fields";
import styles from "./enquire.module.css";

export const metadata: Metadata = { title: copy.enquire.title };

/** Enquire (brief 6.5). `?house=slug` preselects the house. */
export default async function EnquirePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { house } = await searchParams;
  const slug = typeof house === "string" ? house : "";
  const preselect = indexOrder.includes(slug) || slug === OTHER_HOUSE ? slug : "";
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
        <EnquiryForm houses={houses} house={preselect} />
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
