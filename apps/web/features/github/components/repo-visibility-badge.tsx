'use client';

import { Badge } from '~/components/ui/badge';

type Props = {
  visibility: 'public' | 'private';
};

export function RepoVisibilityBadge({
  visibility,
}: Props) {
  return (
    <Badge
      variant={
        visibility === 'public'
          ? 'secondary'
          : 'outline'
      }
    >
      {visibility === 'public'
        ? 'Public'
        : 'Private'}
    </Badge>
  );
}