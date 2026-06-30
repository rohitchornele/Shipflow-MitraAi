'use client';

import Link from 'next/link';

import {
  ArrowRight,
  CalendarDays,
  GitBranch,
} from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { Card } from '~/components/ui/card';

type FeatureCardProps = {
  feature: any;
};

export function FeatureCard({
  feature,
}: FeatureCardProps) {
  return (
    <Link
      href={`/dashboard/projects/${feature.projectId}/features/${feature.id}`}
    >
      <Card className="group p-5 transition-all hover:border-primary hover:shadow-sm">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold group-hover:text-primary">
                {feature.title}
              </h3>

              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {feature.description ??
                  'No description'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {feature.status.replaceAll('_', ' ')}
              </Badge>

              <Badge variant="outline">
                {feature.priority}
              </Badge>
            </div>

            <div className="flex items-center gap-5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <GitBranch className="h-3.5 w-3.5" />

                {feature.repository?.name ??
                  'No Repository'}
              </div>

              <div className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />

                {new Date(
                  feature.updatedAt
                ).toLocaleDateString()}
              </div>
            </div>
          </div>

          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Card>
    </Link>
  );
}