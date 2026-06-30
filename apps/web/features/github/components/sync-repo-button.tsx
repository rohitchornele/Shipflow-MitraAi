'use client';

import { Button } from '~/components/ui/button';

import { useSyncRepository } from '../hooks/use-sync-repository';

type SyncStatus =
  | 'pending'
  | 'syncing'
  | 'synced'
  | 'failed'
  | null;

type Props = {
  repositoryId: string;
  repositoryOwner: string;
  repositoryName: string;
  defaultBranch: string;
  syncStatus: SyncStatus;
};

function isSyncing(
  status: SyncStatus,
  pending: boolean
) {
  if (pending) {
    return true;
  }

  return status === 'pending' || status === 'syncing';
}

function getButtonLabel(
  status: SyncStatus,
  pending: boolean
) {
  if (isSyncing(status, pending)) {
    return 'Syncing...';
  }

  if (status === 'synced') {
    return 'Re-sync';
  }

  return 'Sync';
}

export function SyncRepoButton({
  repositoryId,
  repositoryOwner,
  repositoryName,
  defaultBranch,
  syncStatus,
}: Props) {
  const {
    syncRepository,
    isPending,
  } = useSyncRepository();

  return (
    <Button
    className="border border-white hover:text-green-500 hover:border-green-500"
      size="sm"
      variant={
        syncStatus === 'synced'
          ? 'secondary'
          : 'outline'
      }
      disabled={isSyncing(syncStatus, isPending)}
      onClick={() =>
        syncRepository({
          repositoryId: Number(repositoryId),
          repositoryOwner,
          repositoryName,
          defaultBranch,
        })
      }
    >
      {getButtonLabel(syncStatus, isPending)}
    </Button>
  );
}