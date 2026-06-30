import {z} from 'zod'


export const RequirementContextSchema = z.object({
  assistantMessage: z.string(),

  summary: z.string(),

  completion: z.number().min(0).max(100),

  missingItems: z.array(z.string()),

  requirements: z.object({
    businessGoal: z.string().optional(),

    targetUsers: z.string().optional(),

    acceptanceCriteria: z.string().optional(),

    constraints: z.string().optional(),

    edgeCases: z.string().optional(),

    dependencies: z.string().optional(),
  }),
});