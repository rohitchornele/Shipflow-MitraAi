export function buildPullRequestNamespace(
  repositoryOwner: string,
  repositoryName: string,
  pullRequestNumber: number
): string {
  return `${repositoryOwner}--${repositoryName}--pr-${pullRequestNumber}`;
}