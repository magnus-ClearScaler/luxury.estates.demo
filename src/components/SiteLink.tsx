"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * next/link without viewport prefetching (PSI pass 2). By default every link
 * on the first screen prefetches its page as soon as React has started: a
 * dozen requests, the other pages' stylesheets and scripts, and their first
 * photographs at high priority, all on a phone's first second. Here a page is
 * prefetched only when a visitor shows intent (pointer over the link, touch,
 * or keyboard focus), so navigation still feels instant.
 */
export default function SiteLink({
  href,
  onPointerEnter,
  onTouchStart,
  onFocus,
  ...rest
}: Omit<ComponentProps<typeof NextLink>, "prefetch"> & { href: string }) {
  const router = useRouter();
  const warm = () => router.prefetch(href);
  return (
    <NextLink
      href={href}
      prefetch={false}
      onPointerEnter={(e) => {
        warm();
        onPointerEnter?.(e);
      }}
      onTouchStart={(e) => {
        warm();
        onTouchStart?.(e);
      }}
      onFocus={(e) => {
        warm();
        onFocus?.(e);
      }}
      {...rest}
    />
  );
}
