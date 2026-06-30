'use client';

import { toast } from 'sonner';

import { trpc } from '~/trpc/client';

export function useUpdateFeature() {
  const utils = trpc.useUtils();

  const mutation = trpc.feature.update.useMutation({
    onSuccess(feature) {
      toast.success('Feature updated successfully.');

      utils.feature.get.invalidate({
        featureId: feature.id,
      });

      utils.feature.list.invalidate({
        projectId: feature.projectId,
      });
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return {
    updateFeature: mutation.mutate,

    updateFeatureAsync: mutation.mutateAsync,

    isUpdating: mutation.isPending,
  };
}