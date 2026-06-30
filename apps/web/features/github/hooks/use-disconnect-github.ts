import { trpc } from '~/trpc/client';

export const useDisconnectGithub = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: disconnectAsync,
    mutate: disconnect,
    isPending,
  } = trpc.github.disconnectInstallation.useMutation({
    onSuccess: async () => {
      console.log('✅ disconnect success');
      await utils.github.invalidate();
    },

    onError(error) {
      console.error('❌ disconnect failed');
      console.error(error);
      console.error(error.message);
      console.error(error.data);
    },
  });

  return {
    disconnect,
    disconnectAsync,
    isPending,
  };
};
