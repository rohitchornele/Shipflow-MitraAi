'use client';

import { Badge } from '~/components/ui/badge';

type SyncStatus =
  | 'pending'
  | 'syncing'
  | 'synced'
  | 'failed'
  | null;

type Props = {
  status: SyncStatus;
};

export function RepoStatusBadge({
  status,
}: Props) {
  switch (status) {
    case 'synced':
      return (
        <Badge className="bg-green-600 hover:bg-green-600">
          Synced
        </Badge>
      );

    case 'syncing':
      return (
        <Badge variant="secondary">
          Syncing
        </Badge>
      );

    case 'pending':
      return (
        <Badge variant="outline">
          Pending
        </Badge>
      );

    case 'failed':
      return (
        <Badge variant="destructive">
          Failed
        </Badge>
      );

    default:
      return (
        <Badge variant="outline">
          Not Synced
        </Badge>
      );
  }
}