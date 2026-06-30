import { getPineconeIndex } from './client';

const CONTEXT_RESULTS = 10;

/**
 * Searches a Pinecone namespace and returns the
 * most relevant code snippets for the supplied query.
 */
export async function searchCodeContext(
  namespace: string,
  query: string
): Promise<string[]> {
  const index = getPineconeIndex();

  const response = await index
    .namespace(namespace)
    .searchRecords({
      query: {
        topK: CONTEXT_RESULTS,
        inputs: {
          text: query,
        },
      },
    });

  const snippets: string[] = [];

  for (const hit of response.result.hits) {
    const fields = hit.fields as {
      text?: string;
      filePath?: string;
    };

    if (!fields.text) {
      continue;
    }

    snippets.push(
      `File: ${fields.filePath}\n${fields.text}`
    );
  }

  return snippets;
}