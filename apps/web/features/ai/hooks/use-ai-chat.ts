'use client';

import { useSendMessage } from './use-send-message';
import { useThread } from './use-thread';

export function useAIChat(featureId: string) {
  const thread = useThread({
    featureId,
  });

  const sendMessage = useSendMessage({
    featureId,
  });

  return {
    ...thread,
    ...sendMessage,
  };
}
