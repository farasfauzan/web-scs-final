import { prisma } from "@/lib/prisma";
import ProyekClientView from "@/components/views/proyek/ProyekClientView";

export const revalidate = 1800; // Cache 30 menit

export default async function ProyekPage() {
  const [heroes, projects] = await Promise.all([
    prisma.hero.findMany({ where: { page: "projects", isActive: true } }),
    prisma.project.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <ProyekClientView heroData={heroes[0] || null} initialProjects={projects} />
  );
}
