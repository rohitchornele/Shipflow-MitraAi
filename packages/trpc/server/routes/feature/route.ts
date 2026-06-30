import { featureService } from '../../services';

import { authenticatedProcedure, router } from '../../trpc';

import {
  createFeatureInput,
  createFeatureOutput,
  deleteFeatureInput,
  deleteFeatureOutput,
  getFeatureInput,
  getFeatureOutput,
  listFeaturesInput,
  listFeaturesOutput,
  updateFeatureInput,
  updateFeatureOutput,
} from '@repo/services/feature/model';

import { generatePath } from '../../utils/path-generator';

const TAGS = ['Feature'];

const getPath = generatePath('/features');

export const featureRouter = router({
  create: authenticatedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: getPath("/"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(createFeatureInput)
    .output(createFeatureOutput)
    .mutation(({ ctx, input }) => {
      return featureService.create(ctx.user.id, input);
    }),

  list: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath("/"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(listFeaturesInput)
    .output(listFeaturesOutput)
    .query(({ input }) => {
      return featureService.list(input.projectId);
    }),

  get: authenticatedProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: getPath('/:featureId'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getFeatureInput)
    .output(getFeatureOutput)
    .query(async ({ input }) => {
      const feature = await featureService.get(input.featureId);

      if (!feature) {
        throw new Error('Feature not found');
      }

      return feature;
    }),

  update: authenticatedProcedure
    .meta({
      openapi: {
        method: 'PATCH',
        path: getPath('/:featureId'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(updateFeatureInput)
    .output(updateFeatureOutput)
    .mutation(({ input }) => {
      return featureService.update(input.featureId, input);
    }),

  delete: authenticatedProcedure
    .meta({
      openapi: {
        method: 'DELETE',
        path: getPath('/:featureId'),
        tags: TAGS,
        protect: true,
      },
    })
    .input(deleteFeatureInput)
    .output(deleteFeatureOutput)
    .mutation(({ input }) => {
      return featureService.delete(input.featureId);
    }),
});