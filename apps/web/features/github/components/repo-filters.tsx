'use client';

import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

export type RepositoryFilter =
  | 'all'
  | 'public'
  | 'private';

type RepoFiltersProps = {
  value: RepositoryFilter;

  counts: {
    all: number;
    public: number;
    private: number;
  };

  onChange: (value: RepositoryFilter) => void;
};

export function RepoFilters({
  value,
  counts,
  onChange,
}: RepoFiltersProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(value) =>
        onChange(value as RepositoryFilter)
      }
    >
      <TabsList>
        <TabsTrigger value="all">
          All ({counts.all})
        </TabsTrigger>

        <TabsTrigger value="public">
          Public ({counts.public})
        </TabsTrigger>

        <TabsTrigger value="private">
          Private ({counts.private})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}