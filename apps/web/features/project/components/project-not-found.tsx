'use client';

import Link from 'next/link';

import { FolderX } from 'lucide-react';

import { Button } from '~/components/ui/button';

export function ProjectNotFound() {
  return (
    <div className="flex h-full min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <FolderX className="h-8 w-8 text-muted-foreground" />
        </div>

        <h1 className="text-2xl font-semibold">
          Project not found
        </h1>

        <p className="mt-2 text-muted-foreground">
          This project doesn't exist or you don't have access to it.
        </p>

        <Button className="mt-6">
          <Link href="/dashboard/projects">
            Back to Projects
          </Link>
        </Button>
      </div>
    </div>
  );
}