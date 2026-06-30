'use client';

import { useEffect, useRef } from 'react';

import { AIMessage } from './ai-message';

type AIMessageListProps = {
  messages: any[];
};

export function AIMessageList({
  messages,
}: AIMessageListProps) {
  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <AIMessage
          key={message.id}
          message={message}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}