import { createInstallationClient } from './github-app';

type PostPullRequestCommentInput = {
  installationId: number;
  repoFullName: string;
  pullRequestNumber: number;
  body: string;
};

/**
 * Posts a review comment on a pull request.
 */
export async function postPullRequestComment({
  installationId,
  repoFullName,
  pullRequestNumber,
  body,
}: PostPullRequestCommentInput): Promise<void> {
  const octokit = createInstallationClient(installationId);

  const [owner, repo] = repoFullName.split('/');

  await octokit.request(
    'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      owner,
      repo,
      issue_number: pullRequestNumber,
      body,
    }
  );
}
