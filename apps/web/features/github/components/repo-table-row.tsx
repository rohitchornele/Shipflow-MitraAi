'use client';

import { formatDistanceToNow } from 'date-fns';

import {
  TableCell,
  TableRow,
} from '~/components/ui/table';

import { RepoStatusBadge } from './repo-status-badge';
import { RepoVisibilityBadge } from './repo-visibility-badge';
import { SyncRepoButton } from './sync-repo-button';
// import { SyncRepoButton } from './sync-repo-button';

type Repository = {
  id: string;
  name: string;
  fullName: string;
  visibility: 'public' | 'private';
  defaultBranch: string;
  language: string | null;
  stars: number;
  updatedAt: string;
  syncStatus:
    | 'pending'
    | 'syncing'
    | 'synced'
    | 'failed'
    | null;
  repositoryOwner: string;
  repositoryName: string;
};

type Props = {
  repo: Repository;
};

export function RepoTableRow({
  repo,
}: Props) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">
            {repo.name}
          </span>

          <span className="text-xs text-muted-foreground">
            {repo.fullName}
          </span>
        </div>
      </TableCell>

      <TableCell>
        {repo.language ?? '—'}
      </TableCell>

      <TableCell>
        <RepoVisibilityBadge
          visibility={repo.visibility}
        />
      </TableCell>

      <TableCell>
        {repo.defaultBranch}
      </TableCell>

      <TableCell className="text-right">
        {repo.stars}
      </TableCell>

      <TableCell className="text-right">
        {formatDistanceToNow(
          new Date(repo.updatedAt),
          {
            addSuffix: true,
          }
        )}
      </TableCell>

      <TableCell className="text-center">
        <RepoStatusBadge
          status={repo.syncStatus}
        />
      </TableCell>

      <TableCell className="text-right">
        <SyncRepoButton
          repositoryId={repo.id}
          repositoryOwner={repo.repositoryOwner}
          repositoryName={repo.repositoryName}
          defaultBranch={repo.defaultBranch}
          syncStatus={repo.syncStatus}
        />
      </TableCell>
    </TableRow>
  );
}