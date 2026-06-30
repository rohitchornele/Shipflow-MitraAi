import { trpc } from '~/trpc/client';

export function useProjects() {
  const query = trpc.project.list.useQuery();

  return {
    projects: query.data ?? [],

    isLoading: query.isLoading,

    error: query.error,

    refetch: query.refetch,
  };
}