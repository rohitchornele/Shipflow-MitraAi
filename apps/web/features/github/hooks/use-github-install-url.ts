import { trpc } from '~/trpc/client';

export const useGithubInstallUrl = () => {
  const { data, isLoading, error } = trpc.github.getInstallUrl.useQuery();

  return {
    installUrl: data?.url,
    isLoading,
    error,
  };
};
