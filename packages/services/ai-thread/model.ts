import { z } from 'zod';

/* -------------------------------------------------------------------------- */
/*                                   Enums                                    */
/* -------------------------------------------------------------------------- */

export const aiThreadTypeSchema = z.enum([
  'requirement_gathering',
  'prd_generation',
  'task_generation',
  'review',
  'general',
]);

export const aiThreadStatusSchema = z.enum(['active', 'completed', 'archived']);

export const aiMessageRoleSchema = z.enum([
  'system',
  'user',
  'assistant',
  'tool',
]);

export type AIMessageRole = z.infer<typeof aiMessageRoleSchema>;

/* -------------------------------------------------------------------------- */
/*                               Create Thread                                */
/* -------------------------------------------------------------------------- */

export const createThreadInput = z.object({
  featureId: z.string().uuid(),

  title: z.string().min(1).max(255),

  type: aiThreadTypeSchema.default('requirement_gathering'),
});

export const createThreadOutput = z.object({
  id: z.string().uuid(),

  featureId: z.string().uuid(),

  title: z.string(),

  type: aiThreadTypeSchema,

  status: aiThreadStatusSchema,

  createdBy: z.string().uuid(),

  createdAt: z.date(),

  updatedAt: z.date(),
});

/* -------------------------------------------------------------------------- */
/*                                Get Thread                                  */
/* -------------------------------------------------------------------------- */

export const getThreadInput = z.object({
  threadId: z.string().uuid(),
});

export const getThreadOutput = createThreadOutput;

/* -------------------------------------------------------------------------- */
/*                               List Threads                                 */
/* -------------------------------------------------------------------------- */

export const listThreadsInput = z.object({
  featureId: z.string().uuid(),
});

export const listThreadsOutput = z.array(createThreadOutput);

/* -------------------------------------------------------------------------- */
/*                              Send Message                                  */
/* -------------------------------------------------------------------------- */

export const sendMessageInput = z.object({
  threadId: z.string().uuid(),

  content: z.string().min(1),
});

export const sendMessageOutput = z.object({
  id: z.string().uuid(),

  threadId: z.string().uuid(),

  role: aiMessageRoleSchema,

  content: z.string(),

  metadata: z.any().nullable(),

  createdAt: z.date(),
});

/* -------------------------------------------------------------------------- */
/*                              List Messages                                 */
/* -------------------------------------------------------------------------- */

export const listMessagesInput = z.object({
  threadId: z.string().uuid(),
});

export const listMessagesOutput = z.array(sendMessageOutput);

/* -------------------------------------------------------------------------- */
/*                              Delete Thread                                 */
/* -------------------------------------------------------------------------- */

export const deleteThreadInput = z.object({
  threadId: z.string().uuid(),
});

export const deleteThreadOutput = z.object({
  success: z.boolean(),
});

/* -------------------------------------------------------------------------- */
/*                   Get Or Create Requirement Thread                         */
/* -------------------------------------------------------------------------- */

export const getRequirementThreadInput = z.object({
  featureId: z.string().uuid(),
});

export const getRequirementThreadOutput = createThreadOutput;

export type GetRequirementThreadInput = z.infer<
  typeof getRequirementThreadInput
>;

export type GetRequirementThreadOutput = z.infer<
  typeof getRequirementThreadOutput
>;

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type CreateThreadInput = z.infer<typeof createThreadInput>;

export type CreateThreadOutput = z.infer<typeof createThreadOutput>;

export type GetThreadInput = z.infer<typeof getThreadInput>;

export type GetThreadOutput = z.infer<typeof getThreadOutput>;

export type ListThreadsInput = z.infer<typeof listThreadsInput>;

export type ListThreadsOutput = z.infer<typeof listThreadsOutput>;

export type SendMessageInput = z.infer<typeof sendMessageInput>;

export type SendMessageOutput = z.infer<typeof sendMessageOutput>;

export type ListMessagesInput = z.infer<typeof listMessagesInput>;

export type ListMessagesOutput = z.infer<typeof listMessagesOutput>;

export type DeleteThreadInput = z.infer<typeof deleteThreadInput>;

export type DeleteThreadOutput = z.infer<typeof deleteThreadOutput>;
