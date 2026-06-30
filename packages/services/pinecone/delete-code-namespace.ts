import { getPineconeIndex } from "./client";


export async function deleteCodeNamespace(
  namespace: string
): Promise<void> {
  const index = getPineconeIndex();

  await index.deleteNamespace(namespace);
}