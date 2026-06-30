'use client';

import { useParams } from 'next/navigation';

import { trpc } from '~/trpc/client';

export function useProject() {
  const params = useParams();

  const projectId = params.projectId as string;

  const query = trpc.project.get.useQuery(
    {
      projectId,
    },
    {
      enabled: !!projectId,
    }
  );

  return {
    projectId,

    project: query.data,

    isLoading: query.isLoading,

    error: query.error,

    refetch: query.refetch,
  };
}
