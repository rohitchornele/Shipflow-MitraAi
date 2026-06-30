'use client';

import { trpc } from '~/trpc/client';

export function useFeature(featureId: string) {
  const query = trpc.feature.get.useQuery(
    {
      featureId,
    },
    {
      enabled: !!featureId,
    }
  );

  return {
    ...query,

    feature: query.data,
  };
}