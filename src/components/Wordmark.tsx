import { NAME_DISPLAY } from "@/lib/site";

/**
 * Live-text wordmark: AUBE’MAR in Jost 300 caps at 0.34em, ink. The apostrophe
 * (U+2019) is tucked between E and M. Never over a photograph.
 *
 * Size comes from the caller: `size` in px (header 17, compact/mobile 15,
 * footer 22, gate 24), or omit it and size with a class.
 */
export function Wordmark({
  size,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`wordmark ${className}`}
      style={size ? { fontSize: `${size}px` } : undefined}
    >
      <span className="sr-only">{NAME_DISPLAY}</span>
      <span aria-hidden="true">
        AUBE<span className="apos">’</span>MAR
      </span>
    </span>
  );
}
