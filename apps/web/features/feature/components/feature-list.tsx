'use client';

import { FeatureCard } from './feature-card';

type FeatureListProps = {
  features: any[];
};

export function FeatureList({
  features,
}: FeatureListProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
        />
      ))}
    </div>
  );
}