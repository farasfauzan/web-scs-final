import { getProjects, getNews } from "@/lib/data";
import { encodeId } from "@/lib/encode-id";

// KOREKSI: Samakan dengan ENV di layout.jsx
const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://sinarcerahsempurna.com";

export default async function sitemap() {
  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/proyek`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/berita`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hubungi-kami`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Dynamic project pages (using slug, fallback to encoded ID)
  const projects = await getProjects();
  const projectPages = projects.map((project) => ({
    url: `${BASE_URL}/proyek/${project.slug || encodeId(project.id)}`,
    lastModified: project.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic news pages - now using slug instead of encoded ID
  const newsItems = await getNews("PUBLISHED");
  const newsPages = newsItems.map((news) => ({
    url: `${BASE_URL}/berita/${news.slug}`,
    lastModified: news.updatedAt || news.publishedAt || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...newsPages];
}
