

export function buildRepositoryNamespace(
  repositoryOwner: string,
  repositoryName: string
): string {
  return `${repositoryOwner}--${repositoryName}--codebase`;
}