'use client';

import { toast } from 'sonner';

import { trpc } from '~/trpc/client';

type UseSendMessageProps = {
  featureId: string;
};

export function useSendMessage({ featureId }: UseSendMessageProps) {
  const utils = trpc.useUtils();

  const mutation = trpc.aiThread.sendUserMessage.useMutation({
    onSuccess(result) {
      const message = result.assistantMessage;

      utils.aiThread.listMessages.setData(
        {
          threadId: message.threadId,
        },
        (previous) => {
          if (!previous) {
            return [message];
          }

          const exists = previous.some((item) => item.id === message.id);

          if (exists) {
            return previous;
          }

          return [...previous, message];
        }
      );

      utils.featureContext.get.invalidate({
        featureId: result.featureId,
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return {
    sendMessage: mutation.mutate,

    sendMessageAsync: mutation.mutateAsync,

    isSending: mutation.isPending,

    error: mutation.error,

    reset: mutation.reset,
  };
}
