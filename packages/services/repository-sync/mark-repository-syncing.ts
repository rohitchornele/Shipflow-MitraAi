import { db } from "@repo/database";
import { githubRepositorySync } from "@repo/database/models/github-repository-sync";

import { eq } from "drizzle-orm";

export async function markRepositorySyncing(
  repositorySyncId: string
) {
  const [repository] = await db
    .update(githubRepositorySync)
    .set({
      status: "syncing",
    })
    .where(eq(githubRepositorySync.id, repositorySyncId))
    .returning();

  return repository;
}