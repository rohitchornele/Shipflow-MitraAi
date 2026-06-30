'use client';

import Link from 'next/link';

import { ChevronDown, FolderGit2, Plus } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

import { Button } from '~/components/ui/button';

import { useProject } from '../hooks/use-project';
import { useProjects } from '../hooks/use-projects';

import { CreateProjectButton } from './create-project-button';

export function ProjectSwitcher() {
  const { project } = useProject();

  const { projects } = useProjects();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="
            w-full
            justify-between
            rounded-xl
            border
            px-3
            py-6
          "
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FolderGit2 className="h-5 w-5 text-primary" />
            </div>

            <div className="overflow-hidden text-left">
              <div className="truncate font-medium">
                {project?.name ?? 'Select Project'}
              </div>

              <div className="truncate text-xs text-muted-foreground">
                {project?.description ?? 'No project selected'}
              </div>
            </div>
          </div>

          <ChevronDown className="h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-80"
      >
        <DropdownMenuLabel>
          Projects
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {projects.map((item) => (
          <DropdownMenuItem key={item.id}>
            <Link
              href={`/dashboard/projects/${item.id}`}
              className="flex flex-col items-start py-2"
            >
              <span className="font-medium">
                {item.name}
              </span>

              <span className="text-xs text-muted-foreground">
                {item.description ??
                  'No description'}
              </span>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem >
          <CreateProjectButton/>
        </DropdownMenuItem>

        <DropdownMenuItem >
          <Link href="/dashboard/projects">
            Manage Projects
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}