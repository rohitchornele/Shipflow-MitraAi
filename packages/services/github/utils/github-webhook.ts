import { Webhooks } from '@octokit/webhooks';
import GithubService from '..';
import { handlePullRequestWebhook } from './pull-request-handler';

export const githubWebhooks = new Webhooks({
  secret: process.env.GITHUB_WEBHOOK_SECRET!,
});

const githubService = new GithubService();

githubWebhooks.onAny(async ({ id, name, payload }) => {
  console.log('='.repeat(60));
  console.log('GitHub Webhook Received');
  console.log('Delivery ID :', id);
  console.log('Event       :', name);
  console.log('Action      :', 'action' in payload ? payload.action : 'N/A');
  console.log(
    'Repository  :',
    'repository' in payload ? payload.repository?.full_name : 'N/A'
  );
  console.log('='.repeat(60));
});

githubWebhooks.on('installation.deleted', async ({ payload }) => {
  console.log('Installation deleted:', payload.installation.id);

  await githubService.removeInstallationByInstallationId(
    payload.installation.id
  );
});

githubWebhooks.on('pull_request.opened', ({ payload }) =>
  handlePullRequestWebhook(payload)
);

githubWebhooks.on('pull_request.synchronize', ({ payload }) =>
  handlePullRequestWebhook(payload)
);

githubWebhooks.on('pull_request.reopened', ({ payload }) =>
  handlePullRequestWebhook(payload)
);
