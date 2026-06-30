'use client';

import {
  CheckCircle2,
  Circle,
} from 'lucide-react';

import { Card, CardContent } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';

import { useFeatureContext } from '~/features/feature-context/hooks/use-feature-context';

type FeatureRequirementProgressProps = {
  featureId: string;
};

const requirementItems = [
  {
    key: 'businessGoal',
    label: 'Business Goal',
  },
  {
    key: 'targetUsers',
    label: 'Target Users',
  },
  {
    key: 'acceptanceCriteria',
    label: 'Acceptance Criteria',
  },
  {
    key: 'constraints',
    label: 'Constraints',
  },
  {
    key: 'edgeCases',
    label: 'Edge Cases',
  },
  {
    key: 'dependencies',
    label: 'Dependencies',
  },
] as const;

export function FeatureRequirementProgress({
  featureId,
}: FeatureRequirementProgressProps) {
  const {
    context,
    isLoading,
  } = useFeatureContext({
    featureId,
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          Loading...
        </CardContent>
      </Card>
    );
  }

  const requirements =
    (context?.requirements ??
      {}) as Record<string, unknown>;

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-semibold">
            Requirement Progress
          </h2>

          <p className="text-sm text-muted-foreground">
            {context?.completion ?? 0}% Complete
          </p>
        </div>

        <Progress
          value={context?.completion ?? 0}
        />

        <div className="space-y-4">
          {requirementItems.map((item) => {
            const completed = Boolean(
              requirements[item.key]
            );

            return (
              <div
                key={item.key}
                className="flex items-center gap-3"
              >
                {completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}

                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {context?.summary && (
          <div className="rounded-lg border p-4">
            <p className="mb-2 text-sm font-medium">
              AI Summary
            </p>

            <p className="text-sm text-muted-foreground">
              {context.summary}
            </p>
          </div>
        )}

        {(context?.missingItems?.length ?? 0) >
          0 && (
          <div>
            <p className="mb-2 text-sm font-medium">
              Missing Information
            </p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {context!.missingItems!.map(
                (item: string) => (
                  <li key={item}>
                    • {item}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}