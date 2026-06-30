import { RepositoryFile } from '../github/utils/types';
import { RepositoryChunk } from './types';

const MAX_CHUNK_LINES = 80;


function buildChunkId(filePath: string, part: number) {
  return `repo--${filePath}--part-${part}`;
}

/**
 * Splits repository files into smaller chunks for embeddings.
 */
export function chunkRepository(files: RepositoryFile[]): RepositoryChunk[] {
  const chunks: RepositoryChunk[] = [];

  for (const file of files) {
    // Normalize line endings
    const lines = file.content.replace(/\r\n/g, '\n').split('\n');

    for (let start = 0; start < lines.length; start += MAX_CHUNK_LINES) {
      const part = start / MAX_CHUNK_LINES;

      const text = lines
        .slice(start, start + MAX_CHUNK_LINES)
        .join('\n')
        .trim();

      // Skip completely empty chunks
      if (!text) {
        continue;
      }

      chunks.push({
        id: buildChunkId(file.filePath, part),
        filePath: file.filePath,
        text,
      });
    }
  }

  return chunks;
}
