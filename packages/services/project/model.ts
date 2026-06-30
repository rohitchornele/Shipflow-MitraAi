import { z } from 'zod';

/* -------------------------------------------------------------------------- */
/*                                Project                                     */
/* -------------------------------------------------------------------------- */

export const projectSchema = z.object({
  id: z.uuid(),

  ownerId: z.string(),

  name: z.string(),

  description: z.string().nullable(),

  createdAt: z.date(),

  updatedAt: z.date(),
});

/* -------------------------------------------------------------------------- */
/*                              Create Project                                */
/* -------------------------------------------------------------------------- */

export const createProjectInput = z.object({

  name: z.string().min(1).max(150),

  description: z.string().optional(),
});

export const createProjectOutput = projectSchema;

/* -------------------------------------------------------------------------- */
/*                               Update Project                               */
/* -------------------------------------------------------------------------- */

export const updateProjectInput = z.object({
  projectId: z.uuid(),

  name: z.string().min(1).max(150).optional(),

  description: z.string().optional(),
});

export const updateProjectOutput = projectSchema;

/* -------------------------------------------------------------------------- */
/*                               Delete Project                               */
/* -------------------------------------------------------------------------- */

export const deleteProjectInput = z.object({
  projectId: z.uuid(),
});

export const deleteProjectOutput = z.object({
  success: z.boolean(),
});

/* -------------------------------------------------------------------------- */
/*                                 Get Project                                */
/* -------------------------------------------------------------------------- */

export const getProjectInput = z.object({
  projectId: z.uuid(),
});

export const getProjectOutput = projectSchema;

/* -------------------------------------------------------------------------- */
/*                               List Projects                                */
/* -------------------------------------------------------------------------- */

export const listProjectsInput = z.undefined();

export const listProjectsOutput = z.array(projectSchema);

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

export type CreateProjectInput = z.infer<
  typeof createProjectInput
>;

export type UpdateProjectInput = z.infer<
  typeof updateProjectInput
>;