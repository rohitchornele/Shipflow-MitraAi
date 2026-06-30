import { githubService } from '../../services';

import { authenticatedProcedure, router } from '../../trpc';

import {
  getInstallationStatusInput,
  getInstallationStatusOutput,
  disconnectInstallationOutput,
  getUserInstallationIdInput,
  getUserInstallationIdOutput,
  getInstallUrlInput,
  getInstallUrlOutput,
  getRepositoriesInput,
  getRepositoriesOutput,
  syncRepositoryInput,
  syncRepositoryOutput,
} from '@repo/services/github/model';

import { generatePath } from '../../utils/path-generator';

const TAGS = ['Github'];

const getPath = generatePath('/github');

export const githubRouter = router({
  getInstallUrl: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/install-url'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getInstallUrlInput)
    .output(getInstallUrlOutput)
    .query(({ ctx }) => {
      return githubService.getInstallUrl(ctx.user.id);
    }),

  getInstallationStatus: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/installation-status'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getInstallationStatusInput)
    .output(getInstallationStatusOutput)
    .query(({ ctx }) => {
      return githubService.getInstallationStatus(ctx.user.id);
    }),

  disconnectInstallation: authenticatedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: getPath('/disconnect'),
        tags: TAGS,
        protect: true,
      },
    })
    .output(disconnectInstallationOutput)
    .mutation(({ ctx }) => {
      return githubService.disconnectInstallation(ctx.user.id);
    }),

  getUserInstallationId: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/installation-id'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getUserInstallationIdInput)
    .output(getUserInstallationIdOutput)
    .query(({ ctx }) => {
      return githubService.getUserInstallationId(ctx.user.id);
    }),

  listRepositories: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/repositories'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getRepositoriesInput)
    .output(getRepositoriesOutput)
    .query(({ ctx, input }) => {
      return githubService.getRepositories(ctx.user.id, input.page);
    }),

  syncRepository: authenticatedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: getPath('/repositories/sync'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(syncRepositoryInput)
    .output(syncRepositoryOutput)
    .mutation(({ ctx, input }) => {
      return githubService.syncRepository(
        ctx.user.id,
        input.repositoryId,
        input.repositoryOwner,
        input.repositoryName,
        input.defaultBranch
      );
    }),
});
