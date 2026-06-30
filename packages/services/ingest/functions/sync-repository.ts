import { inngest } from '../client';

import {
  markRepositoryFailed,
  markRepositorySynced,
  markRepositorySyncing,
} from '../../repository-sync';

import { getRepositoryFiles } from '../../github/utils/get-repository-files';

import { chunkRepository } from '../../repository/chunk-repository';

import { buildRepositoryNamespace } from '../../repository/build-repository-namespace';

import { deleteCodeNamespace } from '../../pinecone/delete-code-namespace';
import { saveCodeChunks } from '../../pinecone/save-code-chunks';

export const syncRepositoryFunction = inngest.createFunction(
  {
    id: 'sync-repository',
    triggers: [
      {
        event: 'github/repository.sync.requested',
      },
    ],
  },

  async ({ event, step }) => {
    const { repositorySyncId } = event.data;

    try {
      /**
       * Mark repository as syncing and retrieve its metadata.
       */
      const repository = await step.run('mark-syncing', async () => {
        return markRepositorySyncing(repositorySyncId);
      });

      if (!repository) {
        throw new Error(`Repository sync ${repositorySyncId} not found.`);
      }

      /**
       * Fetch repository files.
       */
      // const files = await step.run('fetch-repository-files', async () => {
      //   return getRepositoryFiles(
      //     repository.installationId,
      //     repository.repositoryOwner,
      //     repository.repositoryName,
      //     repository.defaultBranch
      //   );
      // });

      /**
       * Split repository into chunks.
       */
      // const chunks = await step.run('chunk-repository', async () => {
      //   return chunkRepository(files);
      // });

      const chunks = await step.run('fetch-and-chunk-codebase', async () => {
        const files = await getRepositoryFiles(
          repository.installationId,
          repository.repositoryOwner,
          repository.repositoryName,
          repository.defaultBranch
        );

        return chunkRepository(files);
      });

      /**
       * Build Pinecone namespace.
       */
      const namespace = buildRepositoryNamespace(
        repository.repositoryOwner,
        repository.repositoryName
      );

      /**
       * Delete previous vectors if the repository
       * has already been synced.
       */
      if (repository.syncedAt) {
        await step.run('delete-old-vectors', async () => {
          await deleteCodeNamespace(namespace);
        });
      }

      /**
       * Upload chunks to Pinecone.
       */
      await step.run('save-repository-chunks', async () => {
        await saveCodeChunks(namespace, chunks);
      });

      /**
       * Mark repository as synced.
       */
      await step.run('mark-synced', async () => {
        await markRepositorySynced(repositorySyncId, chunks.length);
      });

      return {
        success: true,
        repositorySyncId,
        chunkCount: chunks.length,
      };
    } catch (error) {
      await markRepositoryFailed(repositorySyncId);
      throw error;
    }
  }
);
