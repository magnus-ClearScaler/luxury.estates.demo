import { Frame } from "./Frame";
import { TextLink } from "./TextLink";

export type BandProps = {
  image: { src: string; alt: string; focal?: readonly [number, number] };
  eyebrow?: string;
  title: string;
  body?: string;
  link?: { label: string; href: string };
};

/**
 * The linen band (brief 6.1.6): image left (wide, 1.62:1), text right in a
 * 469px column, vertically centred; 64px padding top and bottom. Stacked on
 * mobile, image first. The h2 is the band's heading.
 */
export function Band({ image, eyebrow, title, body, link }: BandProps) {
  return (
    <section className="band">
      <div className="container-x band-grid">
        <Frame
          src={image.src}
          alt={image.alt}
          focal={image.focal}
          ratio="wide"
          sizes="(min-width:1024px) 66vw, 100vw"
        />
        <div className="band-text">
          {eyebrow ? <p className="t-eyebrow c-taupe band-eyebrow">{eyebrow}</p> : null}
          <h2 className="t-h2">{title}</h2>
          {body ? <p className="t-body band-body">{body}</p> : null}
          {link ? (
            <p className="band-link">
              <TextLink href={link.href}>{link.label}</TextLink>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
