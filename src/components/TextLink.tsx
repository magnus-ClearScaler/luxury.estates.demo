import Link from "@/components/SiteLink";

/**
 * The default CTA (brief 5.4): Jost 12 caps at 0.16em, underline 6px below the
 * baseline on hover only. No arrows, no icons. One per block.
 */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  // Same-page anchors (e.g. `#enquire`) stay plain anchors.
  if (href.startsWith("#")) {
    return (
      <a href={href} className={`t-link ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`t-link ${className}`}>
      {children}
    </Link>
  );
}
