// 'use client';

// import { useParams } from 'next/navigation';

// export function ProjectLoader({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { projectId } = useParams();

//   console.log(projectId);

//   return <>{children}</>;
// }


'use client';

import { LoadingScreen } from '~/features/utils/components/loading-screen';

import { useProject } from '../hooks/use-project';
import { ProjectNotFound } from './project-not-found';

type ProjectLoaderProps = {
  children: React.ReactNode;
};

export function ProjectLoader({
  children,
}: ProjectLoaderProps) {
  const {
    project,
    isLoading,
    error,
  } = useProject();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !project) {
    return <ProjectNotFound />;
  }

  return <>{children}</>;
}