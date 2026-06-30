import { z } from 'zod';

/* -------------------------------------------------------------------------- */
/*                               Create Feature                               */
/* -------------------------------------------------------------------------- */

export const featureStatusSchema = z.enum([
  'draft',
  'requirement_gathering',
  'requirements_approved',
  'prd_generated',
  'prd_approved',
  'tasks_generated',
  'in_development',
  'pr_review',
  'ready_for_release',
  'released',
  'archived',
]);

export const featurePrioritySchema = z.enum([
  'low',
  'medium',
  'high',
  'critical',
]);


export const createFeatureInput = z.object({
  projectId: z.string().uuid(),

  repositoryId: z.string().uuid().optional(),

  title: z.string().min(1).max(200),

  description: z.string().optional(),
});

export type CreateFeatureInput = z.infer<
  typeof createFeatureInput
>;

export const createFeatureOutput = z.object({
  id: z.string().uuid(),

  projectId: z.string().uuid(),

  repositoryId: z.string().uuid().nullable(),

  createdBy: z.string(),

  title: z.string(),

  description: z.string().nullable(),

  status: featureStatusSchema,

  priority: featurePrioritySchema,

  isArchived: z.boolean(),

  createdAt: z.date(),

  updatedAt: z.date(),
});

export type CreateFeatureOutput = z.infer<
  typeof createFeatureOutput
>;

/* -------------------------------------------------------------------------- */
/*                                Get Feature                                 */
/* -------------------------------------------------------------------------- */

export const getFeatureInput = z.object({
  featureId: z.string().uuid(),
});

export const getFeatureOutput =
  createFeatureOutput;

export type GetFeatureOutput = z.infer<
  typeof getFeatureOutput
>;

/* -------------------------------------------------------------------------- */
/*                               List Features                                */
/* -------------------------------------------------------------------------- */

export const listFeaturesInput = z.object({
  projectId: z.string().uuid(),
});

export const listFeaturesOutput = z.array(
  createFeatureOutput
);

export type ListFeaturesOutput = z.infer<
  typeof listFeaturesOutput
>;

/* -------------------------------------------------------------------------- */
/*                              Update Feature                                */
/* -------------------------------------------------------------------------- */

export const updateFeatureInput = z.object({
  featureId: z.string().uuid(),

  title: z.string().min(1).max(200).optional(),

  description: z.string().optional(),

  repositoryId: z.string().uuid().optional(),

  status: featureStatusSchema.optional(),

  priority: featurePrioritySchema.optional(),
});

export type UpdateFeatureInput = z.infer<
  typeof updateFeatureInput
>;

export const updateFeatureOutput =
  createFeatureOutput;

/* -------------------------------------------------------------------------- */
/*                              Delete Feature                                */
/* -------------------------------------------------------------------------- */

export const deleteFeatureInput = z.object({
  featureId: z.string().uuid(),
});

export const deleteFeatureOutput = z.object({
  success: z.boolean(),
});