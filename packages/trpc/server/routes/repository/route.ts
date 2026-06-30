

import { authenticatedProcedure, router } from '../../trpc';

import {
  attachRepositoryInput,
  attachRepositoryOutput,
  detachRepositoryInput,
  detachRepositoryOutput,
  getRepositoryInput,
  getRepositoryOutput,
  listRepositoriesInput,
  listRepositoriesOutput,
} from '@repo/services/repository-management/model';

import { generatePath } from '../../utils/path-generator';
import { repositoryManagementService } from '../../services';

const TAGS = ['Repository'];

const getPath = generatePath('/repository');

export const repositoryRouter = router({
  attach: authenticatedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: getPath('/'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(attachRepositoryInput)
    .output(attachRepositoryOutput)
    .mutation(({ input }) => {
      return repositoryManagementService.attach(input);
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
    .input(listRepositoriesInput)
    .output(listRepositoriesOutput)
    .query(({ input }) => {
      return repositoryManagementService.list(input.projectId);
    }),

  get: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/{repositoryId}'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getRepositoryInput)
    .output(getRepositoryOutput)
    .query(({ input }) => {
      return repositoryManagementService.get(input.repositoryId);
    }),

  detach: authenticatedProcedure
    .meta({
      openapi: {
        method: 'DELETE',
        path: getPath('/{repositoryId}'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(detachRepositoryInput)
    .output(detachRepositoryOutput)
    .mutation(({ input }) => {
      return repositoryManagementService.detach(input.repositoryId);
    }),
});