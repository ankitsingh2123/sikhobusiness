import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image Optimization ──
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "vz-82a5778a-b1c.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "*.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "skills.sikhobusiness.com",  // Seekho Business skill images
      },
    ],
  },

  // ── Performance ──
  compress: true,
  poweredByHeader: false,

  // ── Security Headers ──
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5001";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      }
    ];
  },

  async headers() {
    return [
      // ── Global rules (all routes) ──
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection",       value: "1; mode=block" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          // Prevent YOUR pages from being embedded in foreign iframes
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
      // ── Watch page: allow YouTube + Bunny.net iframes to render ──
      {
        source: "/watch/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "frame-ancestors 'self'",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://*.mediadelivery.net https://*.bunny.net",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
