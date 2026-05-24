/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow Next/Image to optimize images served from any Supabase Storage
    // bucket on any project. Tight on path, loose on host so we don't have
    // to redeploy when the project URL changes.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Modern formats first — Vercel's optimizer falls back automatically.
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
