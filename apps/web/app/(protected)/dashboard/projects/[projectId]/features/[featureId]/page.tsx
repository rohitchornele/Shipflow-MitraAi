// 'use client';

// import { useParams } from 'next/navigation';

// import { Skeleton } from '~/components/ui/skeleton';

// import { FeatureConversationPlaceholder } from '~/features/feature/components/feature-conversation-placeholder';
// import { FeatureHeader } from '~/features/feature/components/feature-header';
// import { FeatureOverview } from '~/features/feature/components/feature-overview';
// import { FeatureRequirementProgress } from '~/features/feature/components/feature-requirement-progress';
// import { FeatureStatusCard } from '~/features/feature/components/feature-status-card';

// import { useFeature } from '~/features/feature/hooks/use-feature';

// const FeaturePage = () => {
//   const params = useParams();

//   const featureId = params.featureId as string;

//   const { feature, isLoading } = useFeature(featureId);

//   if (isLoading) {
//     return (
//       <div className="mx-auto max-w-7xl space-y-6 p-8">
//         <Skeleton className="h-12 w-96" />

//         <div className="grid gap-6 lg:grid-cols-2">
//           <Skeleton className="h-64" />

//           <Skeleton className="h-64" />
//         </div>

//         <Skeleton className="h-80" />

//         <Skeleton className="h-64" />
//       </div>
//     );
//   }

//   if (!feature) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold">Feature not found</h2>

//           <p className="mt-2 text-muted-foreground">
//             The requested feature doesn't exist or you don't have permission to
//             access it.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-7xl space-y-6 p-8">
//       {/* Header */}

//       <FeatureHeader feature={feature} />

//       {/* Overview */}

//       <div className="grid gap-6 lg:grid-cols-2">
//         <FeatureOverview feature={feature} />

//         <FeatureStatusCard />
//       </div>

//       {/* AI Requirement Gathering */}

//       <FeatureConversationPlaceholder />

//       {/* Requirement Checklist */}

//       <FeatureRequirementProgress />
//     </div>
//   );
// }

// export default FeaturePage;

'use client';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription } from '~/components/ui/alert';
import { Skeleton } from '~/components/ui/skeleton';

import { useFeature } from '~/features/feature/hooks/use-feature';

import { AIChat } from '~/features/ai/components/ai-chat';

import { FeatureHeader } from '~/features/feature/components/feature-header';
import { FeatureOverview } from '~/features/feature/components/feature-overview';
import { FeatureStatusCard } from '~/features/feature/components/feature-status-card';
import { FeatureRequirementProgress } from '~/features/feature/components/feature-requirement-progress';

type FeaturePageProps = {
  params: Promise<{
    projectId: string;
    featureId: string;
  }>;
};

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { featureId } = await params;

  return <FeaturePageContent featureId={featureId} />;
}

function FeaturePageContent({ featureId }: { featureId: string }) {
  const { feature, isLoading, error } = useFeature(featureId);

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-10 w-72" />

        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-[700px] lg:col-span-2" />
          <Skeleton className="h-[700px]" />
        </div>
      </div>
    );
  }

  if (error || !feature) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />

          <AlertDescription>Unable to load feature.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <FeatureHeader feature={feature} />

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 xl:col-span-2">
          <FeatureOverview feature={feature} />

          <AIChat featureId={feature.id} />
        </div>

        {/* Right */}
        <div className="space-y-6">
          <FeatureStatusCard feature={feature} />

          <FeatureRequirementProgress featureId={feature.id} />
        </div>
      </div>
    </div>
  );
}
