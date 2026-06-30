import { useEffect, useState } from 'react';

import { trpc } from '~/trpc/client';


export function useRepositories() {
  const [page, setPage] = useState(1);

  const [repositories, setRepositories] = useState<any[]>([]);

  const shouldPoll = repositories.some(
    (repo) => repo.syncStatus === 'pending' || repo.syncStatus === 'syncing'
  );

  const query = trpc.github.listRepositories.useQuery(
    { page },
    {
      staleTime: 10 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (!query.data) {
      return;
    }

    setRepositories((previous) => {
      const existing = new Set(previous.map((repo) => repo.id));

      const next = query.data.repositories.filter(
        (repo) => !existing.has(repo.id)
      );

      return [...previous, ...next];
    });
  }, [query.data]);

  useEffect(() => {
    if (!shouldPoll) {
      return;
    }

    const interval = setInterval(() => {
      query.refetch();
    }, 3000);

    return () => clearInterval(interval);
  }, [shouldPoll, query]);

  return {
    ...query,

    repositories,

    fetchNextPage() {
      if (query.data?.hasMore && !query.isFetching) {
        setPage((page) => page + 1);
      }
    },

    hasNextPage: query.data?.hasMore ?? false,

    isFetchingNextPage: query.isFetching && page > 1,
  };
}
