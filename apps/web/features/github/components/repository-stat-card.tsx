'use client';

import { Card, CardContent } from '~/components/ui/card';

type RepositoryStatCardProps = {
  title: string;
  value: number;
  description: string;
};

export function RepositoryStatCard({
  title,
  value,
  description,
}: RepositoryStatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <h2 className="text-3xl font-bold tracking-tight">
            {value}
          </h2>

          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}