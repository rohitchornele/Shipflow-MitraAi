'use client';

import { Card, CardContent } from '~/components/ui/card';

type Props = {
  feature: any;
};

export function FeatureOverview({
  feature,
}: Props) {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <h2 className="text-lg font-semibold">
          Overview
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Repository
            </p>

            <p className="font-medium">
              {feature.repository?.name ??
                'Not selected'}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Created By
            </p>

            <p className="font-medium">
              {feature.createdBy}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Created
            </p>

            <p className="font-medium">
              {new Date(
                feature.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Updated
            </p>

            <p className="font-medium">
              {new Date(
                feature.updatedAt
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}