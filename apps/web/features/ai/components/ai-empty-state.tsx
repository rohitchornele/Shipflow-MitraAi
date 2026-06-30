'use client';

import { Bot } from 'lucide-react';

type AIEmptyStateProps = {
  title?: string;

  description?: string;
};

export function AIEmptyState({
  title = 'Start Requirement Gathering',
  description = 'Describe your feature and ShipFlow AI will ask questions until it has enough information to generate a PRD.',
}: AIEmptyStateProps) {
  return (
    <div className="flex h-full min-h-[350px] flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Bot className="h-8 w-8 text-primary" />
      </div>

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}