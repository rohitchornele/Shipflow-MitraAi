'use client';

import Link from 'next/link';

import { ArrowRight, Calendar, FolderGit2 } from 'lucide-react';

import { Card, CardContent } from '~/components/ui/card';

import { Badge } from '~/components/ui/badge';

type Project = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <Card
        className="
          h-full
          cursor-pointer
          border-border/60
          transition-all
          hover:-translate-y-1
          hover:border-primary/40
          hover:shadow-lg
        "
      >
        <CardContent className="flex h-full flex-col p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                "
              >
                <FolderGit2 className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold">{project.name}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {project.description ?? 'No description'}
                </p>
              </div>
            </div>

            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Badge variant="secondary">Active</Badge>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />

              {new Date(project.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
