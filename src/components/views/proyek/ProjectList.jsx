import ProjectCard from "@/components/shared/ProjectCard";

export default function ProjectList({ projectsData }) {
  if (!projectsData || projectsData.length === 0) {
    return <div className="text-center text-neutral-500 py-10">Tidak ada proyek yang ditemukan.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {projectsData.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}