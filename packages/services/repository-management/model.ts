import { z } from 'zod';

/* -------------------------------------------------------------------------- */
/*                             Repository Schema                              */
/* -------------------------------------------------------------------------- */

export const repositorySchema = z.object({
  id: z.uuid(),

  projectId: z.uuid(),

  githubRepositoryId: z.string(),

  githubInstallationId: z.string(),

  owner: z.string(),

  name: z.string(),

  fullName: z.string(),

  defaultBranch: z.string(),

  isPrivate: z.boolean(),

  isArchived: z.boolean(),

  isConnected: z.boolean(),

  lastSyncedAt: z.date().nullable(),

  lastIndexedAt: z.date().nullable(),

  createdAt: z.date(),

  updatedAt: z.date(),
});

/* -------------------------------------------------------------------------- */
/*                            Attach Repository                               */
/* -------------------------------------------------------------------------- */

export const attachRepositoryInput = z.object({
  projectId: z.uuid(),

  githubRepositoryId: z.string(),

  githubInstallationId: z.string(),

  owner: z.string(),

  name: z.string(),

  fullName: z.string(),

  defaultBranch: z.string(),

  isPrivate: z.boolean(),

  isArchived: z.boolean(),
});

export const attachRepositoryOutput = repositorySchema;

/* -------------------------------------------------------------------------- */
/*                           Detach Repository                                */
/* -------------------------------------------------------------------------- */

export const detachRepositoryInput = z.object({
  repositoryId: z.uuid(),
});

export const detachRepositoryOutput = z.object({
  success: z.boolean(),
});

/* -------------------------------------------------------------------------- */
/*                           List Repositories                                */
/* -------------------------------------------------------------------------- */

export const listRepositoriesInput = z.object({
  projectId: z.uuid(),
});

export const listRepositoriesOutput = z.array(repositorySchema);

/* -------------------------------------------------------------------------- */
/*                             Get Repository                                 */
/* -------------------------------------------------------------------------- */

export const getRepositoryInput = z.object({
  repositoryId: z.uuid(),
});

export const getRepositoryOutput = repositorySchema;

/* -------------------------------------------------------------------------- */
/*                           Update Repository                                */
/* -------------------------------------------------------------------------- */

export const updateRepositoryInput = z.object({
  repositoryId: z.uuid(),

  defaultBranch: z.string().optional(),

  isConnected: z.boolean().optional(),
});

export const updateRepositoryOutput = repositorySchema;

/* -------------------------------------------------------------------------- */
/*                                 Types                                      */
/* -------------------------------------------------------------------------- */

export type Repository = z.infer<typeof repositorySchema>;

export type AttachRepositoryInput = z.infer<
  typeof attachRepositoryInput
>;

export type DetachRepositoryInput = z.infer<
  typeof detachRepositoryInput
>;

export type ListRepositoriesInput = z.infer<
  typeof listRepositoriesInput
>;

export type GetRepositoryInput = z.infer<
  typeof getRepositoryInput
>;

export type UpdateRepositoryInput = z.infer<
  typeof updateRepositoryInput
>;