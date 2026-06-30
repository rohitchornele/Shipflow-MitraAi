import { db } from "@repo/database";
import { githubRepositorySync } from "@repo/database/models/github-repository-sync";

import { eq } from "drizzle-orm";

export async function markRepositorySynced(
  repositorySyncId: string,
  chunkCount: number,
  lastCommitSha?: string
) {
  const [repository] = await db
    .update(githubRepositorySync)
    .set({
      status: "synced",
      chunkCount,
      lastCommitSha,
      syncedAt: new Date(),
    })
    .where(eq(githubRepositorySync.id, repositorySyncId))
    .returning();

  return repository;
}