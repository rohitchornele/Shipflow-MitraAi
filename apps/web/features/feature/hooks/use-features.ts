'use client';

import { trpc } from '~/trpc/client';

export function useFeatures(projectId: string) {
  const query = trpc.feature.list.useQuery(
    {
      projectId,
    },
    {
      enabled: !!projectId,
    }
  );

  return {
    ...query,

    features: query.data ?? [],
  };
}