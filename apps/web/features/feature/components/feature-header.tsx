'use client';

import { Badge } from '~/components/ui/badge';

type FeatureHeaderProps = {
  feature: any;
};

export function FeatureHeader({
  feature,
}: FeatureHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {feature.title}
          </h1>

          <p className="mt-2 max-w-3xl text-muted-foreground">
            {feature.description ??
              'No description provided.'}
          </p>
        </div>

        <div className="flex gap-2">
          <Badge>
            {feature.status.replaceAll('_', ' ')}
          </Badge>

          <Badge variant="outline">
            {feature.priority}
          </Badge>
        </div>
      </div>
    </div>
  );
}