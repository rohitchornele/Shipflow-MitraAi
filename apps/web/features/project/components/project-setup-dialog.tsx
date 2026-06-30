'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';

import { ProjectDetailsForm } from './project-details-form';
import { GithubConnectionCard } from '~/features/github/components/github-connection-card';
import { RepositorySelector } from '~/features/github/components/repository-selector';
import { useProjectSetup } from '../hooks/use-project-setup';



type SelectedRepository = {
  githubRepositoryId: string;

  owner: string;

  name: string;

  fullName: string;

  defaultBranch: string;

  isPrivate: boolean;

  isArchived: boolean;
};

type ProjectSetupDialogProps = {
  children: React.ReactNode;
};

export function ProjectSetupDialog({
  children,
}: ProjectSetupDialogProps) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  const [repositories, setRepositories] = useState<
    SelectedRepository[]
  >([]);

  const { initializeProject, isPending } =
    useProjectSetup();

  async function handleSubmit() {
    if (!name.trim()) {
      return;
    }

    if (repositories.length === 0) {
      return;
    }

    await initializeProject({
      name,
      description,
      repositories,
    });

    setOpen(false);

    setName('');

    setDescription('');

    setRepositories([]);
  }

  const canCreate =
    name.trim().length > 0 &&
    repositories.length > 0 &&
    !isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {children}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>

          <DialogDescription>
            Connect one or more repositories and start
            managing your engineering workflow with
            ShipFlow.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 overflow-y-auto pr-2">
          <ProjectDetailsForm
            name={name}
            description={description}
            onNameChange={setName}
            onDescriptionChange={setDescription}
          />

          <Separator />

          <GithubConnectionCard />

          <Separator />

          <RepositorySelector
            value={repositories}
            onChange={setRepositories}
          />
        </div>

        <DialogFooter className="mt-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            disabled={!canCreate}
            onClick={handleSubmit}
          >
            {isPending
              ? 'Creating Project...'
              : 'Create Project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}