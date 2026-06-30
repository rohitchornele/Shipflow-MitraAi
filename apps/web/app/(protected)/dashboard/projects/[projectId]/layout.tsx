'use client';

import { ProjectLoader } from "~/features/project/components/project-loader";



export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectLoader>
      {children}
    </ProjectLoader>
  );
}