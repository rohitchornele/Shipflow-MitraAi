'use client';

import { toast } from 'sonner';

import { trpc } from '~/trpc/client';

export function useCreateFeature() {
  const utils = trpc.useUtils();

  const mutation = trpc.feature.create.useMutation({
    onSuccess(feature) {
      toast.success('Feature created successfully.');

      utils.feature.list.invalidate({
        projectId: feature.projectId,
      });
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return {
    createFeature: mutation.mutate,

    createFeatureAsync: mutation.mutateAsync,

    isCreating: mutation.isPending,
  };
}