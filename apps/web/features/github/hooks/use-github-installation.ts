import { trpc } from '~/trpc/client';

export const useGithubInstallation = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = trpc.github.getInstallationStatus.useQuery();

  return {
    installation: data,
    isLoading,
    error,
    refetch,
  };
};