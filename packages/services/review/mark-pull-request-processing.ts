import { db } from "@repo/database";
import { githubPullRequest } from "@repo/database/schema";
import { eq } from "drizzle-orm";

export async function markPullRequestProcessing(id: string) {
  const [pullRequest] = await db
    .update(githubPullRequest)
    .set({
      status: "processing",
    })
    .where(eq(githubPullRequest.id, id))
    .returning();

  return pullRequest;
}