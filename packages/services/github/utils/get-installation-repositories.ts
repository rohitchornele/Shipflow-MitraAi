import { createInstallationClient } from "./github-app";
import { GithubRepository, InstallationRepositoriesPage } from "./types";


const REPOSITORIES_PER_PAGE = 100;

function getRepositoryVisibility(
  isPrivate?: boolean
): GithubRepository["visibility"] {
  return isPrivate ? "private" : "public";
}

function mapRepository(repository: {
  id: number;
  name: string;
  full_name: string;
  private?: boolean;
  default_branch?: string;
  updated_at?: string | null;
  language?: string | null;
  stargazers_count?: number | null;
  owner: {
    login: string;
  };
}): GithubRepository {
  return {
    id: String(repository.id),

    name: repository.name,

    fullName: repository.full_name,

    repositoryOwner: repository.owner.login,

    repositoryName: repository.name,

    visibility: getRepositoryVisibility(repository.private),

    defaultBranch: repository.default_branch ?? "main",

    updatedAt:
      repository.updated_at ??
      new Date().toISOString(),

    language: repository.language ?? null,

    stars: repository.stargazers_count ?? 0,
  };
}

export async function getInstallationRepositories(
  installationId: number,
  page = 1
): Promise<InstallationRepositoriesPage> {
  const octokit =
    createInstallationClient(installationId);

  const { data } = await octokit.request(
    "GET /installation/repositories",
    {
      per_page: REPOSITORIES_PER_PAGE,
      page,
    }
  );

  return {
    repositories: data.repositories.map(
      mapRepository
    ),
    totalCount: data.total_count,
    page,
    hasMore:
      page * REPOSITORIES_PER_PAGE <
      data.total_count,
  };
}