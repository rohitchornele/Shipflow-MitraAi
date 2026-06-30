'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

export type RepositorySort =
  | 'default'
  | 'name-asc'
  | 'name-desc'
  | 'stars-desc'
  | 'stars-asc';

type RepoSortProps = {
  value: RepositorySort;
  onChange: (value: RepositorySort) => void;
};

export function RepoSort({
  value,
  onChange,
}: RepoSortProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) =>
        onChange(value as RepositorySort)
      }
    >
      <SelectTrigger className="w-full lg:w-56">
        <SelectValue placeholder="Sort repositories" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="default">
          Recently Updated
        </SelectItem>

        <SelectItem value="name-asc">
          Name (A → Z)
        </SelectItem>

        <SelectItem value="name-desc">
          Name (Z → A)
        </SelectItem>

        <SelectItem value="stars-desc">
          Stars (High → Low)
        </SelectItem>

        <SelectItem value="stars-asc">
          Stars (Low → High)
        </SelectItem>
      </SelectContent>
    </Select>
  );
}