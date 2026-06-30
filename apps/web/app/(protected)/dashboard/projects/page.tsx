'use client';

import { LoadingScreen } from '~/features/utils/components/loading-screen';

import { ProjectEmptyState } from '~/features/project/components/project-empty-state';
import { ProjectCard } from '~/features/project/components/project-card';
import { useProjects } from '~/features/project/hooks/use-projects';

export default function ProjectsPage() {
  const { projects, isLoading } = useProjects();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (projects.length === 0) {
    return <ProjectEmptyState />;
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your engineering projects.
        </p>
      </div>

      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}