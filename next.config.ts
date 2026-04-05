import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

/** Baked into the client bundle when NEXT_PUBLIC_API_BASE_URL is unset (Hostinger static → Vercel API). */
const vercelApiFallback =
  process.env.NEXT_PUBLIC_VERCEL_API_FALLBACK?.trim() ||
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ||
  "https://ecom-dev-tan.vercel.app";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_VERCEL_API_FALLBACK: vercelApiFallback,
  },
  ...(isStaticExport ? { output: "export" as const } : {}),
};

export default nextConfig;
