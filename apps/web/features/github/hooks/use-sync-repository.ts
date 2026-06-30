import { toast } from 'sonner';

import { trpc } from '~/trpc/client';

export function useSyncRepository() {
  const utils = trpc.useUtils();

  const mutation = trpc.github.syncRepository.useMutation({
    onSuccess: async () => {
      toast.success('Repository sync started.');

      await utils.github.listRepositories.invalidate();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    syncRepository: mutation.mutate,

    syncRepositoryAsync: mutation.mutateAsync,

    isPending: mutation.isPending,
  };
}