
import { PullRequestFile } from '../github/utils/get-pull-request';
import type { RepositoryChunk } from './types';

const MAX_CHUNK_LINES = 80;

/**
 * Builds a deterministic chunk id.
 *
 * Example:
 * pr-123--src/app/page.tsx--part-0
 */
function buildChunkId(
  pullRequestNumber: number,
  filePath: string,
  part: number
) {
  return `pr-${pullRequestNumber}--${filePath}--part-${part}`;
}

/**
 * Splits pull request patches into smaller chunks for embeddings.
 */
export function chunkPullRequest(
  pullRequestNumber: number,
  files: PullRequestFile[]
): RepositoryChunk[] {
  const chunks: RepositoryChunk[] = [];

  for (const file of files) {
    /**
     * GitHub omits patch for deleted/binary files.
     */
    if (!file.patch?.trim()) {
      continue;
    }

    const lines = file.patch.split('\n');

    for (
      let start = 0;
      start < lines.length;
      start += MAX_CHUNK_LINES
    ) {
      const part = start / MAX_CHUNK_LINES;

      const text = lines
        .slice(start, start + MAX_CHUNK_LINES)
        .join('\n');

      chunks.push({
        id: buildChunkId(
          pullRequestNumber,
          file.filePath,
          part
        ),
        filePath: file.filePath,
        text,
      });
    }
  }

  return chunks;
}