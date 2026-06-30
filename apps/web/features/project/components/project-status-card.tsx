'use client';

import { CheckCircle2, CircleAlert, Github, GitBranch } from 'lucide-react';

import { Card, CardContent } from '~/components/ui/card';

type ProjectStatusCardProps = {
  githubConnected: boolean;
  repositories: number;
  initialSyncCompleted: boolean;
};

export function ProjectStatusCard({
  githubConnected,
  repositories,
  initialSyncCompleted,
}: ProjectStatusCardProps) {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-semibold">Project Status</h2>

          <p className="text-sm text-muted-foreground">
            Current setup status of your project.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5" />

              <span>GitHub Connected</span>
            </div>

            {githubConnected ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <CircleAlert className="h-5 w-5 text-yellow-500" />
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GitBranch className="h-5 w-5" />

              <span>Repositories</span>
            </div>

            <span className="font-medium">{repositories}</span>
          </div>

          <div className="flex items-center justify-between">
            <span>Initial Sync</span>

            {initialSyncCompleted ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <CircleAlert className="h-5 w-5 text-yellow-500" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
