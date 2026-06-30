import { db } from '@repo/database';
import { eq } from 'drizzle-orm';
import { createGithubAppClient, getGithubInstallUrl } from './utils/github-app';
import { githubInstallation } from '@repo/database/schema';
import 'dotenv';
import { getInstallationRepositories } from './utils/get-installation-repositories';
import { getRepositorySyncStatuses, triggerRepositorySync } from '../repository-sync';

class GithubService {
  private getAccountLogin(
    account: { login?: string; slug?: string } | null | undefined
  ): string | null {
    if (!account) {
      return null;
    }

    if ('login' in account && account.login) {
      return account.login;
    }

    if (account.slug) {
      return account.slug;
    }

    return null;
  }

  private buildDisconnectedStatus() {
    return {
      connected: false,
      accountLogin: null,
      installedAt: null,
    };
  }

  public async getInstallationStatus(userId: string) {
    const installation = await db.query.githubInstallation.findFirst({
      where: eq(githubInstallation.userId, userId),
    });

    if (!installation) {
      return this.buildDisconnectedStatus();
    }

    return {
      connected: true,
      accountLogin: installation.accountLogin,
      installedAt: installation.createdAt.toISOString(),
    };
  }

  public async saveInstallation(userId: string, installationId: number) {
    // const app = getGithubApp();
    const octokit = createGithubAppClient();

    const { data } = await octokit.request(
      'GET /app/installations/{installation_id}',
      {
        installation_id: installationId,
      }
    );

    const accountLogin = this.getAccountLogin(data.account);

    const existing = await db.query.githubInstallation.findFirst({
      where: eq(githubInstallation.userId, userId),
    });

    if (existing) {
      await db
        .update(githubInstallation)
        .set({
          installationId,
          accountLogin,
          accountType: data.target_type ?? null,
          updatedAt: new Date(),
        })
        .where(eq(githubInstallation.userId, userId));

      return;
    }

    await db.insert(githubInstallation).values({
      userId,
      installationId,
      accountLogin,
      accountType: data.target_type ?? null,
    });
  }

  public async deleteInstallation(userId: string) {
    await db
      .delete(githubInstallation)
      .where(eq(githubInstallation.userId, userId));
  }

  public async getUserIdByInstallationId(installationId: number) {
    const installation = await db.query.githubInstallation.findFirst({
      where: eq(githubInstallation.installationId, installationId),
    });

    if (!installation) {
      return null;
    }

    return installation.userId;
  }

  public async getUserInstallationId(userId: string) {
    const installation = await db.query.githubInstallation.findFirst({
      where: eq(githubInstallation.userId, userId),
    });

    if (!installation) {
      return null;
    }

    return installation.installationId;
  }

  public async disconnectInstallation(userId: string) {
    const installation = await db.query.githubInstallation.findFirst({
      where: eq(githubInstallation.userId, userId),
    });

    // Already disconnected locally
    if (!installation) {
      return {
        success: true,
      };
    }

    const octokit = createGithubAppClient();

    await octokit.request('DELETE /app/installations/{installation_id}', {
      installation_id: installation.installationId,
    });

    // ❌ Do NOT delete from the DB here.
    // GitHub will send an `installation.deleted` webhook,
    // and we'll remove it from the DB there.

    return {
      success: true,
    };
  }

  public async getInstallUrl(userId: string) {
    return {
      url: getGithubInstallUrl(userId),
    };
  }

  public async removeInstallationByInstallationId(installationId: number) {
    await db
      .delete(githubInstallation)
      .where(eq(githubInstallation.installationId, installationId));

    return {
      success: true,
    };
  }

  public async getRepositories(userId: string, page = 1) {
    const installationId = await this.getUserInstallationId(userId);

    if (!installationId) {
      throw new Error('GitHub App not connected.');
    }

    const data = await getInstallationRepositories(installationId, page);

    const syncStatuses = await getRepositorySyncStatuses(
      data.repositories.map((repository) => ({
        repositoryOwner: repository.repositoryOwner,
        repositoryName: repository.repositoryName,
      }))
    );

    return {
      ...data,
      repositories: data.repositories.map((repository) => ({
        ...repository,
        syncStatus: syncStatuses[repository.fullName] ?? null,
      })),
    };
  }

  public async syncRepository(
  userId: string,
  repositoryId: number,
  repositoryOwner: string,
  repositoryName: string,
  defaultBranch: string
) {
  const installationId = await this.getUserInstallationId(userId);

  if (!installationId) {
    throw new Error('GitHub App not connected.');
  }

  return triggerRepositorySync({
    installationId,
    repositoryId,
    repositoryOwner,
    repositoryName,
    defaultBranch,
  });
}
}

export default GithubService;

const githubService = new GithubService();

export { githubService };
