'use client';

import { Bot, User } from 'lucide-react';

import { cn } from '~/lib/utils';

type AIMessageProps = {
  message: any;
};

export function AIMessage({
  message,
}: AIMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-4',
        isUser && 'flex-row-reverse'
      )}
    >
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        {isUser ? (
          <User className="h-5 w-5" />
        ) : (
          <Bot className="h-5 w-5" />
        )}
      </div>

      <div
        className={cn(
          'max-w-[80%] rounded-xl px-4 py-3',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        <p className="whitespace-pre-wrap text-sm leading-6">
          {message.content}
        </p>
      </div>
    </div>
  );
}