import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // In dev, force no-store on every static chunk so the browser never serves
  // a stale globals.css. Without this, Turbopack reuses the same chunk URL
  // (e.g. globals_09u9t0a.css) across edits and the browser keeps serving its
  // cached copy. In production this block is skipped — chunks keep their
  // long-lived cache headers.
  async headers() {
    if (!isDev) return [];
    return [
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }],
      },
      {
        // Catch the framework's HMR + dev-runtime endpoints too
        source: "/_next/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
