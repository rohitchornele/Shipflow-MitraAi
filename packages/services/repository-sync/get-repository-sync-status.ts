import { db } from '@repo/database';
import { githubRepositorySync } from '@repo/database/models/github-repository-sync';

import { inArray } from 'drizzle-orm';

export async function getRepositorySyncStatuses(
  repositories: {
    repositoryOwner: string;
    repositoryName: string;
  }[]
) {
  if (repositories.length === 0) {
    return {};
  }

  const syncs = await db
    .select({
      repositoryOwner: githubRepositorySync.repositoryOwner,
      repositoryName: githubRepositorySync.repositoryName,
      status: githubRepositorySync.status,
    })
    .from(githubRepositorySync);

  const requestedRepositories = new Set(
    repositories.map(
      ({ repositoryOwner, repositoryName }) =>
        `${repositoryOwner}/${repositoryName}`
    )
  );

  const statuses: Record<string, typeof githubRepositorySync.$inferSelect.status> = {};

  for (const sync of syncs) {
    const fullName = `${sync.repositoryOwner}/${sync.repositoryName}`;

    if (requestedRepositories.has(fullName)) {
      statuses[fullName] = sync.status;
    }
  }

  return statuses;
}
