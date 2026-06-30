import { inngest } from '../client';

import {
  markPullRequestProcessing,
  markPullRequestReviewed,
} from '../../review';

import { reviewPullRequest } from '../../ai/review/review-pull-request';

import { getPullRequestFiles } from '../../github/utils/get-pull-request';

import { postPullRequestComment } from '../../github/utils/post-pull-request-comment';

import { chunkPullRequest } from '../../repository/chunk-pull-request';

import { buildPullRequestNamespace } from '../../repository/build-pull-request-namespace';

import { buildRepositoryNamespace } from '../../repository/build-repository-namespace';

import { saveCodeChunks } from '../../pinecone/save-code-chunks';

import { searchCodeContext } from '../../pinecone/search-code-context';

import { deleteCodeNamespace } from '../../pinecone/delete-code-namespace';

import { getRepositorySync } from '../../repository-sync';
export const reviewPullRequestFunction = inngest.createFunction(
  {
    id: 'review-pull-request',
    triggers: [{ event: 'github/pr.review.requested' }],
  },

  async ({ event, step }) => {
    const { pullRequestId } = event.data;

    const pullRequest = await step.run('mark-processing', async () => {
      return markPullRequestProcessing(pullRequestId);
    });

    if (!pullRequest) {
      throw new Error(`Pull request ${pullRequestId} not found.`);
    }

    /**
     * Fetch PR files and split them into chunks.
     */
    const chunks = await step.run('breakdown-code', async () => {
      const files = await getPullRequestFiles(
        pullRequest.installationId,
        `${pullRequest.repositoryOwner}/${pullRequest.repositoryName}`,
        pullRequest.prNumber
      );

      return chunkPullRequest(pullRequest.prNumber, files);
    });

    /**
     * Skip if there is nothing reviewable.
     */
    if (chunks.length === 0) {
      await step.run('mark-reviewed-no-code', async () => {
        await markPullRequestReviewed(
          pullRequestId,
          'No review generated because the pull request contained no reviewable code.'
        );
      });

      return {
        success: true,
        reason: 'No reviewable code found.',
      };
    }

    /**
     * Build a temporary namespace for this PR.
     */
    const pullRequestNamespace = buildPullRequestNamespace(
      pullRequest.repositoryOwner,
      pullRequest.repositoryName,
      pullRequest.prNumber
    );

    /**
     * Save PR chunks.
     */
    await step.run('save-pr-chunks', async () => {
      await saveCodeChunks(pullRequestNamespace, chunks);
    });

    /**
     * Give Pinecone time to index.
     */
    await step.sleep('wait-for-vectors', '10s');

    /**
     * Build a richer semantic search query.
     */
    const searchQuery = [
      pullRequest.title,
      ...chunks.slice(0, 3).map((chunk) => chunk.text),
    ].join('\n\n');

    /**
     * Search within the PR namespace.
     */
    const contextSnippets = await step.run('search-pr-context', async () => {
      return searchCodeContext(pullRequestNamespace, searchQuery);
    });

    /**
     * Search repository context if the repository
     * has already been synced.
     */
    const repoContextSnippets = await step.run(
      'search-repository-context',
      async () => {
        const repositorySync = await getRepositorySync(
          pullRequest.repositoryOwner,
          pullRequest.repositoryName
        );

        if (!repositorySync || repositorySync.status !== 'synced') {
          return [];
        }

        const repositoryNamespace = buildRepositoryNamespace(
          pullRequest.repositoryOwner,
          pullRequest.repositoryName
        );

        return searchCodeContext(repositoryNamespace, searchQuery);
      }
    );

    const review = await step.run('generate-ai-review', async () => {
      return reviewPullRequest({
        repoFullName: `${pullRequest.repositoryOwner}/${pullRequest.repositoryName}`,
        title: pullRequest.title,
        contextSnippets: chunks.map((chunk) => chunk.text),
        repoContextSnippets: [],
      });
    });

    await step.run('post-pr-comment', async () => {
      await postPullRequestComment({
        installationId: pullRequest.installationId,
        repoFullName: `${pullRequest.repositoryOwner}/${pullRequest.repositoryName}`,
        pullRequestNumber: pullRequest.prNumber,
        body: review,
      });
    });

    await step.run('delete-pr-namespace', async () => {
      await deleteCodeNamespace(pullRequestNamespace);
    });

    await step.run('mark-reviewed', async () => {
      await markPullRequestReviewed(pullRequestId, review);
    });

    return {
      success: true,
    };
  }
);
