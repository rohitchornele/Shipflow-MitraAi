'use client';

import { trpc } from '~/trpc/client';

type UseFeatureContextProps = {
  featureId: string;
};

export function useFeatureContext({
  featureId,
}: UseFeatureContextProps) {
  const query =
    trpc.featureContext.get.useQuery(
      {
        featureId,
      },
      {
        enabled: !!featureId,
      }
    );

  return {
    ...query,

    context: query.data,

    completion:
      query.data?.completion ?? 0,

    summary:
      query.data?.summary ?? null,

    requirements:
      query.data?.requirements ?? {},

    missingItems:
      query.data?.missingItems ?? [],
  };
}