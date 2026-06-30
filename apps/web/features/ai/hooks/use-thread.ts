'use client';

import { trpc } from '~/trpc/client';

type UseThreadProps = {
  featureId: string;
};

export function useThread({
  featureId,
}: UseThreadProps) {
  const threadQuery =
    trpc.aiThread.getRequirementThread.useQuery(
      {
        featureId,
      },
      {
        enabled: !!featureId,
      }
    );

  const thread = threadQuery.data;

  const messagesQuery =
    trpc.aiThread.listMessages.useQuery(
      {
        threadId: thread?.id ?? '',
      },
      {
        enabled: !!thread?.id,
      }
    );

  return {
    thread,

    messages: messagesQuery.data ?? [],

    isLoading:
      threadQuery.isLoading ||
      messagesQuery.isLoading,

    isFetching:
      threadQuery.isFetching ||
      messagesQuery.isFetching,

    refetch: async () => {
      const result =
        await threadQuery.refetch();

      const currentThread =
        result.data ?? thread;

      if (currentThread?.id) {
        await messagesQuery.refetch();
      }
    },
  };
}