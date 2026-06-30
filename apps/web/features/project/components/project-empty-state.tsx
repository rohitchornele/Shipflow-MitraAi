'use client';

import { FolderPlus, Github } from 'lucide-react';
import { CreateProjectButton } from './create-project-button';
import { Card } from '~/components/ui/card';

// type ProjectEmptyStateProps = {
//   action?: React.ReactNode;
// };

export function ProjectEmptyState() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <Card className="w-full max-w-2xl border-border/60 bg-card/40 p-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border bg-primary/10">
            <FolderPlus className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-3xl font-bold">Welcome to ShipFlow</h1>

          <p className="mt-3 max-w-xl text-muted-foreground">
            Create your first project and connect a GitHub repository to start
            generating PRDs, managing tasks, reviewing pull requests, and
            tracking engineering delivery with AI.
          </p>

          <div className="mt-8 flex justify-center">
            <CreateProjectButton />
          </div>

          {/* <div className="mt-8 flex justify-center">{action}</div> */}

          <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
            <Card className="border-border/60 p-4">
              <h3 className="font-medium">Connect Repository</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Link any GitHub repository to ShipFlow.
              </p>
            </Card>

            <Card className="border-border/60 p-4">
              <h3 className="font-medium">AI Product Planning</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Turn ideas into structured PRDs and engineering tasks.
              </p>
            </Card>

            <Card className="border-border/60 p-4">
              <h3 className="font-medium">PR Reviews</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Automatically review pull requests with AI.
              </p>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
