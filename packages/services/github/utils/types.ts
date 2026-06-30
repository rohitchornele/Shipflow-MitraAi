export type PullRequestWebhookPayload = {
  action: string;

  installation?: {
    id: number;
  };

  repository: {
    id: number;
    name: string;
    full_name: string;

    owner: {
      login: string;
    };
  };

  pull_request: {
    id: number;

    number: number;

    title: string;

    user: {
      login: string;
    } | null;

    head: {
      sha: string;
    };

    base: {
      ref: string;
    };
  };
};

export type RepositoryFile = {
  filePath: string;
  content: string;
};

export type GithubRepository = {
  id: string;

  name: string;

  fullName: string;

  repositoryOwner: string;

  repositoryName: string;

  visibility: 'public' | 'private';

  defaultBranch: string;

  updatedAt: string;

  language: string | null;

  stars: number;
};

export type InstallationRepositoriesPage = {
  repositories: GithubRepository[];
  totalCount: number;
  page: number;
  hasMore: boolean;
};

