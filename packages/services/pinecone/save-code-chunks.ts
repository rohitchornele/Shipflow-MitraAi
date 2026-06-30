import { getPineconeIndex } from "./client";
import type { RepositoryChunk } from "../repository/types";

const UPSERT_BATCH_SIZE = 90;

/**
 * Saves repository chunks into a Pinecone namespace.
 */
export async function saveCodeChunks(
  namespace: string,
  chunks: RepositoryChunk[]
): Promise<void> {
  const index = getPineconeIndex();

  console.log(`Uploading ${chunks.length} chunks to "${namespace}"`);

  for (
    let start = 0;
    start < chunks.length;
    start += UPSERT_BATCH_SIZE
  ) {
    const batch = chunks.slice(
      start,
      start + UPSERT_BATCH_SIZE
    );

    // Remove invalid chunks
    const validChunks = batch.filter(
      (chunk) =>
        chunk.text &&
        chunk.text.trim().length > 0
    );

    if (validChunks.length === 0) {
      console.warn(
        `Skipping empty batch (${start}-${start + UPSERT_BATCH_SIZE})`
      );
      continue;
    }

    const records = validChunks.map((chunk) => ({
      id: chunk.id,
      text: chunk.text.trim(),
      filePath: chunk.filePath,
    }));

    console.log(
      `Uploading batch ${Math.floor(start / UPSERT_BATCH_SIZE) + 1}`
    );
    console.log(
      `Records: ${records.length}`
    );

    try {
      await index
        .namespace(namespace)
        .upsertRecords({
          records,
        });
    } catch (error) {
      console.error(
        "Failed Pinecone batch:"
      );

      console.dir(records, {
        depth: null,
      });

      throw error;
    }
  }
}