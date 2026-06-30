'use client';

import Link from 'next/link';

import { FolderPlus, Github, Sparkles } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';

type ProjectQuickActionsProps = {
  projectId: string;
};

export function ProjectQuickActions({ projectId }: ProjectQuickActionsProps) {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-semibold">Quick Actions</h2>

          <p className="text-sm text-muted-foreground">
            Start working on your project.
          </p>
        </div>

        <div className="grid gap-3">
          <Button className="justify-start">
            <Link
              href={`/dashboard/projects/${projectId}/features/new`}
              className="flex justify-start items-center"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Create Feature
            </Link>
          </Button>

          <Button variant="outline" className="justify-start">
            <Link
              href={`/dashboard/projects/${projectId}/repositories`}
              className="flex justify-start items-center"
            >
              <FolderPlus className="mr-2 h-4 w-4" />
              Attach Repository
            </Link>
          </Button>

          <Button variant="outline" className="justify-start">
            <Link
              href="/dashboard/github"
              className="flex justify-start items-center"
            >
              <Github className="mr-2 h-4 w-4" />
              View GitHub
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
