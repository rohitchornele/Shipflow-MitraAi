export type Events = {
  "github/pr.review.requested": {
    data: {
      pullRequestId: string;
    };
  };

  "github/repository.sync.requested": {
    data: {
      repositorySyncId: string;
    };
  };
};