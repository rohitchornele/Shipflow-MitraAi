import { z } from 'zod';

import { RequirementContextSchema } from '../ai/requirement/model';

/* -------------------------------------------------------------------------- */
/*                               Context Schema                               */
/* -------------------------------------------------------------------------- */

export const featureContextSchema = z.object({
  id: z.string().uuid(),

  featureId: z.string().uuid(),

  summary: z.string().nullable(),

  requirements: RequirementContextSchema.shape.requirements,

  missingItems: z.array(z.string()).nullable(),

  completion: z.number(),

  version: z.number(),

  createdAt: z.date(),

  updatedAt: z.date(),
});

/* -------------------------------------------------------------------------- */
/*                                   Create                                   */
/* -------------------------------------------------------------------------- */

export const createFeatureContextInput = z.object({
  featureId: z.string().uuid(),
});

export const createFeatureContextOutput = featureContextSchema;

/* -------------------------------------------------------------------------- */
/*                                     Get                                    */
/* -------------------------------------------------------------------------- */

export const getFeatureContextInput = z.object({
  featureId: z.string().uuid(),
});

export const getFeatureContextOutput = featureContextSchema;

/* -------------------------------------------------------------------------- */
/*                                    Reset                                   */
/* -------------------------------------------------------------------------- */

export const resetFeatureContextInput = z.object({
  featureId: z.string().uuid(),
});

export const resetFeatureContextOutput = featureContextSchema;

/* -------------------------------------------------------------------------- */
/*                                   Delete                                   */
/* -------------------------------------------------------------------------- */

export const deleteFeatureContextInput = z.object({
  featureId: z.string().uuid(),
});

export const deleteFeatureContextOutput = z.object({
  success: z.boolean(),
});

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type RequirementContext = {
  assistantMessage: string;

  summary: string;

  completion: number;

  missingItems: string[];

  requirements: Record<string, unknown>;
};

export type FeatureContext = z.infer<typeof featureContextSchema>;

export type CreateFeatureContextInput = z.infer<
  typeof createFeatureContextInput
>;

export type CreateFeatureContextOutput = z.infer<
  typeof createFeatureContextOutput
>;

export type GetFeatureContextInput = z.infer<typeof getFeatureContextInput>;

export type GetFeatureContextOutput = z.infer<typeof getFeatureContextOutput>;

export type ResetFeatureContextInput = z.infer<typeof resetFeatureContextInput>;

export type ResetFeatureContextOutput = z.infer<
  typeof resetFeatureContextOutput
>;

export type DeleteFeatureContextInput = z.infer<
  typeof deleteFeatureContextInput
>;

export type DeleteFeatureContextOutput = z.infer<
  typeof deleteFeatureContextOutput
>;
