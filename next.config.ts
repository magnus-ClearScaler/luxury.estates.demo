import type { NextConfig } from "next";

/** Brief 11.3. */
const nextConfig: NextConfig = {
  // Owner round 2 fix pass: no Next.js dev badge in the review screenshots.
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 ignores qualities that are not declared here.
    qualities: [75, 85, 90],
    deviceSizes: [640, 750, 828, 1080, 1440, 1920, 2400],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Versioned by name (scripts/subset-fonts.sh).
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/grain-v2.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
