import { Frame } from "./Frame";
import { TextLink } from "./TextLink";
import s from "./FeaturePair.module.css";

export type FeatureItem = {
  image: { src: string; alt: string; focal?: readonly [number, number] };
  eyebrow: string;
  title: string;
  body: string;
  link: { label: string; href: string };
};

/**
 * Home feature pair (brief 6.1.3). Grid 2.085fr 1fr, gap 37px, one wide and
 * one portrait, both 570px tall at 1440. The two ratios below are chosen so
 * the heights match at every desktop width (their quotient is 2.085, the
 * column ratio); on mobile the pair stacks at the plain wide and portrait
 * ratios. Each card: image, eyebrow, h3, one sentence, one text link.
 */
const PAIR_RATIO = { wide: "1.6065 / 1", portrait: "0.7705 / 1" } as const;

export function FeaturePair({ wide, portrait }: { wide: FeatureItem; portrait: FeatureItem }) {
  return (
    <div className={s.pair}>
      <Card item={wide} kind="wide" sizes="(min-width:1024px) 66vw, 100vw" />
      <Card item={portrait} kind="portrait" sizes="(min-width:1024px) 30vw, 100vw" />
    </div>
  );
}

function Card({
  item,
  kind,
  sizes,
}: {
  item: FeatureItem;
  kind: "wide" | "portrait";
  sizes: string;
}) {
  return (
    <article className={s.card}>
      <Frame
        src={item.image.src}
        alt={item.image.alt}
        focal={item.image.focal}
        ratio={kind}
        mobileRatio={kind}
        sizes={sizes}
        className={s.desktopRatio}
        style={{ "--ratio-desktop": PAIR_RATIO[kind] } as React.CSSProperties}
      />
      <p className={`t-eyebrow c-taupe ${s.eyebrow}`}>{item.eyebrow}</p>
      <h3 className={`t-h3 ${s.title}`}>{item.title}</h3>
      <p className={`t-body ${s.body}`}>{item.body}</p>
      <p className={s.link}>
        <TextLink href={item.link.href}>{item.link.label}</TextLink>
      </p>
    </article>
  );
}
