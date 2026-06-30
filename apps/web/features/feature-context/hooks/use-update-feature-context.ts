'use client';

import { toast } from 'sonner';

import { trpc } from '~/trpc/client';

export function useUpdateFeatureContext() {
  const utils = trpc.useUtils();

  const resetMutation =
    trpc.featureContext.reset.useMutation({
      async onSuccess(context) {
        await utils.featureContext.get.invalidate({
          featureId: context.featureId,
        });

        toast.success(
          'Feature context reset.'
        );
      },

      onError(error) {
        toast.error(error.message);
      },
    });

  return {
    resetContext:
      resetMutation.mutate,

    resetContextAsync:
      resetMutation.mutateAsync,

    isResetting:
      resetMutation.isPending,
  };
}