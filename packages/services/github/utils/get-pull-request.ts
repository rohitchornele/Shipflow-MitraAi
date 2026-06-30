import { createInstallationClient } from './github-app';

const FILES_PER_PAGE = 100;

export type PullRequestFile = {
  filePath: string;
  patch: string;
};

/**
 * Fetch all changed files for a pull request.
 */
export async function getPullRequestFiles(
  installationId: number,
  repoFullName: string,
  pullRequestNumber: number
): Promise<PullRequestFile[]> {
  const octokit = createInstallationClient(installationId);

  const [owner, repo] = repoFullName.split('/');

  if (!owner || !repo) {
    throw new Error('Repository owner or name is missing.');
  }

  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/pulls/{pull_number}/files',
    {
      owner,
      repo,
      pull_number: pullRequestNumber,
      per_page: FILES_PER_PAGE,
    }
  );

  const files: PullRequestFile[] = [];

  for (const file of data) {
    if (!file.patch) {
      continue;
    }

    files.push({
      filePath: file.filename,
      patch: file.patch,
    });
  }

  return files;
}

/**
 * Converts GitHub patches into markdown that is easy for the LLM to review.
 */
export function formatPullRequestFilesForReview(
  files: PullRequestFile[]
): string {
  return files
    .map(
      (file) => `### ${file.filePath}
\`\`\`diff
${file.patch}
\`\`\``
    )
    .join('\n\n');
}
