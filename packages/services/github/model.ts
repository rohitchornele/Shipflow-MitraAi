import { z } from 'zod';

export const githubRepositorySyncStatusSchema = z.enum([
  'pending',
  'syncing',
  'synced',
  'failed',
]);

export const getInstallationStatusInput = z.undefined();

export const getInstallationStatusOutput = z.object({
  connected: z.boolean(),

  accountLogin: z.string().nullable(),

  installedAt: z.string().nullable(),
});

export type GetInstallationStatusOutputType = z.infer<
  typeof getInstallationStatusOutput
>;

export const disconnectInstallationInput = z.undefined();

export const disconnectInstallationOutput = z.object({
  success: z.boolean(),
});

export const getUserInstallationIdInput = z.undefined();

export const getUserInstallationIdOutput = z.number().nullable();

export const getInstallUrlInput = z.undefined();

export const getInstallUrlOutput = z.object({
  url: z.string(),
});

export const getRepositoriesInput = z.object({
  page: z.number().int().min(1).default(1),
});

export const githubRepositorySchema = z.object({
  id: z.string(),

  name: z.string(),

  fullName: z.string(),

  repositoryOwner: z.string(),

  repositoryName: z.string(),

  visibility: z.enum(['public', 'private']),

  defaultBranch: z.string(),

  updatedAt: z.string(),

  language: z.string().nullable(),

  stars: z.number(),

  syncStatus: githubRepositorySyncStatusSchema.nullable(),
});

export const getRepositoriesOutput = z.object({
  repositories: z.array(githubRepositorySchema),

  totalCount: z.number(),

  page: z.number(),

  hasMore: z.boolean(),
});

export const syncRepositoryInput = z.object({
  repositoryId: z.number(),

  repositoryOwner: z.string(),

  repositoryName: z.string(),

  defaultBranch: z.string(),
});

export const syncRepositoryOutput = z.object({
  id: z.string(),

  installationId: z.number(),

  repositoryId: z.number(),

  repositoryOwner: z.string(),

  repositoryName: z.string(),

  defaultBranch: z.string(),

  status: githubRepositorySyncStatusSchema,

  chunkCount: z.number(),

  lastCommitSha: z.string().nullable(),

  syncedAt: z.date().nullable(),

  createdAt: z.date(),

  updatedAt: z.date(),
});

export type SyncRepositoryInputType = z.infer<typeof syncRepositoryInput>;

export type SyncRepositoryOutputType = z.infer<typeof syncRepositoryOutput>;

export type GithubRepository = z.infer<typeof githubRepositorySchema>;
