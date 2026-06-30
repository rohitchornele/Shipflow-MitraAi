// 'use client';

// import {
//   Bot,
//   CheckSquare,
//   FileText,
//   FolderGit2,
//   Rocket,
//   Sparkles,
// } from 'lucide-react';

// import { Card, CardContent } from '~/components/ui/card';

// import { useProject } from '~/features/project/hooks/use-project';

// const stats = [
//   {
//     title: 'Repositories',
//     value: '0',
//     icon: FolderGit2,
//     description: 'Connected repositories',
//   },
//   {
//     title: 'Features',
//     value: '0',
//     icon: Sparkles,
//     description: 'Product features',
//   },
//   {
//     title: 'PRDs',
//     value: '0',
//     icon: FileText,
//     description: 'Product requirement docs',
//   },
//   {
//     title: 'Tasks',
//     value: '0',
//     icon: CheckSquare,
//     description: 'Engineering tasks',
//   },
//   {
//     title: 'Reviews',
//     value: '0',
//     icon: Bot,
//     description: 'AI code reviews',
//   },
//   {
//     title: 'Releases',
//     value: '0',
//     icon: Rocket,
//     description: 'Deployments',
//   },
// ];

// export default function ProjectPage() {
//   const { project } = useProject();

//   return (
//     <div className="mx-auto max-w-7xl space-y-8 p-8">
//       {/* Header */}

//       <div>
//         <h1 className="text-3xl font-bold">
//           {project?.name}
//         </h1>

//         <p className="mt-2 text-muted-foreground">
//           {project?.description ??
//             'No description provided.'}
//         </p>
//       </div>

//       {/* Stats */}

//       <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
//         {stats.map((stat) => {
//           const Icon = stat.icon;

//           return (
//             <Card
//               key={stat.title}
//               className="border-border/60"
//             >
//               <CardContent className="flex items-center justify-between p-6">
//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     {stat.title}
//                   </p>

//                   <h2 className="mt-2 text-3xl font-bold">
//                     {stat.value}
//                   </h2>

//                   <p className="mt-2 text-xs text-muted-foreground">
//                     {stat.description}
//                   </p>
//                 </div>

//                 <div className="rounded-xl bg-primary/10 p-3">
//                   <Icon className="h-6 w-6 text-primary" />
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Activity */}

//       <Card className="border-border/60">
//         <CardContent className="flex min-h-[320px] items-center justify-center">
//           <div className="text-center">
//             <h2 className="text-xl font-semibold">
//               Recent Activity
//             </h2>

//             <p className="mt-2 text-muted-foreground">
//               Activity timeline, pull requests, repository sync,
//               AI reviews, and releases will appear here.
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



'use client';

import { useProject } from '~/features/project/hooks/use-project';

import { ProjectStatusCard } from '~/features/project/components/project-status-card';
import { ProjectQuickActions } from '~/features/project/components/project-quick-actions';
import { ProjectRecentActivity } from '~/features/project/components/project-recent-activity';

export default function ProjectPage() {
  const { project } = useProject();

  if (!project) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          {project.name}
        </h1>

        <p className="mt-2 max-w-3xl text-muted-foreground">
          {project.description ??
            'No description has been added for this project yet.'}
        </p>
      </div>

      {/* Status + Actions */}

      <div className="grid gap-6 lg:grid-cols-2">
        <ProjectStatusCard
          githubConnected
          repositories={1} // TODO: Replace with actual repository count
          initialSyncCompleted
        />

        <ProjectQuickActions
          projectId={project.id}
        />
      </div>

      {/* Recent Activity */}

      <ProjectRecentActivity />
    </div>
  );
}