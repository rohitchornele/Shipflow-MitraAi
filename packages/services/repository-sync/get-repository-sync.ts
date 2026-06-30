import { db } from '@repo/database';
import { githubRepositorySync } from '@repo/database/models/github-repository-sync';

import { and, eq } from 'drizzle-orm';

export async function getRepositorySync(
  repositoryOwner: string,
  repositoryName: string
) {
  return db.query.githubRepositorySync.findFirst({
    where: and(
      eq(
        githubRepositorySync.repositoryOwner,
        repositoryOwner
      ),
      eq(
        githubRepositorySync.repositoryName,
        repositoryName
      )
    ),
  });
}