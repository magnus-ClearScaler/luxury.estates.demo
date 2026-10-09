import { Frame } from "@/components/Frame";
import { TextLink } from "@/components/TextLink";
import { atmosphere } from "@/data/atmosphere";
import { copy } from "@/lib/copy";

/**
 * Brief 6.7: one portrait inset on the paper, one line, one link. Sized so the
 * whole page sits in the first screen at 1440 x 900.
 */
export default function NotFound() {
  const img = atmosphere.notFound;
  return (
    <div
      className="container-x"
      style={{
        paddingBlock: "clamp(48px, 6vw, 80px) var(--section)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Frame
        src={img.src}
        alt={img.alt}
        ratio="portrait"
        focal={img.focal}
        sizes="(min-width: 768px) 360px, 100vw"
        eager
        style={{ width: "min(100%, 360px)" }}
      />
      <h1 className="t-h2" style={{ marginTop: 48, maxWidth: 520 }}>
        {copy.notFound.title}
      </h1>
      <TextLink href={copy.notFound.link.href} className="mt-8">
        {copy.notFound.link.label}
      </TextLink>
    </div>
  );
}
