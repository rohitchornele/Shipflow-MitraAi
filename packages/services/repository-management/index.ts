import { db } from '@repo/database';

import { and, eq } from 'drizzle-orm';

import type { AttachRepositoryInput, UpdateRepositoryInput } from './model';
import { repository } from '@repo/database/schema';

class RepositoryManagementService {
  /* -------------------------------------------------------------------------- */
  /*                               Attach Repository                            */
  /* -------------------------------------------------------------------------- */

  async attach(input: AttachRepositoryInput) {
    const [attachedRepository] = await db
      .insert(repository)
      .values(input)
      .onConflictDoNothing()
      .returning();

    if (!attachedRepository) {
      throw new Error('Failed to attach repository.');
    }

    return attachedRepository;
  }

  /* -------------------------------------------------------------------------- */
  /*                             Attach Multiple                                */
  /* -------------------------------------------------------------------------- */

  async attachMany(repositories: AttachRepositoryInput[]) {
    if (repositories.length === 0) {
      return [];
    }

    return db
      .insert(repository)
      .values(repositories)
      .onConflictDoNothing()
      .returning();
  }

  /* -------------------------------------------------------------------------- */
  /*                              Detach Repository                             */
  /* -------------------------------------------------------------------------- */

  async detach(repositoryId: string) {
    await db.delete(repository).where(eq(repository.id, repositoryId));

    return {
      success: true,
    };
  }

  /* -------------------------------------------------------------------------- */
  /*                           List Project Repositories                        */
  /* -------------------------------------------------------------------------- */

  async list(projectId: string) {
    return db.query.repository.findMany({
      where: eq(repository.projectId, projectId),

      orderBy: (repository, { asc }) => [asc(repository.name)],
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                               Get Repository                               */
  /* -------------------------------------------------------------------------- */

  async get(repositoryId: string) {
    const repo = await db.query.repository.findFirst({
      where: eq(repository.id, repositoryId),
    });

    if (!repo) {
      throw new Error('Repository not found.');
    }

    return repo;
  }

  /* -------------------------------------------------------------------------- */
  /*                      Find by GitHub Repository Id                          */
  /* -------------------------------------------------------------------------- */

  async getByGithubRepositoryId(githubRepositoryId: string) {
    return db.query.repository.findFirst({
      where: eq(repository.githubRepositoryId, githubRepositoryId),
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                           Find by Full Name                                */
  /* -------------------------------------------------------------------------- */

  async getByFullName(fullName: string) {
    return db.query.repository.findFirst({
      where: eq(repository.fullName, fullName),
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                        Find Repository in Project                           */
  /* -------------------------------------------------------------------------- */

  async getProjectRepository(projectId: string, githubRepositoryId: string) {
    return db.query.repository.findFirst({
      where: and(
        eq(repository.projectId, projectId),
        eq(repository.githubRepositoryId, githubRepositoryId)
      ),
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                             Update Repository                              */
  /* -------------------------------------------------------------------------- */

  async update(input: UpdateRepositoryInput) {
    const [updatedRepository] = await db
      .update(repository)
      .set({
        defaultBranch: input.defaultBranch,

        isConnected: input.isConnected,

        updatedAt: new Date(),
      })
      .where(eq(repository.id, input.repositoryId))
      .returning();

    if (!updatedRepository) {
      throw new Error('Repository not found.');
    }

    return updatedRepository;
  }
}

export default RepositoryManagementService;


const repositoryManagementService = new RepositoryManagementService();

export { repositoryManagementService };