import { z } from 'zod';
import { projectSchema } from '../project/model';

/* -------------------------------------------------------------------------- */
/*                           Selected Repository                              */
/* -------------------------------------------------------------------------- */

export const selectedRepositorySchema = z.object({
  githubRepositoryId: z.string(),

  owner: z.string(),

  name: z.string(),

  fullName: z.string(),

  defaultBranch: z.string(),

  isPrivate: z.boolean(),

  isArchived: z.boolean(),
});

/* -------------------------------------------------------------------------- */
/*                             Setup Project                                  */
/* -------------------------------------------------------------------------- */

export const setupProjectInput = z.object({
  name: z.string().min(1).max(150),

  description: z.string().optional(),

  repositories: z
    .array(selectedRepositorySchema)
    .min(1),
});

export type SetupProjectInput = z.infer<
  typeof setupProjectInput
>;

/* -------------------------------------------------------------------------- */
/*                            Setup Project Output                            */
/* -------------------------------------------------------------------------- */

export const setupProjectOutput = z.object({
  project: projectSchema,
  repositoryIds: z.array(z.uuid()),
});

export type SetupProjectOutput = z.infer<
  typeof setupProjectOutput
>;