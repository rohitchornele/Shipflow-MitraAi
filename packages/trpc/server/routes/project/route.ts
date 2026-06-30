
import { authenticatedProcedure, router } from '../../trpc';

import {
  createProjectInput,
  createProjectOutput,
  deleteProjectInput,
  deleteProjectOutput,
  getProjectInput,
  getProjectOutput,
  listProjectsInput,
  listProjectsOutput,
  updateProjectInput,
  updateProjectOutput,
} from '@repo/services/project/model';

import { generatePath } from '../../utils/path-generator';
import { projectService } from '../../services';

const TAGS = ['Project'];

const getPath = generatePath('/project');

export const projectRouter = router({
  create: authenticatedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: getPath('/'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(createProjectInput)
    .output(createProjectOutput)
    .mutation(({ ctx, input }) => {
      return projectService.create(ctx.user.id, input);
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
    .output(listProjectsOutput)
    .query(({ ctx }) => {
      return projectService.list(ctx.user.id);
    }),

  get: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/{projectId}'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getProjectInput)
    .output(getProjectOutput)
    .query(({ input }) => {
      return projectService.get(input.projectId);
    }),

  update: authenticatedProcedure
    .meta({
      openapi: {
        method: 'PATCH',
        path: getPath('/{projectId}'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(updateProjectInput)
    .output(updateProjectOutput)
    .mutation(({ input }) => {
      return projectService.update(input);
    }),

  delete: authenticatedProcedure
    .meta({
      openapi: {
        method: 'DELETE',
        path: getPath('/{projectId}'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(deleteProjectInput)
    .output(deleteProjectOutput)
    .mutation(({ input }) => {
      return projectService.delete(input.projectId);
    }),
});
