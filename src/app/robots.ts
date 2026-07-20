import type { MetadataRoute } from "next";

// KOREKSI: Samakan dengan ENV di layout.jsx
const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://sinarcerahsempurna.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
