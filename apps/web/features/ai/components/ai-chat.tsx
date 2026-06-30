'use client';

import { Card } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';


import { AIChatInput } from './ai-chat-input';
import { AIEmptyState } from './ai-empty-state';
import { AIMessageList } from './ai-message-list';
import { useAIChat } from '../hooks/use-ai-chat';

type AIChatProps = {
  featureId: string;
};

export function AIChat({
  featureId,
}: AIChatProps) {
  const {
    thread,
    messages,
    isLoading,
    isSending,
    sendMessageAsync,
  } = useAIChat(featureId);

  async function handleSend(
    content: string
  ) {
    if (!thread) {
      return;
    }

    await sendMessageAsync({
      threadId: thread.id,
      content,
    });
  }

  if (isLoading) {
    return (
      <Card className="flex h-[650px] flex-col p-6">
        <div className="space-y-4">
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="ml-auto h-16 w-1/2" />
          <Skeleton className="h-16 w-2/3" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex h-[650px] flex-col overflow-hidden">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          AI Requirement Gathering
        </h2>

        <p className="text-sm text-muted-foreground">
          Describe your feature and ShipFlow AI
          will gather requirements before
          generating a PRD.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <AIEmptyState />
        ) : (
          <AIMessageList
            messages={messages}
          />
        )}
      </div>

      <AIChatInput
        isSending={isSending}
        onSend={handleSend}
      />
    </Card>
  );
}