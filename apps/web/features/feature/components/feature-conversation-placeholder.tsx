'use client';

import { Bot } from 'lucide-react';

import { Card, CardContent } from '~/components/ui/card';

export function FeatureConversationPlaceholder() {
  return (
    <Card>
      <CardContent className="flex min-h-[350px] flex-col items-center justify-center text-center">
        <Bot className="mb-5 h-10 w-10 text-primary" />

        <h2 className="text-xl font-semibold">AI Requirement Gathering</h2>

        <p className="mt-2 max-w-lg text-muted-foreground">
          After creating a feature, ShipFlow AI will ask questions, clarify
          requirements and prepare a PRD.
        </p>
      </CardContent>
    </Card>
  );
}
