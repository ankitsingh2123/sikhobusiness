import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/auth/",
          "/profile/",
          "/settings/",
          "/checkout/",
          "/learn/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/auth/"],
      },
    ],
    sitemap: "https://seekhobussiness.co.in/sitemap.xml",
    host: "https://seekhobussiness.co.in",
  };
}
