import { aiThreadService } from '../../services';

import { authenticatedProcedure, router } from '../../trpc';

import {
  createThreadInput,
  createThreadOutput,
  deleteThreadInput,
  deleteThreadOutput,
  getRequirementThreadInput,
  getRequirementThreadOutput,
  getThreadInput,
  getThreadOutput,
  listMessagesInput,
  listMessagesOutput,
  listThreadsInput,
  listThreadsOutput,
  sendMessageInput,
  sendMessageOutput,
} from '@repo/services/ai-thread/model';

import { generatePath } from '../../utils/path-generator';

const TAGS = ['AI Thread'];

const getPath = generatePath('/ai-threads');

export const aiThreadRouter = router({
  create: authenticatedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: getPath('/'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(createThreadInput)
    .output(createThreadOutput)
    .mutation(({ ctx, input }) => {
      return aiThreadService.create(ctx.user.id, input);
    }),

  get: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/:threadId'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getThreadInput)
    .output(getThreadOutput)
    .query(async ({ input }) => {
      const thread = await aiThreadService.get(input.threadId);

      if (!thread) {
        throw new Error('Thread not found');
      }

      return thread;
    }),

  getRequirementThread: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/requirement-thread'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getRequirementThreadInput)
    .output(getRequirementThreadOutput)
    .query(({ ctx, input }) => {
      return aiThreadService.getOrCreateRequirementThread(
        ctx.user.id,
        input.featureId
      );
    }),

  list: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(listThreadsInput)
    .output(listThreadsOutput)
    .query(({ input }) => {
      return aiThreadService.list(input.featureId);
    }),

  sendUserMessage: authenticatedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: getPath('/:threadId/messages'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(sendMessageInput)
    .output(sendMessageOutput)
    .mutation(({ input }) => {
      return aiThreadService.sendUserMessage(input);
    }),

  listMessages: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/:threadId/messages'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(listMessagesInput)
    .output(listMessagesOutput)
    .query(({ input }) => {
      return aiThreadService.listMessages(input.threadId);
    }),

  delete: authenticatedProcedure
    .meta({
      openapi: {
        method: 'DELETE',
        path: getPath('/:threadId'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(deleteThreadInput)
    .output(deleteThreadOutput)
    .mutation(({ input }) => {
      return aiThreadService.delete(input.threadId);
    }),
});
