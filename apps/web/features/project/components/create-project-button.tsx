'use client';

import { Button } from '~/components/ui/button';
import { FolderPlus } from 'lucide-react';

import { ProjectSetupDialog } from './project-setup-dialog';

export function CreateProjectButton() {
  return (
    <ProjectSetupDialog>
      <Button>
        <FolderPlus className="mr-2 h-4 w-4" />
        Create Project
      </Button>
    </ProjectSetupDialog>
  );
}