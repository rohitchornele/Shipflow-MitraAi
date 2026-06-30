import {
  setupProjectInput,
  setupProjectOutput,
} from '@repo/services/project-setup/model';

import { projectSetupService } from '../../services';

import { authenticatedProcedure, router } from '../../trpc';

import { generatePath } from '../../utils/path-generator';

const TAGS = ['Project Setup'];

const getPath = generatePath('/project-setup');

export const projectSetupRouter = router({
  initialize: authenticatedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: getPath('/'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(setupProjectInput)
    .output(setupProjectOutput)
    .mutation(({ ctx, input }) => {
      return projectSetupService.initialize(
        ctx.user.id,
        input
      );
    }),
});