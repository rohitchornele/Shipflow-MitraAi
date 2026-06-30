'use client';

import {
  CheckCircle2,
  CircleDashed,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

import { Progress } from '~/components/ui/progress';

import { useFeatureContext } from '../../feature-context/hooks/use-feature-context';

type FeatureRequirementProgressProps = {
  featureId: string;
};

export function FeatureRequirementProgress({
  featureId,
}: FeatureRequirementProgressProps) {
  const {
    completion,
    missingItems,
  } = useFeatureContext({
    featureId,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Requirement Progress
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Completion</span>

            <span>
              {completion}%
            </span>
          </div>

          <Progress value={completion} />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">
            Missing Information
          </h4>

          {missingItems.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />

              <span>
                All required information
                collected.
              </span>
            </div>
          ) : (
            missingItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CircleDashed className="h-4 w-4" />

                <span>{item}</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}