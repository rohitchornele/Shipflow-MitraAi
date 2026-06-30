import { trpc } from '~/trpc/client';

export const useCurrentUser = () => {
  const {
    data: user,

    error,

    isFetched,

    isFetching,

    isLoading,

    status,

    refetch,
  } = trpc.auth.getCurrentUser.useQuery();

  return {
    user,

    error,

    isFetched,

    isFetching,

    isLoading,

    status,

    refetch,
  };
};
