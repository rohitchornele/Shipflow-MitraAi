import { inngest } from '../../ingest';
import { savePullRequest } from './save-pull-request';
import { PullRequestWebhookPayload } from './types';

const REVIEWABLE_ACTIONS = ['opened', 'synchronize', 'reopened'];

export async function handlePullRequestWebhook(
  payload: PullRequestWebhookPayload
) {
  if (!REVIEWABLE_ACTIONS.includes(payload.action)) {
    return;
  }

  console.log(`PR ${payload.pull_request.number} ${payload.action}`);

  const pullRequest = await savePullRequest(payload);

  await inngest.send({
    name: 'github/pr.review.requested',
    data: {
      pullRequestId: pullRequest.id,
    },
  });

  console.log(`Saved PR #${payload.pull_request.number}`);

  // TODO:
  // Queue AI Review
}
