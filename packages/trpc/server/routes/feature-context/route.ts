import { featureContextService } from '../../services';

import {
  authenticatedProcedure,
  router,
} from '../../trpc';

import {
  createFeatureContextInput,
  createFeatureContextOutput,
  deleteFeatureContextInput,
  deleteFeatureContextOutput,
  getFeatureContextInput,
  getFeatureContextOutput,
  resetFeatureContextInput,
  resetFeatureContextOutput,
} from '@repo/services/feature-context/model';

import { generatePath } from '../../utils/path-generator';

const TAGS = ['Feature Context'];

const getPath = generatePath('/feature-context');

export const featureContextRouter = router({
  create: authenticatedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: getPath("/"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(createFeatureContextInput)
    .output(createFeatureContextOutput)
    .mutation(({ input }) =>
      featureContextService.create(input)
    ),

  get: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/:featureId'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getFeatureContextInput)
    .output(getFeatureContextOutput)
    .query(({ input }) =>
      featureContextService.get(
        input.featureId
      )
    ),

  reset: authenticatedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: getPath('/:featureId/reset'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(resetFeatureContextInput)
    .output(resetFeatureContextOutput)
    .mutation(({ input }) =>
      featureContextService.reset(
        input.featureId
      )
    ),

  delete: authenticatedProcedure
    .meta({
      openapi: {
        method: 'DELETE',
        path: getPath('/:featureId'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(deleteFeatureContextInput)
    .output(deleteFeatureContextOutput)
    .mutation(({ input }) =>
      featureContextService.delete(
        input.featureId
      )
    ),
});