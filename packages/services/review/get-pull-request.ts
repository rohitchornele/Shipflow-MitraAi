import { db } from "@repo/database";
import { githubPullRequest } from "@repo/database/schema";
import { eq } from "drizzle-orm";

export async function getPullRequest(id: string) {
  return db.query.githubPullRequest.findFirst({
    where: eq(githubPullRequest.id, id),
  });
}