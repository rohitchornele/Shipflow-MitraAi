import { generateText } from 'ai';

import { openrouter } from '../client';
import { AI_MODELS, REVIEW_MODEL } from '../models';
import { REVIEW_SYSTEM_PROMPT } from '../prompts/review-pr-prompt';

type ReviewPullRequestInput = {
  repoFullName: string;

  title: string;
  contextSnippets: string[];
  repoContextSnippets?: string[];
};

function buildPullRequestContextSection(contextSnippets: string[]): string {
  if (contextSnippets.length === 0) {
    return '';
  }

  return `

## Pull Request Context

The following snippets were retrieved from the current pull request.

${contextSnippets.join('\n\n---\n\n')}
`;
}

function buildRepositoryContextSection(repositoryContext: string[]): string {
  if (repositoryContext.length === 0) {
    return '';
  }

  return `

## Related Repository Context

The following snippets were retrieved from the synced repository because they are semantically related to the pull request.

Use them only as supporting context. Do not review them unless they are directly affected by the pull request.

${repositoryContext.join('\n\n---\n\n')}
`;
}

export async function reviewPullRequest(
  input: ReviewPullRequestInput
): Promise<string> {
  const prompt = `Repository: ${input.repoFullName}

Pull Request Title: ${input.title}

${buildPullRequestContextSection(input.contextSnippets)}
${buildRepositoryContextSection(input.repoContextSnippets ?? [])}`;

  const { text } = await generateText({
    model: openrouter(REVIEW_MODEL),
    system: REVIEW_SYSTEM_PROMPT,
    prompt,
  });

  return text;
}
