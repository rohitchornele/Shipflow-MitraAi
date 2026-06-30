// import { db } from "@repo/database";
// import { githubRepositorySync } from "@repo/database/models/github-repository-sync";

// type SaveRepositorySyncInput = {
//   installationId: number;
//   repositoryId: number;
//   repositoryOwner: string;
//   repositoryName: string;
//   defaultBranch: string;
// };

// export async function saveRepositorySync({
//   installationId,
//   repositoryId,
//   repositoryOwner,
//   repositoryName,
//   defaultBranch,
// }: SaveRepositorySyncInput) {
//   const [repositorySync] = await db
//     .insert(githubRepositorySync)
//     .values({
//       installationId,
//       repositoryId,
//       repositoryOwner,
//       repositoryName,
//       defaultBranch,
//       status: "pending",
//     })
//     .onConflictDoUpdate({
//       target: [githubRepositorySync.repositoryId],
//       set: {
//         installationId,
//         repositoryOwner,
//         repositoryName,
//         defaultBranch,
//         status: "pending",
//         updatedAt: new Date(),
//       },
//     })
//     .returning();

//   return repositorySync;
// }


import { db } from '@repo/database';
import { githubRepositorySync } from '@repo/database/models/github-repository-sync';

type SaveRepositorySyncInput = {
  installationId: number;
  repositoryId: number;
  repositoryOwner: string;
  repositoryName: string;
  defaultBranch: string;
};

export async function saveRepositorySync({
  installationId,
  repositoryId,
  repositoryOwner,
  repositoryName,
  defaultBranch,
}: SaveRepositorySyncInput) {
  const [repositorySync] = await db
    .insert(githubRepositorySync)
    .values({
      installationId,
      repositoryId,
      repositoryOwner,
      repositoryName,
      defaultBranch,
      status: 'pending',
    })
    .onConflictDoUpdate({
      target: [githubRepositorySync.repositoryId],
      set: {
        installationId,
        repositoryOwner,
        repositoryName,
        defaultBranch,
        status: 'pending',
        updatedAt: new Date(),
      },
    })
    .returning();

  if (!repositorySync) {
    throw new Error('Failed to save repository sync.');
  }

  return repositorySync;
}