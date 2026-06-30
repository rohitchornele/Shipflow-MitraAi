import { Pinecone } from '@pinecone-database/pinecone';

let pinecone: Pinecone | null = null;

function getPineconeClient() {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }

  return pinecone;
}

export function getPineconeIndex() {
  return getPineconeClient().index(process.env.PINECONE_INDEX!);
}
