
import { db } from '@repo/database';
import { githubPullRequest } from '@repo/database/models/pull-request';

import type { PullRequestWebhookPayload } from './types';

function getAuthorLogin(user: { login: string } | null): string | null {
  return user?.login ?? null;
}

export async function savePullRequest(payload: PullRequestWebhookPayload) {
  const repositoryId = payload.repository.id;

  const repositoryOwner = payload.repository.owner.login;

  const repositoryName = payload.repository.name;

  const prNumber = payload.pull_request.number;

  const [pullRequest] = await db
    .insert(githubPullRequest)
    .values({
      githubPullRequestId: payload.pull_request.id,

      installationId: payload.installation!.id,

      repositoryId,

      repositoryOwner,

      repositoryName,

      prNumber,

      title: payload.pull_request.title,

      authorLogin: getAuthorLogin(payload.pull_request.user),

      headSha: payload.pull_request.head.sha,

      baseBranch: payload.pull_request.base.ref,

      status: 'pending',
    })
    .onConflictDoUpdate({
      target: [githubPullRequest.repositoryId, githubPullRequest.prNumber],

      set: {
        title: payload.pull_request.title,

        authorLogin: getAuthorLogin(payload.pull_request.user),

        headSha: payload.pull_request.head.sha,

        baseBranch: payload.pull_request.base.ref,

        status: 'pending',

        updatedAt: new Date(),
      },
    })
    .returning();

  return pullRequest;
}
