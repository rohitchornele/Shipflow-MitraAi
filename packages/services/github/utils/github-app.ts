
import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';

export function createGithubAppClient() {
  return new Octokit({
    authStrategy: createAppAuth,

    auth: {
      appId: process.env.GITHUB_APP_ID!,
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    },
  });
}

export function getGithubInstallUrl(userId: string) {
  const url = new URL(
    `https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/new`
  );

  url.searchParams.set('state', userId);

  return url.toString();
}

export function createInstallationClient(installationId: number) {
  return new Octokit({
    authStrategy: createAppAuth,

    auth: {
      appId: process.env.GITHUB_APP_ID!,
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      installationId,
    },
  });
}
