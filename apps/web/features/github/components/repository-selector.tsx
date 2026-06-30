'use client';

import { useMemo, useState } from 'react';

import { Check, Github, Search } from 'lucide-react';

import { Input } from '~/components/ui/input';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Card } from '~/components/ui/card';
import { cn } from '~/lib/utils';

import { useRepositories } from '../hooks/use-repositories';

type SelectedRepository = {
  githubRepositoryId: string;

  owner: string;

  name: string;

  fullName: string;

  defaultBranch: string;

  isPrivate: boolean;

  isArchived: boolean;
};

type RepositorySelectorProps = {
  value: SelectedRepository[];

  onChange: (
    repositories: SelectedRepository[]
  ) => void;
};

export function RepositorySelector({
  value,
  onChange,
}: RepositorySelectorProps) {
  const [search, setSearch] = useState('');

  const { repositories, isLoading } =
    useRepositories();

  const filteredRepositories = useMemo(() => {
    return repositories.filter((repository) =>
      repository.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [repositories, search]);

  function toggleRepository(
    repository: typeof repositories[number]
  ) {
    const exists = value.some(
      (selected) =>
        selected.githubRepositoryId === repository.id
    );

    if (exists) {
      onChange(
        value.filter(
          (selected) =>
            selected.githubRepositoryId !==
            repository.id
        )
      );

      return;
    }

    onChange([
      ...value,
      {
        githubRepositoryId: repository.id,

        owner: repository.repositoryOwner,

        name: repository.repositoryName,

        fullName: repository.fullName,

        defaultBranch:
          repository.defaultBranch,

        isPrivate:
          repository.visibility ===
          'private',

        isArchived: false,
      },
    ]);
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          value={search}
          placeholder="Search repositories..."
          className="pl-10"
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <Card className="overflow-hidden border-border/60">
        <ScrollArea className="h-[340px]">
          {isLoading && (
            <div className="p-6 text-sm text-muted-foreground">
              Loading repositories...
            </div>
          )}

          {!isLoading &&
            filteredRepositories.length === 0 && (
              <div className="p-6 text-sm text-muted-foreground">
                No repositories found.
              </div>
            )}

          {!isLoading &&
            filteredRepositories.map(
              (repository) => {
                const selected =
                  value.some(
                    (repo) =>
                      repo.githubRepositoryId ===
                      repository.id
                  );

                return (
                  <button
                    key={repository.id}
                    type="button"
                    onClick={() =>
                      toggleRepository(
                        repository
                      )
                    }
                    className={cn(
                      'flex w-full items-center justify-between border-b px-5 py-4 text-left transition-colors hover:bg-muted/40',
                      selected &&
                        'bg-primary/5'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-lg border',
                          selected
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border'
                        )}
                      >
                        {selected ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Github className="h-4 w-4" />
                        )}
                      </div>

                      <div>
                        <div className="font-medium">
                          {repository.name}
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {repository.repositoryOwner}
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-xs text-muted-foreground">
                      {repository.visibility}
                    </div>
                  </button>
                );
              }
            )}
        </ScrollArea>
      </Card>

      {value.length > 0 && (
        <div className="text-sm text-muted-foreground">
          {value.length}{' '}
          {value.length === 1
            ? 'repository selected'
            : 'repositories selected'}
        </div>
      )}
    </div>
  );
}