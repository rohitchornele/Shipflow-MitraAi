'use client';

import {
  CheckCircle2,
  Circle,
  Loader2,
} from 'lucide-react';

import { Card, CardContent } from '~/components/ui/card';


type FeatureStatusCardProps = {
  feature: {
    status:
      | 'draft'
      | 'requirement_gathering'
      | 'requirements_approved'
      | 'prd_generated'
      | 'prd_approved'
      | 'tasks_generated'
      | 'in_development'
      | 'pr_review'
      | 'ready_for_release'
      | 'released'
      | 'archived';
  };
};

const steps = [
  {
    label: 'Requirement Gathering',
    value: 'requirement_gathering',
  },
  {
    label: 'Requirements Approved',
    value: 'requirements_approved',
  },
  {
    label: 'PRD Generated',
    value: 'prd_generated',
  },
  {
    label: 'PRD Approved',
    value: 'prd_approved',
  },
  {
    label: 'Tasks Generated',
    value: 'tasks_generated',
  },
  {
    label: 'Development',
    value: 'in_development',
  },
  {
    label: 'PR Review',
    value: 'pr_review',
  },
  {
    label: 'Ready for Release',
    value: 'ready_for_release',
  },
  {
    label: 'Released',
    value: 'released',
  },
] as const;

export function FeatureStatusCard({
  feature,
}: FeatureStatusCardProps) {
  const currentIndex = steps.findIndex(
    (step) => step.value === feature.status
  );

  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <h2 className="text-lg font-semibold">
          Delivery Progress
        </h2>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const completed =
              index < currentIndex;

            const current =
              index === currentIndex;

            return (
              <div
                key={step.value}
                className="flex items-center gap-3"
              >
                {completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : current ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}

                <span
                  className={
                    current
                      ? 'font-medium'
                      : ''
                  }
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}