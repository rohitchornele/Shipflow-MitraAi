'use client';

import { Sparkles } from 'lucide-react';

import { Button } from '~/components/ui/button';

type FeatureEmptyStateProps = {
  onCreate(): void;
};

export function FeatureEmptyState({
  onCreate,
}: FeatureEmptyStateProps) {
  return (
    <div className="flex min-h-[450px] items-center justify-center rounded-xl border border-dashed">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold">
          No Features Yet
        </h2>

        <p className="mt-2 text-muted-foreground">
          Every delivery starts with a feature.
          Create your first feature and let AI
          help gather requirements.
        </p>

        <Button
          className="mt-6"
          onClick={onCreate}
        >
          Create Feature
        </Button>
      </div>
    </div>
  );
}